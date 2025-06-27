// 모든 export interface를 한 곳에 모아 export

// src/lib/backend/write-firebase.ts
export interface UserData {
  email: string;
  name: string;
  profileImage: string | null;
  friendsList: string[];
}
export type UserWithId = UserData & { id: string };


// src/app/(main)/page.tsx
export interface friendsProps {
  id: string;
  name: string;
  profileImage: string | null;
} 

export interface Task {
    id: string;
    title: string;
    isComplete: boolean;
    createdAt: string;
  }