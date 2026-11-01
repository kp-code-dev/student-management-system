
import { useState } from "react";
import {
  FiSearch,
  FiBell,
  FiChevronDown,
  FiCalendar,
  FiMenu,
  FiX,
} from "react-icons/fi";

function Topbar({ onMenuClick }) {
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between gap-4 border-b border-slate-200/70 bg-white/75 px-5 backdrop-blur-2xl md:px-8">

      {/* Left: Menu + Search */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open navigation"
        >
          <FiMenu size={21} />
        </button>

        <div className="relative w-full max-w-md">
          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students, courses..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-100/70 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>
      </div>

      {/* Right: Date + Notifications + Profile */}
      <div className="flex shrink-0 items-center gap-3">

        <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 xl:flex">
          <FiCalendar className="text-blue-500" />
          {today}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
            aria-label="Notifications"
          >
            <FiBell size={19} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-blue-500" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-14 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">
                  Notifications
                </h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  aria-label="Close notifications"
                  className="text-slate-400 hover:text-slate-700"
                >
                  <FiX />
                </button>
              </div>

              <p className="mt-4 text-sm text-slate-500">
                You're all caught up!
              </p>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-100"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-semibold text-white">
              A
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-slate-800">
                Admin User
              </p>
              <p className="text-[11px] text-slate-500">
                Administrator
              </p>
            </div>

            <FiChevronDown className="hidden text-slate-400 sm:block" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-14 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
              <p className="px-3 py-2 text-sm font-medium text-slate-700">
                Admin Account
              </p>
              <button
                onClick={() => setShowProfile(false)}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-500 hover:bg-slate-100"
              >
                Close menu
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
