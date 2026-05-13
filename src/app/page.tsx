export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          AI Project Scope Generator
        </h1>
        <p className="text-xl text-gray-400 mb-10">
          Turn your project idea into a complete scope document in seconds
        </p>
        <a
          href="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold"
        >
          Get Started Free
        </a>
      </div>
    </main>
  );
}