import { useState } from "react";
import { toast } from "react-toastify";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter institutional email and password.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Invalid credentials or unauthorized.");
      }

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data?.id,
          name: data?.name || "Admin User",
          email: data?.email || email,
          role: data?.role || "ADMIN",
        })
      );
      localStorage.setItem("isAuthenticated", "true");

      toast.success("Welcome back! Login successful.");
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message || "Unable to connect to the authentication server.");
      toast.error(err.message || "Unable to connect to the authentication server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0e17] px-4 py-12 text-[#dfe2ef]">
      {/* Ambient Void Glow Background Elements */}
      <div className="ambient-glow-1 pointer-events-none" />
      <div className="ambient-glow-2 pointer-events-none" />
      <div className="ambient-glow-3 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Header Emblem & Brand Mark */}
        <header className="mb-7 flex flex-col items-center text-center">
          <div className="group relative mb-4 cursor-pointer">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#8083ff]/40 via-[#00a6e0]/30 to-[#c0c1ff]/40 opacity-75 blur-md transition duration-500 group-hover:opacity-100" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border-t border-l border-white/20 bg-[#262a34]/60 text-[#c0c1ff] shadow-xl backdrop-blur-xl">
              <span className="material-symbols-outlined text-[32px] text-[#7bd0ff]">local_library</span>
              <div className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#00a6e0]">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              </div>
            </div>
          </div>

          <h1 className="flex items-center gap-1.5 text-3xl font-extrabold tracking-tight text-[#dfe2ef]">
            <span>Student</span>
            <span className="bg-gradient-to-r from-[#c0c1ff] to-[#7bd0ff] bg-clip-text text-transparent">
              Hub
            </span>
          </h1>

          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-full bg-[#7bd0ff]/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold tracking-widest text-[#7bd0ff] backdrop-blur-sm">
              Glassy OS V5
            </span>
            <span className="text-xs text-[#908fa0]">•</span>
            <p className="text-xs text-[#c7c4d7]">Student Management Portal</p>
          </div>
        </header>

        {/* Floating Glass Auth Pod */}
        <section className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#1c1f29]/70 p-7 shadow-2xl backdrop-blur-2xl sm:p-8">
          {/* Acrylic top specular sheen line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent" />

          {/* Card Inner Header */}
          <div className="mb-6">
            <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#262a34]/80 px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-[#7bd0ff]">
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#7bd0ff]" />
              <span>Welcome Back</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-[#dfe2ef]">
              Sign in to your account
            </h2>
            <p className="mt-1 text-xs text-[#c7c4d7]">
              Enter your credentials to access the academic registry.
            </p>
          </div>

          {error && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
              <span className="material-symbols-outlined text-base text-red-400">error</span>
              <p className="leading-5">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Institutional Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block font-mono text-[11px] font-medium tracking-wide text-[#c7c4d7]"
              >
                Institutional Email
              </label>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#908fa0] transition-colors group-focus-within:text-[#7bd0ff]">
                  <FiMail size={16} />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@studenthub.edu"
                  className="h-11 w-full rounded-xl border border-white/10 bg-[#0a0e17]/70 pl-10 pr-24 text-sm text-[#dfe2ef] outline-none backdrop-blur-md transition-all placeholder:text-[#908fa0]/60 focus:border-[#7bd0ff]/50 focus:bg-[#0a0e17]/90 focus:ring-1 focus:ring-[#7bd0ff]/30"
                />
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <span className="font-mono text-[10px] tracking-wider text-[#908fa0]/60 uppercase">
                    EDU-AUTH
                  </span>
                </div>
              </div>
            </div>

            {/* Access Key / Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block font-mono text-[11px] font-medium tracking-wide text-[#c7c4d7]"
                >
                  Access Key / Password
                </label>
                <button
                  type="button"
                  className="font-mono text-[11px] text-[#7bd0ff] transition hover:text-[#c4e7ff]"
                >
                  Forgot password?
                </button>
              </div>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#908fa0] transition-colors group-focus-within:text-[#7bd0ff]">
                  <FiLock size={16} />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter secure password"
                  className="h-11 w-full rounded-xl border border-white/10 bg-[#0a0e17]/70 pl-10 pr-11 text-sm text-[#dfe2ef] outline-none backdrop-blur-md transition-all placeholder:text-[#908fa0]/60 focus:border-[#7bd0ff]/50 focus:bg-[#0a0e17]/90 focus:ring-1 focus:ring-[#7bd0ff]/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#908fa0] transition hover:text-[#dfe2ef]"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Auxiliary Row */}
            <div className="flex items-center justify-between pt-1">
              <label className="group flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-[#262a34] text-[#8083ff] focus:ring-0 focus:ring-offset-0"
                />
                <span className="text-xs text-[#c7c4d7] transition-colors group-hover:text-[#dfe2ef]">
                  Remember for 30 days
                </span>
              </label>
              <span className="flex items-center gap-1.5 rounded-full bg-[#262a34]/60 px-2 py-0.5 font-mono text-[10px] text-[#908fa0]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7bd0ff]" />
                TLS 1.3
              </span>
            </div>

            {/* Glowing CTA Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="group relative flex h-11 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#8083ff] via-[#c0c1ff] to-[#00a6e0] font-semibold text-[#0d0096] shadow-lg shadow-[#8083ff]/25 transition-all duration-200 hover:shadow-[#8083ff]/45 active:scale-[0.99] disabled:opacity-70"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative z-10 flex items-center gap-1.5 text-sm font-bold">
                  {loading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#0d0096]/30 border-t-[#0d0096]" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      Sign In
                      <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>

          {/* Security micro badge */}
          <div className="mt-6 flex items-center justify-center gap-2 border-t border-white/10 pt-4 text-[11px] text-[#c7c4d7]">
            <FiShield className="text-[#7bd0ff]" />
            <span>Secured with Spring Boot JWT Authentication</span>
          </div>
        </section>

        {/* Global Footer Meta */}
        <footer className="mt-8 text-center text-xs text-[#908fa0]">
          <p>© 2026 StudentHub. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}

export default Login;
