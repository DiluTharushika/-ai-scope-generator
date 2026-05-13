"use client";
import { useState } from "react";

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
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#60a5fa",
              marginTop: "1.5rem",
              marginBottom: "0.5rem",
              borderBottom: "1px solid #374151",
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
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#34d399",
              marginTop: "1.2rem",
              marginBottom: "0.4rem",
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
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#fbbf24",
              marginTop: "1rem",
              marginBottom: "0.3rem",
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
              fontSize: "1.1rem",
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
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.5rem",
              marginBottom: "0.3rem",
              paddingLeft: "1rem",
            }}
          >
            <span style={{ color: "#60a5fa", marginTop: "2px" }}>•</span>
            <span style={{ color: "#d1d5db", lineHeight: "1.6" }}>
              {line.replace(/^[-*]\s/, "")}
            </span>
          </div>
        );
      }

      // Bold text **something**
      if (line.includes("**")) {
        const parts = line.split("**");
        return (
          <p key={index} style={{ color: "#d1d5db", marginBottom: "0.3rem", lineHeight: "1.6" }}>
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} style={{ color: "#f9fafb" }}>
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
            color: "#d1d5db",
            marginBottom: "0.3rem",
            lineHeight: "1.6",
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
        backgroundColor: "#0f172a",
        color: "white",
        padding: "2rem",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "2.5rem",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            background: "linear-gradient(to right, #60a5fa, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "0.5rem",
          }}
        >
          AI Scope Generator
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "1rem" }}>
          Turn your idea into a complete project scope document
        </p>
      </div>

      {/* Input Section */}
      <div
        style={{
          maxWidth: "750px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            backgroundColor: "#1e293b",
            borderRadius: "12px",
            padding: "1.5rem",
            marginBottom: "1.5rem",
            border: "1px solid #334155",
          }}
        >
          <label
            style={{
              display: "block",
              color: "#94a3b8",
              marginBottom: "0.75rem",
              fontSize: "0.9rem",
            }}
          >
            💡 Describe your project idea
          </label>

          <textarea
            style={{
              width: "100%",
              backgroundColor: "#0f172a",
              color: "white",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid #334155",
              height: "140px",
              fontSize: "1rem",
              marginBottom: "1rem",
              resize: "vertical",
              outline: "none",
              boxSizing: "border-box",
            }}
            placeholder="e.g. Build a restaurant booking app where users can reserve tables, view menus, and get reminders..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              width: "100%",
              background: loading
                ? "#334155"
                : "linear-gradient(to right, #2563eb, #7c3aed)",
              color: "white",
              padding: "0.85rem",
              borderRadius: "8px",
              border: "none",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "opacity 0.2s",
            }}
          >
            {loading ? "⏳ Generating your scope document..." : "🚀 Generate Scope Document"}
          </button>
        </div>

        {/* Error Box */}
        {error && (
          <div
            style={{
              backgroundColor: "#450a0a",
              border: "1px solid #ef4444",
              borderRadius: "10px",
              padding: "1rem",
              color: "#fca5a5",
              marginBottom: "1.5rem",
            }}
          >
            ❌ {error}
          </div>
        )}

        {/* Loading Animation */}
        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "2rem",
              color: "#94a3b8",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🤖</div>
            <p>AI is analyzing your idea...</p>
            <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>
              This usually takes 10-20 seconds
            </p>
          </div>
        )}

        {/* Result Box */}
        {result && (
          <div
            style={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {/* Result Header */}
            <div
              style={{
                backgroundColor: "#0f172a",
                padding: "1rem 1.5rem",
                borderBottom: "1px solid #334155",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#34d399", fontWeight: "bold" }}>
                ✅ Scope Document Generated
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(result);
                  alert("Copied to clipboard!");
                }}
                style={{
                  backgroundColor: "#1e293b",
                  color: "#94a3b8",
                  border: "1px solid #334155",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                📋 Copy
              </button>
            </div>

            {/* Result Content */}
            <div
              style={{
                padding: "1.5rem",
                lineHeight: "1.7",
              }}
            >
              {formatResult(result)}
            </div>

            {/* Result Footer */}
            <div
              style={{
                borderTop: "1px solid #334155",
                padding: "1rem 1.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#64748b", fontSize: "0.85rem" }}>
                Generated by Groq AI
              </span>
              <button
                onClick={() => {
                  setResult("");
                  setIdea("");
                }}
                style={{
                  backgroundColor: "transparent",
                  color: "#94a3b8",
                  border: "1px solid #334155",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                🔄 Generate New
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}