import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('clinician@medai.dev');
  const [password, setPassword] = useState('Password123!');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      await login(email, password, remember);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
      <div className="w-full max-w-xl rounded-[32px] border border-white/10 bg-panel/95 p-10 shadow-soft backdrop-blur-xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">MedAI-DevOps Imaging Suite</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Clinician / Administrator Login</h1>
          <p className="mt-3 text-slate-400">Secure access to the medical AI monitoring dashboard and pipeline controls.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-slate-300">Email or User ID</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-accent"
              placeholder="clinician@medai.dev"
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-accent"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-slate-400">
            <label className="inline-flex items-center gap-3">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember((prev) => !prev)}
                className="h-4 w-4 rounded border-white/20 bg-white/5 text-accent focus:ring-accent"
              />
              Remember session
            </label>
            <button type="button" className="text-accent hover:text-white">Forgot password?</button>
          </div>
          {error && <div className="rounded-3xl bg-danger/10 px-4 py-3 text-sm text-danger">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-3xl bg-accent px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-accent2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign in to dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
