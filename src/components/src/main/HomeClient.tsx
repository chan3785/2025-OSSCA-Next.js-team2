"use client";

import { useFriendSearch } from "@/contexts/FriendSearchContext";
import FriendSearchResults from "@/components/src/friends/FriendSearchResults";
import { FriendList } from "@/components/src/main/FriendsList";
import ToDoListsDashboard from "@/components/src/main/ToDoDashboad";
import LogOut from "@/components/src/main/LogOutButton";
import { friendsProps } from "@/app/(main)/page";
import { Task, UserWithId } from "@/lib/type/interface";

interface HomeClientProps {
  initialTasks: Task[];
  user: UserWithId;
  friends: friendsProps[];
}

export default function HomeClient({
  initialTasks,
  user,
  friends,
}: HomeClientProps) {
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
        <FriendSearchResults
          results={results}
          currentFriends={user.friendsList}
          currentUserUid={user.id}
          onAdd={handleAddFriend}
        />
      ) : (
        <>
          <FriendList user={user} friends={friends} className="w-full" />

          <article className="flex justify-center mt-5">
            <ToDoListsDashboard initialTasks={initialTasks} />
          </article>
        </>
      )}
      <LogOut />
    </main>
  );
}
