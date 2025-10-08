import { useEffect, useState } from "react";
import lostFoundApi from "../api/lostFoundApi";
import dayjs from "dayjs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../resources/theme.css";

function StatsPage() {
  const [dailyStats, setDailyStats] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      const endOfDay = dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss");
      try {
        const daily = await lostFoundApi.getStatsDaily(endOfDay, 7);
        setDailyStats(daily);
        const monthly = await lostFoundApi.getStatsMonthly(endOfDay, 6);
        setMonthlyStats(monthly);
      } catch {
        console.error("Gagal ambil statistik");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <p>Loading statistik...</p>
      </div>
    );

  if (!dailyStats || !monthlyStats)
    return <p className="text-center text-danger">Gagal memuat statistik</p>;

  const dailyData = Object.entries(dailyStats.stats_losts).map(
    ([date, losts]) => ({
      date,
      losts,
      founds: dailyStats.stats_founds[date] || 0,
    })
  );
  const monthlyData = Object.entries(monthlyStats.stats_losts).map(
    ([month, losts]) => ({
      month,
      losts,
      founds: monthlyStats.stats_founds[month] || 0,
    })
  );

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h2>📊 Statistik Lost & Found</h2>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Statistik Harian (7 Hari Terakhir)</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="losts" fill="#f87171" name="Lost" />
              <Bar dataKey="founds" fill="#60a5fa" name="Found" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Statistik Bulanan (6 Bulan Terakhir)</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="losts" fill="#fb923c" name="Lost" />
              <Bar dataKey="founds" fill="#34d399" name="Found" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default StatsPage;
