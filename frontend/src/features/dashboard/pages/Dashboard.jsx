import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/shared/PageHeader";
import StatsCards from "@/features/dashboard/components/StatsCards";
import StudentsChart from "@/features/dashboard/components/StudentsChart";
import RecentActivity from "@/features/dashboard/components/RecentActivity";
import RecentStudents from "@/features/dashboard/components/RecentStudents";

function Dashboard() {
  const navigate = useNavigate();

  const user = (() => {
    try {
      return (
        JSON.parse(localStorage.getItem("user")) || {
          name: "Admin User",
        }
      );
    } catch {
      return { name: "Admin User" };
    }
  })();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title={
          <>
            Welcome back, {user.name}{" "}
            <span className="inline-block animate-pulse text-2xl">✨</span>
          </>
        }
        description="Here's what's happening across your academic institutions today."
        action={
          <>
            <div className="frosted-pill flex items-center gap-2 rounded-full px-4 py-2.5">
              <span className="material-symbols-outlined text-[18px] text-cyan-300">
                calendar_today
              </span>
              <span className="text-[13px] font-semibold text-slate-200">
                {today}
              </span>
            </div>

            <button
              onClick={() => navigate("/students")}
              type="button"
              className="group relative inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 text-[13px] font-bold text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.45)] transition-all hover:scale-105 hover:shadow-[0_0_35px_rgba(245,158,11,0.7)] active:scale-95"
            >
              <span className="material-symbols-outlined font-bold text-[18px] transition-transform group-hover:rotate-90">
                add
              </span>
              <span>Add Student</span>
            </button>
          </>
        }
      />

      <StatsCards />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <StudentsChart />
        </div>

        <div>
          <RecentActivity />
        </div>
      </div>

      <RecentStudents />
    </div>
  );
}

export default Dashboard;
