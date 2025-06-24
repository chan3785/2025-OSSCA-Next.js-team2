import { getUserTodoList } from "@/lib/backend/read-firebase";
import { writeUserTodoList } from "@/lib/backend/write-firebase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const idToken = authHeader?.split(' ')[1];
  if (!idToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const todolists = await getUserTodoList(idToken);
    return NextResponse.json(todolists, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const idToken = authHeader?.split(' ')[1];
  if (!idToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const todolists = await request.json();
    await writeUserTodoList(idToken, todolists);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

