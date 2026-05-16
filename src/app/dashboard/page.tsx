"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/login");
        setLoadingUser(false);
        return;
      }

      setUser(firebaseUser);

      try {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setCredits(userSnap.data().credits ?? 0);
        } else {
          await setDoc(userRef, {
            email: firebaseUser.email,
            credits: 5,
            createdAt: new Date(),
          });
          setCredits(5);
        }
      } catch (err) {
        console.error("Error loading user data:", err);
      }

      setLoadingUser(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleGenerate = async () => {
    if (!idea.trim()) {
      setError("Please enter your project idea");
      return;
    }

    if (!user || credits === null || credits <= 0) {
      setError("You have no credits left");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Generation failed");
      }

      setResult(data.result);

      const newCredits = credits - 1;
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { credits: newCredits });
      setCredits(newCredits);
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const formatResult = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, index) => {
      const trimmed = line.trim();

      if (!trimmed) {
        return <div key={index} className="h-3" />;
      }

      // Section headings with emojis
      if (
        trimmed.startsWith("🚀") ||
        trimmed.startsWith("📌") ||
        trimmed.startsWith("✨") ||
        trimmed.startsWith("🛠") ||
        trimmed.startsWith("🗄") ||
        trimmed.startsWith("🔌") ||
        trimmed.startsWith("📅") ||
        trimmed.startsWith("📈") ||
        trimmed.startsWith("💡") ||
        trimmed.startsWith("🎯") ||
        trimmed.startsWith("⚡") ||
        trimmed.startsWith("🔐") ||
        trimmed.startsWith("💰") ||
        trimmed.startsWith("📱")
      ) {
        return (
          <div
            key={index}
            className="mt-8 mb-3 text-xl font-bold text-blue-400 border-b border-blue-400/20 pb-2"
          >
            {trimmed}
          </div>
        );
      }

      // Bullet points
      if (trimmed.startsWith("- 🔹") || trimmed.startsWith("🔹")) {
        return (
          <div key={index} className="flex items-start gap-2 my-2 ml-2">
            <span className="text-purple-400 mt-1">🔹</span>
            <span className="text-slate-200 leading-relaxed">
              {trimmed.replace("- 🔹", "").replace("🔹", "").trim()}
            </span>
          </div>
        );
      }

      // Regular bullet
      if (trimmed.startsWith("-")) {
        return (
          <div key={index} className="flex items-start gap-2 my-2 ml-4">
            <span className="text-blue-400 mt-2 text-xs">●</span>
            <span className="text-slate-200 leading-relaxed">
              {trimmed.replace(/^-\s*/, "")}
            </span>
          </div>
        );
      }

      // Bold key label (e.g. "Frontend: Next.js")
      if (trimmed.includes(":") && trimmed.length < 80) {
        const colonIndex = trimmed.indexOf(":");
        const label = trimmed.substring(0, colonIndex);
        const value = trimmed.substring(colonIndex + 1).trim();

        if (value) {
          return (
            <div key={index} className="my-2 ml-4 flex gap-2">
              <span className="text-yellow-400 font-semibold">{label}:</span>
              <span className="text-slate-300">{value}</span>
            </div>
          );
        }
      }

      // Normal paragraph
      return (
        <p key={index} className="text-slate-300 leading-relaxed my-2">
          {trimmed}
        </p>
      );
    });
  };

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-[#050511] flex flex-col items-center justify-center text-white gap-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050511] text-white">
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-5 bg-slate-900/60 backdrop-blur-md border-b border-white/5">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          🚀 ScopeAI
        </h1>

        <div className="flex items-center gap-4">
          <div className="px-4 py-1.5 rounded-full bg-slate-800 border border-blue-400/30 text-blue-400 text-sm font-semibold">
            ⚡ {credits ?? "..."} Credits
          </div>

          <span className="text-slate-400 text-sm hidden md:block">
            {user?.email}
          </span>

          <button
            onClick={handleLogout}
            className="px-4 py-1.5 rounded-lg border border-white/10 hover:border-white/30 text-slate-300 text-sm transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto px-6 py-16"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Generate Your Project Scope
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-lg"
          >
            Describe your idea and let AI generate a professional roadmap.
          </motion.p>
        </div>

        {/* No Credits Warning */}
        {credits === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-center"
          >
            ⚠️ You have no credits left. Please upgrade to continue.
          </motion.div>
        )}

        {/* Input Card */}
        <motion.div
          whileHover={{ scale: 1.005 }}
          className="bg-slate-900/70 backdrop-blur-xl p-8 rounded-2xl border border-white/5 shadow-2xl mb-8"
        >
          <label className="block text-slate-400 text-sm mb-3">
            💡 Describe Your Project Idea
          </label>

          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            rows={6}
            placeholder="Example: Build a restaurant booking app with user accounts, payment integration, admin dashboard and review system..."
            className="w-full p-4 rounded-xl bg-slate-950 border border-white/10 focus:border-blue-400/50 outline-none resize-none text-white placeholder-slate-500 text-sm leading-relaxed transition"
          />

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 mt-3 text-sm"
            >
              ⚠️ {error}
            </motion.p>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading || credits === 0}
            className={`mt-6 w-full py-4 rounded-xl font-bold text-base transition-all duration-300
              ${
                loading || credits === 0
                  ? "bg-slate-700/60 text-slate-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:scale-[1.02] shadow-lg shadow-purple-900/30 text-white"
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating your scope...
              </span>
            ) : (
              "🚀 Generate Scope (1 credit)"
            )}
          </button>
        </motion.div>

        {/* Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-blue-400/20 shadow-2xl overflow-hidden"
          >
            {/* Result Header */}
            <div className="flex justify-between items-center px-8 py-5 border-b border-white/5 bg-slate-800/40">
              <h3 className="text-green-400 font-semibold text-lg flex items-center gap-2">
                ✅ Generated Scope Document
              </h3>

              <button
                onClick={handleCopy}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  copied
                    ? "bg-green-500/20 border border-green-500/40 text-green-400"
                    : "bg-slate-700 border border-white/10 hover:border-white/30 text-slate-300"
                }`}
              >
                {copied ? "✅ Copied!" : "📋 Copy"}
              </button>
            </div>

            {/* Result Body */}
            <div className="px-8 py-6">
              {formatResult(result)}
            </div>

            {/* Result Footer */}
            <div className="px-8 py-4 border-t border-white/5 bg-slate-800/20 flex justify-between items-center">
              <span className="text-slate-500 text-xs">
                Generated by ScopeAI • Powered by Groq
              </span>
              <button
                onClick={handleCopy}
                className="text-blue-400 text-xs hover:underline"
              >
                Copy full document →
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}