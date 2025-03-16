"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import "../globals.css"; // ✅ Import global styles

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // ✅ Redirect after signup
    } catch (err) {
      setError("Failed to create account. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Create an Account</h2>
      <p className="auth-subtitle">Join SermonCraft today.</p>

      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleSignup} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="auth-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth-button">
          Sign Up
        </button>
      </form>

      <p className="auth-footer">
        Already have an account? <a href="/auth">Log in here</a>
      </p>
    </div>
  );
}