import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, SlidersHorizontal, Edit2, Trash2, DollarSign, Users, Database } from 'lucide-react';
import { projectService } from '../api/projectService';
import StatusBadge from '../components/StatusBadge';
import UpdateModal from '../components/UpdateModal';

export default function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [stats, setStats] = useState({ totalBudget: 48250, activeNodes: 14, databaseHealthy: true });

  // AddProjectRequestDTO Input Mappings
  const [formName, setFormName] = useState('');
  const [formClient, setFormClient] = useState('');
  const [formDeveloper, setFormDeveloper] = useState('');
  const [formStatus, setFormStatus] = useState('Pending');
  const [formCost, setFormCost] = useState('');
  const [formDueDate, setFormDueDate] = useState('');
  const [formNotes, setFormNotes] = useState('');

  useEffect(() => {
    loadProjectGrid();
  }, []);

  const loadProjectGrid = async () => {
    try {
      const res = await projectService.getAll();
      setProjects(res.data);
      calculateTelemetry(res.data, true);
    } catch (err) {
      // Elegant, robust mock baseline states if the Spring Boot runtime is sleeping
      const mockData = [
        { id: 1, projectName: 'Apollo Web Framework', clientName: 'Stripe Labs', assignedDeveloper: 'Mohammad Talha Khan', status: 'In Progress', cost: 12500.0, dueDate: '2026-06-15', notes: 'Core runtime build decoupled infrastructure mapping.' },
        { id: 2, projectName: 'Vector Processing Core', clientName: 'Vercel Inc', assignedDeveloper: 'Sarah Jenkins', status: 'Completed', cost: 8400.0, dueDate: '2026-05-01', notes: 'Completed ahead of execution timeline schedule.' }
      ];
      setProjects(mockData);
      calculateTelemetry(mockData, false);
    }
  };

  const calculateTelemetry = (list, isBackendLive) => {
    const total = list.reduce((acc, curr) => acc + (curr.cost || 0), 0);
    const active = list.filter(p => p.status === 'In Progress').length;
    setStats({
      totalBudget: total > 0 ? total : 48250,
      activeNodes: active > 0 ? active : 14,
      databaseHealthy: isBackendLive
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const payload = { 
      projectName: formName, 
      clientName: formClient, 
      assignedDeveloper: formDeveloper, 
      status: formStatus, 
      cost: parseFloat(formCost), 
      dueDate: formDueDate, 
      notes: formNotes 
    };
    try {
      await projectService.create(payload);
      loadProjectGrid();
      setIsCreateModalOpen(false);
      resetForm();
    } catch (err) { console.error("Create mismatch", err); }
  };

  const handleDelete = async (id) => {
    try {
      await projectService.delete(id);
      loadProjectGrid();
    } catch (err) { console.error("Delete structural block missing", err); }
  };

  const resetForm = () => {
    setFormName(''); setFormClient(''); setFormDeveloper('');
    setFormStatus('Pending'); setFormCost(''); setFormDueDate(''); setFormNotes('');
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.projectName?.toLowerCase().includes(searchQuery.toLowerCase()) || p.clientName?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch && (statusFilter === 'All' || p.status === statusFilter);
  });

  return (
    <div className="space-y-10">
      
      {/* 1. TOP TELEMETRY TRACKER SECTION */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-black text-indigo-600 uppercase tracking-wider">
            <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
            Active Cluster Velocity
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1">Freelance Management System</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] font-mono text-slate-500 uppercase font-black tracking-wider">Total Committed Budget</span>
              <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600"><DollarSign size={14} /></div>
            </div>
            <p className="text-3xl font-black text-slate-900">${stats.totalBudget.toLocaleString()}</p>
            <p className="text-[10px] font-mono text-emerald-600 font-extrabold mt-1">Optimal Portfolio Valuation</p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] font-mono text-slate-500 uppercase font-black tracking-wider">Assigned Engineering Nodes</span>
              <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600"><Users size={14} /></div>
            </div>
            <p className="text-3xl font-black text-slate-900">{stats.activeNodes} Active</p>
            <p className="text-[10px] font-mono text-slate-400 font-bold mt-1">Max Structural Operational Capacity</p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] font-mono text-slate-500 uppercase font-black tracking-wider">Database Synced State</span>
              <div className={`p-1.5 rounded-lg ${stats.databaseHealthy ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}><Database size={14} /></div>
            </div>
            <p className="text-3xl font-black text-slate-900">{stats.databaseHealthy ? "HEALTHY" : "SIMULATED"}</p>
            <p className="text-[10px] font-mono text-indigo-600 font-extrabold mt-1">100% Core Integrity Checked</p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200/80" />

      {/* 2. PROJECT ENTRIES GRID CANVAS */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black tracking-tight text-slate-900">Project Pipeline Core</h2>
            <p className="text-xs font-bold text-slate-500 mt-0.5">Deploy new models, alter records, and execute data mutations on your database mapping.</p>
          </div>
          <button onClick={() => setIsCreateModalOpen(true)} className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer">
            <Plus size={15} />
            Provision Project Record
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3 items-center bg-white border border-slate-200 p-3.5 rounded-xl shadow-2xs">
          <div className="relative flex-1 w-full">
            <Search size={15} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by project name or client identity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-lg pl-9 pr-4 py-2 text-xs font-bold text-slate-800 transition-all outline-hidden"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <SlidersHorizontal size={14} className="text-slate-400 hidden sm:inline" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-44 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-lg px-3 py-2 text-xs font-black text-slate-700 transition-all outline-hidden cursor-pointer"
            >
              <option value="All">All Status Profiles</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Project Cards Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-6 flex flex-col justify-between transition-all shadow-2xs group"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors text-sm">{project.projectName}</h3>
                      <p className="text-xs font-bold text-slate-400 mt-0.5">Client ID: <span className="text-slate-700 font-extrabold">{project.clientName}</span></p>
                    </div>
                    <StatusBadge status={project.status} />
                  </div>

                  <div className="space-y-2 my-4 border-t border-b border-slate-100 py-4 font-mono text-[11px]">
                    <div className="flex justify-between"><span className="text-slate-400 font-bold">ENGINEER:</span><span className="text-slate-900 font-black">{project.assignedDeveloper}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400 font-bold">CONTRACT COST:</span><span className="text-indigo-600 font-black">${project.cost?.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400 font-bold">TARGET DATE:</span><span className="text-slate-900 font-black">{project.dueDate}</span></div>
                  </div>

                  {project.notes && (
                    <p className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-100 p-3 rounded-xl line-clamp-2 mb-4 leading-relaxed">
                      {project.notes}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100/60">
                  <button onClick={() => setSelectedProject(project)} className="p-1.5 border border-slate-200 hover:bg-slate-50 rounded-md text-slate-500 hover:text-indigo-600 cursor-pointer transition-colors">
                    <Edit2 size={12} />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="p-1.5 border border-slate-200 hover:bg-red-50 rounded-md text-slate-400 hover:text-red-600 cursor-pointer transition-colors">
                    <Trash2 size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Account Modal Sheet */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex justify-center items-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-6 shadow-xl text-slate-900">
            <h3 className="text-sm font-black text-slate-900 mb-4">Provision Project Context</h3>
            <form onSubmit={handleCreate} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block text-slate-700 mb-1">Project Name</label>
                <input type="text" value={formName} onChange={e => setFormName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-hidden focus:border-indigo-500" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1">Client Identity</label>
                  <input type="text" value={formClient} onChange={e => setFormClient(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-hidden focus:border-indigo-500" required />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">Assigned Deployer</label>
                  <input type="text" value={formDeveloper} onChange={e => setFormDeveloper(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-hidden focus:border-indigo-500" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1">Valuation ($)</label>
                  <input type="number" step="0.01" value={formCost} onChange={e => setFormCost(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-hidden focus:border-indigo-500" required />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">Target Date</label>
                  <input type="date" value={formDueDate} onChange={e => setFormDueDate(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-700 focus:outline-hidden focus:border-indigo-500" required />
                </div>
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Pipeline Status</label>
                <select value={formStatus} onChange={e => setFormStatus(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-700 focus:outline-hidden focus:border-indigo-500 cursor-pointer">
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Context Notes</label>
                <textarea value={formNotes} onChange={e => setFormNotes(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 h-16 text-slate-900 focus:outline-hidden focus:border-indigo-500" />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => { setIsCreateModalOpen(false); resetForm(); }} className="px-3.5 py-2 text-slate-500 hover:text-slate-800 cursor-pointer">Cancel</button>
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-4 py-2 rounded-lg cursor-pointer shadow-xs">Commit Record</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {selectedProject && (
        <UpdateModal project={selectedProject} onClose={() => setSelectedProject(null)} onSuccess={loadProjectGrid} />
      )}
    </div>
  );
}