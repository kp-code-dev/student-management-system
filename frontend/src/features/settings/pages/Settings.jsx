
import { useEffect, useState } from "react";

import {
  FiUser,
  FiBell,
  FiLock,
  FiSave,
} from "react-icons/fi";

import PageHeader from "@/components/shared/PageHeader";

const DEFAULT_PROFILE = {
  name: "Admin User",
  email: "admin@studenthub.com",
  institution: "StudentHub Institution",
};

function Settings() {
  const [profile, setProfile] = useState(() => {
    try {
      const savedProfile = localStorage.getItem("studenthub_profile");
      return savedProfile
        ? { ...DEFAULT_PROFILE, ...JSON.parse(savedProfile) }
        : DEFAULT_PROFILE;
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
    localStorage.setItem(
      "studenthub_notifications",
      String(notifications)
    );

    setSaved(true);
  };

  useEffect(() => {
    setSaved(false);
  }, [notifications]);

  return (
    <div className="space-y-7">
      <PageHeader
        title="Settings"
        description="Manage your account and application preferences."
      />

      <section className="rounded-2xl border border-white/80 bg-white/75 p-6 shadow-sm backdrop-blur-xl">
        <div className="mb-6 flex items-center gap-3">
          <FiUser className="text-blue-600" size={21} />

          <h2 className="text-lg font-bold text-slate-800">
            Profile Information
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {[
            { label: "Full Name", name: "name" },
            { label: "Email Address", name: "email" },
            { label: "Institution Name", name: "institution" },
          ].map((field) => (
            <div key={field.name}>
              <label className="mb-2 block text-sm font-medium text-slate-600">
                {field.label}
              </label>

              <input
                name={field.name}
                value={profile[field.name]}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/80 bg-white/75 p-6 shadow-sm backdrop-blur-xl">
        <div className="mb-5 flex items-center gap-3">
          <FiBell className="text-blue-600" size={21} />

          <h2 className="text-lg font-bold text-slate-800">
            Notifications
          </h2>
        </div>

        <label className="flex cursor-pointer items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-800">
              Enable Notifications
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Save your notification preference.
            </p>
          </div>

          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => {
              setNotifications(e.target.checked);
              setSaved(false);
            }}
            className="h-5 w-5 accent-blue-600"
          />
        </label>
      </section>

      <section className="rounded-2xl border border-white/80 bg-white/75 p-6 shadow-sm backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-3">
          <FiLock className="text-blue-600" size={21} />

          <h2 className="text-lg font-bold text-slate-800">
            Security
          </h2>
        </div>

        <p className="text-sm text-slate-500">
          Password management and secure authentication will
          be available after backend authentication is implemented.
        </p>
      </section>

      <div className="flex items-center justify-end gap-4">
        {saved && (
          <p className="text-sm font-medium text-emerald-600">
            Settings saved successfully!
          </p>
        )}

        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <FiSave size={17} />
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Settings;
