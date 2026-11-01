
import { useState } from "react";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiBookOpen,
  FiShield,
} from "react-icons/fi";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handles login form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Checks whether email and password are entered.
    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password.");
      return;
    }

    try {
      // Sends login details to the Spring Boot backend.
      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      // Converts the backend response into JSON.
      const data = await response.json();

      // Handles login errors returned by the backend.
      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password.");
      }

      // Stores the JWT token received from the backend.
      localStorage.setItem("token", data.token);

      // Stores logged-in user details.
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
        })
      );

      // Marks the user as authenticated.
      localStorage.setItem("isAuthenticated", "true");

      // Redirects to the dashboard after successful login.
      window.location.href = "/dashboard";

    } catch (error) {
      // Displays login errors.
      alert(error.message || "Unable to connect to the server.");
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080b14] px-5 py-10 text-white">

      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md">

        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-lg shadow-violet-500/10 backdrop-blur-xl">
            <FiBookOpen className="text-2xl text-violet-300" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Student<span className="text-violet-400">Hub</span>
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Student Management System
          </p>
        </div>

        {/* Glass Card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-9">

          <div className="mb-8">
            <p className="mb-2 text-sm font-medium text-violet-300">
              WELCOME BACK
            </p>

            <h2 className="text-2xl font-semibold">
              Sign in to your account
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Enter your credentials to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Email Address
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 transition focus-within:border-violet-400/70 focus-within:ring-2 focus-within:ring-violet-500/10">
                <FiMail className="shrink-0 text-gray-500" />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Password
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 transition focus-within:border-violet-400/70 focus-within:ring-2 focus-within:ring-violet-500/10">
                <FiLock className="shrink-0 text-gray-500" />

                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 transition hover:text-white"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Remember */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-gray-400">
                <input
                  type="checkbox"
                  className="accent-violet-500"
                />
                Remember me
              </label>

              <button
                type="button"
                className="text-violet-400 transition hover:text-violet-300"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold shadow-lg shadow-violet-900/30 transition hover:-translate-y-0.5 hover:shadow-violet-700/30"
            >
              Sign In
              <FiArrowRight className="transition group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-7 flex items-center justify-center gap-2 border-t border-white/10 pt-6 text-xs text-gray-500">
            <FiShield className="text-emerald-400" />
            Secure Student Management Portal
          </div>
        </div>

        <p className="mt-7 text-center text-xs text-gray-600">
          © 2026 StudentHub. All rights reserved.
        </p>
      </div>
    </main>
  );
}

export default Login;
