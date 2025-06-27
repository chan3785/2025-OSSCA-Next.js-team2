import adminDb, { adminAuth } from "./firebase-admin";

/**
 * idToken을 검증하여 uid를 얻고, 해당 사용자의 todo 리스트를 반환
 */
export async function getUserTodoList(idToken: string) {
  const decoded = await adminAuth.verifyIdToken(idToken);
  const todoRef = adminDb.collection("todolists").doc(decoded.uid);
  const todoSnap = await todoRef.get();
  if (todoSnap.exists) {
    return todoSnap.data()?.tasks || [];
  } else {
    return [];
  }
}

/**
 * idToken을 검증하여 uid를 얻고, 해당 사용자의 프로필 데이터를 반환
 */
export async function getUserData(idToken: string) {
  const decoded = await adminAuth.verifyIdToken(idToken);
  const userRef = adminDb.collection("users").doc(decoded.uid);
  const userSnap = await userRef.get();
  if (userSnap.exists) {
    return userSnap.data();
  } else {
    throw new Error("유저 정보가 존재하지 않습니다.");
  }
}

/**
 * 내 friendsList에 포함된 친구의 uid로만 투두리스트를 조회할 수 있도록 권한 체크를 포함한 함수
 * @param idToken - 현재 로그인된 사용자의 idToken
 * @param friendUid - 조회할 친구의 uid
 */
export async function getUserTodoListByUid(idToken: string, friendUid: string) {
  const decoded = await adminAuth.verifyIdToken(idToken);
  const myRef = adminDb.collection("users").doc(decoded.uid);
  const mySnap = await myRef.get();
  const myData = mySnap.data();
  if (
    !myData?.friendsList ||
    !Array.isArray(myData.friendsList) ||
    !myData.friendsList.includes(friendUid)
  ) {
    throw new Error("친구가 아닌 사용자의 투두리스트는 조회할 수 없습니다.");
  }
  const todoRef = adminDb.collection("todolists").doc(friendUid);
  const todoSnap = await todoRef.get();
  if (todoSnap.exists) {
    return todoSnap.data()?.tasks || [];
  } else {
    return [];
  }
}

export async function getUserFriendsFromList(friendUids: string[]) {
  if (!friendUids.length) return [];

  const userRefs = friendUids.map((uid) => adminDb.collection("users").doc(uid));

  const friendSnaps = await adminDb.getAll(...userRefs);

  return friendSnaps
    .filter((snap) => snap.exists)
    .map((snap) => {
      const data = snap.data();
      return {
        id: snap.id,
        name: data?.name ?? "이름없음",
        profileImage: data?.profileImage ?? null,
      };
    });
}
