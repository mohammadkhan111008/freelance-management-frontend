import React from 'react';

export default function StatusBadge({ status }) {
  const getStyle = () => {
    switch (status) {
      case 'Completed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'In Progress': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    }
  };

  return (
    <span className={`text-[10px] font-mono font-medium px-2 py-1 rounded border ${getStyle()}`}>
      {status}
    </span>
  );
}