import fs from 'fs';
import { S3Client, ListObjectsV2Command, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

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

console.log('--- Cloudflare R2 Connection Test ---');
console.log(`Account ID: ${accountId ? 'configured' : 'MISSING'}`);
console.log(`Access Key: ${accessKeyId ? 'configured' : 'MISSING'}`);
console.log(`Secret Key: ${secretAccessKey ? 'configured' : 'MISSING'}`);
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

async function runTest() {
  const testKey = `Pictures/test/test-connection-${Date.now()}.txt`;
  
  try {
    // 1. List Objects
    console.log('\n1. Testing: Listing objects in bucket...');
    const listRes = await client.send(new ListObjectsV2Command({
      Bucket: bucketName,
      MaxKeys: 5,
    }));
    console.log(`   Success! Found ${listRes.Contents?.length || 0} objects.`);
    
    // 2. Put Object
    console.log('\n2. Testing: Uploading test object...');
    await client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: testKey,
      Body: 'Connection test content',
      ContentType: 'text/plain',
    }));
    console.log(`   Success! Uploaded test object with key: ${testKey}`);
    
    // 3. Delete Object
    console.log('\n3. Testing: Deleting test object...');
    await client.send(new DeleteObjectCommand({
      Bucket: bucketName,
      Key: testKey,
    }));
    console.log(`   Success! Deleted test object.`);
    
    console.log('\n✅ All local bucket connection tests passed successfully!');
    process.exit(0);
  } catch (err: any) {
    console.error(`\n❌ Test failed:`, err);
    process.exit(1);
  }
}

runTest();
