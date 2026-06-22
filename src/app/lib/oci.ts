/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from 'crypto';
import { fetchSecrets } from './vault';

export async function uploadToOCI(
  fileName: string,
  fileBuffer: Buffer,
  contentType: string
): Promise<string> {
  const secrets = await fetchSecrets();
  
  const tenancy = process.env.OCI_TENANCY || (secrets as any).OCI_TENANCY;
  const user = process.env.OCI_USER || (secrets as any).OCI_USER;
  const fingerprint = process.env.OCI_FINGERPRINT || (secrets as any).OCI_FINGERPRINT;
  const privateKeyBase64 = process.env.OCI_PRIVATE_KEY || (secrets as any).OCI_PRIVATE_KEY;
  const namespace = process.env.OCI_NAMESPACE || (secrets as any).OCI_NAMESPACE || 'axwlz6nlaqwo';
  const region = process.env.OCI_REGION || (secrets as any).OCI_REGION || 'ap-singapore-1';
  
  // Resolve bucket based on environment: staging and dev use bucket-dev, prod uses bucket-prod
  const env = process.env.APP_ENV || 'development';
  const bucket = (env === 'production') ? 'bucket-prod' : 'bucket-dev';

  if (!tenancy || !user || !fingerprint || !privateKeyBase64) {
    throw new Error('Missing OCI configurations in Vault / environment.');
  }

  // Restore the PEM private key from base64
  const privateKey = Buffer.from(privateKeyBase64, 'base64').toString('utf8');
  
  const host = `objectstorage.${region}.oraclecloud.com`;
  const path = `/n/${namespace}/b/${bucket}/o/${encodeURIComponent(fileName)}`;
  const url = `https://${host}${path}`;

  const date = new Date().toUTCString();
  const sha256 = crypto.createHash('sha256').update(fileBuffer).digest('base64');
  
  const signingHeaders = [
    `(request-target): put ${path.toLowerCase()}`, // request target path should be lowercase in OCI signing
    `host: ${host}`,
    `date: ${date}`,
    `x-content-sha256: ${sha256}`,
    `content-type: ${contentType}`,
    `content-length: ${fileBuffer.length}`
  ];

  const signingString = signingHeaders.join('\n');
  const signature = crypto
    .createSign('RSA-SHA256')
    .update(signingString)
    .sign(privateKey, 'base64');

  const keyId = `${tenancy}/${user}/${fingerprint}`;
  const authorization = `Signature version="1",keyId="${keyId}",algorithm="rsa-sha256",headers="(request-target) host date x-content-sha256 content-type content-length",signature="${signature}"`;

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Host': host,
      'Date': date,
      'x-content-sha256': sha256,
      'Content-Type': contentType,
      'Content-Length': String(fileBuffer.length),
      'Authorization': authorization,
    },
    body: fileBuffer,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`OCI upload failed with status ${res.status}: ${errorText}`);
  }

  return `https://objectstorage.${region}.oraclecloud.com/n/${namespace}/b/${bucket}/o/${fileName}`;
}
