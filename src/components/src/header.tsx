import { PlusCircleIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="min-w-screen p-6">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-semibold">Next ToDo</div>
        <PlusCircleIcon className="cursor-pointer hover:opacity-80" size={30} />
      </div>
    </header>
  );
}
