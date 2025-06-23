import { doc, setDoc, arrayUnion, updateDoc, getDoc } from 'firebase/firestore';
import db, { auth } from './firebase';

// 유저 프로필 데이터 타입 (예시)
interface UserData {
  email: string;
  name: string;
  profileImage: string;
  friendsList: string[];
}

// 할 일(Task) 데이터 타입 (예시)
interface Task {
  id: string;
  title: string;
  isComplete: boolean;
  createdAt: string;
}

/**
 * 현재 로그인된 유저의 프로필 데이터를 Firestore에 저장 (생성 또는 덮어쓰기)
 * @param userData - 저장할 유저 프로필 데이터 (일부 필드만 업데이트 가능)
 */
export async function writeUserData(userData: Partial<UserData>) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('유저 데이터를 저장하려면 로그인이 필요합니다.');
  }

  try {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, userData, { merge: true }); // merge: true로 기존 필드 유지
  } catch (error) {
    console.error('Error writing user profile: ', error);
    throw new Error('유저 프로필 저장에 실패했습니다.');
  }
}

/**
 * 현재 로그인된 유저의 ToDo 리스트 전체를 Firestore에 저장 (생성 또는 덮어쓰기)
 * @param tasks - 저장할 ToDo 리스트 배열
 */
export async function writeUserTodoList(tasks: Task[]) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('ToDo 리스트를 저장하려면 로그인이 필요합니다.');
  }

  try {
    const todoRef = doc(db, 'todolists', user.uid);
    await setDoc(todoRef, { tasks }); // tasks 필드에 배열 저장
    // 저장 후 데이터 검증
    const savedSnap = await getDoc(todoRef);
    if (!savedSnap.exists()) {
      throw new Error('ToDo 리스트 저장 후 데이터를 찾을 수 없습니다.');
    }
    const saved = savedSnap.data();
    if (!saved.tasks || !Array.isArray(saved.tasks)) {
      throw new Error('ToDo 리스트 저장에 실패했습니다.');
    }
    return saved.tasks;
  } catch (error) {
    console.error('Error writing user todolist: ', error);
    throw new Error('ToDo 리스트 저장에 실패했습니다.');
  }
}

/**
 * 현재 로그인된 사용자의 friendsList에 친구(상대방 uid)를 추가합니다.
 * @param friendUid - 추가할 친구의 uid
 */
export async function addFriend(friendUid: string) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('친구를 추가하려면 로그인이 필요합니다.');
  }
  try {
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      friendsList: arrayUnion(friendUid),
    });
  } catch (error) {
    console.error('Error adding friend:', error);
    throw new Error('친구 추가에 실패했습니다.');
  }
} 