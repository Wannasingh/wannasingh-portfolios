/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Recursively masks sensitive fields from objects or arrays
 */
export function maskSensitiveData(data: any): any {
  if (Array.isArray(data)) {
    return data.map(maskSensitiveData);
  }
  if (data !== null && typeof data === 'object') {
    const masked = { ...data };
    const sensitiveKeys = ['password', 'password_hash', 'secret', 'token', 'jwt'];
    
    for (const key of Object.keys(masked)) {
      if (sensitiveKeys.includes(key.toLowerCase())) {
        delete masked[key];
      } else if (typeof masked[key] === 'object') {
        masked[key] = maskSensitiveData(masked[key]);
      }
    }
    return masked;
  }
  return data;
}

/**
 * Generates an HMAC-SHA256 signature for the payload
 */
export function signPayload(payloadString: string): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.warn('JWT_SECRET is missing. Cannot sign payload.');
    return '';
  }
  return crypto.createHmac('sha256', secret).update(payloadString).digest('hex');
}

/**
 * Wraps a NextResponse with best-practice security headers:
 * - Data masking
 * - X-Response-Signature (HMAC)
 * - ETag (MD5 hash of payload)
 */
export function secureJsonResponse(body: any, init?: ResponseInit): NextResponse {
  // 1. Mask sensitive data
  const safeBody = maskSensitiveData(body);
  
  // 2. Stringify the body
  const bodyString = JSON.stringify(safeBody);
  
  // 3. Generate Checksums and Signatures
  const signature = signPayload(bodyString);
  const etag = crypto.createHash('md5').update(bodyString).digest('hex');

  // 4. Construct Headers
  const headers = new Headers(init?.headers);
  headers.set('Content-Type', 'application/json');
  if (signature) headers.set('X-Response-Signature', signature);
  headers.set('ETag', `"${etag}"`);

  // 5. Return Response
  return new NextResponse(bodyString, {
    ...init,
    headers,
  });
}
