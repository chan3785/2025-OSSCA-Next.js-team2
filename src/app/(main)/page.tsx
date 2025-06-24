"use client";

import { useFriendSearch } from "@/contexts/FriendSearchContext";
import FriendSearchResults from "@/components/src/friends/FriendSearchResults";
import { FriendList } from "@/components/src/main/FriendsList";
import ToDoListsDashboard from "@/components/src/main/ToDoDashboad";
import LogOut from "@/components/src/main/LogOutButton";

export default function Home() {
  const { keyword, results } = useFriendSearch();

  const handleAddFriend = async (uid: string) => {
    const formData = new FormData();
    formData.append("friendUid", uid);
    await fetch("/api/friend", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <main className="w-full p-4 space-y-6">
      {keyword.trim() ? (
        <FriendSearchResults results={results} onAdd={handleAddFriend} />
      ) : (
        <>
          <FriendList className="w-11/12 ml-6 border-transparent" />
          <article className="flex justify-center mt-5">
            <ToDoListsDashboard />
          </article>
        </>
      )}
      <LogOut />
    </main>
  );
}
