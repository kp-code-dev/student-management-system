
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiBookOpen,
  FiBarChart2,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
  FiChevronLeft,
} from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";

const navigation = [
  {
    title: "MAIN MENU",
    items: [
      { name: "Overview", path: "/dashboard", icon: FiGrid },
      { name: "Students", path: "/students", icon: FiUsers },
      { name: "Courses", path: "/courses", icon: FiBookOpen },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { name: "Reports", path: "/reports", icon: FiBarChart2 },
      { name: "Settings", path: "/settings", icon: FiSettings },
    ],
  },
];

function Sidebar() {
  return (
    <aside className="flex h-screen w-[260px] shrink-0 flex-col border-r border-white/10 bg-[#111827]/95 px-5 py-6 text-white backdrop-blur-2xl">

      {/* Brand */}
      <div className="flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 shadow-lg shadow-blue-500/25">
          <LuGraduationCap size={23} />
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Student<span className="text-blue-400">Hub</span>
          </h1>
          <p className="text-[11px] tracking-wide text-slate-400">
            MANAGEMENT PORTAL
          </p>
        </div>
      </div>

      {/* Workspace */}
      <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.04] p-3">
        <p className="text-[10px] font-semibold tracking-widest text-slate-500">
          WORKSPACE
        </p>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/15 text-blue-400">
            <FiBookOpen size={16} />
          </div>
          <div>
            <p className="text-sm font-medium">Main Campus</p>
            <p className="text-[11px] text-slate-400">Academic year 2026</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-9 flex-1 space-y-8">
        {navigation.map((group) => (
          <div key={group.title}>
            <p className="mb-3 px-3 text-[10px] font-semibold tracking-[0.16em] text-slate-500">
              {group.title}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/dashboard"}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all duration-200 ${
                        isActive
                          ? "border border-blue-400/20 bg-blue-500/15 font-semibold text-blue-300 shadow-lg shadow-blue-950/10"
                          : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                      }`
                    }
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Help */}
      <div className="mb-5 rounded-xl border border-blue-400/10 bg-blue-500/[0.07] p-3">
        <div className="flex items-center gap-2 text-blue-300">
          <FiHelpCircle size={17} />
          <span className="text-sm font-medium">Need help?</span>
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-400">
          Manage your academic workspace with ease.
        </p>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3 border-t border-white/10 pt-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 font-semibold">
          A
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">Admin User</p>
          <p className="truncate text-xs text-slate-400">Administrator</p>
        </div>

        <button
          type="button"
          title="Collapse sidebar"
          className="text-slate-400 transition hover:text-white"
        >
          <FiChevronLeft size={18} />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
