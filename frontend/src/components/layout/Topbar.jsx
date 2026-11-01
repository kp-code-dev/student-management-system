import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function Topbar({ onMenuClick }) {
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || { name: "Admin User", email: "admin@studenthub.edu" };
    } catch {
      return { name: "Admin User", email: "admin@studenthub.edu" };
    }
  })();

  return (
    <header className="frosted-dock relative z-40 flex h-[68px] items-center justify-between rounded-[28px] px-4 md:px-6 shadow-glass">
      {/* Left: Mobile Menu Trigger + Search Capsule */}
      <div className="flex flex-1 items-center gap-3 max-w-xl">
        <button
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:text-white lg:hidden"
          aria-label="Open mobile navigation"
        >
          <FiMenu size={20} />
        </button>

        <div className="relative flex w-full items-center">
          <span className="material-symbols-outlined pointer-events-none absolute left-3.5 text-[19px] text-slate-400">
            search
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students, courses, IDs..."
            className="w-full rounded-full border border-white/[0.12] bg-white/[0.05] py-2 pl-10 pr-16 text-[13px] text-white shadow-inner outline-none transition-all placeholder:text-slate-400 focus:border-cyan-400/50 focus:bg-white/[0.08]"
          />
          <kbd className="pointer-events-none absolute right-3.5 rounded-md border border-white/[0.1] bg-white/[0.08] px-2 py-0.5 font-mono text-[10px] text-slate-300">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls & Pills */}
      <div className="flex items-center gap-2 sm:gap-3 ml-3">
        {/* Term Status Pill */}
        <div className="hidden md:flex items-center gap-2 rounded-full px-3.5 py-1.5 frosted-pill">
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          <span className="text-[12px] font-semibold text-cyan-200">
            Fall Term 2026
          </span>
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="frosted-pill relative flex h-10 w-10 items-center justify-center rounded-full text-slate-200 transition-all hover:scale-105 hover:text-white"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">
              notifications
            </span>
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
          </button>

          {showNotifications && (
            <div className="frosted-dock absolute right-0 top-14 w-80 rounded-2xl p-4 shadow-2xl z-50">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="font-semibold text-sm text-white">Notifications</span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <FiX size={16} />
                </button>
              </div>
              <div className="py-3 text-xs text-slate-300 space-y-2">
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="font-semibold text-cyan-300 block">System Online</span>
                  <span>Database connected to Spring Boot API successfully.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="hidden sm:block h-6 w-[1px] bg-white/15" />

        {/* User Quick Pill Badge */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="frosted-pill flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3 text-left transition-all hover:bg-white/10"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 text-xs font-bold text-white shadow-md">
              {user.name?.charAt(0) || "A"}
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-[12px] font-semibold text-white">
                {user.name}
              </span>
              <span className="text-[10px] text-slate-400">Administrator</span>
            </div>
          </button>

          {showProfile && (
            <div className="frosted-dock absolute right-0 top-14 w-48 rounded-2xl p-2 shadow-2xl z-50">
              <div className="px-3 py-2 text-xs border-b border-white/10">
                <p className="font-semibold text-white truncate">{user.name}</p>
                <p className="text-slate-400 truncate">{user.email}</p>
              </div>
              <a
                href="/settings"
                className="mt-1 block w-full rounded-xl px-3 py-2 text-xs text-slate-300 hover:bg-white/10 hover:text-white"
              >
                Settings
              </a>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  localStorage.removeItem("isAuthenticated");
                  window.location.href = "/login";
                }}
                className="block w-full text-left rounded-xl px-3 py-2 text-xs text-red-400 hover:bg-red-500/20"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
