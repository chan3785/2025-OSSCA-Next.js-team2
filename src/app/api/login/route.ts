import { NextRequest, NextResponse } from "next/server";
import { signInWithEmail } from "@/lib/backend/auth-actions";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return NextResponse.json({ error: "이메일과 비밀번호를 모두 입력하세요." }, { status: 400 });
    }

    const user = await signInWithEmail(email, password);
    return NextResponse.json({ success: true, uid: user.uid, email: user.email });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 401 });
  }
} 