"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithEmail } from "@/lib/backend/auth-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        return console.log("이메일과 비밀번호를 모두 입력하세요.");
      }

      const user = await signInWithEmail(email, password);
      if (user) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="grid place-items-center min-h-screen bg-gray-100">
      <div className="w-full place-items-center flex-col">
        <h1 className="text-4xl text-center">NextToDo</h1>
        <form
          className="grid w-full max-w-sm items-center gap-3 mt-10"
          onSubmit={handleSubmit}
        >
          <Label htmlFor="username">Username</Label>
          <Input
            type="username"
            id="username"
            placeholder="enter username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white h-10"
          />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white h-10"
          />
          <Button
            variant={"outline"}
            className="w-full mt-5 h-10 bg-blue-500 text-white"
            type="submit"
          >
            Log In
          </Button>
          <Label className="text-xs text-muted-foreground">{`You don't have account?`}</Label>
          <Button
            variant={"outline"}
            className="w-full h-10 bg-green-500 text-white"
            onClick={() => router.push("/register")}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </main>
  );
}
