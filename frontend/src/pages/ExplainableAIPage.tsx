import { useEffect, useState } from 'react';
import { fetchXAI } from '../services/xaiService';
import Loader from '../components/Loader';

const ExplainableAIPage = () => {
  const [xai, setXai] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchXAI();
        setXai(data);
      } catch (err: any) {
        setError(err.message || 'Unable to load explainability data');
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
          <h2 className="text-xl font-semibold text-white">Feature Importance</h2>
          <div className="mt-6 space-y-4">
            {xai.features.map((feature: any) => (
              <div key={feature.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>{feature.name}</span>
                  <span>{feature.importance}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-900">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${feature.importance}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">Interpretability Summary</h2>
          <p className="mt-4 text-slate-400">{xai.summary}</p>
          <div className="mt-6 grid gap-4">
            {xai.cards.map((card: any) => (
              <div key={card.title} className="rounded-3xl bg-slate-950/40 p-4">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">{card.title}</p>
                <p className="mt-2 text-white">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplainableAIPage;
