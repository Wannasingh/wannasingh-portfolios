import { NextRequest, NextResponse } from 'next/server';
import { r2Client, BUCKET_NAME, CDN_URL } from '@/app/lib/r2-client';
import { PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { verifyJWT } from '@/app/lib/auth-utils';

function checkAuth(req: NextRequest): boolean {
  const session = req.cookies.get('session');
  if (!session) return false;
  return !!verifyJWT(session.value);
}

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');

    if (!checkAuth(req)) {
      return NextResponse.json({ error: 'Unauthorized admin access required' }, { status: 401 });
    }

    if (action === 'upload') {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      const folder = formData.get('folder') as string || 'projects';

      if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `Pictures/${folder}/${Date.now()}-${crypto.randomUUID()}.${fileExt}`;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      await r2Client.send(
        new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: fileName,
          Body: buffer,
          ContentType: file.type || 'image/jpeg',
        })
      );

      const publicUrl = `${CDN_URL}/${fileName}`;
      return NextResponse.json({ publicUrl });
    }

    if (action === 'delete') {
      const { imageUrl } = await req.json();
      if (!imageUrl) {
        return NextResponse.json({ error: 'No imageUrl provided' }, { status: 400 });
      }

      const url = new URL(imageUrl);
      // Pathname usually starts with "/" e.g. "/projects/filename.jpg"
      // Key should be "projects/filename.jpg"
      const key = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname;

      await r2Client.send(
        new DeleteObjectCommand({
          Bucket: BUCKET_NAME,
          Key: key,
        })
      );

      return NextResponse.json({ message: 'Deleted successfully' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    console.error('Storage gateway POST error:', err);
    return NextResponse.json({ error: err.message || 'Storage error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    const folder = searchParams.get('folder') || 'projects';

    if (action === 'list') {
      if (!checkAuth(req)) {
        return NextResponse.json({ error: 'Unauthorized admin access required' }, { status: 401 });
      }

      const response = await r2Client.send(
        new ListObjectsV2Command({
          Bucket: BUCKET_NAME,
          Prefix: `Pictures/${folder}/`,
        })
      );

      const files = (response.Contents || []).map((file) => {
        const publicUrl = `${CDN_URL}/${file.Key}`;
        return {
          name: file.Key?.split('/').pop() || '',
          url: publicUrl,
          createdAt: file.LastModified?.toISOString() || new Date().toISOString(),
        };
      });

      return NextResponse.json(files);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    console.error('Storage gateway GET error:', err);
    return NextResponse.json({ error: err.message || 'Storage error' }, { status: 500 });
  }
}
