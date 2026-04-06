import { useEffect, useState } from 'react';
import { fetchMonitoring } from '../services/monitoringService';
import Loader from '../components/Loader';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const MonitoringPage = () => {
  const [monitoring, setMonitoring] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchMonitoring();
        setMonitoring(data);
      } catch (err: any) {
        setError(err.message || 'Unable to load monitoring metrics');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="rounded-3xl bg-danger/10 p-8 text-danger">{error}</div>;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">API Uptime</p>
          <p className="mt-3 text-3xl font-semibold text-white">{monitoring.uptime}%</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Model Latency</p>
          <p className="mt-3 text-3xl font-semibold text-white">{monitoring.latency} ms</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">System Alerts</p>
          <p className="mt-3 text-3xl font-semibold text-white">{monitoring.alerts}</p>
        </div>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
        <h2 className="text-xl font-semibold text-white">Resource Usage</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monitoring.resources} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#334155" />
            <XAxis dataKey="metric" tick={{ fill: '#94a3b8' }} />
            <YAxis tick={{ fill: '#94a3b8' }} />
            <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155' }} />
            <Bar dataKey="value" fill="#4f9eff" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonitoringPage;
