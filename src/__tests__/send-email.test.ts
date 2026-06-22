/**
 * @jest-environment node
 */
import { POST } from '@/app/api/send-email/route';
import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

// Mock process.env
const originalEnv = process.env;

describe('/api/send-email POST handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it.each([
    ['SMTP_HOST'],
    ['SMTP_USER'],
    ['SMTP_PASS'],
  ])('returns 500 if %s is missing', async (missingVar) => {
    process.env.SMTP_HOST = 'smtp.test.com';
    process.env.SMTP_USER = 'user@test.com';
    process.env.SMTP_PASS = 'password';

    delete (process.env as Record<string, string | undefined>)[missingVar];

    const req = {
      json: jest.fn().mockResolvedValue({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello'
      })
    } as unknown as NextRequest;

    const res = await POST(req);
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.message).toContain('SMTP configuration is incomplete');
  });

  it('sends email successfully and returns 200', async () => {
    process.env.SMTP_HOST = 'smtp.test.com';
    process.env.SMTP_USER = 'user@test.com';
    process.env.SMTP_PASS = 'password';
    delete process.env.SMTP_PORT;
    delete process.env.SMTP_SECURE;
    delete process.env.EMAIL_FROM;
    delete process.env.EMAIL_TO;

    const req = {
      json: jest.fn().mockResolvedValue({
        name: 'Jane Doe',
        email: 'jane@example.com',
        message: 'Test Message'
      })
    } as unknown as NextRequest;

    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.message).toBe('Email sent successfully');

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: 'smtp.test.com',
      port: 587,
      secure: false,
      auth: {
        user: 'user@test.com',
        pass: 'password',
      },
    });
  });

  it('returns 500 when transport.sendMail throws an error', async () => {
    process.env.SMTP_HOST = 'smtp.test.com';
    process.env.SMTP_USER = 'user@test.com';
    process.env.SMTP_PASS = 'password';

    const sendMailMock = jest.fn().mockRejectedValue(new Error('SMTP connection error'));
    (nodemailer.createTransport as jest.Mock).mockReturnValueOnce({
      sendMail: sendMailMock,
    });

    const req = {
      json: jest.fn().mockResolvedValue({
        name: 'Jane Doe',
        email: 'jane@example.com',
        message: 'Test Message'
      })
    } as unknown as NextRequest;

    const res = await POST(req);
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.message).toBe('Failed to send email');
    expect(body.error).toBe('SMTP connection error');
  });

  it('handles optional SMTP settings, secure configuration, and custom from/to addresses', async () => {
    process.env.SMTP_HOST = 'smtp.test.com';
    process.env.SMTP_USER = 'user@test.com';
    process.env.SMTP_PASS = 'password';
    process.env.SMTP_PORT = '465';
    process.env.SMTP_SECURE = 'true';
    process.env.EMAIL_FROM = 'from@test.com';
    process.env.EMAIL_TO = 'to@test.com';

    const req = {
      json: jest.fn().mockResolvedValue({
        name: 'Jane Doe',
        email: 'jane@example.com',
        message: 'Test Message'
      })
    } as unknown as NextRequest;

    const res = await POST(req);
    expect(res.status).toBe(200);

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: 'smtp.test.com',
      port: 465,
      secure: true,
      auth: {
        user: 'user@test.com',
        pass: 'password',
      },
    });
  });

  it('handles non-Error objects thrown in catch block', async () => {
    process.env.SMTP_HOST = 'smtp.test.com';
    process.env.SMTP_USER = 'user@test.com';
    process.env.SMTP_PASS = 'password';

    const sendMailMock = jest.fn().mockRejectedValue('Some arbitrary string error');
    (nodemailer.createTransport as jest.Mock).mockReturnValueOnce({
      sendMail: sendMailMock,
    });

    const req = {
      json: jest.fn().mockResolvedValue({
        name: 'Jane Doe',
        email: 'jane@example.com',
        message: 'Test Message'
      })
    } as unknown as NextRequest;

    const res = await POST(req);
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.message).toBe('Failed to send email');
    expect(body.error).toBe('An unknown error occurred');
  });
});
