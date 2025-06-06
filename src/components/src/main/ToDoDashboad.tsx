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

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

const tasks: Task[] = [
  //   {
  //     id: 0,
  //     title: "Next.js 공부하기",
  //     isComplete: false,
  //   },
];

const getFormattedDate = () => {
  const date = new Date();
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${date.getMonth() + 1}/${date.getDate()} ${days[date.getDay()]}요일`;
};

export default function ToDoListsDashboard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Today</CardTitle>
        <CardDescription>{getFormattedDate()}</CardDescription>
      </CardHeader>
      <CardContent>
        {tasks.length > 0 ? (
          tasks.map((task) => <div key={task.id}>todays {task.title}</div>)
        ) : (
          <div className="text-center text-muted-foreground italic">
            {`Add Today's Task!`}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant="outline" className="w-full">
          <Plus /> Add ToDo
        </Button>
      </CardFooter>
    </Card>
  );
}
