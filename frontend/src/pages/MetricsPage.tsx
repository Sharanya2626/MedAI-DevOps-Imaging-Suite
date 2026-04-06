import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchMetrics } from '../services/metricsService';
import Loader from '../components/Loader';
import DataTable from '../components/DataTable';

const MetricsPage = () => {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchMetrics();
        setMetrics(data.epochs);
      } catch (err: any) {
        setError(err.message || 'Unable to load metrics');
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
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">Epoch Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metrics} margin={{ top: 20, right: 10, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#334155" />
              <XAxis dataKey="epoch" tick={{ fill: '#94a3b8' }} />
              <YAxis tick={{ fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155' }} />
              <Line type="monotone" dataKey="accuracy" stroke="#4f9eff" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="valAccuracy" stroke="#8d5cff" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <DataTable
          headings={['Epoch', 'Loss', 'Accuracy', 'Val Loss', 'Val Accuracy']}
          rows={metrics.map((row) => [
            String(row.epoch),
            row.loss.toFixed(3),
            `${row.accuracy}%`,
            row.valLoss.toFixed(3),
            `${row.valAccuracy}%`
          ])}
        />
      </div>
    </div>
  );
};

export default MetricsPage;
