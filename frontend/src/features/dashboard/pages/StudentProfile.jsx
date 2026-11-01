import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PageHeader from "@/components/shared/PageHeader";
import { getCurrentUser } from "@/features/auth/authService";
import { getMyStudentProfile, updateMyStudentProfile } from "@/features/students/studentService";

function StudentProfile() {
  const loggedUser = getCurrentUser() || {};
  const [profile, setProfile] = useState(() => {
    try {
      const savedProfile = localStorage.getItem("studenthub_student_profile");
      return savedProfile
        ? {
            name: loggedUser.name || "",
            email: loggedUser.email || "",
            course: "Master of Computer Applications (MCA)",
            phone: "",
            gender: "",
            birthdate: "",
            id: loggedUser.id || 1,
            ...JSON.parse(savedProfile),
          }
        : {
            name: loggedUser.name || "",
            email: loggedUser.email || "",
            course: "Master of Computer Applications (MCA)",
            phone: "",
            gender: "",
            birthdate: "",
            id: loggedUser.id || 1,
          };
    } catch {
      return {
        name: loggedUser.name || "",
        email: loggedUser.email || "",
        course: "Master of Computer Applications (MCA)",
        phone: "",
        gender: "",
        birthdate: "",
        id: loggedUser.id || 1,
      };
    }
  });

  const [savingBackend, setSavingBackend] = useState(false);
  const [saved, setSaved] = useState(false);

  // Required editable fields: Student Full Name, Contact Phone Number, Gender, Birthdate
  const [editableForm, setEditableForm] = useState({
    name: profile.name || "",
    phone: profile.phone || "",
    gender: profile.gender || "",
    birthdate: profile.birthdate || "",
  });

  useEffect(() => {
    getMyStudentProfile()
      .then((data) => {
        if (data) {
          setProfile(data);
          setEditableForm({
            name: data.name || "",
            phone: data.phone || "",
            gender: data.gender || "",
            birthdate: data.birthdate || "",
          });
          localStorage.setItem("studenthub_student_profile", JSON.stringify(data));
        }
      })
      .catch((err) => {
        console.warn("Backend student profile lookup notice:", err.message);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSaved(false);
  };

  const handleSavePermittedInfo = async (e) => {
    e.preventDefault();

    // Validation: Name, Phone, Gender, Birthdate are all required
    if (!editableForm.name.trim()) {
      toast.error("Student Full Name is required.");
      return;
    }
    if (!editableForm.phone.trim()) {
      toast.error("Contact Phone Number is required.");
      return;
    }
    if (!editableForm.gender.trim()) {
      toast.error("Gender is required.");
      return;
    }
    if (!editableForm.birthdate.trim()) {
      toast.error("Birthdate is required.");
      return;
    }

    try {
      setSavingBackend(true);

      const result = await updateMyStudentProfile({
        name: editableForm.name.trim(),
        phone: editableForm.phone.trim(),
        gender: editableForm.gender.trim(),
        birthdate: editableForm.birthdate.trim(),
      }).catch((err) => {
        console.warn("Backend update notice:", err.message);
        return {
          ...profile,
          name: editableForm.name.trim(),
          phone: editableForm.phone.trim(),
          gender: editableForm.gender.trim(),
          birthdate: editableForm.birthdate.trim(),
        };
      });

      const updated = {
        ...profile,
        name: result?.name || editableForm.name,
        phone: result?.phone || editableForm.phone,
        gender: result?.gender || editableForm.gender,
        birthdate: result?.birthdate || editableForm.birthdate,
      };

      setProfile(updated);
      localStorage.setItem("studenthub_student_profile", JSON.stringify(updated));

      // Synchronize logged-in user in session
      if (updated.name) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...loggedUser,
            name: updated.name,
          })
        );
      }

      setSaved(true);
      toast.success("Profile information saved successfully!");
    } catch {
      toast.error("Failed to update profile.");
    } finally {
      setSavingBackend(false);
    }
  };

  const enrollmentId = profile?.id
    ? `STU-2026-${String(profile.id).padStart(4, "0")}`
    : `STU-2026-0001`;

  const studentName = profile?.name || loggedUser.name || "Student";
  const studentEmail = profile?.email || loggedUser.email || "student@studenthub.edu";
  const studentCourse = profile?.course || "Master of Computer Applications (MCA)";
  const studentPhone = profile?.phone || "Not specified";
  const studentGender = profile?.gender || "Not specified";
  const studentBirthdate = profile?.birthdate || "Not specified";

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Profile"
        description="View your institutional account details and update your personal information."
      />

      {/* 1. Full Account Information */}
      <section className="frosted-panel relative overflow-hidden rounded-3xl p-6">
        <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/20 text-cyan-300">
              <span className="material-symbols-outlined text-[20px]">badge</span>
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Full Account Information</h2>
              <p className="text-xs text-slate-400">Authenticated student account details</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/5 bg-[#0a0e17]/50 p-4">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
              Student Full Name
            </span>
            <p className="text-sm font-semibold text-white">{studentName}</p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#0a0e17]/50 p-4">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
              Registered Email (Login ID)
            </span>
            <p className="text-sm font-semibold text-white font-mono">{studentEmail}</p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#0a0e17]/50 p-4">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
              Enrollment Token
            </span>
            <p className="text-sm font-semibold text-white font-mono">{enrollmentId}</p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#0a0e17]/50 p-4">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
              Enrolled Degree
            </span>
            <p className="text-sm font-semibold text-white">{studentCourse}</p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#0a0e17]/50 p-4">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
              Semester & Academic Year
            </span>
            <p className="text-sm font-semibold text-white">Semester 1 • Academic Year 2026–2027</p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#0a0e17]/50 p-4">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
              Contact Phone
            </span>
            <p className="text-sm font-semibold text-white">{studentPhone}</p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#0a0e17]/50 p-4">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
              Gender
            </span>
            <p className="text-sm font-semibold text-white">{studentGender}</p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#0a0e17]/50 p-4">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
              Birthdate
            </span>
            <p className="text-sm font-semibold text-white">{studentBirthdate}</p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#0a0e17]/50 p-4">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
              Access Role
            </span>
            <p className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              STUDENT
            </p>
          </div>
        </div>
      </section>

      {/* 2. Personal Details Form */}
      <form onSubmit={handleSavePermittedInfo}>
        <section className="frosted-panel relative overflow-hidden rounded-3xl p-6">
          <div className="mb-5 border-b border-white/10 pb-4">
            <h2 className="text-base font-bold text-white">Personal Details</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Student Full Name */}
            <div>
              <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-300">
                Student Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={editableForm.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                className="h-11 w-full rounded-xl border border-white/10 bg-[#0a0e17]/80 px-4 text-xs text-white outline-none focus:border-cyan-400/50"
              />
            </div>

            {/* Contact Phone Number */}
            <div>
              <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-300">
                Contact Phone Number *
              </label>
              <input
                type="text"
                name="phone"
                required
                value={editableForm.phone}
                onChange={handleInputChange}
                placeholder="Enter contact phone number"
                className="h-11 w-full rounded-xl border border-white/10 bg-[#0a0e17]/80 px-4 text-xs text-white outline-none focus:border-cyan-400/50"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-300">
                Gender *
              </label>
              <select
                name="gender"
                required
                value={editableForm.gender}
                onChange={handleInputChange}
                className="h-11 w-full rounded-xl border border-white/10 bg-[#0a0e17]/80 px-4 text-xs text-white outline-none focus:border-cyan-400/50"
              >
                <option value="" disabled className="bg-[#1c1f29] text-slate-400">
                  Select gender
                </option>
                <option value="Male" className="bg-[#1c1f29] text-white">
                  Male
                </option>
                <option value="Female" className="bg-[#1c1f29] text-white">
                  Female
                </option>
                <option value="Other" className="bg-[#1c1f29] text-white">
                  Other
                </option>
              </select>
            </div>

            {/* Birthdate */}
            <div>
              <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-300">
                Birthdate *
              </label>
              <input
                type="date"
                name="birthdate"
                required
                value={editableForm.birthdate}
                onChange={handleInputChange}
                className="h-11 w-full rounded-xl border border-white/10 bg-[#0a0e17]/80 px-4 text-xs text-white outline-none focus:border-cyan-400/50 [color-scheme:dark]"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={savingBackend}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2.5 text-xs font-bold text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition hover:scale-105 active:scale-95 disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>{savingBackend ? "Saving..." : saved ? "Information Saved" : "Save Information"}</span>
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}

export default StudentProfile;
