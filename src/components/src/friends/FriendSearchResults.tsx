import FriendCard from "./AddFriendCard";

interface UserResult {
  uid: string;
  name: string;
  email: string;
  profileImage: string | null;
}

interface FriendSearchResultsProps {
  results: UserResult[];
  onAdd: (uid: string) => void;
}

export default function FriendSearchResults({ results, onAdd }: FriendSearchResultsProps) {
  return (
    <section className="space-y-4">
      {results.map((user) => (
        <FriendCard key={user.uid} name={user.name} onAdd={() => onAdd(user.uid)} />
      ))}
    </section>
  );
}
