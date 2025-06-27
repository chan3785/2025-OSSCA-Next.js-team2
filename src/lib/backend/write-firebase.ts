import adminDb, { adminAuth } from './firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

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
 * idToken을 검증하여 uid를 얻고, 해당 사용자의 프로필 데이터를 Firestore에 저장 (생성 또는 덮어쓰기)
 * @param idToken - 현재 로그인된 사용자의 idToken
 * @param userData - 저장할 유저 프로필 데이터 (일부 필드만 업데이트 가능)
 */
export async function writeUserData(idToken: string, userData: Partial<UserData>) {
  const decoded = await adminAuth.verifyIdToken(idToken);
  try {
    const userRef = adminDb.collection('users').doc(decoded.uid);
    await userRef.set(userData, { merge: true });
  } catch (error) {
    console.error('Error writing user profile: ', error);
    throw new Error('유저 프로필 저장에 실패했습니다.');
  }
}

/**
 * idToken을 검증하여 uid를 얻고, 해당 사용자의 ToDo 리스트 전체를 Firestore에 저장 (생성 또는 덮어쓰기)
 * @param idToken - 현재 로그인된 사용자의 idToken
 * @param tasks - 저장할 ToDo 리스트 배열
 */
export async function writeUserTodoList(idToken: string, tasks: Task[]) {
  const decoded = await adminAuth.verifyIdToken(idToken);
  try {
    const todoRef = adminDb.collection('todolists').doc(decoded.uid);
    await todoRef.set({ tasks });
    // 저장 후 데이터 검증
    const savedSnap = await todoRef.get();
    if (!savedSnap.exists) {
      throw new Error('ToDo 리스트 저장 후 데이터를 찾을 수 없습니다.');
    }
    const saved = savedSnap.data();
    if (!saved?.tasks || !Array.isArray(saved.tasks)) {
      throw new Error('ToDo 리스트 저장에 실패했습니다.');
    }
    return saved.tasks;
  } catch (error) {
    console.error('Error writing user todolist: ', error);
    throw new Error('ToDo 리스트 저장에 실패했습니다.');
  }
}

/**
 * idToken을 검증하여 uid를 얻고, 해당 사용자의 friendsList에 친구(상대방 uid)를 추가합니다.
 * @param idToken - 현재 로그인된 사용자의 idToken
 * @param friendUid - 추가할 친구의 uid
 */
export async function addFriend(idToken: string, friendUid: string) {
  const decoded = await adminAuth.verifyIdToken(idToken);
  try {
    const userRef = adminDb.collection('users').doc(decoded.uid);
    await userRef.update({
      friendsList: FieldValue.arrayUnion(friendUid),
    });
  } catch (error) {
    console.error('Error adding friend:', error);
    throw new Error('친구 추가에 실패했습니다.');
  }
} 