import { useEffect, useState } from 'react';
import { fetchPipeline } from '../services/pipelineService';
import Loader from '../components/Loader';
import DataTable from '../components/DataTable';

const CIPipelinePage = () => {
  const [pipeline, setPipeline] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchPipeline();
        setPipeline(data);
      } catch (err: any) {
        setError(err.message || 'Unable to load pipeline data');
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
        {pipeline.stages.map((stage: any) => (
          <div key={stage.name} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">{stage.name}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{stage.status}</p>
            <p className="mt-2 text-sm text-slate-400">{stage.detail}</p>
          </div>
        ))}
      </div>
      <DataTable
        headings={['Run ID', 'Status', 'Duration', 'Triggered']}
        rows={pipeline.runs.map((run: any) => [run.id, run.status, run.duration, run.triggered])}
      />
    </div>
  );
};

export default CIPipelinePage;
