import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageHeader from "@/components/shared/PageHeader";
import { getCurrentUser } from "@/features/auth/authService";
import { getMyStudentProfile, updateMyStudentProfile } from "@/features/students/studentService";

const DEFAULT_PROFILE = {
  name: "User",
  email: "user@studenthub.edu",
  institution: "StudentHub University Academy",
  role: "STUDENT",
  phone: "",
  course: "Master of Computer Applications (MCA)",
};

function Settings() {
  const loggedUser = getCurrentUser() || {};
  const role = (loggedUser.role || "STUDENT").toUpperCase().replace("ROLE_", "");
  const isAdmin = role === "ADMIN";

  const [profile, setProfile] = useState(() => {
    try {
      const savedProfile = localStorage.getItem("studenthub_profile");
      return savedProfile
        ? { ...DEFAULT_PROFILE, ...loggedUser, ...JSON.parse(savedProfile) }
        : { ...DEFAULT_PROFILE, ...loggedUser };
    } catch {
      return { ...DEFAULT_PROFILE, ...loggedUser };
    }
  });

  const [notifications, setNotifications] = useState(() => {
    return localStorage.getItem("studenthub_notifications") !== "false";
  });

  const [saved, setSaved] = useState(false);
  const [savingBackend, setSavingBackend] = useState(false);

  // If student, try to load profile from backend
  useEffect(() => {
    if (!isAdmin) {
      getMyStudentProfile()
        .then((data) => {
          if (data) {
            setProfile((prev) => ({
              ...prev,
              name: data.name || prev.name,
              email: data.email || prev.email,
              phone: data.phone || prev.phone,
              course: data.course || prev.course,
            }));
          }
        })
        .catch(() => {
          // Fallback gracefully to local profile
        });
    }
  }, [isAdmin]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
    setSaved(false);
  };

  const handleSave = async () => {
    try {
      setSavingBackend(true);
      // If student, synchronize with backend
      if (!isAdmin) {
        await updateMyStudentProfile({
          name: profile.name,
          phone: profile.phone,
          course: profile.course,
        }).catch((err) => {
          console.warn("Backend update notice:", err.message);
        });
      }

      localStorage.setItem("studenthub_profile", JSON.stringify(profile));
      localStorage.setItem("studenthub_notifications", String(notifications));

      // Update current user cached name
      if (profile.name) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...loggedUser,
            name: profile.name,
          })
        );
      }

      setSaved(true);
      toast.success("Profile preferences saved successfully!");
    } catch {
      toast.error("Failed to save settings.");
    } finally {
      setSavingBackend(false);
    }
  };

  useEffect(() => {
    setSaved(false);
  }, [notifications]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={isAdmin ? "Faculty Profile & Account Settings" : "Student Profile & Settings"}
        description={
          isAdmin
            ? "Manage your faculty profile, department configurations, and security preferences."
            : "Review your student personal profile, contact information, and notifications."
        }
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
              {isAdmin ? "Faculty Profile" : "Student Profile"}
            </h2>
            <p className="text-xs text-slate-400">
              Personal credentials and registered contact information
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-300">
              {isAdmin ? "Full Faculty Name" : "Student Full Name"}
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
              Institutional Email (Immutable)
            </label>
            <input
              name="email"
              disabled
              value={profile.email}
              className="h-11 w-full rounded-xl border border-white/5 bg-[#0a0e17]/40 px-4 text-xs text-slate-400 outline-none cursor-not-allowed"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-300">
              {isAdmin ? "Department / Institution" : "Enrolled Course / Degree"}
            </label>
            <input
              name={isAdmin ? "institution" : "course"}
              value={isAdmin ? profile.institution : profile.course}
              onChange={handleChange}
              className="h-11 w-full rounded-xl border border-white/10 bg-[#0a0e17]/80 px-4 text-xs text-white outline-none focus:border-cyan-400/50"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-300">
              {isAdmin ? "Access Role" : "Contact Phone"}
            </label>
            {isAdmin ? (
              <input
                name="role"
                disabled
                value={role}
                className="h-11 w-full rounded-xl border border-white/5 bg-[#0a0e17]/40 px-4 text-xs text-slate-400 outline-none cursor-not-allowed"
              />
            ) : (
              <input
                name="phone"
                value={profile.phone || ""}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="h-11 w-full rounded-xl border border-white/10 bg-[#0a0e17]/80 px-4 text-xs text-white outline-none focus:border-cyan-400/50"
              />
            )}
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

        <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-[#0a0e17]/50 p-4">
          <div>
            <span className="text-sm font-semibold text-white">
              Email Notifications
            </span>
            <p className="text-xs text-slate-400">
              Receive updates on academic notices, enrollment events and system maintenance.
            </p>
          </div>

          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-slate-800 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-cyan-500 peer-checked:after:translate-x-full peer-focus:outline-none" />
          </label>
        </div>
      </section>

      {/* Security Architecture Notice */}
      <section className="frosted-panel rounded-3xl p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500/20 text-emerald-300">
            <span className="material-symbols-outlined text-[20px]">shield</span>
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-white">
              Role & Security Policy
            </h2>
            <p className="text-xs text-slate-400">
              Role-Based Access Control (RBAC) enforced via Spring Security & JWT
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#0a0e17]/50 p-4 space-y-2 text-xs text-slate-300">
          <p>
            <span className="font-semibold text-white">Active Identity: </span>
            {profile.name} ({profile.email})
          </p>
          <p>
            <span className="font-semibold text-white">Enforced Role: </span>
            <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-indigo-300 font-mono">
              {role}
            </span>
          </p>
          <p className="text-slate-400">
            All administrative student mutation APIs (POST, PUT, DELETE) require verified Faculty / Admin authorization on the Spring Boot backend.
          </p>
        </div>
      </section>

      {/* Save Action */}
      <div className="flex justify-end gap-3">
        <button
          onClick={handleSave}
          disabled={savingBackend}
          type="button"
          className="group relative inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-xs font-bold text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all hover:scale-105 active:scale-95 disabled:opacity-60"
        >
          <span className="material-symbols-outlined text-[18px]">save</span>
          <span>{savingBackend ? "Saving..." : saved ? "Preferences Saved" : "Save Settings"}</span>
        </button>
      </div>
    </div>
  );
}

export default Settings;
