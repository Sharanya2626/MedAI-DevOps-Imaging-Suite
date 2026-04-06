import { useEffect, useState } from 'react';
import { fetchCNNModels } from '../services/modelsService';
import Loader from '../components/Loader';
import DataTable from '../components/DataTable';

const CNNModelsPage = () => {
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchCNNModels();
        setModels(data.models);
      } catch (err: any) {
        setError(err.message || 'Unable to load CNN models');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="rounded-3xl bg-danger/10 p-8 text-danger">{error}</div>;

  const rows = models.map((model) => [
    model.name,
    model.inputShape,
    model.optimizer,
    model.lossFunction,
    model.status
  ]);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
        <h2 className="text-xl font-semibold text-white">CNN Architecture Overview</h2>
        <p className="mt-2 text-slate-400">Active model batches, training hyperparameters and recent metric summary.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {models.map((model) => (
            <div key={model.name} className="rounded-3xl bg-slate-950/40 p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">{model.name}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{model.accuracy}%</p>
              <p className="mt-2 text-sm text-slate-400">Input shape: {model.inputShape}</p>
              <p className="mt-1 text-sm text-slate-400">Optimizer: {model.optimizer}</p>
              <p className="mt-1 text-sm text-slate-400">Loss: {model.lossFunction}</p>
            </div>
          ))}
        </div>
      </div>
      <DataTable headings={['Model', 'Input', 'Optimizer', 'Loss', 'Status']} rows={rows} />
    </div>
  );
};

export default CNNModelsPage;
