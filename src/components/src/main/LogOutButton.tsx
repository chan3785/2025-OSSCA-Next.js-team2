"use client";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/backend/firebase";

export default function LogOut() {
  if (auth.currentUser) {
    return (
      <Button variant="secondary" onClick={() => auth.signOut()}>
        로그아웃
      </Button>
    );
  } else {
    return <></>;
  }
}
