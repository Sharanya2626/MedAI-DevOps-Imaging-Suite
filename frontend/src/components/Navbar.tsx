import { BellIcon, ArrowRightOnRectangleIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { useMemo } from 'react';

const Navbar = ({ onToggle }: { onToggle: () => void }) => {
  const { user, logout } = useAuth();
  const clock = useMemo(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), []);

  return (
    <header className="flex items-center justify-between gap-4 border-b border-white/10 bg-panel/90 px-4 py-4 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <button onClick={onToggle} className="rounded-2xl bg-white/5 p-2 text-slate-300 transition hover:bg-white/10">
          <ComputerDesktopIcon className="h-5 w-5" />
        </button>
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">MedAI Operational Suite</p>
          <h1 className="text-xl font-semibold text-white">DevOps Imaging Dashboard</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="rounded-2xl bg-white/5 px-3 py-2 text-sm text-slate-300">{clock}</span>
        <button className="rounded-2xl bg-white/5 p-2 text-slate-300 transition hover:bg-white/10">
          <BellIcon className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3 rounded-3xl bg-white/5 px-4 py-2 text-sm text-slate-100">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-accent to-accent2" />
          <div>
            <p className="font-semibold">{user?.name || 'Clinician'}</p>
            <p className="text-xs text-slate-400">{user?.role || 'Admin'}</p>
          </div>
        </div>
        <button onClick={logout} className="rounded-2xl bg-danger/15 px-3 py-2 text-sm text-danger transition hover:bg-danger/25">
          <ArrowRightOnRectangleIcon className="inline h-4 w-4 align-text-bottom" /> Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
