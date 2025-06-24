"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpWithEmail } from "@/lib/backend/auth-actions";
import { getRandomProfileImage } from "@/lib/profile-images";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Register() {
  const [profileImageURL, setProfileImageURL] = useState<string>(
    "/default-profile1.png"
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  useEffect(() => {
    // 클라이언트 사이드에서만 랜덤 이미지 선택
    setProfileImageURL(getRandomProfileImage().src);
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
      setProfileImageURL(imageUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let imageUrl = "";
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch("api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await response.json();
        imageUrl = uploadData.url;
      } catch (error) {
        console.error(error);
        console.log("이미지 업로드 실패");
      }
    }

    try {
      signUpWithEmail({ email, password, username, imageUrl }).then(() => {
        router.push("/");
      });
    } catch (error) {
      console.error(error);
      console.log("회원가입 실패");
    }
  };

  return (
    <main className="grid place-items-center min-h-screen bg-gray-100">
      <div className="w-full place-items-center flex-col">
        <form
          className="grid w-full max-w-sm items-center gap-3 mt-10"
          onSubmit={handleSubmit}
        >
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
              src={profileImageURL}
              alt="프로필 이미지"
              className="w-30 h-30 rounded-full mb-4 cursor-pointer hover:opacity-80"
              onClick={handleImageClick}
            />
          </div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter email"
            className="bg-white h-10"
          />
          <Label htmlFor="username">Username</Label>
          <Input
            type="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="enter username"
            className="bg-white h-10"
          />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter password"
            className="bg-white h-10"
          />
          <Button
            variant={"outline"}
            className="w-full mt-5 h-10 bg-green-500 text-white"
            type="submit"
          >
            Sign Up
          </Button>

          <Label className="text-xs text-muted-foreground">{`Already have an account?`}</Label>
          <Button
            variant={"outline"}
            className="w-full h-10 bg-blue-500 text-white"
            onClick={() => router.push("/login")}
          >
            Log In
          </Button>
        </form>
      </div>
    </main>
  );
}
