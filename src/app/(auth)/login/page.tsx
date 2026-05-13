"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginWithEmail, loginWithGoogle } from "@/firebase/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    setLoading(true);
    const { user, error } = await loginWithEmail(email, password);
    if (error) {
      setError(error);
    } else if (user) {
      router.push("/dashboard");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    const { user, error } = await loginWithGoogle();
    if (error) {
      setError(error);
    } else if (user) {
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#1e293b",
          border: "1px solid #334155",
          borderRadius: "16px",
          padding: "2.5rem",
          width: "100%",
          maxWidth: "420px",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              background: "linear-gradient(to right, #60a5fa, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            🚀 ScopeAI
          </h1>
          <p style={{ color: "#64748b", marginTop: "0.5rem" }}>
            Welcome back
          </p>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{
            width: "100%",
            backgroundColor: "#ffffff",
            color: "#1f2937",
            padding: "0.85rem",
            borderRadius: "8px",
            border: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <span>G</span> Continue with Google
        </button>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ flex: 1, height: "1px", backgroundColor: "#334155" }} />
          <span style={{ color: "#64748b", fontSize: "0.85rem" }}>or</span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#334155" }} />
        </div>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            backgroundColor: "#0f172a",
            color: "white",
            padding: "0.85rem",
            borderRadius: "8px",
            border: "1px solid #334155",
            fontSize: "1rem",
            marginBottom: "1rem",
            boxSizing: "border-box",
            outline: "none",
          }}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            backgroundColor: "#0f172a",
            color: "white",
            padding: "0.85rem",
            borderRadius: "8px",
            border: "1px solid #334155",
            fontSize: "1rem",
            marginBottom: "1.5rem",
            boxSizing: "border-box",
            outline: "none",
          }}
        />

        {/* Error */}
        {error && (
          <div
            style={{
              backgroundColor: "#450a0a",
              border: "1px solid #ef4444",
              borderRadius: "8px",
              padding: "0.75rem",
              color: "#fca5a5",
              fontSize: "0.9rem",
              marginBottom: "1rem",
            }}
          >
            ❌ {error}
          </div>
        )}

        {/* Login Button */}
        <button
          onClick={handleEmailLogin}
          disabled={loading}
          style={{
            width: "100%",
            background: "linear-gradient(to right, #2563eb, #7c3aed)",
            color: "white",
            padding: "0.85rem",
            borderRadius: "8px",
            border: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: "1.5rem",
          }}
        >
          {loading ? "⏳ Logging in..." : "Login"}
        </button>

        {/* Register Link */}
        <p style={{ textAlign: "center", color: "#64748b", fontSize: "0.9rem" }}>
          Don't have an account?{" "}
          <Link
            href="/register"
            style={{ color: "#60a5fa", textDecoration: "none" }}
          >
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}