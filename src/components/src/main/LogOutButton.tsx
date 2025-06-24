"use client";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/backend/firebase";

export default function LogOut() {
  const handleLogOut = async () => {
    // 1. Firebase에서 로그아웃
    auth
      .signOut()
      .then(() => {
        // 2. 쿠키 삭제 (max-age=0으로 설정)
        document.cookie = "firebase-token=; path=/; max-age=0";
        // 3. 페이지 새로고침
        window.location.reload();
      })
      .catch((error) => {
        console.error("로그아웃 실패:", error);
      });
  };
  if (auth.currentUser) {
    return (
      <Button variant="secondary" onClick={handleLogOut}>
        로그아웃
      </Button>
    );
  } else {
    return <></>;
  }
}
