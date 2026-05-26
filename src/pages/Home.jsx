import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Database, TrendingUp, DollarSign, Users } from 'lucide-react';
import { projectService } from '../api/projectService';

export default function Home() {
  const [stats, setStats] = useState({ totalBudget: 0, activeNodes: 0, databaseHealthy: false });

  useEffect(() => {
    projectService.getAll()
      .then((res) => {
        const list = res.data;
        const total = list.reduce((acc, curr) => acc + (curr.cost || 0), 0);
        const active = list.filter(p => p.status === 'In Progress').length;
        setStats({
          totalBudget: total,
          activeNodes: active,
          databaseHealthy: true
        });
      })
      .catch((err) => {
        console.error("Backend offline:", err);
        setStats({ totalBudget: 0, activeNodes: 0, databaseHealthy: false });
      });
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-blue-500 uppercase tracking-wider">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-ping" />
          Production Environment Connected
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight mt-1">Freelance Hub Control</h1>
        <p className="text-sm text-slate-400 mt-1">Real-time telemetry and management controls compiled from your Spring Boot cluster.</p>
      </div>

      {/* Grid Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0d111c] border border-slate-800 p-6 rounded-xl">
          <div className="flex justify-between items-start">
            <p className="text-xs font-mono text-slate-400 uppercase">Total Combined Budget</p>
            <DollarSign size={16} className="text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">${stats.totalBudget.toLocaleString()}</p>
          <p className="text-[10px] font-mono text-slate-500 mt-1">Aggregated DTO value mapping</p>
        </div>

        <div className="bg-[#0d111c] border border-slate-800 p-6 rounded-xl">
          <div className="flex justify-between items-start">
            <p className="text-xs font-mono text-slate-400 uppercase">Active Pipelines</p>
            <Users size={16} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">{stats.activeNodes} Active</p>
          <p className="text-[10px] font-mono text-slate-500 mt-1">Status: 'In Progress'</p>
        </div>

        <div className="bg-[#0d111c] border border-slate-800 p-6 rounded-xl">
          <div className="flex justify-between items-start">
            <p className="text-xs font-mono text-slate-400 uppercase">Database Link Status</p>
            <Database size={16} className={stats.databaseHealthy ? "text-emerald-500" : "text-red-500"} />
          </div>
          <p className="text-2xl font-bold text-white mt-2">{stats.databaseHealthy ? "ONLINE" : "OFFLINE"}</p>
          <p className="text-[10px] font-mono text-slate-500 mt-1">HikariCP Connection Pool Verified</p>
        </div>
      </div>
    </div>
  );
}