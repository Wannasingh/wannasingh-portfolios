import { sendEmail } from '@/lib/email';
import { toast } from 'sonner';

// Mock fetch
global.fetch = jest.fn();

describe('sendEmail utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('sends email successfully and calls resetForm', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Success' })
    });

    const resetForm = jest.fn();
    const formData = {
      name: 'Test',
      email: 'test@test.com',
      message: 'Hello'
    };

    await expect(sendEmail(formData, resetForm)).resolves.toEqual('Message sent successfully!');
    
    // Fast-forward setTimeout
    jest.runAllTimers();

    
    expect(global.fetch).toHaveBeenCalledWith('/api/send-email', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify(formData)
    }));
    expect(toast.promise).toHaveBeenCalled();
    expect(resetForm).toHaveBeenCalled();
  });

  it('throws an error when fetch fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false
    });

    const resetForm = jest.fn();
    const formData = {
      name: 'Test',
      email: 'test@test.com',
      message: 'Hello'
    };

    await expect(sendEmail(formData, resetForm)).rejects.toThrow('Failed to send message');
    
    expect(resetForm).not.toHaveBeenCalled();
  });
});
