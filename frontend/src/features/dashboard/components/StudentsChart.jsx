
import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { FiBookOpen } from "react-icons/fi";

import { getAllStudents } from "@/features/students/studentService";

function StudentsChart() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const students = await getAllStudents();

        const courseCounts = (Array.isArray(students) ? students : [])
          .reduce((acc, student) => {
            const course = student.course?.trim() || "Unspecified";

            acc[course] = (acc[course] || 0) + 1;

            return acc;
          }, {});

        const formattedData = Object.entries(courseCounts).map(
          ([course, count]) => ({
            course,
            students: count,
          })
        );

        setChartData(formattedData);
      } catch (err) {
        setError(err.message || "Unable to load chart data.");
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  return (
    <section className="rounded-2xl border border-white/80 bg-white/75 p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur-xl md:p-6">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Students by Course
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current student distribution across courses
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600">
          <FiBookOpen size={15} />
          Live Database Data
        </div>
      </div>

      <div className="h-[280px] w-full">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            Loading chart...
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center text-sm text-red-500">
            {error}
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            No student data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 8, left: -18, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="#E2E8F0"
              />

              <XAxis
                dataKey="course"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94A3B8", fontSize: 12 }}
              />

              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94A3B8", fontSize: 12 }}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
                }}
                formatter={(value) => [value, "Students"]}
              />

              <Bar
                dataKey="students"
                fill="#3B82F6"
                radius={[6, 6, 0, 0]}
                maxBarSize={55}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-400">
        <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
        Actual registered students grouped by course
      </div>
    </section>
  );
}

export default StudentsChart;
