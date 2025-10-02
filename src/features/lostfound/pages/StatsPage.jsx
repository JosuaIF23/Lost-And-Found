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

function StatsPage() {
  const [dailyStats, setDailyStats] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);

   
        const endOfDay = dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss");

        // --- Daily ---
        try {
          const daily = await lostFoundApi.getStatsDaily(endOfDay, 7);
          setDailyStats(daily);
        } catch (err) {
          console.error("Daily gagal:", err.message);
          // fallback dummy biar UI tetap jalan
          setDailyStats({
            stats_losts: { "00-00-0000": 0 },
            stats_founds: { "00-00-0000": 0 },
            stats_losts_process: { "00-00-0000": 0 },
            stats_losts_completed: { "00-00-0000": 0 },
            stats_founds_process: { "00-00-0000": 0 },
            stats_founds_completed: { "00-00-0000": 0 },
          });
        }

        // --- Monthly ---
        try {
          const monthly = await lostFoundApi.getStatsMonthly(endOfDay, 6);
          setMonthlyStats(monthly);
        } catch (err) {
          console.error("Monthly gagal:", err.message);
          setMonthlyStats({
            stats_losts: { "00-0000": 0 },
            stats_founds: { "00-0000": 0 },
            stats_losts_process: { "00-0000": 0 },
            stats_losts_completed: { "00-0000": 0 },
            stats_founds_process: { "00-0000": 0 },
            stats_founds_completed: { "00-0000": 0 },
          });
        }
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading statistik...</p>
      </div>
    );
  }

  if (!dailyStats || !monthlyStats) {
    return <p className="text-center text-danger mt-4">❌ Gagal memuat statistik</p>;
  }

  // transform data daily
  const dailyData = Object.entries(dailyStats.stats_losts).map(
    ([date, losts]) => ({
      date,
      losts,
      founds: dailyStats.stats_founds[date] || 0,
    })
  );

  // transform data monthly
  const monthlyData = Object.entries(monthlyStats.stats_losts).map(
    ([month, losts]) => ({
      month,
      losts,
      founds: monthlyStats.stats_founds[month] || 0,
    })
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">📊 Lost & Found Statistics</h1>

      {/* Daily Stats */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Daily Stats ( Hari ini terakhir)</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="losts" fill="#ff6b6b" name="Lost Items" />
              <Bar dataKey="founds" fill="#4dabf7" name="Found Items" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Stats */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Monthly Stats (6 bulan terakhir)</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="losts" fill="#ff922b" name="Lost Items" />
              <Bar dataKey="founds" fill="#40c057" name="Found Items" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default StatsPage;
