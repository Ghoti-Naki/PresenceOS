// Note: uses Node.js crypto — import only in API routes (Node.js runtime), never in middleware (Edge runtime)
import { SignJWT, jwtVerify } from "jose";
import { scrypt, timingSafeEqual, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export const COOKIE_NAME = "admin_token";
const EXPIRY = "7d";

function getSecret() {
  return new TextEncoder().encode(process.env.JWT_SECRET!);
}

export async function signToken(payload: { username: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(EXPIRY)
    .setIssuedAt()
    .sign(getSecret());
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, getSecret());
  return payload as { username: string; exp: number; iat: number };
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [salt, storedKey] = hash.split(":");
  if (!salt || !storedKey) return false;
  try {
    const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
    const storedKeyBuffer = Buffer.from(storedKey, "hex");
    if (derivedKey.length !== storedKeyBuffer.length) return false;
    return timingSafeEqual(derivedKey, storedKeyBuffer);
  } catch {
    return false;
  }
}
