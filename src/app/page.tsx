import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.2rem 2rem",
          borderBottom: "1px solid #1e293b",
          backgroundColor: "#0f172a",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
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

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link
            href="/dashboard"
            style={{
              color: "#94a3b8",
              textDecoration: "none",
              fontSize: "0.95rem",
            }}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard"
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "0.5rem 1.2rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "0.95rem",
              fontWeight: "bold",
            }}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          textAlign: "center",
          padding: "6rem 2rem 4rem",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "999px",
            padding: "0.4rem 1rem",
            fontSize: "0.85rem",
            color: "#60a5fa",
            marginBottom: "2rem",
          }}
        >
          ✨ Powered by Groq AI
        </div>

        {/* Main Heading */}
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: "bold",
            lineHeight: "1.2",
            marginBottom: "1.5rem",
          }}
        >
          Turn Your Idea Into a{" "}
          <span
            style={{
              background: "linear-gradient(to right, #60a5fa, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Complete Project Scope
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "1.2rem",
            color: "#94a3b8",
            marginBottom: "2.5rem",
            lineHeight: "1.8",
          }}
        >
          Stop wasting hours planning. Our AI generates a full project scope
          document in seconds. Features, tech stack, timeline and more.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/dashboard"
            style={{
              background: "linear-gradient(to right, #2563eb, #7c3aed)",
              color: "white",
              padding: "0.9rem 2rem",
              borderRadius: "10px",
              textDecoration: "none",
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
          >
            🚀 Try It Free
          </Link>
          <a
            href="#how-it-works"
            style={{
              backgroundColor: "#1e293b",
              color: "#94a3b8",
              padding: "0.9rem 2rem",
              borderRadius: "10px",
              textDecoration: "none",
              fontSize: "1.1rem",
              border: "1px solid #334155",
            }}
          >
            See How It Works
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "3rem",
          padding: "3rem 2rem",
          flexWrap: "wrap",
          borderTop: "1px solid #1e293b",
          borderBottom: "1px solid #1e293b",
          backgroundColor: "#0f172a",
        }}
      >
        {[
          { number: "10x", label: "Faster Planning" },
          { number: "100%", label: "AI Powered" },
          { number: "Free", label: "To Get Started" },
        ].map((stat, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                background: "linear-gradient(to right, #60a5fa, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {stat.number}
            </div>
            <div style={{ color: "#64748b", fontSize: "0.95rem" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section
        style={{
          padding: "5rem 2rem",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "3rem",
            color: "#f1f5f9",
          }}
        >
          Everything You Need to Plan Your Project
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
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
            <div
              key={index}
              style={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "12px",
                padding: "1.5rem",
                transition: "border-color 0.2s",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>
                {feature.icon}
              </div>
              <h3
                style={{
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  color: "#f1f5f9",
                }}
              >
                {feature.title}
              </h3>
              <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: "1.6" }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        style={{
          padding: "5rem 2rem",
          backgroundColor: "#1e293b",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "3rem",
            color: "#f1f5f9",
          }}
        >
          How It Works
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
            maxWidth: "800px",
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
            <div
              key={index}
              style={{
                textAlign: "center",
                flex: "1",
                minWidth: "200px",
                maxWidth: "220px",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "linear-gradient(to right, #2563eb, #7c3aed)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  margin: "0 auto 1rem",
                }}
              >
                {step.icon}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#60a5fa",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                STEP {step.step}
              </div>
              <h3
                style={{
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  color: "#f1f5f9",
                }}
              >
                {step.title}
              </h3>
              <p style={{ color: "#64748b", fontSize: "0.9rem" }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          textAlign: "center",
          padding: "6rem 2rem",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "2.2rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            color: "#f1f5f9",
          }}
        >
          Ready to Plan Your Project?
        </h2>
        <p
          style={{
            color: "#94a3b8",
            marginBottom: "2rem",
            fontSize: "1.1rem",
          }}
        >
          Join developers who use ScopeAI to plan faster and build better.
        </p>
        <Link
          href="/dashboard"
          style={{
            background: "linear-gradient(to right, #2563eb, #7c3aed)",
            color: "white",
            padding: "1rem 2.5rem",
            borderRadius: "10px",
            textDecoration: "none",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
        >
          🚀 Start For Free
        </Link>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid #1e293b",
          padding: "2rem",
          textAlign: "center",
          color: "#475569",
          fontSize: "0.9rem",
        }}
      >
        <p>© 2025 ScopeAI. Built with Next.js and Groq AI.</p>
      </footer>
    </div>
  );
}