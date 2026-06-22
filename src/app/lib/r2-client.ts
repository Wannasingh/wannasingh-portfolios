import { S3Client } from '@aws-sdk/client-s3';

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

if (!accountId || !accessKeyId || !secretAccessKey) {
  console.warn('R2 credentials not fully configured. Storage operations will fail.');
}

export const r2Client = new S3Client({
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region: 'auto',
  forcePathStyle: true, // Crucial for Cloudflare R2 to prevent virtual-hosted bucket domain TLS handshake errors
});

export const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'portfolio';
export const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || 'https://media.wannasingh.dev';
