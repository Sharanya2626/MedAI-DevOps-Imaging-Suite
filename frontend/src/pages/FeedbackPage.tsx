import { useEffect, useState } from 'react';
import { fetchFeedback } from '../services/feedbackService';
import Loader from '../components/Loader';

const stars = (count: number) => '★'.repeat(count) + '☆'.repeat(5 - count);

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchFeedback();
        setFeedback(data.reviews);
      } catch (err: any) {
        setError(err.message || 'Unable to load feedback');
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
      <h2 className="text-xl font-semibold text-white">User Feedback</h2>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {feedback.map((item) => (
          <div key={item.id} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-white">{item.author}</p>
              <span className="text-sm text-slate-400">{stars(item.rating)}</span>
            </div>
            <p className="mt-3 text-slate-400">{item.comment}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag: string) => (
                <span key={tag} className="rounded-full bg-slate-950/40 px-3 py-1 text-xs text-slate-300">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage;
