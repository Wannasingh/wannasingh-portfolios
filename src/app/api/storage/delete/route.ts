import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { paths, bucket } = await req.json();

    if (!Array.isArray(paths)) {
      return NextResponse.json({ message: 'paths must be an array' }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', bucket || 'project-images');

    for (const filePath of paths) {
      const targetPath = path.join(uploadDir, filePath);
      if (fs.existsSync(targetPath)) {
        fs.unlinkSync(targetPath);
        console.log(`Deleted file from local storage: ${targetPath}`);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Storage delete API error:', msg);
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
