import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { fetchDashboard } from '../services/dashboardService';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import Loader from '../components/Loader';

const DashboardPage = () => {
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchDashboard();
        setDashboard(data);
      } catch (err: any) {
        setError(err.message || 'Unable to load dashboard');
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
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Model Accuracy" value={`${dashboard.modelAccuracy}%`} detail="Average precision across test sets" accent="text-accent" />
        <StatCard title="True Positives" value={`${dashboard.truePositives}`} detail="Confident positive diagnoses" accent="text-success" />
        <StatCard title="False Negatives" value={`${dashboard.falseNegatives}`} detail="Missed abnormal cases" accent="text-warning" />
        <StatCard title="Training Epochs" value={`${dashboard.epochs}`} detail="Current model training run" accent="text-accent2" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <ChartCard title="Training vs Validation" description="Loss and accuracy curves for the latest model run">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dashboard.trainingHistory} margin={{ left: -16, right: 10, top: 12, bottom: 4 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#334155" />
              <XAxis dataKey="epoch" tick={{ fill: '#94a3b8' }} />
              <YAxis tick={{ fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155' }} />
              <Line type="monotone" dataKey="trainLoss" stroke="#4f9eff" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="valLoss" stroke="#8d5cff" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
            <h2 className="text-lg font-semibold text-white">Confusion Matrix</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-slate-200 sm:grid-cols-4">
              {dashboard.confusionMatrix.map((entry: any) => (
                <div key={entry.label} className="rounded-3xl bg-slate-950/40 p-4">
                  <p className="text-slate-400">{entry.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{entry.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
            <h2 className="text-lg font-semibold text-white">Live Status</h2>
            <div className="mt-5 space-y-3">
              {dashboard.liveStatus.map((status: any) => (
                <div key={status.label} className="flex items-center justify-between rounded-3xl bg-slate-950/40 px-4 py-3">
                  <div>
                    <p className="text-sm text-slate-400">{status.label}</p>
                    <p className="mt-1 text-base font-medium text-white">{status.value}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.badge === 'stable' ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning'}`}>
                    {status.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
