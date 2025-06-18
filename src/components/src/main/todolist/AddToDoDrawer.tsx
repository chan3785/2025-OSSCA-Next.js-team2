import * as React from "react";

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ToDoFormButton from "./ToDoFormButton";

export function AddToDoDrawer({
  children,
  AddTask,
}: {
  children: React.ReactNode;
  AddTask: (inputTitle: string) => void;
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerTitle className="mb-3">{`Please enter Today's goal!`}</DrawerTitle>
          <ToDoFormButton AddTask={AddTask} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
