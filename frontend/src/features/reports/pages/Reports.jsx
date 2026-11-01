import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
    students.map((s) => s.course?.trim()).filter(Boolean)
  ).size;

  const exportCSV = () => {
    if (students.length === 0) return;
    const headers = ["ID", "Name", "Email", "Course", "Phone"];
    const rows = students.map((s) => [
      s.id,
      `"${s.name || ""}"`,
      `"${s.email || ""}"`,
      `"${s.course || ""}"`,
      `"${s.phone || ""}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `studenthub_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV Report downloaded successfully!");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics Terminal"
        description="Deep-dive academic intelligence, student distribution metrics, and telemetry reports."
        action={
          <button
            onClick={exportCSV}
            type="button"
            className="group relative inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export CSV Report</span>
          </button>
        }
      />

      {/* KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="frosted-panel rounded-3xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Total Enrollees</span>
            <span className="material-symbols-outlined text-[20px] text-cyan-300">group</span>
          </div>
          <div className="mt-2 text-3xl font-extrabold text-white">{totalStudents}</div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span>Active database synchronized</span>
          </div>
        </div>

        <div className="frosted-panel rounded-3xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Programs Represented</span>
            <span className="material-symbols-outlined text-[20px] text-[#8083ff]">menu_book</span>
          </div>
          <div className="mt-2 text-3xl font-extrabold text-white">{totalCourses}</div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-cyan-400 font-mono">
            <span className="material-symbols-outlined text-sm">school</span>
            <span>All accredited branches</span>
          </div>
        </div>
      </div>

      {/* Detailed Report Feed */}
      <section className="frosted-panel rounded-3xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Student Records Summary
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Structured export data ready for administration audits
            </p>
          </div>
          <span className="font-mono text-xs text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">
            {students.length} Total Rows
          </span>
        </div>

        {loading ? (
          <p className="py-12 text-center text-xs text-slate-400">Loading audit records...</p>
        ) : error ? (
          <p className="py-12 text-center text-xs text-red-400">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] font-mono text-[11px] text-slate-400 uppercase">
                  <th className="py-3 px-3">Student Name</th>
                  <th className="py-3 px-3">ID</th>
                  <th className="py-3 px-3">Email Address</th>
                  <th className="py-3 px-3">Program</th>
                  <th className="py-3 px-3">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-white/[0.03]">
                    <td className="py-3 px-3 font-semibold text-white">{s.name}</td>
                    <td className="py-3 px-3 font-mono text-[#7bd0ff]">#{s.id}</td>
                    <td className="py-3 px-3 font-mono text-slate-300">{s.email}</td>
                    <td className="py-3 px-3 text-slate-200">{s.course || "General"}</td>
                    <td className="py-3 px-3 font-mono text-slate-400">{s.phone || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default Reports;
