import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Clock } from 'lucide-react';

export default function ProjectBuilders() {
  const team = [
    { 
      name: 'Mohammad Talha Khan', 
      role: 'Backend Architect', 
      bio: 'Engineered the robust Spring Boot REST API, relational database mappings, custom DTO serialization schemas, and partial patch data pipelines.', 
      initial: 'MT',
      timeframe: '15 Days'
    },
    { 
      name: 'Gemini AI', 
      role: 'Frontend & UI Pipeline', 
      bio: 'Designed the dynamic dashboard states, unified the responsive structural layouts, and configured the asset compilation using the Tailwind v4 engine.', 
      initial: 'G',
      timeframe: '2 Days'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Engineering Core</h1>
        <p className="text-sm text-slate-400">The developers responsible for the architecture and lifecycle operations of this system.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {team.map((member, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            className="bg-[#0d111c] border border-slate-800 hover:border-slate-700/80 rounded-xl p-6 flex flex-col justify-between transition-all duration-200"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-mono font-bold text-white text-base shadow-md">
                  {member.initial}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{member.name}</h3>
                  <p className="text-xs text-blue-400 font-mono mt-0.5">{member.role}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed bg-[#070a13]/40 border border-slate-800/80 p-3 rounded-lg font-sans">
                {member.bio}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-slate-800/60 pt-4 mt-6">
              {/* Development metrics tracker replacing the old technology badges */}
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-300 bg-[#1e2638] border border-slate-700 px-2.5 py-1 rounded">
                <Clock size={11} className="text-blue-400" />
                <span>Build Time: {member.timeframe}</span>
              </div>
              
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                <Cpu size={10} className="text-emerald-500 animate-pulse" />
                <span>Verified System Node</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}