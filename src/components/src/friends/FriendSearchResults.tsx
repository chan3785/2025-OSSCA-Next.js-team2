"use client";

import { useState } from "react";
import FriendCard from "./AddFriendCard";

interface UserResult {
  uid: string;
  name: string;
  email: string;
  profileImage: string | null;
}

interface FriendSearchResultsProps {
  results: UserResult[];
  currentFriends: string[]; // 친구 uid 목록
  currentUserUid: string;
  onAdd: (uid: string) => void;
}

export default function FriendSearchResults({
  results,
  currentFriends,
  currentUserUid,
  onAdd,
}: FriendSearchResultsProps) {
  const [hidden, setHidden] = useState<string[]>([]);

  const visibleResults = results.filter(
    (user) =>
      user.uid !== currentUserUid &&
      !currentFriends.includes(user.uid) &&
      !hidden.includes(user.uid),
  );

  const handleAdd = (uid: string) => {
    onAdd(uid); // 서버 요청
    setHidden((prev) => [...prev, uid]); // UI 제거
  };

  if (visibleResults.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">추가할 수 있는 사용자가 없습니다.</p>
    );
  }

  return (
    <section className="space-y-4">
      {visibleResults.map((user) => (
        <FriendCard
          key={user.uid}
          name={user.name}
          profileImage={user.profileImage}
          onAdd={() => handleAdd(user.uid)}
        />
      ))}
    </section>
  );
}
