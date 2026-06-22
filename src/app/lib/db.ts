/* eslint-disable @typescript-eslint/no-explicit-any */
import oracledb from 'oracledb';
import { fetchSecrets } from './vault';

const globalForDb = globalThis as unknown as {
  poolPromise?: Promise<any>;
};

export async function getPool(): Promise<any> {
  if (globalForDb.poolPromise) return globalForDb.poolPromise;

  globalForDb.poolPromise = (async () => {
    const secrets = await fetchSecrets();
    
    console.log('--- DB connection pool config ---');
    console.log('secrets.ORACLE_WALLET_LOCATION:', secrets.ORACLE_WALLET_LOCATION);
    if (secrets.ORACLE_WALLET_LOCATION) {
      oracledb.configDir = secrets.ORACLE_WALLET_LOCATION;
      process.env.TNS_ADMIN = secrets.ORACLE_WALLET_LOCATION;
      console.log('Set oracledb.configDir and TNS_ADMIN to:', secrets.ORACLE_WALLET_LOCATION);
    } else {
      console.log('ORACLE_WALLET_LOCATION not provided in secrets!');
    }

    // Set up connection pool using parameters fetched from Vault/Environment
    return oracledb.createPool({
      user: secrets.ORACLE_USER,
      password: secrets.ORACLE_PASSWORD,
      connectString: secrets.ORACLE_CONNECT_STRING || 'dbprod_low',
      poolMin: 1,
      poolMax: 10,
      poolIncrement: 1,
      queueTimeout: 5000, // Fail fast in 5 seconds if connections are congested/dead
    });
  })();

  return globalForDb.poolPromise;
}

export async function executeQuery<T>(sql: string, binds: any = []): Promise<T[]> {
  const p = await getPool();
  const conn = await p.getConnection();
  try {
    const result = await conn.execute(sql, binds, { outFormat: oracledb.OUT_FORMAT_OBJECT });
    return result.rows as T[];
  } finally {
    await conn.close();
  }
}
