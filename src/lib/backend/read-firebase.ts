import { doc, getDoc } from "firebase/firestore";
import db, { auth } from "./firebase";

export async function getUserTodoList() {
  const user = auth.currentUser;
  if (!user) throw new Error('로그인이 필요합니다.');
  
  const todoRef = doc(db, 'todolists', user.uid);
  const todoSnap = await getDoc(todoRef);
  
  if (todoSnap.exists()) {
    return todoSnap.data().tasks;
  } else {
    // 문서가 없으면 빈 배열 반환 (초기 상태)
    return [];
  }
}

export async function getUserData() {
    const user = auth.currentUser;
    if (!user) throw new Error('로그인이 필요합니다.');
    
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      throw new Error('유저 정보가 존재하지 않습니다.');
    }
  }

/**
 * 내 friendsList에 포함된 친구의 uid로만 투두리스트를 조회할 수 있도록 권한 체크를 포함한 함수
 * @param friendUid - 조회할 친구의 uid
 */
export async function getUserTodoListByUid(friendUid: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("로그인이 필요합니다.");

  const myData = await getUserData();
  if (!myData.friendsList || !Array.isArray(myData.friendsList) || !myData.friendsList.includes(friendUid)) {
    throw new Error("친구가 아닌 사용자의 투두리스트는 조회할 수 없습니다.");
  }
  const todoRef = doc(db, 'todolists', friendUid);
  const todoSnap = await getDoc(todoRef);
  if (todoSnap.exists()) {
    return todoSnap.data().tasks;
  } else {
    return [];
  }
}