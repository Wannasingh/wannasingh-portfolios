import { uploadImage, deleteImage, listImages, isSupabaseStorageUrl } from '@/app/lib/storage-utils';
import { supabaseAdmin } from '@/app/lib/supabase-admin';

jest.mock('@/app/lib/supabase-admin', () => ({
  supabaseAdmin: {
    storage: {
      from: jest.fn()
    }
  }
}));

describe('storage-utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isSupabaseStorageUrl', () => {
    it('returns true for valid supabase storage url', () => {
      expect(isSupabaseStorageUrl('https://example.supabase.co/storage/v1/object/public/project-images/test.jpg')).toBe(true);
    });

    it('returns false for invalid url', () => {
      expect(isSupabaseStorageUrl('invalid-url')).toBe(false);
      expect(isSupabaseStorageUrl('https://example.com/images/test.jpg')).toBe(false);
    });
  });

  describe('deleteImage', () => {
    it('calls remove with correct path', async () => {
      const mockRemove = jest.fn().mockResolvedValue({ error: null });
      (supabaseAdmin.storage.from as jest.Mock).mockReturnValue({
        remove: mockRemove
      });

      await deleteImage('https://example.supabase.co/storage/v1/object/public/project-images/test/image.jpg');
      
      expect(supabaseAdmin.storage.from).toHaveBeenCalledWith('project-images');
      expect(mockRemove).toHaveBeenCalledWith(['test/image.jpg']);
    });

    it('ignores non-supabase urls', async () => {
      const mockRemove = jest.fn();
      (supabaseAdmin.storage.from as jest.Mock).mockReturnValue({
        remove: mockRemove
      });

      await deleteImage('https://example.com/test.jpg');
      
      expect(mockRemove).not.toHaveBeenCalled();
    });
  });

  describe('uploadImage', () => {
    it('uploads file and returns public url', async () => {
      const mockUpload = jest.fn().mockResolvedValue({ data: { path: 'test/path.jpg' }, error: null });
      const mockGetPublicUrl = jest.fn().mockReturnValue({ data: { publicUrl: 'https://test.com/path.jpg' } });
      
      (supabaseAdmin.storage.from as jest.Mock).mockReturnValue({
        upload: mockUpload,
        getPublicUrl: mockGetPublicUrl
      });

      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const result = await uploadImage(file, 'test-folder');
      
      expect(mockUpload).toHaveBeenCalled();
      expect(mockGetPublicUrl).toHaveBeenCalledWith('test/path.jpg');
      expect(result).toBe('https://test.com/path.jpg');
    });

    it('throws error if upload fails', async () => {
      const mockUpload = jest.fn().mockResolvedValue({ data: null, error: new Error('Upload failed') });
      (supabaseAdmin.storage.from as jest.Mock).mockReturnValue({
        upload: mockUpload
      });

      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      await expect(uploadImage(file)).rejects.toThrow('Upload failed');
    });
  });

  describe('listImages', () => {
    it('returns formatted list of images', async () => {
      const mockList = jest.fn().mockResolvedValue({
        data: [{ name: 'img1.jpg', created_at: '2023-01-01' }],
        error: null
      });
      const mockGetPublicUrl = jest.fn().mockReturnValue({ data: { publicUrl: 'https://test.com/img1.jpg' } });
      
      (supabaseAdmin.storage.from as jest.Mock).mockReturnValue({
        list: mockList,
        getPublicUrl: mockGetPublicUrl
      });

      const result = await listImages('projects');
      
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        name: 'img1.jpg',
        url: 'https://test.com/img1.jpg',
        createdAt: '2023-01-01'
      });
    });

    it('returns empty array on error', async () => {
      const mockList = jest.fn().mockResolvedValue({
        data: null,
        error: new Error('List failed')
      });
      
      (supabaseAdmin.storage.from as jest.Mock).mockReturnValue({
        list: mockList
      });

      const result = await listImages();
      
      expect(result).toEqual([]);
    });
  });
});
