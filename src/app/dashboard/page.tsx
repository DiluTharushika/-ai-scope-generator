"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setError("");
    setResult("");

    if (!idea.trim()) {
      setError("Please enter a project idea first");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Error response:", text);
        setError("Server error: " + response.status);
        return;
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      setResult(data.result);

    } catch (err) {
      console.error("Fetch error:", err);
      setError("Connection failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Format the result into sections
  const formatResult = (text: string) => {
    const lines = text.split("\n");

    return lines.map((line, index) => {
      // Empty line
      if (line.trim() === "") {
        return <div key={index} style={{ height: "8px" }} />;
      }

      // Main heading (starts with #)
      if (line.startsWith("# ")) {
        return (
          <h1
            key={index}
            style={{
              fontSize: "1.75rem",
              fontWeight: "bold",
              color: "#60a5fa",
              marginTop: "2rem",
              marginBottom: "0.75rem",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              paddingBottom: "0.5rem",
            }}
          >
            {line.replace("# ", "")}
          </h1>
        );
      }

      // Sub heading (starts with ##)
      if (line.startsWith("## ")) {
        return (
          <h2
            key={index}
            style={{
              fontSize: "1.4rem",
              fontWeight: "bold",
              color: "#34d399",
              marginTop: "1.5rem",
              marginBottom: "0.5rem",
            }}
          >
            {line.replace("## ", "")}
          </h2>
        );
      }

      // Sub sub heading (starts with ###)
      if (line.startsWith("### ")) {
        return (
          <h3
            key={index}
            style={{
              fontSize: "1.15rem",
              fontWeight: "bold",
              color: "#fbbf24",
              marginTop: "1.2rem",
              marginBottom: "0.4rem",
            }}
          >
            {line.replace("### ", "")}
          </h3>
        );
      }

      // Number heading like "1. Something"
      if (/^\d+\.\s/.test(line) && line.length < 60) {
        return (
          <h3
            key={index}
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#a78bfa",
              marginTop: "1.2rem",
              marginBottom: "0.4rem",
            }}
          >
            {line}
          </h3>
        );
      }

      // Bullet point
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: Math.min(index * 0.01, 1) }}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
              marginBottom: "0.4rem",
              paddingLeft: "1rem",
            }}
          >
            <span style={{ color: "#60a5fa", marginTop: "2px" }}>•</span>
            <span style={{ color: "#e2e8f0", lineHeight: "1.6" }}>
              {line.replace(/^[-*]\s/, "")}
            </span>
          </motion.div>
        );
      }

      // Bold text **something**
      if (line.includes("**")) {
        const parts = line.split("**");
        return (
          <p key={index} style={{ color: "#e2e8f0", marginBottom: "0.4rem", lineHeight: "1.6" }}>
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} style={{ color: "#ffffff", fontWeight: "600" }}>
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </p>
        );
      }

      // Normal text
      return (
        <p
          key={index}
          style={{
            color: "#cbd5e1",
            marginBottom: "0.5rem",
            lineHeight: "1.7",
          }}
        >
          {line}
        </p>
      );
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#050511",
        color: "white",
        padding: "2rem",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Background Glows */}
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          height: "400px",
          background: "radial-gradient(ellipse at top, rgba(96, 165, 250, 0.15) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(60px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: "center",
            marginBottom: "3rem",
            marginTop: "2rem",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "0.75rem",
              letterSpacing: "-0.02em",
            }}
          >
            AI Scope Generator
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem" }}>
            Turn your idea into a complete project scope document
          </p>
        </motion.div>

        {/* Input Section */}
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              backgroundColor: "rgba(30, 41, 59, 0.5)",
              backdropFilter: "blur(12px)",
              borderRadius: "16px",
              padding: "2rem",
              marginBottom: "2rem",
              border: "1px solid rgba(255,255,255,0.05)",
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
            }}
          >
            <label
              style={{
                display: "block",
                color: "#cbd5e1",
                marginBottom: "1rem",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              <span style={{ marginRight: "8px" }}>💡</span> Describe your project idea
            </label>

            <motion.textarea
              whileFocus={{ borderColor: "rgba(96, 165, 250, 0.5)", boxShadow: "0 0 0 2px rgba(96, 165, 250, 0.2)" }}
              style={{
                width: "100%",
                backgroundColor: "rgba(15, 23, 42, 0.6)",
                color: "white",
                padding: "1.25rem",
                borderRadius: "12px",
                border: "1px solid rgba(51, 65, 85, 0.8)",
                height: "160px",
                fontSize: "1.05rem",
                marginBottom: "1.5rem",
                resize: "vertical",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
                lineHeight: "1.5",
              }}
              placeholder="e.g. Build a restaurant booking app where users can reserve tables, view menus, and get reminders..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
            />

            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              onClick={handleGenerate}
              disabled={loading}
              style={{
                width: "100%",
                background: loading
                  ? "rgba(51, 65, 85, 0.8)"
                  : "linear-gradient(to right, #2563eb, #7c3aed)",
                color: loading ? "#94a3b8" : "white",
                padding: "1rem",
                borderRadius: "12px",
                border: "none",
                fontSize: "1.1rem",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                boxShadow: loading ? "none" : "0 8px 20px rgba(124, 58, 237, 0.2)",
              }}
            >
              {loading ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    style={{ display: "inline-block", fontSize: "1.2rem" }}
                  >
                    ⏳
                  </motion.span>
                  Generating your scope document...
                </div>
              ) : (
                "🚀 Generate Scope Document"
              )}
            </motion.button>
          </motion.div>

          <AnimatePresence>
            {/* Error Box */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: "1.5rem" }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                style={{
                  backgroundColor: "rgba(69, 10, 10, 0.5)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(239, 68, 68, 0.5)",
                  borderRadius: "12px",
                  padding: "1.25rem",
                  color: "#fca5a5",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>❌</span> {error}
              </motion.div>
            )}

            {/* Loading Animation */}
            {loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{
                  textAlign: "center",
                  padding: "3rem",
                  color: "#94a3b8",
                  backgroundColor: "rgba(30, 41, 59, 0.3)",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}
                >
                  🤖
                </motion.div>
                <p style={{ fontSize: "1.2rem", fontWeight: "500", color: "#e2e8f0" }}>AI is analyzing your idea...</p>
                <p style={{ fontSize: "0.95rem", marginTop: "0.75rem", color: "#64748b" }}>
                  This usually takes 10-20 seconds
                </p>
              </motion.div>
            )}

            {/* Result Box */}
            {result && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 50 }}
                style={{
                  backgroundColor: "rgba(30, 41, 59, 0.7)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
                  backdropFilter: "blur(12px)",
                  marginBottom: "4rem",
                }}
              >
                {/* Result Header */}
                <div
                  style={{
                    backgroundColor: "rgba(15, 23, 42, 0.8)",
                    padding: "1.25rem 2rem",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ 
                      width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#34d399",
                      boxShadow: "0 0 10px rgba(52, 211, 153, 0.5)"
                    }} />
                    <span style={{ color: "#f8fafc", fontWeight: "600", fontSize: "1.1rem" }}>
                      Scope Document Generated
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(51, 65, 85, 0.8)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigator.clipboard.writeText(result);
                      alert("Copied to clipboard!");
                    }}
                    style={{
                      backgroundColor: "rgba(30, 41, 59, 0.6)",
                      color: "#e2e8f0",
                      border: "1px solid rgba(255,255,255,0.1)",
                      padding: "0.5rem 1rem",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      transition: "all 0.2s",
                    }}
                  >
                    <span>📋</span> Copy
                  </motion.button>
                </div>

                {/* Result Content */}
                <div
                  style={{
                    padding: "2.5rem",
                    lineHeight: "1.8",
                  }}
                >
                  {formatResult(result)}
                </div>

                {/* Result Footer */}
                <div
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    padding: "1.25rem 2rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "rgba(15, 23, 42, 0.4)",
                  }}
                >
                  <span style={{ color: "#64748b", fontSize: "0.9rem" }}>
                    Generated by Groq AI Model
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05, color: "#f8fafc" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setResult("");
                      setIdea("");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    style={{
                      backgroundColor: "transparent",
                      color: "#94a3b8",
                      border: "1px solid rgba(255,255,255,0.1)",
                      padding: "0.5rem 1rem",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      transition: "all 0.2s",
                    }}
                  >
                    <span>🔄</span> Generate New
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}