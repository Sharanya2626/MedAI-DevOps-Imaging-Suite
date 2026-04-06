import { useEffect, useState } from 'react';
import { fetchSettings } from '../services/settingsService';
import Loader from '../components/Loader';

const SettingsPage = () => {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchSettings();
        setSettings(data);
      } catch (err: any) {
        setError(err.message || 'Unable to load settings');
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
          <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
          <div className="mt-5 space-y-4 text-slate-300">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Name</p>
              <p className="mt-1 text-white">{settings.profile.name}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Email</p>
              <p className="mt-1 text-white">{settings.profile.email}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">System Controls</h2>
          <div className="mt-5 space-y-4 text-slate-300">
            <p>{settings.system.theme} theme enabled</p>
            <p>Notification channel: {settings.system.notifications}</p>
            <p>Auto update: {settings.system.autoUpdate ? 'Enabled' : 'Disabled'}</p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-white">Model Settings</h3>
          <div className="mt-5 space-y-4 text-slate-300">
            <p>Default model: {settings.model.defaultModel}</p>
            <p>Threshold: {settings.model.threshold}%</p>
            <p>Feedback integration: {settings.model.feedbackEnabled ? 'Active' : 'Inactive'}</p>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-white">Notifications</h3>
          <div className="mt-5 space-y-4 text-slate-300">
            <p>Alerts: {settings.notifications.alerts}</p>
            <p>Reports delivered: {settings.notifications.reports}</p>
            <p>Review frequency: {settings.notifications.frequency}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
