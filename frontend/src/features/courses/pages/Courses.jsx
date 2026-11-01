
import { useEffect, useState } from "react";

import {
  FiBookOpen,
  FiPlus,
  FiUsers,
  FiClock,
} from "react-icons/fi";

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
    <div className="space-y-7">
      <PageHeader
        title="Courses"
        description="Manage academic courses and course information."
        action={
          <button
            disabled
            title="Course management will be available in a future update"
            className="flex cursor-not-allowed items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white opacity-60"
          >
            <FiPlus size={17} />
            Add Course
          </button>
        }
      />

      {loading ? (
        <p className="py-10 text-center text-sm text-slate-500">
          Loading courses...
        </p>
      ) : error ? (
        <p className="py-10 text-center text-sm text-red-500">
          {error}
        </p>
      ) : courses.length === 0 ? (
        <p className="rounded-2xl border border-white/80 bg-white/75 py-10 text-center text-sm text-slate-500">
          No courses found. Add students with course information first.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.name}
              className="rounded-2xl border border-white/80 bg-white/75 p-6 shadow-sm backdrop-blur-xl"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FiBookOpen size={23} />
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                  Active
                </span>
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                {course.name}
              </p>

              <h2 className="mt-2 min-h-12 text-lg font-bold text-slate-800">
                {course.name}
              </h2>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <FiClock />
                  Duration unavailable
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <FiUsers className="text-blue-600" />
                  {course.students}
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
