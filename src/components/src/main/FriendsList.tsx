import * as React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface 친구 {
  id: number;
  이름: string;
  프로필사진: string;
}

export const friends: 친구[] = [
  {
    id: 0,
    이름: "나",
    프로필사진:
      "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 1,
    이름: "Tom Byrom",
    프로필사진:
      "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    이름: "Vladimir Malyavko",
    프로필사진:
      "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    이름: "Binni",
    프로필사진:
      "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 4,

    이름: "Tom",
    프로필사진:
      "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 5,

    이름: "Vladimir",
    프로필사진:
      "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
];

export function FriendList({ className }: { className?: string }) {
  const NAME_LENGTH = 6;
  return (
    <ScrollArea
      className={cn("w-96 rounded-md border whitespace-nowrap", className)}
    >
      <div className="flex w-max gap-4 p-4">
        {friends.map((friend) => (
          <figure
            key={friend.id}
            className="shrink-0 w-[80px] flex flex-col justify-center"
          >
            <div className="overflow-hidden rounded-md">
              <Avatar className="size-20">
                <AvatarImage src={friend.프로필사진} alt={friend.이름} />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
            </div>
            <figcaption className="text-foreground pt-2 text-xs text-center">
              {friend.이름.length < NAME_LENGTH
                ? friend.이름
                : friend.이름.substring(0, 5) + "..."}
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
