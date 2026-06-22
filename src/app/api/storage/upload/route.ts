import { NextRequest, NextResponse } from 'next/server';
import { uploadToOCI } from '@/app/lib/oci';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const relativePath = formData.get('path') as string; // e.g. "profile/123.jpg"

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload directly to OCI Object Storage bucket
    const publicUrl = await uploadToOCI(relativePath, buffer, file.type || 'application/octet-stream');

    console.log(`Uploaded file to OCI: ${publicUrl}`);
    return NextResponse.json({ path: relativePath });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Storage upload API error:', msg);
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
