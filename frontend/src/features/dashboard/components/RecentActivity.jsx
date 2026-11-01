import { useEffect, useState } from "react";
import { getAllStudents } from "@/features/students/studentService";

function RecentActivity() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentStudents = async () => {
      try {
        const data = await getAllStudents();

        const recentStudents = (Array.isArray(data) ? data : [])
          .sort((a, b) => Number(b.id) - Number(a.id))
          .slice(0, 4);

        setStudents(recentStudents);
      } catch (error) {
        console.error("Unable to load recent students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentStudents();
  }, []);

  return (
    <section className="frosted-panel relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-5 md:p-6">
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-indigo-500/10 blur-3xl" />

      <div>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                System Log
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            </div>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-white">
              Recent Activity
            </h2>
          </div>

          <span className="material-symbols-outlined text-[20px] text-slate-400">
            schedule
          </span>
        </div>

        <div className="space-y-3.5">
          {loading ? (
            <p className="py-8 text-center text-xs text-slate-400">
              Loading activity logs...
            </p>
          ) : students.length === 0 ? (
            <p className="py-8 text-center text-xs text-slate-400">
              No recent admissions logged.
            </p>
          ) : (
            students.map((student) => (
              <div
                key={student.id}
                className="group flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 transition-colors hover:border-white/10 hover:bg-white/[0.06]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/15 text-cyan-300">
                  <span className="material-symbols-outlined text-[18px]">
                    person_add
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="truncate text-xs font-semibold text-white">
                      {student.name}
                    </h3>
                    <span className="font-mono text-[10px] text-slate-400">
                      ID #{student.id}
                    </span>
                  </div>

                  <p className="mt-0.5 truncate text-[11px] text-slate-300">
                    Enrolled into <span className="text-cyan-300">{student.course || "General"}</span>
                  </p>

                  <p className="mt-1 font-mono text-[10px] text-slate-500">
                    {student.email}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-4 border-t border-white/[0.08] pt-3 text-right">
        <span className="font-mono text-[10px] text-slate-500">
          LOG STREAM · VERIFIED
        </span>
      </div>
    </section>
  );
}

export default RecentActivity;
