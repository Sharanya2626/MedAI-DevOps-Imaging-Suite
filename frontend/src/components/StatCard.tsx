const StatCard = ({ title, value, detail, accent }: { title: string; value: string; detail: string; accent: string }) => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
    <p className="text-sm uppercase tracking-[0.28em] text-slate-400">{title}</p>
    <h3 className={`mt-4 text-3xl font-semibold ${accent}`}>{value}</h3>
    <p className="mt-2 text-sm text-slate-400">{detail}</p>
  </div>
);

export default StatCard;
