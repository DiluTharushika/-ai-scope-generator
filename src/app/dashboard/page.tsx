"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
} from "firebase/firestore";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  const [copied, setCopied] = useState(false);

  // ✅ Load User + History
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

        // ✅ Load History
        const q = query(
          collection(db, "scopes"),
          where("userId", "==", firebaseUser.uid),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);
        const scopes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setHistory(scopes);
      } catch (err) {
        console.error("Error loading user data:", err);
      }

      setLoadingUser(false);
    });

    return () => unsubscribe();
  }, [router]);

  // ✅ Generate Scope
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

      // ✅ Deduct credit
      const newCredits = credits - 1;
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { credits: newCredits });
      setCredits(newCredits);

      // ✅ Save to history
      const docRef = await addDoc(collection(db, "scopes"), {
        userId: user.uid,
        idea,
        result: data.result,
        createdAt: serverTimestamp(),
      });

      setHistory([
        {
          id: docRef.id,
          idea,
          result: data.result,
          createdAt: new Date(),
        },
        ...history,
      ]);
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

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-[#050511] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050511] text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 bg-slate-900/60 backdrop-blur-md border-b border-white/5">
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
        className="max-w-4xl mx-auto px-6 py-16"
      >
        {/* Input Card */}
        <div className="bg-slate-900/70 backdrop-blur-xl p-8 rounded-2xl border border-white/5 shadow-2xl mb-8">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            rows={6}
            placeholder="Describe your project idea..."
            className="w-full p-4 rounded-xl bg-slate-950 border border-white/10 focus:border-blue-400 outline-none resize-none text-white"
          />

          {error && (
            <p className="text-red-400 mt-3 text-sm">{error}</p>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading || credits === 0}
            className={`mt-6 w-full py-4 rounded-xl font-bold transition ${
              loading || credits === 0
                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02]"
            }`}
          >
            {loading ? "Generating..." : "🚀 Generate Scope (1 credit)"}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="bg-slate-900/80 p-8 rounded-2xl border border-blue-400/20 mb-12">
            <div className="flex justify-between mb-6">
              <h3 className="text-green-400 font-semibold">
                ✅ Generated Scope
              </h3>
              <button
                onClick={handleCopy}
                className="text-sm text-blue-400 hover:underline"
              >
                {copied ? "✅ Copied!" : "📋 Copy"}
              </button>
            </div>

            <div className="whitespace-pre-wrap text-slate-300">
              {result}
            </div>
          </div>
        )}

        {/* ✅ History Section */}
        {history.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-6 text-purple-400">
              📂 Previous Scopes
            </h2>

            <div className="space-y-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-xl bg-slate-900/70 border border-white/5 hover:border-purple-500/30 transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs text-slate-500">
                      {item.createdAt?.toDate?.().toLocaleString() || "Recent"}
                    </p>

                    <button
                      onClick={async () => {
                        await deleteDoc(doc(db, "scopes", item.id));
                        setHistory(
                          history.filter((h) => h.id !== item.id)
                        );
                      }}
                      className="text-red-400 text-xs hover:underline"
                    >
                      Delete
                    </button>
                  </div>

                  <p
                    onClick={() => setResult(item.result)}
                    className="text-slate-300 font-medium cursor-pointer hover:text-blue-400"
                  >
                    {item.idea.slice(0, 80)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}