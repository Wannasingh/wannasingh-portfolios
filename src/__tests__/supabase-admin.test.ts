jest.unmock('@/app/lib/supabase-admin');
import { isAdmin, requireAdmin } from '@/app/lib/supabase-admin';
import { supabase } from '@/app/lib/supabase';

jest.mock('@/app/lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: jest.fn()
    },
    from: jest.fn()
  }
}));

describe('supabase-admin', () => {
  const mockGetUser = supabase.auth.getUser as jest.Mock;
  const mockFrom = supabase.from as jest.Mock;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('isAdmin', () => {
    it('returns false when user is not logged in', async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } });
      const result = await isAdmin();
      expect(result).toBe(false);
    });

    it('returns false when user is not in admin_emails table', async () => {
      mockGetUser.mockResolvedValue({ data: { user: { email: 'user@test.com' } } });
      mockFrom.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null })
      });
      
      const result = await isAdmin();
      expect(result).toBe(false);
    });

    it('returns true when user is an admin', async () => {
      mockGetUser.mockResolvedValue({ data: { user: { email: 'admin@test.com' } } });
      mockFrom.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: { email: 'admin@test.com' } })
      });
      
      const result = await isAdmin();
      expect(result).toBe(true);
    });
  });

  describe('requireAdmin', () => {
    it('throws error when user is not an admin', async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } });
      await expect(requireAdmin()).rejects.toThrow('Unauthorized: Admin access required');
    });

    it('returns true when user is an admin', async () => {
      mockGetUser.mockResolvedValue({ data: { user: { email: 'admin@test.com' } } });
      mockFrom.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: { email: 'admin@test.com' } })
      });
      
      const result = await requireAdmin();
      expect(result).toBe(true);
    });
  });
});
