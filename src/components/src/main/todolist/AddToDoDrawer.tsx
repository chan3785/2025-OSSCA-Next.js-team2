import * as React from "react";

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ToDoFormButton from "./FormButton";

export function AddToDoDrawer({ children }: { children: React.ReactNode }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerTitle>{`Please enter Today's goal!`}</DrawerTitle>
          <ToDoFormButton />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
