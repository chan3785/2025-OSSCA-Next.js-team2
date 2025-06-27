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
import { toast } from "sonner";
import { auth } from "@/lib/backend/firebase";
import { Task } from "@/lib/type/interface";

export default function ToDoListsDashboard({
  initialTasks,
}: {
  initialTasks: Task[];
}) {
  const [taskList, setTaskList] = useState<Task[]>(initialTasks);
  const [date, setDate] = useState<Date>(new Date());

  const handleTaskDoneChange = (taskId: string, newDoneState: boolean) => {
    setTaskList((prevTaskList) =>
      prevTaskList.map((task) =>
        task.id === taskId ? { ...task, isComplete: newDoneState } : task
      )
    );
    // TODO: DB 업데이트 API 호출 로직 추가
  };
  const user = auth.currentUser;

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

  const handleSaveTodolists = async () => {
    const idToken = await user?.getIdToken();
    try {
      const res = await fetch("api/todo", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskList),
      });
      if (res.ok) {
        toast.success("저장 성공", {
          description: "ToDo 리스트가 저장되었습니다.",
        });
      } else {
        toast.error("저장 실패", {
          description: "서버 오류로 저장에 실패했습니다.",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("에러 발생", {
        description: "클라이언트 오류로 저장에 실패했습니다.",
      });
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex justify-between">
          {getRelativeDate(date)}
          <button onClick={handleSaveTodolists}>Save</button>
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
                <ToDoTask task={task} onDoneChange={handleTaskDoneChange} />
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
