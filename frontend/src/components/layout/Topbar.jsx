import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "@/app/providers/ThemeProvider";

const SIDEBAR_PAGES = [
  {
    name: "Overview",
    path: "/dashboard",
    icon: "dashboard",
    group: "WORKSPACE",
    description: "Main dashboard, statistics & performance overview",
  },
  {
    name: "Students",
    path: "/students",
    icon: "group",
    group: "WORKSPACE",
    description: "Matriculated directory, add & manage student records",
  },
  {
    name: "Courses",
    path: "/courses",
    icon: "menu_book",
    group: "WORKSPACE",
    description: "Academic programs, enrolled count & syllabus tracking",
  },
  {
    name: "Reports",
    path: "/reports",
    icon: "monitoring",
    group: "ANALYTICS & MGMT",
    description: "Audit reports, metrics analytics & CSV data export",
  },
  {
    name: "Settings",
    path: "/settings",
    icon: "settings",
    group: "ANALYTICS & MGMT",
    description: "Profile credentials, system preferences & notifications",
  },
];

function Topbar({ onMenuClick }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const inputRef = useRef(null);
  const modalInputRef = useRef(null);

  // Filter sidebar pages based on search input
  const filteredPages = SIDEBAR_PAGES.filter((page) =>
    `${page.name} ${page.group} ${page.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Global Keyboard Shortcut: Control/Command + K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  // Auto focus input when modal opens
  useEffect(() => {
    if (isSearchOpen) {
      setSelectedIndex(0);
      setTimeout(() => {
        modalInputRef.current?.focus();
      }, 50);
    }
  }, [isSearchOpen]);

  // Navigate on Enter / Arrow navigation inside search dialog
  const handleModalKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredPages.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredPages.length - 1
      );
    } else if (e.key === "Enter" && filteredPages[selectedIndex]) {
      e.preventDefault();
      handleSelectPage(filteredPages[selectedIndex].path);
    }
  };

  const handleSelectPage = (path) => {
    setIsSearchOpen(false);
    setSearch("");
    navigate(path);
  };

  const user = (() => {
    try {
      return (
        JSON.parse(localStorage.getItem("user")) || {
          name: "Admin User",
          email: "admin@studenthub.edu",
        }
      );
    } catch {
      return { name: "Admin User", email: "admin@studenthub.edu" };
    }
  })();

  return (
    <>
      <header className="frosted-dock relative z-40 flex h-[68px] items-center justify-between rounded-[28px] px-4 md:px-6 shadow-glass">
        {/* Left: Mobile Menu Trigger + Search Capsule (Clicking opens Universal Search) */}
        <div className="flex flex-1 items-center gap-3 max-w-xl">
          <button
            onClick={onMenuClick}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:text-white lg:hidden"
            aria-label="Open mobile navigation"
          >
            <FiMenu size={20} />
          </button>

          <div
            onClick={() => setIsSearchOpen(true)}
            className="relative flex w-full items-center cursor-pointer group"
          >
            <span className="material-symbols-outlined pointer-events-none absolute left-3.5 text-[19px] text-slate-400 group-hover:text-cyan-300 transition-colors">
              search
            </span>
            <input
              ref={inputRef}
              type="text"
              readOnly
              value={search}
              placeholder="Search sidebar pages... (Press ⌘K or Ctrl+K)"
              className="w-full rounded-full border border-white/[0.12] bg-white/[0.05] py-2 pl-10 pr-16 text-[13px] text-white shadow-inner outline-none transition-all placeholder:text-slate-400 group-hover:border-cyan-400/50 group-hover:bg-white/[0.08] cursor-pointer"
            />
            <kbd className="pointer-events-none absolute right-3.5 rounded-md border border-white/[0.1] bg-white/[0.08] px-2 py-0.5 font-mono text-[10px] text-slate-300 group-hover:border-cyan-400/40 group-hover:text-cyan-200 transition-colors">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Controls & Pills */}
        <div className="flex items-center gap-2 sm:gap-3 ml-3">
          {/* Glass Segmented Pill Switcher (Light / Dark Theme Toggle) */}
          <div className="flex items-center p-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md shadow-inner">
            <button
              type="button"
              onClick={() => toggleTheme("light")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium transition-all cursor-pointer ${
                theme === "light"
                  ? "bg-white text-slate-900 font-semibold shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span className={`material-symbols-outlined text-[16px] ${theme === "light" ? "text-amber-500" : "text-amber-400"}`}>
                light_mode
              </span>
              <span>Light</span>
            </button>

            <button
              type="button"
              onClick={() => toggleTheme("dark")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium transition-all cursor-pointer ${
                theme === "dark"
                  ? "bg-white/20 text-white font-semibold shadow-inner border border-white/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span className={`material-symbols-outlined text-[16px] ${theme === "dark" ? "text-cyan-300" : "text-slate-400"}`}>
                dark_mode
              </span>
              <span>Dark</span>
            </button>
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
              <div className="frosted-dock absolute right-0 top-14 w-80 rounded-2xl p-4 shadow-2xl z-50 bg-[#1c1f29]/95 backdrop-blur-3xl border border-white/20">
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
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="font-semibold text-cyan-300 block mb-1">System Online</span>
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
                <span className="text-[10px] text-slate-400 capitalize">
                  {user.role ? user.role.toLowerCase() : "Admin"}
                </span>
              </div>
            </button>

            {showProfile && (
              <div className="frosted-dock absolute right-0 top-14 w-52 rounded-2xl p-3 shadow-2xl z-50 bg-[#1c1f29]/95 backdrop-blur-3xl border border-white/20">
                <div className="px-2 py-2 text-xs border-b border-white/10">
                  <p className="font-semibold text-white truncate">{user.name}</p>
                  <p className="text-slate-400 truncate">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/settings");
                  }}
                  className="mt-1 block w-full text-left rounded-xl px-3 py-2 text-xs text-slate-300 hover:bg-white/10 hover:text-white"
                >
                  Settings
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    localStorage.removeItem("isAuthenticated");
                    toast.success("Logged out successfully!");
                    navigate("/login");
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

      {/* Universal Command Palette / Search Modal (Triggered by ⌘K / Ctrl+K) */}
      {isSearchOpen && (
        <div
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-[#0a0e17]/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl rounded-3xl border border-white/20 bg-[#1c1f29]/95 p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur-2xl flex flex-col gap-4 overflow-hidden"
          >
            {/* Top Cyan/Indigo Ambient Glow */}
            <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 blur-2xl" />

            {/* Modal Search Input Header */}
            <div className="relative flex items-center border-b border-white/10 pb-3">
              <span className="material-symbols-outlined absolute left-2 text-[22px] text-cyan-300">
                search
              </span>
              <input
                ref={modalInputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleModalKeyDown}
                placeholder="Search sidebar pages (Overview, Students, Courses, Reports, Settings)..."
                className="w-full bg-transparent pl-11 pr-20 text-sm text-white placeholder:text-slate-400 outline-none"
              />
              <div className="absolute right-2 flex items-center gap-1.5">
                <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-slate-300">
                  ESC to close
                </span>
              </div>
            </div>

            {/* Sidebar Pages List */}
            <div className="flex flex-col gap-1 max-h-80 overflow-y-auto py-1">
              <div className="px-2 pb-1.5 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                Sidebar Navigation Pages ({filteredPages.length})
              </div>

              {filteredPages.length === 0 ? (
                <div className="py-10 text-center text-slate-400">
                  <span className="material-symbols-outlined text-3xl text-slate-500 mb-1">
                    search_off
                  </span>
                  <p className="text-xs font-semibold text-slate-300">
                    No matching sidebar page found
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Try searching: Overview, Students, Courses, Reports, or Settings
                  </p>
                </div>
              ) : (
                filteredPages.map((page, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={page.path}
                      onClick={() => handleSelectPage(page.path)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`group flex items-center justify-between rounded-2xl px-3.5 py-3 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-white/15 border border-white/20 shadow-lg text-white"
                          : "hover:bg-white/[0.06] text-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                            isSelected
                              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.3)]"
                              : "bg-white/[0.05] text-slate-400"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {page.icon}
                          </span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white">
                              {page.name}
                            </span>
                            <span className="rounded-full bg-white/[0.06] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-slate-400">
                              {page.group}
                            </span>
                          </div>
                          <span className="truncate text-xs text-slate-400 mt-0.5">
                            {page.description}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 pl-3">
                        {isSelected && (
                          <span className="flex items-center gap-1 font-mono text-[10px] text-cyan-300">
                            <span className="material-symbols-outlined text-[14px]">
                              arrow_forward
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Bottom Keyboard Navigation Helper */}
            <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-slate-400 font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[10px]">↑</kbd>
                  <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[10px]">↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[10px]">↵</kbd>
                  Select
                </span>
              </div>
              <span className="text-cyan-400">Universal Palette</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Topbar;
