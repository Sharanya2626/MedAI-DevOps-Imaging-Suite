const DataTable = ({ headings, rows }: { headings: string[]; rows: Array<string[]> }) => (
  <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5 p-4 shadow-soft backdrop-blur-xl">
    <table className="min-w-full text-left text-sm text-slate-200">
      <thead>
        <tr className="border-b border-slate-700/60 text-slate-400">
          {headings.map((heading) => (
            <th key={heading} className="py-3 px-4 font-normal uppercase tracking-[0.18em]">{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-b border-slate-700/50 last:border-none hover:bg-white/5">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="py-4 px-4">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DataTable;
