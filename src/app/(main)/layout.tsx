import Header from "@/components/src/header";
import { Toaster } from "sonner";
import { FriendSearchProvider } from "@/contexts/FriendSearchContext";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <FriendSearchProvider>
      <Header />
      {children}
      <Toaster />
    </FriendSearchProvider>
  );
}
