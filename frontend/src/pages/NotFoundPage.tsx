import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10 text-center">
    <div className="rounded-[32px] border border-white/10 bg-panel/95 p-12 shadow-soft backdrop-blur-xl">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-500">404 Error</p>
      <h1 className="mt-6 text-5xl font-semibold text-white">Page not found</h1>
      <p className="mt-4 text-slate-400">The requested route doesn’t exist in the MedAI-DevOps Imaging Suite.</p>
      <Link to="/" className="mt-8 inline-flex rounded-3xl bg-accent px-6 py-3 font-semibold text-slate-900 transition hover:bg-accent2">
        Return to Dashboard
      </Link>
    </div>
  </div>
);

export default NotFoundPage;
