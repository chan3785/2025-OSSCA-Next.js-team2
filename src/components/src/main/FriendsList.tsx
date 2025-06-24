import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRandomProfileImage } from "@/lib/profile-images";

interface FriendListProps {
  user: { id: string; name: string; profileImage: string | null };
  friends: { id: string; name: string; profileImage: string | null }[];
  className?: string;
}

export function FriendList({ user, friends, className }: FriendListProps) {
  const NAME_LENGTH = 6;

  return (
    <ScrollArea className={className ? className : "w-full whitespace-nowrap"}>
      <div className="flex w-max gap-4 p-4">
        {/* 본인 먼저 */}
        <figure key={`user-${user.id}`} className="shrink-0 w-[80px] flex flex-col justify-center">
          <div className="overflow-hidden rounded-md">
            <Avatar className="size-20">
              <AvatarImage src={user.profileImage || getRandomProfileImage().src} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          <figcaption className="text-foreground pt-2 text-xs text-center">
            {user.name.length < NAME_LENGTH ? user.name : user.name.substring(0, 8) + "..."}
          </figcaption>
        </figure>

        {/* 친구 목록 */}
        {friends.map((friend) => (
          <figure
            key={`friend-${friend.id}`}
            className="shrink-0 w-[80px] flex flex-col justify-center"
          >
            <div className="overflow-hidden rounded-md">
              <Avatar className="size-20">
                <AvatarImage
                  src={friend.profileImage || getRandomProfileImage().src}
                  alt={friend.name}
                />
                <AvatarFallback>{friend.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
            <figcaption className="text-foreground pt-2 text-xs text-center">
              {friend.name.length < NAME_LENGTH ? friend.name : friend.name.substring(0, 8) + "..."}
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
