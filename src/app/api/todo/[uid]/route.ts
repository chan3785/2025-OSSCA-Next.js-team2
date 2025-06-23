import { getUserTodoListByUid } from "@/lib/backend/read-firebase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, { params }: { params: { uid: string } }) {
  try {
    const todolists = await getUserTodoListByUid(params.uid);
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