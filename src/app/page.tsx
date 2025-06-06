import { FriendList } from "@/components/src/main/FriendsList";
import ToDoListsDashboard from "@/components/src/main/ToDoDashboad";

export default function Home() {
  return (
    <main className="w-full">
      <FriendList className="w-11/12 ml-6 border-transparent" />
      <article className="flex justify-center mt-5">
        <ToDoListsDashboard />
      </article>
    </main>
  );
}
