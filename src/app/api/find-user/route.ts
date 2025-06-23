import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/backend/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = formData.get("email") as string | null;
  const name = formData.get("name") as string | null;

  if (!email && !name) {
    return NextResponse.json({ error: "email 또는 name 중 하나는 필요합니다." }, { status: 400 });
  }

  let q;
  if (email) {
    q = query(collection(db, "users"), where("email", "==", email));
  } else {
    q = query(collection(db, "users"), where("name", "==", name));
  }

  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return NextResponse.json({ error: "해당 조건의 사용자가 없습니다." }, { status: 404 });
  }
  const userDoc = snapshot.docs[0];
  return NextResponse.json({ uid: userDoc.id, ...userDoc.data() });
} 