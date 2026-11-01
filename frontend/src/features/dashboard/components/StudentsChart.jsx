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
            const course = student.course?.trim() || "Unassigned";
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
    <section className="frosted-panel relative overflow-hidden rounded-3xl p-5 md:p-6">
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
              Department Metrics
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          </div>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-white">
            Students by Course
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Real-time enrollment distribution across academic programs
          </p>
        </div>

        <div className="frosted-pill flex items-center gap-2 rounded-full px-3.5 py-1.5">
          <span className="material-symbols-outlined text-[16px] text-cyan-300">
            database
          </span>
          <span className="font-mono text-xs font-semibold text-cyan-200">
            Live Registry
          </span>
        </div>
      </div>

      <div className="h-[280px] w-full">
        {loading ? (
          <div className="flex h-full items-center justify-center text-xs text-slate-400">
            Loading course metrics...
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center text-xs text-red-400">
            {error}
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-xs text-slate-400">
            No enrolled students to display.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 12, left: -16, bottom: 5 }}
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7bd0ff" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#8083ff" stopOpacity={0.6} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(255, 255, 255, 0.08)"
              />

              <XAxis
                dataKey="course"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#908fa0", fontSize: 12 }}
              />

              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#908fa0", fontSize: 12 }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 19, 28, 0.85)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "16px",
                  color: "#dfe2ef",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                }}
                itemStyle={{ color: "#7bd0ff" }}
                formatter={(value) => [value, "Students"]}
              />

              <Bar
                dataKey="students"
                fill="url(#barGradient)"
                radius={[8, 8, 2, 2]}
                maxBarSize={48}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
          <span>Synchronized with Spring Boot backend endpoint</span>
        </div>
        <span className="font-mono text-slate-500">2026 TERM</span>
      </div>
    </section>
  );
}

export default StudentsChart;
