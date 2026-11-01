
import { useEffect, useState } from "react";

import {
  FiUsers,
  FiUserCheck,
  FiBookOpen,
  FiTrendingUp,
  FiArrowUpRight,
} from "react-icons/fi";

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
      value: loading ? "..." : totalStudents.toLocaleString(),
      description: "Registered students",
      icon: FiUsers,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Students",
      value: "—",
      description: "Status tracking not available",
      icon: FiUserCheck,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-600",
    },
    {
      title: "Courses Represented",
      value: loading ? "..." : totalCourses.toString(),
      description: "Based on student records",
      icon: FiBookOpen,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-600",
    },
    {
      title: "New Admissions",
      value: "—",
      description: "Admission date not available",
      icon: FiTrendingUp,
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="group relative overflow-hidden rounded-2xl border border-white/80 bg-white/75 p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                  {stat.value}
                </h2>
              </div>

              <div className={`rounded-xl p-3 ${stat.iconBg} ${stat.iconColor}`}>
                <Icon size={22} />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400">
                {stat.description}
              </span>
            </div>

            <div className="absolute -bottom-10 -right-8 h-24 w-24 rounded-full bg-blue-500/[0.035] blur-2xl transition group-hover:bg-blue-500/[0.08]" />
          </div>
        );
      })}
    </div>
  );
}

export default StatsCards;