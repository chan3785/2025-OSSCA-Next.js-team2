import { cookies } from "next/headers";
import { getUserData, getUserTodoList, getUserFriendsFromList } from "@/lib/backend/read-firebase";
import HomeClient from "@/components/src/main/HomeClient";

export default async function Home() {
  const cookieStore = cookies();
  const idToken = cookieStore.get("firebase-token")?.value;
  if (!idToken) return <div>로그인이 필요합니다.</div>;

  const userData = await getUserData(idToken);
  const tasks = await getUserTodoList(idToken);
  const friendUids = Array.isArray(userData.friendsList) ? userData.friendsList : [];

  const friends = await getUserFriendsFromList(friendUids);

  const user = {
    id: userData.uid,
    name: userData.name ?? "나",
    profileImage: userData.profileImage ?? null,
    friendsList: friendUids,
  };

  return <HomeClient user={user} friends={friends} initialTasks={tasks} />;
}
