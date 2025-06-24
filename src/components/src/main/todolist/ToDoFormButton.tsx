"use client";

import { Button } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";

export default function ToDoFormButton({
  AddTask,
}: {
  AddTask: (inputTitle: string) => void;
}) {
  const [input, setInput] = useState("");

  const handleSubmitTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    AddTask(input);
    // try {
    //   const response = await fetch("/api/todo", {
    //     method: "POST",
    //     body: JSON.stringify({ input }),
    //   });
    //   if (!response.ok) {
    //     throw new Error("Failed to add todo");
    //   }
    //   const data = await response.json();
    //   console.log(data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <form className="flex gap-2 mb-5" onSubmit={handleSubmitTodo}>
      <Input
        placeholder="Enter your task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <DrawerClose asChild>
        <Button type="submit">
          <Send />
        </Button>
      </DrawerClose>
    </form>
  );
}
