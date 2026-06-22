// Author: Antigravity
// Date: 2026-06-17
// Task: Oracle & Vault Setup - Script to initialize keys in Vault
// Purpose: Upload shared, development, staging, and production secrets to vault.wannasingh.dev using token or userpass.

const fs = require('fs');
const path = require('path');

const vaultAddr = process.env.VAULT_ADDR || 'https://vault.wannasingh.dev';

// 1. Shared secrets across all environments
const sharedSecrets = {
  OCI_NAMESPACE: 'axwlz6nlaqwo',
  OCI_REGION: 'ap-singapore-1'
};

// 2. Development secrets
const developmentSecrets = {
  ORACLE_USER: 'WANNASINGH',
  ORACLE_PASSWORD: '***REMOVED***',
  ORACLE_CONNECT_STRING: 'dbprod_low',
  ORACLE_WALLET_LOCATION: '/Users/haru/oracle-26-ai/dbprod/Wallet_dbprod',
  ORACLE_WALLET_PASSWORD: '***REMOVED***'
};

// 3. Staging secrets (shares bucket-dev)
const stagingSecrets = {
  ORACLE_USER: 'WANNASINGH',
  ORACLE_PASSWORD: '***REMOVED***',
  ORACLE_CONNECT_STRING: 'dbprod_low',
  ORACLE_WALLET_LOCATION: '/Users/haru/oracle-26-ai/dbprod/Wallet_dbprod',
  ORACLE_WALLET_PASSWORD: '***REMOVED***'
};

// 4. Production secrets (uses bucket-prod)
const productionSecrets = {
  ORACLE_USER: 'WANNASINGH',
  ORACLE_PASSWORD: '***REMOVED***',
  ORACLE_CONNECT_STRING: 'dbprod_low',
  ORACLE_WALLET_LOCATION: '/home/ubuntu/Wallet_dbprod',
  ORACLE_WALLET_PASSWORD: '***REMOVED***'
};

function getBaseHeaders() {
  const headers = {
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

async function getVaultToken() {
  const token = process.env.VAULT_TOKEN;
  if (token) return token;

  const username = process.env.VAULT_USER || process.env.VAULT_USERNAME;
  const password = process.env.VAULT_PASSWORD || process.env.VAULT_PASS;

  if (username && password) {
    console.log(`Authenticating with Vault via userpass for user: ${username}...`);
    const headers = getBaseHeaders();
    const loginRes = await fetch(`${vaultAddr}/v1/auth/userpass/login/${username}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ password })
    });

    if (!loginRes.ok) {
      throw new Error(`Vault userpass login failed with status ${loginRes.status}`);
    }

    const loginJson = await loginRes.json();
    return loginJson.auth?.client_token;
  }

  throw new Error('Please specify VAULT_TOKEN or (VAULT_USER and VAULT_PASSWORD) environment variables.');
}

async function writeToVault(token, secretPath, data) {
  const url = `${vaultAddr}/v1/secret/data/wannasingh-portfolio/${secretPath}`;
  console.log(`Writing to Vault: ${url}...`);

  const headers = getBaseHeaders();
  headers['X-Vault-Token'] = token;

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to write to Vault path "${secretPath}" (${res.status}): ${errorText}`);
  }

  console.log(`Successfully wrote secrets to path "${secretPath}".`);
}

async function main() {
  try {
    const token = await getVaultToken();
    await writeToVault(token, 'shared', sharedSecrets);
    await writeToVault(token, 'development', developmentSecrets);
    await writeToVault(token, 'staging', stagingSecrets);
    await writeToVault(token, 'production', productionSecrets);
    console.log('\nAll secrets successfully initialized in HashiCorp Vault!');
  } catch (err) {
    console.error('\nError writing secrets:', err.message);
    process.exit(1);
  }
}

main();
