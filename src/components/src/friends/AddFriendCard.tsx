import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import { getRandomProfileImage } from "@/lib/profile-images"; // adjust path as needed

interface FriendCardProps {
  name: string;
  profileImage: string | null;
  onAdd: () => void;
}

export default function FriendCard({ name, profileImage, onAdd }: FriendCardProps) {
  const defaultImage: StaticImageData = getRandomProfileImage();

  return (
    <Card className="flex flex-col items-center p-6 space-y-2 mx-[30px]">
      <div className="w-16 h-16 rounded-full bg-green-200 overflow-hidden flex items-center justify-center">
        {profileImage ? (
          <Image
            src={profileImage}
            alt={name}
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
        ) : (
          <Image
            src={defaultImage}
            alt="기본 프로필 이미지"
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
        )}
      </div>
      <div className="text-center text-sm text-gray-700">{name}</div>
      <Button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-900" onClick={onAdd}>
        + Add Friend
      </Button>
    </Card>
  );
}
