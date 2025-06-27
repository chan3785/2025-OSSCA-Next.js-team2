import { NextRequest, NextResponse } from "next/server";
import { addFriend } from "@/lib/backend/write-firebase";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const idToken = cookieStore.get("firebase-token")?.value;
    
    if (!idToken) {
      return NextResponse.json(
        { error: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const friendUid = formData.get("friendUid") as string;
    if (!friendUid) {
      return NextResponse.json(
        { error: "friendUid가 필요합니다." },
        { status: 400 }
      );
    }

    await addFriend(idToken, friendUid);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("친구 추가 중 오류 발생:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
} 