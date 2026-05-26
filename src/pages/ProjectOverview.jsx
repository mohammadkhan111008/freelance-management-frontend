import React from 'react';
import { BookOpen, Code, Server, CheckCircle2 } from 'lucide-react';

export default function ProjectOverview() {
  return (
    <div className="space-y-8 text-slate-800">
      <div>
        <div className="text-xs font-mono font-extrabold text-indigo-600 uppercase tracking-wider mb-1">
          System Documentation
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Project Overview</h1>
        <p className="text-sm font-bold text-slate-500 mt-0.5">An analysis of the FreelanceHub architecture, compilation pipelines, and data layer integrations.</p>
      </div>

      {/* Intro Card */}
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-3">
        <div className="flex items-center gap-2.5 text-slate-900">
          <BookOpen className="text-indigo-600" size={18} />
          <h2 className="text-base font-extrabold">Introduction</h2>
        </div>
        <p className="text-xs font-bold text-slate-600 leading-relaxed">
          FreelanceHub is a decoupled operational panel designed to manage freelance contracts, process budgetary valuations, 
          and trace real-time execution milestones. By separating core persistent tracking states from presentation components, 
          the platform maintains high processing speeds and clean atomic data commits.
        </p>
      </div>

      {/* Build Process Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-slate-900">
            <Code className="text-indigo-600" size={18} />
            <h2 className="text-base font-extrabold">The Frontend Pipeline</h2>
          </div>
          <p className="text-xs font-bold text-slate-600 leading-relaxed">
            The view layer is built on React 18, bundled and managed using Vite's lightning-fast hot module replacement. 
            Styling layout rules are rendered directly through the Tailwind v4 token system, which processes utility tags without 
            relying on legacy configuration scripts.
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-slate-900">
            <Server className="text-indigo-600" size={18} />
            <h2 className="text-base font-extrabold">The Backend Cluster</h2>
          </div>
          <p className="text-xs font-bold text-slate-600 leading-relaxed">
            Data mutations are handled through a high-performance Spring Boot REST microservice. It utilizes ModelMapper to filter inbound 
            DTO structures, validates integrity with Lombok modifiers, and uses a Spring Data JPA abstraction engine to pipe updates straight into database tables.
          </p>
        </div>
      </div>

      {/* Stack List */}
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900">Verified Integration Specifications</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold text-slate-700">
          <div className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <CheckCircle2 size={14} className="text-emerald-600" />
            <span>Spring Boot REST Controllers & DTO Mappings</span>
          </div>
          <div className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <CheckCircle2 size={14} className="text-emerald-600" />
            <span>Tailwind v4 CSS Compilation Engine</span>
          </div>
          <div className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <CheckCircle2 size={14} className="text-emerald-600" />
            <span>Asynchronous Axios HTTP Client Gateways</span>
          </div>
          <div className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <CheckCircle2 size={14} className="text-emerald-600" />
            <span>Framer Motion Local Viewport Interpolations</span>
          </div>
        </div>
      </div>
    </div>
  );
}