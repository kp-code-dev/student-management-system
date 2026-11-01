
import PageHeader from "@/components/shared/PageHeader";
import StatsCards from "@/features/dashboard/components/StatsCards";
import StudentsChart from "@/features/dashboard/components/StudentsChart";
import RecentActivity from "@/features/dashboard/components/RecentActivity";
import RecentStudents from "@/features/dashboard/components/RecentStudents";

function Dashboard() {
  return (
    <div className="space-y-7">
      <PageHeader
        title="Dashboard Overview"
        description="Welcome back! Here's what's happening with your institution."
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
