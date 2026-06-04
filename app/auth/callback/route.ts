import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const origin = process.env.NEXT_PUBLIC_SITE_URL;

  if (!origin) {
    throw new Error("Missing NEXT_PUBLIC_SITE_URL environment variable");
  }

  if (!code) {
    console.error("Auth callback: missing code parameter");
    return NextResponse.redirect(`${origin}/login?error=auth`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Auth callback: code exchange failed:", error.message);
    return NextResponse.redirect(`${origin}/login?error=auth`);
  }

  return NextResponse.redirect(`${origin}/dashboard`);
}