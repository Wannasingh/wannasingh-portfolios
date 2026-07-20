import fs from 'fs';
import { S3Client, PutBucketCorsCommand, GetBucketCorsCommand } from '@aws-sdk/client-s3';

// Load env files
if (fs.existsSync('.env.local')) {
  process.loadEnvFile('.env.local');
} else if (fs.existsSync('.env')) {
  process.loadEnvFile('.env');
}

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME || 'portfolio';

console.log('--- Setting Cloudflare R2 CORS Configuration ---');
console.log(`Bucket Name: ${bucketName}`);

if (!accountId || !accessKeyId || !secretAccessKey) {
  console.error('Error: Credentials are not fully configured in environment.');
  process.exit(1);
}

const client = new S3Client({
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region: 'auto',
  forcePathStyle: true,
});

async function main() {
  try {
    console.log('Setting CORS rules on R2 bucket...');
    
    const command = new PutBucketCorsCommand({
      Bucket: bucketName,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedHeaders: ['*'],
            AllowedMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
            AllowedOrigins: ['*'],
            ExposeHeaders: ['ETag'],
            MaxAgeSeconds: 3000,
          },
        ],
      },
    });
    
    await client.send(command);
    console.log('✅ CORS configuration successfully applied to R2 bucket!');
    
    console.log('\nVerifying current CORS rules...');
    const verifyCommand = new GetBucketCorsCommand({ Bucket: bucketName });
    const corsRes = await client.send(verifyCommand);
    console.log('Current CORS Rules:', JSON.stringify(corsRes.CORSRules, null, 2));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to set CORS configuration:', error);
    process.exit(1);
  }
}

main();
