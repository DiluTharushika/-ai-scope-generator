export default function Pricing() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-20">
      <h1 className="text-4xl font-bold mb-10">
        💎 Pricing Plans
      </h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl">
        
        {/* Free */}
        <div className="p-8 bg-slate-900 rounded-2xl border border-white/5">
          <h2 className="text-xl font-semibold mb-4">Free</h2>
          <p className="text-3xl font-bold mb-6">$0</p>
          <ul className="space-y-2 text-slate-400">
            <li>✅ 5 Credits</li>
            <li>✅ Basic Templates</li>
          </ul>
        </div>

        {/* Pro */}
        <div className="p-8 bg-slate-900 rounded-2xl border border-purple-500">
          <h2 className="text-xl font-semibold mb-4">Pro</h2>
          <p className="text-3xl font-bold mb-6">$19/month</p>
          <ul className="space-y-2 text-slate-400">
            <li>✅ 200 Credits</li>
            <li>✅ All Templates</li>
            <li>✅ Priority AI</li>
          </ul>
        </div>

        {/* Enterprise */}
        <div className="p-8 bg-slate-900 rounded-2xl border border-white/5">
          <h2 className="text-xl font-semibold mb-4">Enterprise</h2>
          <p className="text-3xl font-bold mb-6">Custom</p>
          <ul className="space-y-2 text-slate-400">
            <li>✅ Unlimited Credits</li>
            <li>✅ Team Access</li>
          </ul>
        </div>

      </div>
    </div>
  );
}