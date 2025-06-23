"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import ToDoTask from "./ToDoTask";
import { AddToDoDrawer } from "./todolist/AddToDoDrawer";
import { DatePicker } from "./DatePicker";
import { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export interface Task {
  id: string;
  title: string;
  isComplete: boolean;
  createdAt: string;
}

export default function ToDoListsDashboard() {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const AddTask = (inputTitle: string) => {
    setTaskList((prev) => [
      ...prev,
      {
        id: (prev?.length + 1).toString(),
        title: inputTitle,
        isComplete: false,
        createdAt: date.toLocaleDateString("ko-KR", {
          month: "short",
          day: "2-digit",
        }),
      },
    ]);
  };

  const DeleteTask = (id: string) => {
    setTaskList((prev) => prev.filter((task) => task.id !== id));
  };

  const getRelativeDate = (date?: Date) => {
    if (!date) return "Today";
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";
    if (diffDays > 0) return `In ${diffDays} days`;
    return `${Math.abs(diffDays)} days ago`;
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex justify-between">
          {getRelativeDate(date)}
          <button
            onClick={() => {
              console.log("saved!");
            }}
          >
            Save
          </button>
        </CardTitle>
        <CardDescription>
          <DatePicker date={date} setDate={setDate} />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {taskList.length > 0 ? (
          taskList.map((task) => (
            <ContextMenu key={task.id}>
              <ContextMenuTrigger>
                <ToDoTask task={task} />
              </ContextMenuTrigger>
              <ContextMenuContent className="w-52">
                <ContextMenuItem inset onSelect={() => DeleteTask(task.id)}>
                  Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))
        ) : (
          <div className="text-center text-muted-foreground italic">
            {`Add Today's Task!`}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col mt-5">
        <AddToDoDrawer AddTask={AddTask}>
          <Button variant="outline" className="w-full">
            <Plus /> Add ToDo
          </Button>
        </AddToDoDrawer>
      </CardFooter>
    </Card>
  );
}

// function ToDoContextMenu({ children }: { children: React.ReactNode }) {
//   return (
//     <ContextMenu>
//       <ContextMenuTrigger>{children}</ContextMenuTrigger>
//       <ContextMenuContent className="w-52">
//         <ContextMenuItem inset onClick={}>
//           Delete
//         </ContextMenuItem>
//       </ContextMenuContent>
//     </ContextMenu>
//   );
// }
