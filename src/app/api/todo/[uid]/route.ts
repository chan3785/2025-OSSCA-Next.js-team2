import { getUserTodoListByUid } from "@/lib/backend/read-firebase";
import { NextResponse } from "next/server";

export async function GET(request:Request, { params }: { params: Promise<{ uid: string }> }) {
  try {
    const {uid} = await params
    const todolists = await getUserTodoListByUid(uid);
    return NextResponse.json(todolists);
  } catch (error) {
    const message = (error as Error).message;
    if (message.includes("로그인")) {
      return NextResponse.json({ error: message }, { status: 401 });
    }
    if (message.includes("친구가 아닌")) {
      return NextResponse.json({ error: message }, { status: 403 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
} 