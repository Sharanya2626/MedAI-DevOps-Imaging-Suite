const Loader = () => (
  <div className="flex min-h-[280px] items-center justify-center rounded-3xl bg-white/5 p-8 text-slate-300">
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      <p>Loading medical AI insights...</p>
    </div>
  </div>
);

export default Loader;
