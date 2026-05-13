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

      // Check if response is ok
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

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#111827", 
      color: "white", 
      padding: "2rem" 
    }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}>
        AI Project Scope Generator
      </h1>

      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        
        <textarea
          style={{
            width: "100%",
            backgroundColor: "#1f2937",
            color: "white",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid #374151",
            height: "160px",
            fontSize: "1rem",
            marginBottom: "1rem",
            resize: "vertical",
          }}
          placeholder="Describe your project idea... e.g. Build a restaurant booking app"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{
            width: "100%",
            backgroundColor: loading ? "#4b5563" : "#2563eb",
            color: "white",
            padding: "0.75rem",
            borderRadius: "8px",
            border: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "⏳ Generating... Please wait" : "🚀 Generate Scope Document"}
        </button>

        {/* Error Box */}
        {error && (
          <div style={{
            marginTop: "1rem",
            backgroundColor: "#7f1d1d",
            border: "1px solid #ef4444",
            borderRadius: "8px",
            padding: "1rem",
            color: "#fca5a5",
          }}>
            ❌ Error: {error}
          </div>
        )}

        {/* Result Box */}
        {result && (
          <div style={{
            marginTop: "2rem",
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "8px",
            padding: "1.5rem",
            whiteSpace: "pre-wrap",
            lineHeight: "1.8",
            fontSize: "0.95rem",
          }}>
            <h2 style={{ 
              fontSize: "1.2rem", 
              fontWeight: "bold", 
              marginBottom: "1rem",
              color: "#60a5fa" 
            }}>
              ✅ Generated Scope Document
            </h2>
            {result}
          </div>
        )}

      </div>
    </div>
  );
}