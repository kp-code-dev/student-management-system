import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FiGrid,
  FiUsers,
  FiBookOpen,
  FiBarChart2,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";

const navigation = [
  {
    title: "WORKSPACE",
    items: [
      { name: "Overview", path: "/dashboard", icon: "dashboard" },
      { name: "Students", path: "/students", icon: "group" },
      { name: "Courses", path: "/courses", icon: "menu_book" },
    ],
  },
  {
    title: "ANALYTICS & MGMT",
    items: [
      { name: "Reports", path: "/reports", icon: "monitoring" },
      { name: "Settings", path: "/settings", icon: "settings" },
    ],
  },
];

function Sidebar({ isMobile = false, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || { name: "Admin User", email: "admin@studenthub.edu" };
    } catch {
      return { name: "Admin User", email: "admin@studenthub.edu" };
    }
  })();

  const asideClasses = isMobile
    ? "h-full w-full frosted-dock rounded-[28px] p-4 flex flex-col justify-between overflow-y-auto"
    : "fixed left-5 top-5 bottom-5 w-[256px] frosted-dock rounded-[32px] z-50 flex flex-col justify-between p-4 transition-all duration-300";

  return (
    <aside className={asideClasses}>
      <div className="flex flex-col">
        {/* App Brand Pill Header */}
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-2.5 shadow-inner">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-indigo-500/30 via-cyan-400/20 to-white/10 p-1.5 shadow-lg backdrop-blur-md">
            <span className="material-symbols-outlined text-2xl text-[#7bd0ff]">
              local_library
            </span>
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
          </div>

          <div className="flex min-w-0 flex-col">
            <span className="flex items-center gap-1.5 text-[15px] font-bold tracking-tight text-white">
              StudentHub
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/20 px-1.5 py-0.5 font-mono text-[9px] text-cyan-300">
                v2.4
              </span>
            </span>
            <span className="truncate text-[11px] font-medium text-slate-400">
              StudentHub Dashboard
            </span>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="space-y-6">
          {navigation.map((group) => (
            <div key={group.title}>
              <div className="mb-2 px-2 font-mono text-[10px] font-semibold tracking-widest text-slate-400/80 uppercase">
                {group.title}
              </div>

              <nav className="flex flex-col gap-1.5">
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/dashboard"}
                    onClick={onClose}
                    className={({ isActive }) =>
                      isActive
                        ? "group flex items-center gap-3 rounded-2xl bg-white/90 px-3.5 py-2.5 font-semibold text-slate-950 shadow-[0_4px_20px_rgba(255,255,255,0.25)] transition-all"
                        : "group flex items-center gap-3 rounded-2xl border border-transparent px-3.5 py-2.5 text-slate-300 transition-all hover:border-white/10 hover:bg-white/[0.08] hover:text-white"
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-xl transition-colors ${
                            isActive
                              ? "bg-slate-900/10 text-slate-950"
                              : "bg-white/[0.04] text-slate-400 group-hover:bg-white/10 group-hover:text-white"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[19px]">
                            {item.icon}
                          </span>
                        </div>
                        <span className="text-[13px] tracking-tight">{item.name}</span>
                        {isActive && (
                          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Role & Version Badge */}
      <div className="mt-6 flex flex-col gap-2.5 pt-3 border-t border-white/10">
        <div className="flex items-center gap-2.5 rounded-2xl border border-indigo-400/25 bg-indigo-500/[0.08] p-3 text-left">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-400">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-white tracking-tight">
              {user.role || "Active Role"}
            </span>
            <span className="text-[10px] text-indigo-300 font-mono font-medium">
              v2.4 Production
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
