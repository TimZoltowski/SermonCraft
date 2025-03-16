"use client";
import { useState, useEffect } from "react";
import { auth, onAuthStateChanged, signOut } from "@/lib/firebase";
import Link from "next/link";
import "../app/globals.css"; // ✅ Import the global CSS file

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
    <nav className="navbar">
      <Link href="/">SermonCraft</Link>
      <div>
        {user ? (
          <>
            <span>Welcome, {user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/auth">Login</Link>
            <Link href="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}