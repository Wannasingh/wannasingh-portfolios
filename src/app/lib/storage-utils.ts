import { supabaseAdmin } from "./supabase-admin";

const BUCKET_NAME = "project-images";

/**
 * อัพโหลดรูปภาพไปยัง Supabase Storage
 * @param file - ไฟล์รูปภาพ
 * @param folder - โฟลเดอร์ย่อย (เช่น 'projects', 'services')
 * @returns URL ของรูปภาพ
 */
export async function uploadImage(
  file: File,
  folder: string = "projects"
): Promise<string> {
  try {
    // สร้างชื่อไฟล์ที่ unique
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    // อัพโหลดไฟล์
    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    // ดึง public URL
    const { data: urlData } = supabaseAdmin.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

/**
 * ลบรูปภาพจาก Supabase Storage
 * @param imageUrl - URL ของรูปภาพ
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    // แยก path จาก URL
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split(`/${BUCKET_NAME}/`);
    if (pathParts.length < 2) return;

    const filePath = pathParts[1];

    const { error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) throw error;
  } catch (error) {
    console.error("Error deleting image:", error);
    // ไม่ throw error เพราะอาจจะเป็น URL ภายนอก
  }
}

/**
 * ดึงรายการรูปภาพทั้งหมดในโฟลเดอร์
 * @param folder - ชื่อโฟลเดอร์
 */
export async function listImages(folder: string = "projects") {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .list(folder, {
        limit: 100,
        offset: 0,
        sortBy: { column: "created_at", order: "desc" },
      });

    if (error) throw error;

    return data.map((file) => {
      const { data: urlData } = supabaseAdmin.storage
        .from(BUCKET_NAME)
        .getPublicUrl(`${folder}/${file.name}`);
      return {
        name: file.name,
        url: urlData.publicUrl,
        createdAt: file.created_at,
      };
    });
  } catch (error) {
    console.error("Error listing images:", error);
    return [];
  }
}

/**
 * ตรวจสอบว่าเป็น URL จาก Supabase Storage หรือไม่
 */
export function isSupabaseStorageUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname.includes(`/${BUCKET_NAME}/`);
  } catch {
    return false;
  }
}
