"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
        <button onClick={() => signOut()} className="blog-primary-btn">logout</button>
    );
  }
  return <button onClick={() => signIn("github")} className="blog-primary-btn">Login(GiT)</button>;
}
