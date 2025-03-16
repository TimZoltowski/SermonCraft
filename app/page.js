export default function Home() {
  return (
    <div className="welcome-container">
      {/* 🔥 Logo Placeholder - Replace with a real logo when available */}
      <img src="https://via.placeholder.com/80" alt="SermonCraft Logo" className="logo" />

      <h1 className="welcome-title">Welcome to SermonCraft</h1>
      <p className="welcome-text">
        Your ultimate assistant for sermon preparation. Study the Word, 
        organize your notes, and craft powerful messages effortlessly.
      </p>

      <div className="welcome-buttons">
        <a href="/auth" className="login">Login</a>
        <a href="/signup" className="signup">Sign Up</a>
      </div>
    </div>
  );
}