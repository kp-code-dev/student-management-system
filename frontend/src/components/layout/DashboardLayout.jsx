
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FiX } from "react-icons/fi";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#edf2f8]">

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          <div className="absolute left-0 top-0 h-full">
            <div className="relative">
              <Sidebar />

              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation"
                className="absolute right-3 top-5 rounded-lg bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="min-w-0 flex-1">
        <Topbar onMenuClick={() => setMobileMenuOpen(true)} />

        <div className="p-5 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
