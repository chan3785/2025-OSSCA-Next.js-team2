"use client";
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

export interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export default function ToDoListsDashboard() {
  const [taskList, setTaskList] = useState<Task[]>([]);

  const AddTask = (inputTitle: string) => {
    setTaskList((prev) => [
      ...prev,
      {
        id: (prev?.length + 1).toString(),
        title: inputTitle,
        isComplete: false,
      },
    ]);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Today</CardTitle>
        <CardDescription>
          <DatePicker />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {taskList.length > 0 ? (
          taskList.map((task) => <ToDoTask key={task.id} task={task} />)
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
