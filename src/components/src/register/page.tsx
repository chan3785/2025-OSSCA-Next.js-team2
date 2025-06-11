"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getRandomProfileImage } from "@/lib/profile-images";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Register() {
  const [profileImage, setProfileImage] = useState<{
    src: string;
    width: number;
    height: number;
  }>({
    src: "/default-profile1.png",
    width: 50,
    height: 50,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 클라이언트 사이드에서만 랜덤 이미지 선택
    setProfileImage(getRandomProfileImage());
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // 선택된 파일을 URL로 변환하여 미리보기
      const imageUrl = URL.createObjectURL(file);
      setProfileImage({ src: imageUrl, width: 50, height: 50 });
    }
  };

  return (
    <main className="grid place-items-center min-h-screen bg-gray-100">
      <div className="w-full place-items-center flex-col">
        <div className="grid w-full max-w-sm items-center gap-3 mt-10">
          <div className="flex flex-col items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <Image
              width={50}
              height={50}
              src={profileImage.src}
              alt="프로필 이미지"
              className="w-30 h-30 rounded-full mb-4 cursor-pointer hover:opacity-80"
              onClick={handleImageClick}
            />
          </div>
          <Label htmlFor="username">Username</Label>
          <Input
            type="username"
            id="username"
            placeholder="enter username"
            className="bg-white h-10"
          />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="enter password"
            className="bg-white h-10"
          />
          <Button
            variant={"outline"}
            className="w-full mt-5 h-10 bg-green-500 text-white"
          >
            Sign Up
          </Button>
          <Label className="text-xs text-muted-foreground">{`Already have an account?`}</Label>
          <Button
            variant={"outline"}
            className="w-full h-10 bg-blue-500 text-white"
          >
            Log In
          </Button>
        </div>
      </div>
    </main>
  );
}
