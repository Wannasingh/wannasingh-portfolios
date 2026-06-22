import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const bucket = searchParams.get('bucket') || 'project-images';
    const folder = searchParams.get('folder') || 'projects';

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', bucket, folder);

    if (!fs.existsSync(uploadDir)) {
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(uploadDir);
    const result = files.map(file => {
      const filePath = path.join(uploadDir, file);
      const stat = fs.statSync(filePath);
      return {
        name: file,
        created_at: stat.birthtime.toISOString(),
      };
    });

    return NextResponse.json(result);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Storage list API error:', msg);
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
