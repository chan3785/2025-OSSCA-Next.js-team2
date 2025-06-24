"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeftCircle, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useFriendSearch } from "@/contexts/FriendSearchContext";

function SearchToggleButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <Button
      className={`bg-transparent text-black hover:bg-transparent border-none transition-all duration-500 ${
        isOpen ? "rotate-180" : ""
      }`}
      variant={"ghost"}
      size={"icon"}
      onClick={onClick}
    >
      {isOpen ? <ChevronLeftCircle className="h-5 w-5" /> : <PlusCircle className="h-5 w-5" />}
    </Button>
  );
}

function SearchInput({
  isOpen,
  value,
  onChange,
}: {
  isOpen: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? "w-full opacity-100" : "w-0 opacity-0"
      }`}
    >
      <Input
        type="search"
        placeholder="친구 이름 입력"
        className="w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Title({ isOpen }: { isOpen: boolean }) {
  if (isOpen) return null;
  return <h1 className="text-2xl font-semibold">Next ToDo</h1>;
}

export default function FriendsSearchbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [input, setInput] = useState("");
  const { setKeyword, setResults } = useFriendSearch();

  const handleSearch = async (value: string) => {
    setInput(value);
    setKeyword(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    const formData = new FormData();
    formData.append("name", value);

    const res = await fetch("/api/find-user", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResults(Array.isArray(data) ? data : [data]);
  };

  return (
    <div className="flex justify-between items-center">
      <Title isOpen={isSearchOpen} />
      <div className={`flex justify-end ${isSearchOpen ? "w-full" : ""}`}>
        <SearchToggleButton isOpen={isSearchOpen} onClick={() => setIsSearchOpen(!isSearchOpen)} />
        <SearchInput isOpen={isSearchOpen} value={input} onChange={handleSearch} />
      </div>
    </div>
  );
}
