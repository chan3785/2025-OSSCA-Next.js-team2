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
import { AddToDoDrawer } from "./AddToDoDrawer";
import { DatePicker } from "./DatePicker";

export interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

const tasks: Task[] = [
  {
    id: "0",
    title: "Next.js 공부하기",
    isComplete: false,
  },
  {
    id: "1",
    title: "Next.js 공부하기",
    isComplete: false,
  },
  {
    id: "2",
    title: "Next.js 공부하기",
    isComplete: false,
  },
];

export default function ToDoListsDashboard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Today</CardTitle>
        <CardDescription>
          <DatePicker />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {tasks.length > 0 ? (
          tasks.map((task) => <ToDoTask key={task.id} task={task} />)
        ) : (
          <div className="text-center text-muted-foreground italic">
            {`Add Today's Task!`}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col mt-5">
        <AddToDoDrawer>
          <Button variant="outline" className="w-full">
            <Plus /> Add ToDo
          </Button>
        </AddToDoDrawer>
      </CardFooter>
    </Card>
  );
}
