import { getUserTodoList } from "@/lib/backend/read-firebase";
import { writeUserTodoList } from "@/lib/backend/write-firebase";
import { NextRequest, NextResponse } from "next/server";
export async function GET() {
    //fetch data from db
    try {
    const todolists = getUserTodoList()
    return new NextResponse(JSON.stringify(todolists), {
        status:200,
        headers: {'Content-Type': 'application/json' }
    })
    } catch (error) {
        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 500 }
          );
    }
}


export async function PUT(request: NextRequest) {
  try {
    const todolists = await request.json();
    await writeUserTodoList(todolists);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

