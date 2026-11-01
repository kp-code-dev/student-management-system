import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FiX } from "react-icons/fi";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0a0e17] text-[#dfe2ef]">
      {/* Global Ambient Glow Spheres (Aether Glass aesthetic) */}
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />
      <div className="ambient-glow-3" />

      {/* Floating Frosted Glass Desktop Sidebar Dock */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-[#0a0e17]/80 backdrop-blur-md"
          />

          <div className="absolute left-4 top-4 bottom-4 w-72">
            <div className="relative h-full">
              <Sidebar isMobile onClose={() => setMobileMenuOpen(false)} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation"
                className="absolute right-3 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative z-10 flex min-h-screen flex-col lg:pl-[296px]">
        {/* Floating Topbar */}
        <div className="p-4 md:p-6 pb-0">
          <Topbar onMenuClick={() => setMobileMenuOpen(true)} />
        </div>

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
