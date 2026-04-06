import { ReactNode } from 'react';

const ChartCard = ({ title, description, children }: { title: string; description: string; children: ReactNode }) => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
    <div className="mb-4 flex items-center justify-between gap-2">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-slate-400">{title}</p>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
    </div>
    <div className="h-[280px]">{children}</div>
  </div>
);

export default ChartCard;
