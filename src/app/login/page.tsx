import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <main className="grid place-items-center min-h-screen bg-gray-100">
      <div className="w-full place-items-center flex-col">
        <h1 className="text-4xl text-center">NextToDo</h1>
        <div className="grid w-full max-w-sm items-center gap-3 mt-10">
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
            className="w-full mt-5 h-10 bg-blue-500 text-white"
          >
            Log In
          </Button>
          <Label className="text-xs text-muted-foreground">{`You don't have account?`}</Label>
          <Button
            variant={"outline"}
            className="w-full h-10 bg-green-500 text-white"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </main>
  );
}
