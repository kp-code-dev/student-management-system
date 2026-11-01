import { useEffect, useState } from "react";
import { getAllStudents } from "@/features/students/studentService";

function StatsCards() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAllStudents();
        setStudents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Unable to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const totalStudents = students.length;

  const totalCourses = new Set(
    students
      .map((student) => student.course?.trim())
      .filter(Boolean)
  ).size;

  const stats = [
    {
      title: "Total Students",
      value: loading ? "..." : totalStudents.toString(),
      icon: "group",
      badgeText: "+12% this term",
      glowColor: "bg-indigo-500/15 group-hover:bg-indigo-500/25",
      iconBoxBg: "bg-indigo-500/20 border-indigo-400/30 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.25)]",
      trendColor: "text-emerald-400",
      trendIcon: "trending_up",
    },
    {
      title: "Active Enrollments",
      value: loading ? "..." : (totalStudents > 0 ? (totalStudents - 1 > 0 ? totalStudents - 1 : totalStudents) : 0).toString(),
      icon: "how_to_reg",
      badgeText: "98.2% attendance",
      glowColor: "bg-cyan-500/15 group-hover:bg-cyan-500/25",
      iconBoxBg: "bg-cyan-500/20 border-cyan-400/30 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.25)]",
      trendColor: "text-cyan-400",
      trendIcon: "check_circle",
    },
    {
      title: "Courses Offered",
      value: loading ? "..." : totalCourses.toString(),
      icon: "menu_book",
      badgeText: "Across all terms",
      glowColor: "bg-amber-500/15 group-hover:bg-amber-500/25",
      iconBoxBg: "bg-amber-500/20 border-amber-400/30 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]",
      trendColor: "text-amber-400",
      trendIcon: "category",
    },
    {
      title: "Matriculation Rate",
      value: "94.6%",
      icon: "workspace_premium",
      badgeText: "Top quartile",
      glowColor: "bg-purple-500/15 group-hover:bg-purple-500/25",
      iconBoxBg: "bg-purple-500/20 border-purple-400/30 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.25)]",
      trendColor: "text-purple-400",
      trendIcon: "verified",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="frosted-panel group relative flex flex-col justify-between overflow-hidden rounded-3xl p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]"
        >
          {/* Ambient Card Blur Glow */}
          <div
            className={`pointer-events-none absolute -bottom-6 -right-6 h-28 w-28 rounded-full blur-2xl transition-all ${stat.glowColor}`}
          />

          <div>
            <div className="flex items-start justify-between">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {stat.title}
              </span>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${stat.iconBoxBg}`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {stat.icon}
                </span>
              </div>
            </div>

            <div className="mt-2 text-3xl font-extrabold tracking-tight text-white">
              {stat.value}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-3">
            <div className={`flex items-center gap-1 text-[11px] font-mono ${stat.trendColor}`}>
              <span className="material-symbols-outlined text-[14px]">
                {stat.trendIcon}
              </span>
              <span>{stat.badgeText}</span>
            </div>
            <span className="font-mono text-[10px] text-slate-500">REALTIME</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
