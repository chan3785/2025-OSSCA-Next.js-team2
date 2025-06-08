import { Plus } from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="min-w-screen p-6">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-semibold">Next ToDo</div>
        <Button variant={"ghost"} className="gap-1">
          친구 추가 <Plus />
        </Button>
      </div>
    </header>
  );
}
