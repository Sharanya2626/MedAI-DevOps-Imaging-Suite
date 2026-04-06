import { Link, useLocation } from 'react-router-dom';
import navItems from '../data/navItems';

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const location = useLocation();

  return (
    <aside className={`space-y-8 overflow-y-auto border-r border-white/10 bg-panel/95 p-5 transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'}`}>
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-3xl bg-gradient-to-br from-accent to-accent2" />
        {!collapsed && (
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">MedAI</p>
            <h2 className="text-lg font-semibold text-white">Imaging Suite</h2>
          </div>
        )}
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm transition ${active ? 'bg-accent/20 text-white shadow-soft' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
