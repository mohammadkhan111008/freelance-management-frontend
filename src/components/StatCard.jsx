import React from 'react';

// Notice the "export default" right at the front!
export default function StatCard({ title, value, change }) {
  return (
    <div className="bg-space-800 border border-slate-800/80 rounded-xl p-5 font-mono">
      <p className="text-[11px] text-slate-500 uppercase tracking-wider">{title}</p>
      <p className="text-xl font-bold text-white mt-1.5 tracking-tight">{value}</p>
      <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/10 inline-block mt-2">
        {change}
      </span>
    </div>
  );
}