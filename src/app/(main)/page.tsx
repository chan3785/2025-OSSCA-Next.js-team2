import { FriendList } from "@/components/src/main/FriendsList";
import LogOut from "@/components/src/main/LogOutButton";
import ToDoListsDashboard from "@/components/src/main/ToDoDashboad";
import { cookies } from "next/headers";
import { getUserTodoList } from "@/lib/backend/read-firebase";

async function fetchTodos() {
  const cookieStore = await cookies();
  const idToken = cookieStore.get("firebase-token")?.value;
  if (!idToken) return [];

  try {
    return await getUserTodoList(idToken);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const Tasks = await fetchTodos();
  return (
    <main className="w-full">
      <FriendList className="w-11/12 ml-6 border-transparent" />
      <article className="flex justify-center mt-5">
        <ToDoListsDashboard initialTasks={Tasks} />
      </article>
      <LogOut />
    </main>
  );
}
