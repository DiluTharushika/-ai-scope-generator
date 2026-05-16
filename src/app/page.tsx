"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#050511",
        color: "white",
        fontFamily: "sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "fixed",
          top: "-20%",
          left: "-10%",
          width: "50%",
          height: "50%",
          background: "radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(80px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-20%",
          right: "-10%",
          width: "50%",
          height: "50%",
          background: "radial-gradient(circle, rgba(167, 139, 250, 0.15) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(80px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Navbar */}
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1.2rem 2rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(12px)",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          {/* Logo */}
          <div
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              background: "linear-gradient(to right, #60a5fa, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            🚀 ScopeAI
          </div>

          {/* Nav Links */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Link
              href="/login"
              style={{
                color: "#94a3b8",
                textDecoration: "none",
                fontSize: "0.95rem",
                transition: "color 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "white")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#94a3b8")}
            >
              Login
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/register"
                style={{
                  backgroundColor: "#2563eb",
                  color: "white",
                  padding: "0.5rem 1.2rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  fontWeight: "bold",
                  boxShadow: "0 0 15px rgba(37, 99, 235, 0.4)",
                }}
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section
          style={{
            textAlign: "center",
            padding: "8rem 2rem 6rem",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: "inline-block",
              backgroundColor: "rgba(30, 41, 59, 0.5)",
              border: "1px solid rgba(51, 65, 85, 0.8)",
              backdropFilter: "blur(10px)",
              borderRadius: "999px",
              padding: "0.4rem 1rem",
              fontSize: "0.85rem",
              color: "#60a5fa",
              marginBottom: "2rem",
              boxShadow: "0 0 20px rgba(96, 165, 250, 0.1)",
            }}
          >
            ✨ Powered by Groq AI
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: "4rem",
              fontWeight: "bold",
              lineHeight: "1.2",
              marginBottom: "1.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Turn Your Idea Into a{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Complete Project Scope
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontSize: "1.25rem",
              color: "#94a3b8",
              marginBottom: "3rem",
              lineHeight: "1.8",
              maxWidth: "600px",
              margin: "0 auto 3rem",
            }}
          >
            Stop wasting hours planning. Our AI generates a full project scope
            document in seconds. Features, tech stack, timeline and more.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              display: "flex",
              gap: "1.5rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {/* Primary CTA - Register */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/register"
                style={{
                  background: "linear-gradient(to right, #2563eb, #7c3aed)",
                  color: "white",
                  padding: "1rem 2.5rem",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  display: "inline-block",
                  boxShadow: "0 10px 25px rgba(124, 58, 237, 0.3)",
                }}
              >
                🚀 Try It Free
              </Link>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="#how-it-works"
                style={{
                  backgroundColor: "rgba(30, 41, 59, 0.4)",
                  backdropFilter: "blur(10px)",
                  color: "#e2e8f0",
                  padding: "1rem 2.5rem",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontSize: "1.1rem",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  display: "inline-block",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(30, 41, 59, 0.8)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(30, 41, 59, 0.4)")
                }
              >
                See How It Works
              </a>
            </motion.div>
          </motion.div>

          {/* Already have account link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              marginTop: "2rem",
              color: "#64748b",
              fontSize: "0.95rem",
            }}
          >
            Already have an account?{" "}
            <Link
              href="/login"
              style={{
                color: "#60a5fa",
                textDecoration: "none",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              Sign In →
            </Link>
          </motion.p>
        </section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "4rem",
            padding: "4rem 2rem",
            flexWrap: "wrap",
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            backgroundColor: "rgba(15, 23, 42, 0.3)",
            backdropFilter: "blur(10px)",
          }}
        >
          {[
            { number: "10x", label: "Faster Planning" },
            { number: "100%", label: "AI Powered" },
            { number: "Free", label: "To Get Started" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              style={{ textAlign: "center" }}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  fontWeight: "900",
                  background: "linear-gradient(to bottom right, #60a5fa, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "0.5rem",
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  color: "#94a3b8",
                  fontSize: "1rem",
                  fontWeight: "500",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Features Section */}
        <section
          style={{
            padding: "8rem 2rem",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "4rem",
              color: "#f8fafc",
            }}
          >
            Everything You Need to Plan Your Project
          </motion.h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                icon: "🎯",
                title: "Project Overview",
                desc: "Get a clear summary of your entire project with goals and objectives",
              },
              {
                icon: "⚡",
                title: "Key Features List",
                desc: "AI identifies the most important features your project needs",
              },
              {
                icon: "🛠️",
                title: "Tech Stack",
                desc: "Get recommendations on the best technologies for your project",
              },
              {
                icon: "🗄️",
                title: "Database Design",
                desc: "Understand what data you need to store and how to structure it",
              },
              {
                icon: "📅",
                title: "Timeline",
                desc: "Realistic development timeline broken into phases",
              },
              {
                icon: "🔌",
                title: "API Requirements",
                desc: "Know exactly what APIs and integrations your project needs",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 30px -10px rgba(96, 165, 250, 0.2)",
                }}
                style={{
                  backgroundColor: "rgba(30, 41, 59, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "16px",
                  padding: "2rem",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    fontSize: "2.5rem",
                    marginBottom: "1rem",
                    filter: "drop-shadow(0 0 10px rgba(255,255,255,0.2))",
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    marginBottom: "0.75rem",
                    color: "#f1f5f9",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: "1rem",
                    lineHeight: "1.6",
                  }}
                >
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          style={{
            padding: "8rem 2rem",
            backgroundColor: "rgba(15, 23, 42, 0.5)",
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "4rem",
              color: "#f8fafc",
            }}
          >
            How It Works
          </motion.h2>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "3rem",
              flexWrap: "wrap",
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            {[
              {
                step: "1",
                title: "Enter Your Idea",
                desc: "Describe your project idea in plain English",
                icon: "💡",
              },
              {
                step: "2",
                title: "AI Analyzes",
                desc: "Groq AI processes and plans your project",
                icon: "🤖",
              },
              {
                step: "3",
                title: "Get Your Scope",
                desc: "Receive a complete project scope document",
                icon: "📄",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                style={{
                  textAlign: "center",
                  flex: "1",
                  minWidth: "220px",
                  maxWidth: "260px",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    margin: "0 auto 1.5rem",
                    boxShadow: "0 0 30px rgba(124, 58, 237, 0.4)",
                    border: "2px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {step.icon}
                </motion.div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#60a5fa",
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                  }}
                >
                  STEP {step.step}
                </div>
                <h3
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    marginBottom: "0.75rem",
                    color: "#f1f5f9",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section
          style={{
            textAlign: "center",
            padding: "8rem 2rem",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: "rgba(30, 41, 59, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              padding: "4rem 2rem",
              borderRadius: "24px",
              boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
            }}
          >
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                color: "#f8fafc",
              }}
            >
              Ready to Plan Your Project?
            </h2>
            <p
              style={{
                color: "#94a3b8",
                marginBottom: "3rem",
                fontSize: "1.2rem",
              }}
            >
              Join developers who use ScopeAI to plan faster and build better.
            </p>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/register"
                  style={{
                    background: "linear-gradient(to right, #2563eb, #7c3aed)",
                    color: "white",
                    padding: "1.2rem 3rem",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    display: "inline-block",
                    boxShadow: "0 10px 25px rgba(124, 58, 237, 0.3)",
                  }}
                >
                  🚀 Start For Free
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/login"
                  style={{
                    backgroundColor: "rgba(30, 41, 59, 0.6)",
                    color: "#e2e8f0",
                    padding: "1.2rem 3rem",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    display: "inline-block",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  Sign In
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            padding: "2rem",
            textAlign: "center",
            color: "#475569",
            fontSize: "0.95rem",
            backgroundColor: "rgba(15, 23, 42, 0.8)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "1rem" }}>
            <Link href="/login" style={{ color: "#64748b", textDecoration: "none" }}>
              Login
            </Link>
            <Link href="/register" style={{ color: "#64748b", textDecoration: "none" }}>
              Register
            </Link>
            <Link href="/dashboard" style={{ color: "#64748b", textDecoration: "none" }}>
              Dashboard
            </Link>
          </div>
          <p>© 2025 ScopeAI. Built with Next.js and Groq AI.</p>
        </footer>
      </div>
    </div>
  );
}