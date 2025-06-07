"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function DatePicker() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const getFormattedDate = (date?: Date) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    if (date) {
      return `${date.getMonth() + 1}/${date.getDate()} ${
        days[date.getDay()]
      }요일`;
    } else {
      const date = new Date();
      return `${date.getMonth() + 1}/${date.getDate()} ${
        days[date.getDay()]
      }요일`;
    }
  };

  return (
    <div className="flex justify-start mt-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant={"ghost"} className="p-0 h-1.5" id="date">
            {date ? getFormattedDate(date) : getFormattedDate()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
