"use client"; // Ensures this runs on the client side

import { useState, useEffect } from "react";
import { auth, onAuthStateChanged, signOut } from "@/lib/firebase";
import Link from "next/link";

console.log("✅ Navbar is being rendered!"); // Debugging message

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      setUser(loggedInUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link href="/" style={{ marginRight: "10px" }}>Home</Link>
      {user ? (
        <>
          <span style={{ marginRight: "10px" }}>Welcome, {user.email}</span>
          <button onClick={handleLogout} style={{ cursor: "pointer", marginLeft: "10px" }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/auth" style={{ marginRight: "10px" }}>Login</Link>
          <Link href="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}