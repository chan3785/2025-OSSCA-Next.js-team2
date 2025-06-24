import { collection, query, orderBy, startAt, endAt, getDocs } from "firebase/firestore";
import db from "@/lib/backend/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const name = formData.get("name") as string | null;

  if (!name) {
    return NextResponse.json({ error: "이름을 입력하세요" }, { status: 400 });
  }

  const usersRef = collection(db, "users");

  const q = query(
    usersRef,
    orderBy("name"),
    startAt(name),
    endAt(name + "\uf8ff"), // 유니코드 트릭
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return NextResponse.json([], { status: 200 });
  }

  const results = snapshot.docs.map((doc) => ({
    uid: doc.id,
    ...doc.data(),
  }));

  return NextResponse.json(results);
}
