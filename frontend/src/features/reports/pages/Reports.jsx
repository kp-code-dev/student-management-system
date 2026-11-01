
import { useEffect, useState } from "react";

import {
  FiBarChart2,
  FiUsers,
  FiBookOpen,
  FiTrendingUp,
  FiDownload,
} from "react-icons/fi";

import PageHeader from "@/components/shared/PageHeader";
import { getAllStudents } from "@/features/students/studentService";

function Reports() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const data = await getAllStudents();
        setStudents(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Unable to load report data");
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  const totalStudents = students.length;

  const totalCourses = new Set(
    students
      .map((student) => student.course?.trim())
      .filter(Boolean)
  ).size;

  const studentsWithCourse = students.filter(
    (student) => student.course?.trim()
  ).length;

  const reportStats = [
    {
      title: "Total Students",
      value: totalStudents,
      description: "All registered students",
      icon: FiUsers,
    },
    {
      title: "Total Courses",
      value: totalCourses,
      description: "Unique courses in student records",
      icon: FiBookOpen,
    },
    {
      title: "Students with Course",
      value: studentsWithCourse,
      description: "Students having course information",
      icon: FiTrendingUp,
    },
  ];

  return (
    <div className="space-y-7">
      <PageHeader
        title="Reports & Analytics"
        description="View academic statistics and institution performance."
      />

      {error && (
        <p className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {reportStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-white/80 bg-white/75 p-6 shadow-sm backdrop-blur-xl"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Icon size={23} />
              </div>

              <p className="text-sm text-slate-500">
                {stat.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {loading ? "..." : stat.value}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      <section className="rounded-2xl border border-white/80 bg-white/75 p-8 text-center shadow-sm backdrop-blur-xl">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <FiBarChart2 size={27} />
        </div>

        <h2 className="text-lg font-bold text-slate-800">
          Detailed Reports
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          Detailed academic reports, enrollment trends and
          downloadable PDF reports will be available here.
        </p>

        <button
          disabled
          className="mt-6 inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-400"
        >
          <FiDownload size={17} />
          Export Reports — Coming Soon
        </button>
      </section>
    </div>
  );
}

export default Reports;
