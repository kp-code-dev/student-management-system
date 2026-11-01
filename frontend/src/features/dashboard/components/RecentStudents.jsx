
import { useEffect, useState } from "react";
import { FiUsers, FiArrowUpRight } from "react-icons/fi";
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
    <section className="rounded-2xl border border-white/80 bg-white/75 p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur-xl">

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Recent Students
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Latest student records
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <FiUsers size={19} />
        </div>
      </div>

      {loading ? (
        <p className="py-8 text-center text-sm text-slate-500">
          Loading students...
        </p>
      ) : error ? (
        <p className="py-8 text-center text-sm text-red-500">
          {error}
        </p>
      ) : students.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-500">
          No students found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-400">
                <th className="pb-3 font-medium">Student</th>
                <th className="pb-3 font-medium">Course</th>
                <th className="pb-3 font-medium">Email</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-slate-50 last:border-0"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                        {student.name?.charAt(0)?.toUpperCase() || "S"}
                      </div>

                      <span className="text-sm font-semibold text-slate-800">
                        {student.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 text-sm text-slate-600">
                    {student.course || "—"}
                  </td>

                  <td className="py-4 text-sm text-slate-500">
                    {student.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex items-center justify-end border-t border-slate-100 pt-4">
        <span className="flex items-center gap-1 text-xs font-semibold text-blue-600">
          Latest 5 records <FiArrowUpRight size={14} />
        </span>
      </div>
    </section>
  );
}

export default RecentStudents;
