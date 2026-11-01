
import { useEffect, useState } from "react";

import {
  FiUserPlus,
  FiClock,
} from "react-icons/fi";

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
          .slice(0, 5);

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
    <section className="rounded-2xl border border-white/80 bg-white/75 p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur-xl">

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Recently registered students
          </p>
        </div>

        <FiClock className="text-slate-400" size={19} />
      </div>

      <div className="space-y-5">
        {loading ? (
          <p className="py-6 text-center text-sm text-slate-500">
            Loading recent students...
          </p>
        ) : students.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-500">
            No student records available.
          </p>
        ) : (
          students.map((student) => (
            <div
              key={student.id}
              className="flex items-start gap-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FiUserPlus size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-slate-800">
                  New student registered
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {student.name} joined {student.course || "a course"}
                </p>

                <p className="mt-2 text-[11px] text-slate-400">
                  Student ID: #{student.id}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default RecentActivity;
