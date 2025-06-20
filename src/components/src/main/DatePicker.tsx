"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function DatePicker({
  date,
  setDate,
  set상대날짜,
}: {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  set상대날짜: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const [open, setOpen] = React.useState(false);

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
              if (date) {
                setDate(date);
              }
              setOpen(false);
              set상대날짜(getRelativeDate(date));
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
