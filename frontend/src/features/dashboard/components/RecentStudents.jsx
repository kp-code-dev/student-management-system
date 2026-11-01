import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllStudents } from "@/features/students/studentService";

function RecentStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        const latestStudents = (Array.isArray(data) ? data : [])
          .sort((a, b) => Number(b.id) - Number(a.id))
          .slice(0, 5);

        setStudents(latestStudents);
      } catch (err) {
        setError(err.message || "Unable to load students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <section className="frosted-panel relative overflow-hidden rounded-3xl p-5 md:p-6">
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
              Registrar Feed
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          </div>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-white">
            Recent Enrollees
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Recently matriculated student records
          </p>
        </div>

        <Link
          to="/students"
          className="frosted-pill flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-slate-200 transition-all hover:bg-white/10 hover:text-white"
        >
          <span>View All Directory</span>
          <span className="material-symbols-outlined text-[16px]">
            arrow_forward
          </span>
        </Link>
      </div>

      {loading ? (
        <p className="py-8 text-center text-xs text-slate-400">
          Loading student records...
        </p>
      ) : error ? (
        <p className="py-8 text-center text-xs text-red-400">
          {error}
        </p>
      ) : students.length === 0 ? (
        <p className="py-8 text-center text-xs text-slate-400">
          No student records available yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[540px] text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] font-mono text-[11px] uppercase tracking-wider text-slate-400">
                <th className="pb-3 font-semibold">Student</th>
                <th className="pb-3 font-semibold">ID</th>
                <th className="pb-3 font-semibold">Course Program</th>
                <th className="pb-3 font-semibold">Contact Email</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/[0.04] text-xs">
              {students.map((student) => {
                const initials = student.name
                  ? student.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()
                  : "ST";

                return (
                  <tr
                    key={student.id}
                    className="group transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="py-3.5 pr-3">
                      <div className="flex items-center gap-3">
                        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8083ff] to-[#7bd0ff] text-xs font-bold text-[#0a0e17] shadow-md">
                          {initials}
                          <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-[#7bd0ff] shadow-[0_0_6px_#7bd0ff]" />
                        </div>
                        <span className="font-semibold text-white transition-colors group-hover:text-[#7bd0ff]">
                          {student.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 font-mono text-[#7bd0ff]">
                      <span className="rounded bg-[#0a0e17]/80 px-2 py-0.5 border border-white/10">
                        #{student.id}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <span className="material-symbols-outlined text-[16px] text-[#c0c1ff]">
                          terminal
                        </span>
                        <span>{student.course || "General Studies"}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-slate-400 font-mono">
                      {student.email}
                    </td>

                    <td className="py-3.5 pl-3 text-right">
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        ACTIVE
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default RecentStudents;
