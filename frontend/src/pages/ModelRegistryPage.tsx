import { useEffect, useState } from 'react';
import { fetchRegistry } from '../services/registryService';
import Loader from '../components/Loader';
import DataTable from '../components/DataTable';

const ModelRegistryPage = () => {
  const [registry, setRegistry] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchRegistry();
        setRegistry(data.models);
      } catch (err: any) {
        setError(err.message || 'Unable to load model registry');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="rounded-3xl bg-danger/10 p-8 text-danger">{error}</div>;

  const rows = registry.map((item) => [
    item.name,
    item.version,
    `${item.accuracy}%`,
    item.status,
    item.createdAt,
    item.deployed ? 'Deployed' : 'Pending'
  ]);

  return (
    <div className="space-y-8">
      <DataTable headings={['Name', 'Version', 'Accuracy', 'Status', 'Created', 'Deployment']} rows={rows} />
    </div>
  );
};

export default ModelRegistryPage;
