import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/shared/PageHeader";
import { getMyStudentProfile } from "@/features/students/studentService";
import { getCurrentUser } from "@/features/auth/authService";

function StudentDashboard() {
  const loggedUser = getCurrentUser() || {};
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyStudentProfile()
      .then((data) => {
        if (data) {
          setProfile(data);
          localStorage.setItem("studenthub_student_profile", JSON.stringify(data));
        }
      })
      .catch(() => {
        const cached = (() => {
          try {
            return JSON.parse(localStorage.getItem("studenthub_student_profile") || "{}");
          } catch {
            return {};
          }
        })();

        setProfile({
          name: cached.name || loggedUser.name || "Student",
          email: cached.email || loggedUser.email || "student@studenthub.edu",
          course: cached.course || "Master of Computer Applications (MCA)",
          phone: cached.phone || "Not Provided",
          gender: cached.gender || "Not Specified",
          birthdate: cached.birthdate || "Not Specified",
          id: cached.id || loggedUser.id || 1,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const enrollmentId = profile?.id
    ? `STU-2026-${String(profile.id).padStart(4, "0")}`
    : `STU-2026-0001`;

  const studentName = profile?.name || loggedUser.name || "Student";
  const studentEmail = profile?.email || loggedUser.email || "student@studenthub.edu";
  const courseName = profile?.course || "Master of Computer Applications (MCA)";

  return (
    <div className="space-y-6">
      {/* 1. Welcome Message & Header */}
      <PageHeader
        title={
          <>
            Welcome back, {studentName}{" "}
            <span className="inline-block animate-pulse text-2xl">🎓</span>
          </>
        }
        description="Academic Session 2026–2027 • MCA Core Java Portal"
        action={
          <div className="flex items-center gap-3">
            <div className="frosted-pill flex items-center gap-2 rounded-full px-4 py-2.5">
              <span className="material-symbols-outlined text-[18px] text-cyan-300">
                calendar_today
              </span>
              <span className="text-[13px] font-semibold text-slate-200">
                {today}
              </span>
            </div>

            <Link
              to="/student-profile"
              className="group relative inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2.5 text-[13px] font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              <span className="material-symbols-outlined font-bold text-[18px]">
                manage_accounts
              </span>
              <span>Edit Profile</span>
            </Link>
          </div>
        }
      />

      {/* 2. Quick Overview Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Enrollment Number */}
        <div className="frosted-panel rounded-3xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300">
              <span className="material-symbols-outlined text-[20px]">badge</span>
            </div>
            <span className="text-[11px] font-mono font-semibold tracking-wider text-slate-400 uppercase">
              Enrollment No.
            </span>
          </div>
          <p className="text-lg font-bold text-white font-mono tracking-wide">
            {enrollmentId}
          </p>
          <span className="mt-1 block text-[11px] text-cyan-400/90 font-medium">
            Academic Identifier
          </span>
        </div>

        {/* Card 2: Course & Program */}
        <div className="frosted-panel rounded-3xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-400">
              <span className="material-symbols-outlined text-[20px]">menu_book</span>
            </div>
            <span className="text-[11px] font-mono font-semibold tracking-wider text-slate-400 uppercase">
              Enrolled Course
            </span>
          </div>
          <p className="text-lg font-bold text-white truncate" title={courseName}>
            {courseName}
          </p>
          <span className="mt-1 block text-[11px] text-indigo-300 font-mono">
            Semester 1 • Course: CAM5001C
          </span>
        </div>

        {/* Card 3: Academic Term */}
        <div className="frosted-panel rounded-3xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300">
              <span className="material-symbols-outlined text-[20px]">school</span>
            </div>
            <span className="text-[11px] font-mono font-semibold tracking-wider text-slate-400 uppercase">
              Academic Term
            </span>
          </div>
          <p className="text-lg font-bold text-white">MCA Semester 1</p>
          <span className="mt-1 block text-[11px] text-amber-300/90 font-medium">
            Batch 2026–2027
          </span>
        </div>

        {/* Card 4: Access Security Status */}
        <div className="frosted-panel rounded-3xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300">
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
            </div>
            <span className="text-[11px] font-mono font-semibold tracking-wider text-slate-400 uppercase">
              Account Status
            </span>
          </div>
          <p className="text-lg font-bold text-white">Active Student</p>
          <span className="mt-1 flex items-center gap-1.5 text-[11px] text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Verified Student Portal
          </span>
        </div>
      </div>

      {/* 3. Student Profile Summary & Course Details Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Summary Card (2 cols) */}
        <div className="frosted-panel rounded-3xl p-6 lg:col-span-2 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-indigo-400/30 bg-indigo-500/20 text-indigo-300">
                <span className="material-symbols-outlined text-[22px]">account_box</span>
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Student Profile Summary</h2>
                <p className="text-xs text-slate-400">Institutional registration identity</p>
              </div>
            </div>
            <Link
              to="/student-profile"
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <span>View Profile</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/5 bg-[#0a0e17]/50 p-4">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
                Full Student Name
              </span>
              <p className="text-sm font-semibold text-white">{studentName}</p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#0a0e17]/50 p-4">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
                Institutional Email
              </span>
              <p className="text-sm font-semibold text-white">{studentEmail}</p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#0a0e17]/50 p-4">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
                Contact Phone Number
              </span>
              <p className="text-sm font-semibold text-white">
                {profile?.phone || "Not specified"}
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#0a0e17]/50 p-4">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
                Enrollment Number
              </span>
              <p className="text-sm font-semibold text-white font-mono">{enrollmentId}</p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#0a0e17]/50 p-4">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
                Gender
              </span>
              <p className="text-sm font-semibold text-white">
                {profile?.gender || "Not specified"}
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#0a0e17]/50 p-4">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
                Birthdate
              </span>
              <p className="text-sm font-semibold text-white">
                {profile?.birthdate || "Not specified"}
              </p>
            </div>
          </div>
        </div>

        {/* Course Details Card (1 col) */}
        <div className="frosted-panel rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/20 text-cyan-300">
                <span className="material-symbols-outlined text-[22px]">auto_stories</span>
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Course Details</h2>
                <p className="text-xs text-slate-400">Curriculum & Subject Matrix</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-white/5 bg-[#0a0e17]/50 p-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Degree Programme
                </span>
                <span className="text-xs font-bold text-white mt-0.5 block">{courseName}</span>
              </div>

              <div className="rounded-xl border border-white/5 bg-[#0a0e17]/50 p-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Current Term
                </span>
                <span className="text-xs font-bold text-white mt-0.5 block">Semester 1 (MCA)</span>
              </div>

              <div className="rounded-xl border border-white/5 bg-[#0a0e17]/50 p-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Core Subject Code
                </span>
                <span className="text-xs font-bold text-cyan-300 font-mono mt-0.5 block">
                  CAM5001C — Core Java
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
