import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import fs from 'fs';

if (fs.existsSync('.env.local')) {
  process.loadEnvFile('.env.local');
} else if (fs.existsSync('.env')) {
  process.loadEnvFile('.env');
}

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME || 'portfolio';

const client = new S3Client({
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: accessKeyId!,
    secretAccessKey: secretAccessKey!,
  },
  region: 'auto',
  forcePathStyle: true,
});

async function run() {
  try {
    console.log('Listing all files in bucket...');
    const res = await client.send(new ListObjectsV2Command({
      Bucket: bucketName,
    }));
    
    if (res.Contents) {
      console.log('Files:');
      res.Contents.forEach((file) => {
        console.log(`- ${file.Key}`);
      });
    } else {
      console.log('No files found.');
    }
  } catch (err) {
    console.error('Error listing files:', err);
  }
}

run();
