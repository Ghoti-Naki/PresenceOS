import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signToken, verifyPassword, COOKIE_NAME } from "@/lib/auth/jwt";
import { loginSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json() as unknown;
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { username, password } = parsed.data;
    const expectedUsername = process.env.ADMIN_USERNAME!;
    const storedHash = process.env.ADMIN_PASSWORD_HASH!;

    const isValid =
      username === expectedUsername &&
      (await verifyPassword(password, storedHash));

    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await signToken({ username });
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
