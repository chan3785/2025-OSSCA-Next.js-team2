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
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{상대날짜 ? 상대날짜 : "Today"}</CardTitle>
        <CardDescription>
          <DatePicker />
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
