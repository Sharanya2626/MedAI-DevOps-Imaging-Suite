import { useEffect, useState } from 'react';
import { fetchDrift } from '../services/driftService';
import Loader from '../components/Loader';

const DataDriftPage = () => {
  const [drift, setDrift] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchDrift();
        setDrift(data);
      } catch (err: any) {
        setError(err.message || 'Unable to load drift data');
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
        {drift.cards.map((card: any) => (
          <div key={card.label} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">{card.label}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{card.score}</p>
            <p className="mt-2 text-slate-400">{card.status}</p>
          </div>
        ))}
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
        <h2 className="text-xl font-semibold text-white">Drift Summary</h2>
        <div className="mt-6 space-y-4">
          {drift.details.map((item: any) => (
            <div key={item.feature} className="space-y-2">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>{item.feature}</span>
                <span>{item.driftLevel}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-900">
                <div className={`h-full rounded-full ${item.severity === 'high' ? 'bg-danger' : 'bg-accent'}`} style={{ width: `${item.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataDriftPage;
