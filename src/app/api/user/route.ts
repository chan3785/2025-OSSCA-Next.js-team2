import { writeUserData } from '@/lib/backend/write-firebase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const idToken = authHeader?.split(' ')[1];
  if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userData = await request.json();
  try {
    await writeUserData(idToken, userData);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
} 