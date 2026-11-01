import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageHeader from "@/components/shared/PageHeader";

const DEFAULT_PROFILE = {
  name: "Admin User",
  email: "admin@studenthub.edu",
  institution: "StudentHub University Academy",
  role: "Chief Administrator",
};

function Settings() {
  const [profile, setProfile] = useState(() => {
    try {
      const savedProfile = localStorage.getItem("studenthub_profile");
      const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");
      return savedProfile
        ? { ...DEFAULT_PROFILE, ...loggedUser, ...JSON.parse(savedProfile) }
        : { ...DEFAULT_PROFILE, ...loggedUser };
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [notifications, setNotifications] = useState(() => {
    return localStorage.getItem("studenthub_notifications") !== "false";
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem("studenthub_profile", JSON.stringify(profile));
    localStorage.setItem("studenthub_notifications", String(notifications));
    setSaved(true);
    toast.success("Settings saved successfully!");
  };

  useEffect(() => {
    setSaved(false);
  }, [notifications]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="System & Account Settings"
        description="Manage your administrator profile, system configurations, and security preferences."
      />

      {/* Profile Section */}
      <section className="frosted-panel relative overflow-hidden rounded-3xl p-6">
        <div className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/20 text-cyan-300">
            <span className="material-symbols-outlined text-[20px]">account_circle</span>
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-white">
              Institutional Profile
            </h2>
            <p className="text-xs text-slate-400">
              Personal credentials and organization information
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-300">
              Full Administrator Name
            </label>
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="h-11 w-full rounded-xl border border-white/10 bg-[#0a0e17]/80 px-4 text-xs text-white outline-none focus:border-cyan-400/50"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-300">
              Administrative Email
            </label>
            <input
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="h-11 w-full rounded-xl border border-white/10 bg-[#0a0e17]/80 px-4 text-xs text-white outline-none focus:border-cyan-400/50"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-300">
              Institution Name
            </label>
            <input
              name="institution"
              value={profile.institution}
              onChange={handleChange}
              className="h-11 w-full rounded-xl border border-white/10 bg-[#0a0e17]/80 px-4 text-xs text-white outline-none focus:border-cyan-400/50"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-300">
              Access Role
            </label>
            <input
              name="role"
              value={profile.role}
              onChange={handleChange}
              className="h-11 w-full rounded-xl border border-white/10 bg-[#0a0e17]/80 px-4 text-xs text-white outline-none focus:border-cyan-400/50"
            />
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="frosted-panel rounded-3xl p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-indigo-400/30 bg-indigo-500/20 text-indigo-300">
            <span className="material-symbols-outlined text-[20px]">notifications_active</span>
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-white">
              System Notifications
            </h2>
            <p className="text-xs text-slate-400">
              Manage alert delivery and critical event warnings
            </p>
          </div>
        </div>

        <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.06]">
          <div>
            <p className="text-xs font-semibold text-white">
              Enable Push & Operational Telemetry Alerts
            </p>
            <p className="mt-0.5 text-[11px] text-slate-400">
              Receive updates when new student records are matriculated or altered.
            </p>
          </div>

          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => {
              setNotifications(e.target.checked);
              setSaved(false);
            }}
            className="h-5 w-5 accent-cyan-400 cursor-pointer"
          />
        </label>
      </section>

      {/* Security */}
      <section className="frosted-panel rounded-3xl p-6">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-500/20 text-amber-300">
            <span className="material-symbols-outlined text-[20px]">lock</span>
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-white">
              Security & Environment Status
            </h2>
            <p className="text-xs text-slate-400">
              Spring Boot REST API endpoint & JWT token integrity
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Active session is authenticated with Spring Boot JWT Bearer tokens with SHA-256 encryption. To alter backend connection endpoints, edit <code className="rounded bg-black/40 px-2 py-0.5 font-mono text-cyan-300">src/services/api.js</code>.
        </p>
      </section>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4">
        {saved && (
          <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base">check_circle</span>
            Preferences updated successfully!
          </p>
        )}

        <button
          onClick={handleSave}
          type="button"
          className="flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-6 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all hover:scale-105 active:scale-95"
        >
          <span className="material-symbols-outlined text-[16px]">save</span>
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
}

export default Settings;
