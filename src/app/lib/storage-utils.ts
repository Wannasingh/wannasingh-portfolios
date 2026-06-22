import { PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

const BUCKET_NAME = 'project-images'; // Kept for matching legacy bucket logic

/**
 * อัพโหลดรูปภาพไปยัง Cloudflare R2
 * @param file - ไฟล์รูปภาพ
 * @param folder - โฟลเดอร์ย่อย (เช่น 'projects', 'services')
 * @returns URL ของรูปภาพ
 */
export async function uploadImage(
  file: File,
  folder: string = 'projects'
): Promise<string> {
  try {
    if (typeof window === 'undefined') {
      // Server-side
      const { r2Client, BUCKET_NAME: R2_BUCKET, CDN_URL } = await import('./r2-client');
      const fileExt = file.name.split('.').pop();
      const fileName = `Pictures/${folder}/${Date.now()}-${crypto.randomUUID()}.${fileExt}`;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      await r2Client.send(
        new PutObjectCommand({
          Bucket: R2_BUCKET,
          Key: fileName,
          Body: buffer,
          ContentType: file.type || 'image/jpeg',
        })
      );

      return `${CDN_URL}/${fileName}`;
    } else {
      // Client-side
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/storage-gateway?action=upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to upload image');
      }

      const data = await res.json();
      return data.publicUrl;
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

/**
 * ลบรูปภาพจาก Cloudflare R2
 * @param imageUrl - URL ของรูปภาพ
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    if (!imageUrl) return;

    if (typeof window === 'undefined') {
      // Server-side
      const { r2Client, BUCKET_NAME: R2_BUCKET } = await import('./r2-client');
      const url = new URL(imageUrl);
      const key = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname;

      await r2Client.send(
        new DeleteObjectCommand({
          Bucket: R2_BUCKET,
          Key: key,
        })
      );
    } else {
      // Client-side
      const res = await fetch('/api/storage-gateway?action=delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to delete image');
      }
    }
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}

/**
 * ดึงรายการรูปภาพทั้งหมดในโฟลเดอร์
 * @param folder - ชื่อโฟลเดอร์
 */
export async function listImages(folder: string = 'projects') {
  try {
    if (typeof window === 'undefined') {
      // Server-side
      const { r2Client, BUCKET_NAME: R2_BUCKET, CDN_URL } = await import('./r2-client');
      const response = await r2Client.send(
        new ListObjectsV2Command({
          Bucket: R2_BUCKET,
          Prefix: `Pictures/${folder}/`,
        })
      );

      return (response.Contents || []).map((file) => {
        const publicUrl = `${CDN_URL}/${file.Key}`;
        return {
          name: file.Key?.split('/').pop() || '',
          url: publicUrl,
          createdAt: file.LastModified?.toISOString() || new Date().toISOString(),
        };
      });
    } else {
      // Client-side
      const res = await fetch(`/api/storage-gateway?action=list&folder=${folder}`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to list images');
      }
      return await res.json();
    }
  } catch (error) {
    console.error('Error listing images:', error);
    return [];
  }
}

/**
 * ตรวจสอบว่าเป็น URL จาก R2 Storage หรือ Supabase Storage หรือไม่
 */
export function isSupabaseStorageUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    // Suppport both legacy Supabase buckets and new custom media CDN
    return (
      urlObj.pathname.includes(`/${BUCKET_NAME}/`) ||
      urlObj.hostname === 'media.wannasingh.dev' ||
      urlObj.hostname.includes('r2.cloudflarestorage.com')
    );
  } catch {
    return false;
  }
}
