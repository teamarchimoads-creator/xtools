// src/lib/auth.ts

const SECRET_KEY = process.env.AUTH_SECRET || 'super_secret_xtool_auth_key_123456';

export interface AdminSession {
  username: string;
  role: string;
  exp: number;
}

function arrayBufferToBase64Url(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = typeof btoa === 'function' 
    ? btoa(binary) 
    : Buffer.from(bytes).toString('base64');
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlToUint8Array(str: string): Uint8Array {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = typeof atob === 'function'
    ? atob(base64)
    : Buffer.from(base64, 'base64').toString('binary');
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function stringToBase64Url(str: string): string {
  const enc = new TextEncoder();
  return arrayBufferToBase64Url(enc.encode(str));
}

function base64UrlToString(str: string): string {
  const bytes = base64UrlToUint8Array(str);
  const dec = new TextDecoder();
  return dec.decode(bytes);
}

async function getHmacKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

/**
 * Creates a signed JWT token for the authenticated admin session.
 */
export async function createAdminToken(username: string): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days expiration
  const payload: AdminSession = { username, role: 'admin', exp };

  const encodedHeader = stringToBase64Url(JSON.stringify(header));
  const encodedPayload = stringToBase64Url(JSON.stringify(payload));
  const data = `${encodedHeader}.${encodedPayload}`;

  const key = await getHmacKey(SECRET_KEY);
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  const encodedSignature = arrayBufferToBase64Url(signature);

  return `${data}.${encodedSignature}`;
}

/**
 * Verifies a JWT token signature and expiration.
 */
export async function verifyAdminToken(token: string | undefined | null): Promise<AdminSession | null> {
  try {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const data = `${encodedHeader}.${encodedPayload}`;

    const key = await getHmacKey(SECRET_KEY);
    const signatureBytes = base64UrlToUint8Array(encodedSignature);

    const isValid = await crypto.subtle.verify('HMAC', key, signatureBytes as unknown as BufferSource, new TextEncoder().encode(data));
    if (!isValid) return null;

    const payload: AdminSession = JSON.parse(base64UrlToString(encodedPayload));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null; // Expired
    }

    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Checks credentials against environment variables.
 */
export function validateAdminCredentials(inputUsername: string, inputPassword: string): boolean {
  const envUsername = process.env.ADMIN_USERNAME || 'admin';
  const envPassword = process.env.ADMIN_PASSWORD || 'admin_password_123';
  const envEmail = process.env.ADMIN_EMAIL || '';

  const trimmedUser = inputUsername.trim().toLowerCase();
  const matchUser = (trimmedUser === envUsername.toLowerCase()) || (envEmail && trimmedUser === envEmail.toLowerCase());
  const matchPass = inputPassword === envPassword;

  return Boolean(matchUser && matchPass);
}
