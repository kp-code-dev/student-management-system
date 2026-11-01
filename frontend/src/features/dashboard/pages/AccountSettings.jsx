import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageHeader from "@/components/shared/PageHeader";
import { changePassword, logoutUser } from "@/features/auth/authService";

function AccountSettings() {
  const navigate = useNavigate();

  // Change Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError("");

    if (!currentPassword) {
      setPasswordError("Please enter your current password.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }

    try {
      setChangingPassword(true);
      await changePassword({
        currentPassword,
        newPassword,
      });

      toast.success("Password changed successfully! Please log in again.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Automatically log out so student signs in with new password
      setTimeout(() => {
        logoutUser();
        navigate("/login");
      }, 1500);
    } catch (err) {
      setPasswordError(err.message || "Unable to change password. Please verify current password.");
      toast.error(err.message || "Failed to change password.");
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Change Password"
        description="Update your account login password securely."
      />

      {/* Change Password Form */}
      <section className="frosted-panel relative overflow-hidden rounded-3xl p-6">
        <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-indigo-400/30 bg-indigo-500/20 text-indigo-300">
              <span className="material-symbols-outlined text-[20px]">password</span>
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Change Account Password</h2>
              <p className="text-xs text-slate-400">
                Update your login password securely
              </p>
            </div>
          </div>
        </div>

        {passwordError && (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{passwordError}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Current Password */}
            <div>
              <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-300">
                Current Password *
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="h-11 w-full rounded-xl border border-white/10 bg-[#0a0e17]/80 pl-4 pr-10 text-xs text-white outline-none focus:border-cyan-400/50"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white"
                >
                  <span className="material-symbols-outlined text-base">
                    {showCurrent ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-300">
                New Password (Min 8 chars) *
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new secure password"
                  className="h-11 w-full rounded-xl border border-white/10 bg-[#0a0e17]/80 pl-4 pr-10 text-xs text-white outline-none focus:border-cyan-400/50"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white"
                >
                  <span className="material-symbols-outlined text-base">
                    {showNew ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-300">
                Confirm New Password *
              </label>
              <input
                type={showNew ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="h-11 w-full rounded-xl border border-white/10 bg-[#0a0e17]/80 px-4 text-xs text-white outline-none focus:border-cyan-400/50"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={changingPassword}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:scale-105 active:scale-95 disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-[18px]">key</span>
              <span>{changingPassword ? "Updating Password..." : "Update Password"}</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default AccountSettings;
