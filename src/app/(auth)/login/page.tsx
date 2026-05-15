"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginWithEmail, loginWithGoogle } from "@/firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

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
        backgroundColor: "#050511",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(167, 139, 250, 0.15) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          backgroundColor: "rgba(30, 41, 59, 0.6)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "24px",
          padding: "3rem",
          width: "100%",
          maxWidth: "440px",
          position: "relative",
          zIndex: 1,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "0.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            🚀 ScopeAI
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ color: "#94a3b8", fontSize: "1.05rem" }}
          >
            Welcome back, visionary
          </motion.p>
        </div>

        {/* Google Login */}
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: "#f8fafc" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{
            width: "100%",
            backgroundColor: "#ffffff",
            color: "#0f172a",
            padding: "0.9rem",
            borderRadius: "12px",
            border: "none",
            fontSize: "1.05rem",
            fontWeight: "600",
            cursor: "pointer",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            transition: "background-color 0.2s",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.89 16.81 15.74 17.58V20.35H19.3C21.38 18.43 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
            <path d="M12 23C14.97 23 17.46 22.02 19.3 20.35L15.74 17.58C14.75 18.25 13.48 18.66 12 18.66C9.13 18.66 6.71 16.73 5.84 14.12H2.16V16.97C4.01 20.64 7.7 23 12 23Z" fill="#34A853"/>
            <path d="M5.84 14.12C5.61 13.46 5.48 12.75 5.48 12C5.48 11.25 5.61 10.54 5.84 9.88V7.03H2.16C1.39 8.56 0.95 10.23 0.95 12C0.95 13.77 1.39 15.44 2.16 16.97L5.84 14.12Z" fill="#FBBC05"/>
            <path d="M12 5.34C13.62 5.34 15.07 5.9 16.21 6.98L19.39 3.8C17.45 1.99 14.97 0.95 12 0.95C7.7 0.95 4.01 3.36 2.16 7.03L5.84 9.88C6.71 7.27 9.13 5.34 12 5.34Z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </motion.button>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.1)" }} />
          <span style={{ color: "#64748b", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px" }}>or</span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.1)" }} />
        </div>

        {/* Email Input */}
        <motion.input
          whileFocus={{ borderColor: "rgba(96, 165, 250, 0.5)", backgroundColor: "rgba(15, 23, 42, 0.8)" }}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.5)",
            color: "white",
            padding: "1rem",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: "1.05rem",
            marginBottom: "1rem",
            boxSizing: "border-box",
            outline: "none",
            transition: "all 0.2s",
          }}
        />

        {/* Password Input */}
        <motion.input
          whileFocus={{ borderColor: "rgba(96, 165, 250, 0.5)", backgroundColor: "rgba(15, 23, 42, 0.8)" }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.5)",
            color: "white",
            padding: "1rem",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: "1.05rem",
            marginBottom: "1.5rem",
            boxSizing: "border-box",
            outline: "none",
            transition: "all 0.2s",
          }}
        />

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: "1.5rem" }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              style={{
                backgroundColor: "rgba(69, 10, 10, 0.4)",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                borderRadius: "10px",
                padding: "0.85rem",
                color: "#fca5a5",
                fontSize: "0.95rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>❌</span> {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          onClick={handleEmailLogin}
          disabled={loading}
          style={{
            width: "100%",
            background: loading 
              ? "rgba(51, 65, 85, 0.5)" 
              : "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
            color: loading ? "#94a3b8" : "white",
            padding: "1rem",
            borderRadius: "12px",
            border: "none",
            fontSize: "1.05rem",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: "2rem",
            transition: "all 0.3s",
            boxShadow: loading ? "none" : "0 8px 20px rgba(124, 58, 237, 0.3)",
          }}
        >
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>⏳</motion.span> Logging in...
            </span>
          ) : "Sign In"}
        </motion.button>

        {/* Register Link */}
        <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "0.95rem" }}>
          Don't have an account?{" "}
          <Link
            href="/register"
            style={{ color: "#60a5fa", textDecoration: "none", fontWeight: "600", transition: "color 0.2s" }}
            onMouseOver={(e) => e.currentTarget.style.color = "#93c5fd"}
            onMouseOut={(e) => e.currentTarget.style.color = "#60a5fa"}
          >
            Sign up free
          </Link>
        </p>
      </motion.div>
    </div>
  );
}