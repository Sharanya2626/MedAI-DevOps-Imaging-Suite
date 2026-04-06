import { useEffect, useState } from 'react';
import { fetchDeployments } from '../services/deployService';
import Loader from '../components/Loader';

const CDDeployPage = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const result = await fetchDeployments();
        setData(result);
      } catch (err: any) {
        setError(err.message || 'Unable to load deployments');
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
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
        <h2 className="text-xl font-semibold text-white">Deployment Overview</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-950/40 p-5">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Environment</p>
            <p className="mt-3 text-2xl font-semibold text-white">{data.environment}</p>
            <p className="mt-2 text-sm text-slate-400">{data.description}</p>
          </div>
          <div className="rounded-3xl bg-slate-950/40 p-5">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Last Deployed</p>
            <p className="mt-3 text-2xl font-semibold text-white">{data.lastVersion}</p>
            <p className="mt-2 text-sm text-slate-400">{data.lastDeployed}</p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-white">Deployment Log</h3>
          <div className="mt-4 space-y-3 text-slate-300">
            {data.logs.map((log: string, index: number) => (
              <p key={index} className="rounded-3xl bg-slate-950/40 p-3">{log}</p>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-white">Rollback</h3>
          <p className="mt-3 text-slate-400">If a deployment issue is detected, initiate a rollback to the previous stable model version.</p>
          <button className="mt-6 inline-flex rounded-3xl bg-warning px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-warning/90">
            Initiate rollback
          </button>
        </div>
      </div>
    </div>
  );
};

export default CDDeployPage;
