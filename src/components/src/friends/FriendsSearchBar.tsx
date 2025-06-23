"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeftCircle, PlusCircle } from "lucide-react";
import { useState } from "react";

function SearchToggleButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      className={`bg-transparent text-black hover:bg-transparent border-none transition-all duration-500 ${
        isOpen ? "rotate-180" : ""
      }`}
      variant={"ghost"}
      size={"icon"}
      onClick={onClick}
    >
      {isOpen ? (
        <ChevronLeftCircle className="h-5 w-5" />
      ) : (
        <PlusCircle className="h-5 w-5" />
      )}
    </Button>
  );
}

function SearchInput({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? "w-full opacity-100" : "w-0 opacity-0"
      }`}
    >
      <Input type="search" placeholder="Search..." className="w-full" />
    </div>
  );
}

function Title({ isOpen }: { isOpen: boolean }) {
  if (isOpen) return null;
  return <h1 className="text-2xl font-semibold">Next ToDo</h1>;
}

export default function FriendsSearchbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <Title isOpen={isSearchOpen} />
      <div className={`flex justify-end ${isSearchOpen ? "w-full" : ""}`}>
        <SearchToggleButton
          isOpen={isSearchOpen}
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        />
        <SearchInput isOpen={isSearchOpen} />
      </div>
    </div>
  );
}
