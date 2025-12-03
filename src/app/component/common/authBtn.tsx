"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <span>Hi, {session.user?.email}</span>
        <button onClick={() => signOut()}>Logout</button>
      </>
    );
  }
  return <button onClick={() => signIn("github")} className="blog-primary-btn">GiT</button>;
}
