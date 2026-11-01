import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/shared/PageHeader";
import { getAllStudents } from "@/features/students/studentService";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const students = await getAllStudents();
        const courseMap = {};

        (Array.isArray(students) ? students : []).forEach((student) => {
          const courseName = student.course?.trim();
          if (!courseName) return;

          if (!courseMap[courseName]) {
            courseMap[courseName] = {
              name: courseName,
              students: 0,
            };
          }
          courseMap[courseName].students += 1;
        });

        setCourses(
          Object.values(courseMap).sort((a, b) =>
            a.name.localeCompare(b.name)
          )
        );
      } catch (err) {
        setError(err.message || "Unable to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Courses & Academic Programs"
        description="List of matriculated courses, curriculum tracking, and enrolled student counts."
        action={
          <Link
            to="/students"
            className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-[13px] font-bold text-slate-950 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">group_add</span>
            <span>Assign Student Course</span>
          </Link>
        }
      />

      {loading ? (
        <p className="py-12 text-center text-xs text-slate-400">
          Loading course programs...
        </p>
      ) : error ? (
        <p className="py-12 text-center text-xs text-red-400">
          {error}
        </p>
      ) : courses.length === 0 ? (
        <div className="frosted-panel rounded-3xl p-12 text-center text-slate-400">
          <span className="material-symbols-outlined text-4xl text-slate-500 mb-2">menu_book</span>
          <p className="text-sm font-semibold text-white">No courses represented yet</p>
          <p className="text-xs text-slate-400 mt-1">Add student records with course details to automatically populate programs.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.name}
              className="frosted-panel group relative overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]"
            >
              <div className="pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-cyan-500/10 blur-2xl transition-all group-hover:bg-cyan-500/20" />

              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                  <span className="material-symbols-outlined text-[24px]">terminal</span>
                </div>

                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 font-mono text-[10px] font-semibold text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ACTIVE PROGRAM
                </span>
              </div>

              <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                Department Course
              </div>

              <h2 className="mt-1 text-lg font-bold tracking-tight text-white">
                {course.name}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Accredited academic module for 2026 semester.
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="material-symbols-outlined text-[16px] text-slate-500">schedule</span>
                  <span>Full-Time Academic</span>
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-white">
                  <span className="material-symbols-outlined text-[16px] text-[#7bd0ff]">group</span>
                  <span>{course.students} Enrolled</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;
