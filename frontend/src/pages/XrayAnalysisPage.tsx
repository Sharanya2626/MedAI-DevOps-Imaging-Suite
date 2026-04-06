import { useEffect, useState } from 'react';
import { fetchXrayCases } from '../services/xrayService';
import Loader from '../components/Loader';

const XrayAnalysisPage = () => {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchXrayCases();
        setCases(data.cases);
      } catch (err: any) {
        setError(err.message || 'Unable to load X-ray cases');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="rounded-3xl bg-danger/10 p-8 text-danger">{error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">X-ray Case Review</h2>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cases.map((item) => (
          <div key={item.id} className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft backdrop-blur-xl">
            <div className="h-48 rounded-3xl bg-slate-950/50 p-4">
              <div className="flex h-full items-center justify-center text-slate-500">X-ray preview</div>
            </div>
            <div className="mt-5 space-y-2">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">{item.caseId}</p>
              <h3 className="text-lg font-semibold text-white">{item.prediction}</h3>
              <p className="text-sm text-slate-400">Confidence: {item.confidence}%</p>
              <p className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.category === 'abnormal' ? 'bg-danger/15 text-danger' : 'bg-success/15 text-success'}`}> {item.category} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default XrayAnalysisPage;
