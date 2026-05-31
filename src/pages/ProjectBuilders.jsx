import React from 'react';
import { Clock, ShieldCheck } from 'lucide-react';

export default function ProjectBuilders() {
  const builders = [
    {
      name: "Mohammad Talha Khan",
      role: "Backend Architect",
      bio: "Engineered the robust Spring Boot REST API, relational database mappings, custom DTO serialization schemas, and partial patch data pipelines.",
      avatar: "MT",
      buildTime: "15 Days",
      avatarBg: "bg-indigo-600 shadow-md shadow-indigo-600/20 text-white"
    },
    {
      name: "Daksh Sevkani",
      role: "Frontend & UI Pipeline",
      bio: "Designed the dynamic dashboard states, unified the responsive structural layouts, and configured the asset compilation using the Tailwind v4 engine.",
      avatar: "DS",
      buildTime: "10 Days",
      avatarBg: "bg-indigo-500 shadow-md shadow-indigo-500/20 text-white"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Heading Block - High contrast Slate-900 Black */}
      <div>
        <div className="text-xs font-mono font-extrabold text-indigo-600 uppercase tracking-wider mb-1">
          Development Registry
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Engineering Core</h1>
        <p className="text-sm font-bold text-slate-500 mt-0.5">The development context profile details and assembly execution telemetry.</p>
      </div>

      {/* Recreated Original Cards - Now styled with the clean white Project Engine look! */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {builders.map((builder, index) => (
          <div 
            key={index} 
            className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-6 flex flex-col justify-between transition-all shadow-xs group"
          >
            <div>
              {/* Card Header (Avatar + Name & Role) */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center font-black text-sm shrink-0 font-mono ${builder.avatarBg}`}>
                  {builder.avatar}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors text-sm leading-snug">
                    {builder.name}
                  </h3>
                  <p className="text-xs font-mono font-bold text-indigo-600 mt-0.5">
                    {builder.role}
                  </p>
                </div>
              </div>

              {/* Bio Content Box */}
              <div className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-100 p-4 rounded-xl leading-relaxed mb-4 min-h-[76px]">
                {builder.bio}
              </div>
            </div>

            {/* Card Footer Utilities */}
            <div className="flex justify-between items-center pt-3 border-t border-slate-100 font-mono text-[10px] font-black">
              <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 text-slate-700">
                <Clock size={12} className="text-slate-400" />
                <span>Build Time: {builder.buildTime}</span>
              </div>
              
              <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                <ShieldCheck size={12} />
                <span className="tracking-wide uppercase">Verified System Node</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}