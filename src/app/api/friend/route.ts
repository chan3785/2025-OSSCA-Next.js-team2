import { NextRequest, NextResponse } from "next/server";
import { addFriend } from "@/lib/backend/write-firebase";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const friendUid = formData.get("friendUid") as string;
    if (!friendUid) {
      return NextResponse.json({ error: "friendUid가 필요합니다." }, { status: 400 });
    }
    await addFriend(friendUid);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
} 