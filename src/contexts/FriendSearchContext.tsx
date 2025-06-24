"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface UserResult {
  uid: string;
  name: string;
  email: string;
  profileImage: string | null;
}

interface FriendSearchContextProps {
  results: UserResult[];
  setResults: (r: UserResult[]) => void;
  keyword: string;
  setKeyword: (k: string) => void;
}

const FriendSearchContext = createContext<FriendSearchContextProps | undefined>(undefined);

export function FriendSearchProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<UserResult[]>([]);
  const [keyword, setKeyword] = useState("");

  return (
    <FriendSearchContext.Provider value={{ results, setResults, keyword, setKeyword }}>
      {children}
    </FriendSearchContext.Provider>
  );
}

export function useFriendSearch() {
  const ctx = useContext(FriendSearchContext);
  if (!ctx) throw new Error("useFriendSearch must be used within Provider");
  return ctx;
}
