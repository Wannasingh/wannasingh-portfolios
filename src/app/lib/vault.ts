// ponytail: native fetch for vault to avoid external library dependencies

interface VaultSecrets {
  DATABASE_URL?: string;
  [key: string]: string | undefined;
}

const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

const globalForVault = globalThis as unknown as {
  cachedVaultToken?: string | null;
  cachedSecrets?: VaultSecrets | null;
  cacheExpiresAt?: number;
};

function isCacheValid(): boolean {
  return !!globalForVault.cacheExpiresAt && Date.now() < globalForVault.cacheExpiresAt;
}

function getBaseHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  const clientId = process.env.CF_ACCESS_CLIENT_ID;
  const clientSecret = process.env.CF_ACCESS_CLIENT_SECRET;
  if (clientId && clientSecret) {
    headers['CF-Access-Client-Id'] = clientId;
    headers['CF-Access-Client-Secret'] = clientSecret;
  }
  return headers;
}

async function getVaultToken(vaultAddr: string): Promise<string | null> {
  if (globalForVault.cachedVaultToken) return globalForVault.cachedVaultToken;

  const vaultToken = process.env.VAULT_TOKEN;
  if (vaultToken) {
    globalForVault.cachedVaultToken = vaultToken;
    return vaultToken;
  }

  const username = process.env.VAULT_USER || process.env.VAULT_USERNAME;
  const password = process.env.VAULT_PASSWORD || process.env.VAULT_PASS;

  if (username && password) {
    try {
      console.log(`Authenticating with Vault via userpass for user: ${username}...`);
      const headers = getBaseHeaders();
      const loginRes = await fetch(`${vaultAddr}/v1/auth/userpass/login/${username}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ password }),
        signal: AbortSignal.timeout(1000)
      });

      if (!loginRes.ok) {
        throw new Error(`Vault login failed with status ${loginRes.status}`);
      }

      const loginJson = await loginRes.json();
      const token = loginJson.auth?.client_token;
      if (token) {
        globalForVault.cachedVaultToken = token;
        return token;
      }
    } catch (err) {
      console.error('Failed to authenticate with Vault userpass:', err);
    }
  }

  return null;
}

export async function fetchSecrets(): Promise<VaultSecrets> {
  if (globalForVault.cachedSecrets && isCacheValid()) {
    return globalForVault.cachedSecrets;
  }
  // Reset stale token on re-fetch
  globalForVault.cachedVaultToken = null;

  const vaultAddr = process.env.VAULT_ADDR || 'https://vault.wannasingh.dev';
  const token = await getVaultToken(vaultAddr);

  if (!token) {
    console.warn('Vault token/user credentials are not defined. Falling back to local environment variables.');
    globalForVault.cachedSecrets = {
      ORACLE_USER: process.env.ORACLE_USER,
      ORACLE_PASSWORD: process.env.ORACLE_PASSWORD,
      ORACLE_CONNECT_STRING: process.env.ORACLE_CONNECT_STRING,
      ORACLE_WALLET_LOCATION: process.env.ORACLE_WALLET_LOCATION,
    };
    globalForVault.cacheExpiresAt = Date.now() + CACHE_TTL_MS;
    return globalForVault.cachedSecrets;
  }

  try {
    const headers = getBaseHeaders();
    headers['X-Vault-Token'] = token;

    // 1. Fetch from shared configuration path
    let sharedData = {};
    try {
      const sharedRes = await fetch(`${vaultAddr}/v1/secret/data/wannasingh-portfolio/shared`, {
        headers,
        signal: AbortSignal.timeout(1000)
      });
      if (sharedRes.ok) {
        const sharedJson = await sharedRes.json();
        sharedData = sharedJson.data.data;
      }
    } catch (sharedErr) {
      console.warn('Could not fetch shared secrets from Vault (optional):', sharedErr);
    }

    // 2. Fetch from environment-specific path
    const envName = process.env.APP_ENV || 'development';
    const envRes = await fetch(`${vaultAddr}/v1/secret/data/wannasingh-portfolio/${envName}`, {
      headers,
      signal: AbortSignal.timeout(1000)
    });

    if (!envRes.ok) {
      throw new Error(`Vault environment path responded with status ${envRes.status}`);
    }

    const envJson = await envRes.json();
    const envData = envJson.data.data;

    // 3. Merge secrets (environment-specific overrides shared variables)
    globalForVault.cachedSecrets = {
      ...sharedData,
      ...envData
    } as VaultSecrets;
    globalForVault.cacheExpiresAt = Date.now() + CACHE_TTL_MS;
    return globalForVault.cachedSecrets;
  } catch (error) {
    console.error('Failed to fetch secrets from Vault:', error);
    throw error;
  }
}
