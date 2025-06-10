import { doc, getDoc } from "firebase/firestore";
import db, { auth } from "./firebase";

export async function getUserTodoList() {
  const user = auth.currentUser;
  if (!user) throw new Error('로그인이 필요합니다.');
  
  const todoRef = doc(db, 'todolists', user.uid);
  const todoSnap = await getDoc(todoRef);
  
  if (todoSnap.exists()) {
    return todoSnap.data().tasks || [];
  } else {
    // 문서가 없으면 빈 배열 반환 (초기 상태)
    return [];
  }
}

export async function getUserProfile() {
    const user = auth.currentUser;
    if (!user) throw new Error('로그인이 필요합니다.');
    
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      throw new Error('유저 프로필이 존재하지 않습니다.');
    }
  }