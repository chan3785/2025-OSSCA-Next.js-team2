import { getUserTodoListByUid } from "@/lib/backend/read-firebase";
import { NextResponse } from "next/server";

export async function GET(request:Request, { params }: { params: Promise<{ uid: string }> }) {
  try {
    // 1. Authorization 헤더에서 idToken 추출
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "인증 토큰이 필요합니다." }, { status: 401 });
    }
    const idToken = authHeader.split(" ")[1];

    // 2. getUserTodoListByUid에 idToken과 uid 전달
    const { uid } = await params;
    const todolists = await getUserTodoListByUid(idToken, uid);
    return NextResponse.json(todolists);
  } catch (error) {
    const message = (error as Error).message;
    if (message.includes("인증") || message.includes("로그인")) {
      return NextResponse.json({ error: message }, { status: 401 });
    }
    if (message.includes("친구가 아닌")) {
      return NextResponse.json({ error: message }, { status: 403 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
} 