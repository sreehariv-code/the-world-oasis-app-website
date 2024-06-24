"use client";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface CounterProps {
  users?: User[];
}

export default function Counter({ users }: CounterProps) {
  const [count, setCount] = useState<number>(0);

  if (!users) {
    return <p>Loading....</p>;
  }

  return (
    <div>
      <p>There are {users.length} users</p>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </div>
  );
}
