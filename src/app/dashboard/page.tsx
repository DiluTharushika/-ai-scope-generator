"use client";
import { useState } from "react";

export default function Dashboard() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea }),
    });
    const data = await response.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="max-w-2xl mx-auto">
        <textarea
          className="w-full bg-gray-800 rounded-lg p-4 text-white h-40 mb-4"
          placeholder="Describe your project idea..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold"
        >
          {loading ? "Generating..." : "Generate Scope Document"}
        </button>

        {result && (
          <div className="mt-8 bg-gray-800 rounded-lg p-6 whitespace-pre-wrap">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}