import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { writeUserData } from './write-firebase';
import { FirebaseError } from 'firebase/app';

interface SignUpForm {
  email: string;
  password: string;
  name: string;
  profileImage?: string;
}

/**
 * 이메일, 비밀번호, 이름, 프로필 이미지로 Firebase에 새 사용자를 생성하고,
 * Firestore에 사용자 프로필 데이터를 저장합니다.
 * @param formData - email, password, name, profileImage를 포함하는 객체
 * @returns 생성된 사용자 객체 (User)
 */
export async function signUpWithEmail(formData: SignUpForm) {
  const { email, password, name, profileImage } = formData;

  try {
    // 1. Firebase Auth에 사용자 생성
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // 2. 생성된 사용자의 프로필 업데이트 (이름, 프로필 이미지 URL)
    await updateProfile(user, {
      displayName: name,
      photoURL: profileImage ? profileImage : "",
    });

    // 3. Firestore의 'users' 컬렉션에 사용자 데이터 저장
    await writeUserData({
      email: user.email!,
      name: user.displayName!,
      profileImage: user.photoURL!,
      friendsList: [], // 초기 친구 목록은 비어있음
    });

    return user;
  } catch (error) {
    // Firebase 에러 타입으로 캐스팅하여 더 구체적인 정보 활용
    const firebaseError = error as FirebaseError;
    console.error(
      'Error signing up:',
      firebaseError.code,
      firebaseError.message
    );
    // 더 구체적인 에러 메시지를 반환하거나 UI에 표시할 수 있습니다.
    throw new Error(`회원가입에 실패했습니다: ${firebaseError.message}`);
  }
}

/**
 * 이메일과 비밀번호로 Firebase에 로그인합니다.
 * @param email - 사용자 이메일
 * @param password - 사용자 비밀번호
 * @returns 로그인된 사용자 객체 (User)
 */
export async function signInWithEmail(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    document.cookie = `firebase-token=${idToken}; path=/; max-age=86400`;
    return userCredential.user;
  } catch (error) {
    const firebaseError = error as FirebaseError;
    console.error(
      'Error signing in:',
      firebaseError.code,
      firebaseError.message
    );
    throw new Error(`로그인에 실패했습니다: ${firebaseError.message}`);
  }
} 