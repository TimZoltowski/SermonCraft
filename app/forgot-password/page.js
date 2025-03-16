"use client";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import "../globals.css"; // ✅ Import global styles

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("A password reset email has been sent.");
    } catch (err) {
      setError("Failed to send reset email. Please check your email and try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Forgot Your Password?</h2>
      <p className="auth-subtitle">Enter your email to reset your password.</p>

      {message && <p className="auth-message">{message}</p>}
      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleReset} className="auth-form">
        <input
          type="email"
          placeholder="Enter your email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="auth-button">
          Send Reset Email
        </button>
      </form>

      <p className="auth-footer">
        Remember your password? <a href="/auth">Log in here</a>
      </p>
    </div>
  );
}