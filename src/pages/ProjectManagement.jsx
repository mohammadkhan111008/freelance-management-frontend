import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, SlidersHorizontal, Trash2, DollarSign, Users, Database, LayoutGrid, TableProperties } from 'lucide-react';
import axios from 'axios'; // Or use window.fetch if you don't use axios

const API_BASE_URL = 'http://localhost:8080/api/projects';

function LocalStatusBadge({ status }) {
  const styles = {
    'Completed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'In Progress': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
    'Cancelled': 'bg-rose-50 text-rose-700 border-rose-200',
  };
  return (
    <span className={`px-2 py-0.5 border text-[10px] font-mono font-black tracking-tight rounded-md uppercase ${styles[status] || 'bg-slate-50 text-slate-700 border-slate-200'}`}>
      {status}
    </span>
  );
}

export default function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewType, setViewType] = useState('cards'); 
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [stats, setStats] = useState({ totalBudget: 0, activeNodes: 0, databaseHealthy: true });

  // Form Inputs
  const [formName, setFormName] = useState('');
  const [formClient, setFormClient] = useState('');
  const [formDeveloper, setFormDeveloper] = useState('');
  const [formStatus, setFormStatus] = useState('Pending');
  const [formCost, setFormCost] = useState('');
  const [formDueDate, setFormDueDate] = useState('');
  const [formNotes, setFormNotes] = useState('');

  // 🔄 FETCH FROM SPRING BOOT BACKEND
  const loadProjectGrid = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      const data = response.data || [];
      setProjects(data);
      calculateStats(data);
    } catch (error) {
      console.error("Backend connection error mapping resource controllers:", error);
      setStats(prev => ({ ...prev, databaseHealthy: false }));
    }
  };

  useEffect(() => { 
    loadProjectGrid(); 
  }, []);

  const calculateStats = (data) => {
    const total = data.reduce((acc, curr) => acc + (parseFloat(curr.cost) || 0), 0);
    const active = data.filter(p => p.status === 'In Progress').length;
    setStats({ totalBudget: total, activeNodes: active, databaseHealthy: true });
  };

  // ➕ POST TO SPRING BOOT BACKEND
  const handleCreate = async (e) => {
    e.preventDefault();
    const newProject = {
      projectName: formName,
      clientName: formClient,
      assignedDeveloper: formDeveloper,
      status: formStatus,
      cost: parseFloat(formCost) || 0,
      dueDate: formDueDate,
      notes: formNotes
    };

    try {
      await axios.post(API_BASE_URL, newProject);
      setIsCreateModalOpen(false);
      loadProjectGrid(); // Refresh data grid natively from db
      
      // Clear Form
      setFormName(''); setFormClient(''); setFormDeveloper('');
      setFormStatus('Pending'); setFormCost(''); setFormDueDate(''); setFormNotes('');
    } catch (error) {
      console.error("Failed to post record mapping context to database:", error);
    }
  };

  // ❌ DELETE FROM SPRING BOOT BACKEND
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      loadProjectGrid(); // Synchronize view state
    } catch (error) {
      console.error("Failed structural mutation slice on record ID:", id, error);
    }
  };

  const filteredProjects = projects.filter(p => {
    const nameMatch = p.projectName?.toLowerCase().includes(searchQuery.toLowerCase());
    const clientMatch = p.clientName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSearch = nameMatch || clientMatch;
    return matchesSearch && (statusFilter === 'All' || p.status === statusFilter);
  });

  return (
    <div className="space-y-10">
      {/* Telemetry Panel */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-black text-indigo-600 uppercase tracking-wider">
            <span className={`h-2 w-2 rounded-full ${stats.databaseHealthy ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
            {stats.databaseHealthy ? 'Live Backend Channel Active' : 'Backend Channel Offline'}
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1">Manage Freelancer Console</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-2"><span className="text-[11px] font-mono text-slate-500 uppercase font-black tracking-wider">Total Portfolio Valuation</span><div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600"><DollarSign size={14} /></div></div>
            <p className="text-3xl font-black text-slate-900">${stats.totalBudget.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-2"><span className="text-[11px] font-mono text-slate-500 uppercase font-black tracking-wider">Assigned Engineering Nodes</span><div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600"><Users size={14} /></div></div>
            <p className="text-3xl font-black text-slate-900">{stats.activeNodes} Active</p>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-2"><span className="text-[11px] font-mono text-slate-500 uppercase font-black tracking-wider">Database Synchronizer</span><div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600"><Database size={14} /></div></div>
            <p className="text-3xl font-black text-slate-900">{stats.databaseHealthy ? 'CONNECTED' : 'DISCONNECTED'}</p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* Pipeline Core Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black tracking-tight text-slate-900">Project Pipeline Core</h2>
            <p className="text-xs font-bold text-slate-500 mt-0.5">Execute structural modifications natively synchronized with the PostgreSQL schemas.</p>
          </div>
          <button onClick={() => setIsCreateModalOpen(true)} className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer shrink-0">
            <Plus size={15} />
            Provision Project Record
          </button>
        </div>

        {/* Toolbar Grid/Table Mode */}
        <div className="flex flex-col lg:flex-row gap-4 p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="relative flex-1 w-full">
            <Search size={15} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by project name or client identity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-lg pl-9 pr-4 py-2 text-xs font-bold text-slate-800 transition-all outline-none"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-lg px-3 py-2 text-xs font-black text-slate-700 outline-none cursor-pointer"
              >
                <option value="All">All Status Profiles</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex items-center border border-slate-200 bg-slate-50 p-1 rounded-lg shrink-0">
              <button onClick={() => setViewType('cards')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-black transition-all cursor-pointer ${viewType === 'cards' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}><LayoutGrid size={13} /><span>Cards</span></button>
              <button onClick={() => setViewType('table')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-black transition-all cursor-pointer ${viewType === 'table' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}><TableProperties size={13} /><span>Table</span></button>
            </div>
          </div>
        </div>

        {/* Content Render Switch */}
        <AnimatePresence mode="wait">
          {viewType === 'cards' ? (
            <motion.div key="cards" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-6 flex flex-col justify-between transition-all shadow-xs group">
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div>
                        <h3 className="font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors text-sm">{project.projectName}</h3>
                        <p className="text-xs font-bold text-slate-400 mt-0.5">Client ID: <span className="text-slate-700 font-extrabold">{project.clientName}</span></p>
                      </div>
                      <LocalStatusBadge status={project.status} />
                    </div>
                    <div className="space-y-2 my-4 border-t border-b border-slate-100 py-4 font-mono text-[11px]">
                      <div className="flex justify-between"><span className="text-slate-400 font-bold">ENGINEER:</span><span className="text-slate-900 font-black">{project.assignedDeveloper}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400 font-bold">CONTRACT VALUATION:</span><span className="text-indigo-600 font-black">${parseFloat(project.cost || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400 font-bold">TARGET DATE:</span><span className="text-slate-900 font-black">{project.dueDate}</span></div>
                    </div>
                    {project.notes && <p className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-100 p-3 rounded-xl line-clamp-2 mb-4">{project.notes}</p>}
                  </div>
                  <div className="flex justify-end gap-2 pt-3 border-t border-slate-100/60">
                    <button onClick={() => handleDelete(project.id)} className="p-1.5 border border-slate-200 hover:bg-red-50 rounded-md text-slate-400 hover:text-red-600 cursor-pointer"><Trash2 size={12} /></button>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="table" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-200 font-mono text-[11px] font-black text-slate-500 tracking-wider">
                      <th className="p-4">PROJECT MODULE</th>
                      <th className="p-4">CLIENT IDENTITY</th>
                      <th className="p-4">ASSIGNED ENGINEER</th>
                      <th className="p-4">VALUATION</th>
                      <th className="p-4">TARGET DATE</th>
                      <th className="p-4">STATUS</th>
                      <th className="p-4 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs font-bold text-slate-700 divide-y divide-slate-100">
                    {filteredProjects.map((project) => (
                      <tr key={project.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 text-slate-900 font-extrabold">{project.projectName}</td>
                        <td className="p-4 text-slate-600">{project.clientName}</td>
                        <td className="p-4 font-mono text-[11px] text-slate-800">{project.assignedDeveloper}</td>
                        <td className="p-4 font-mono text-[11px] text-indigo-600 font-black">${parseFloat(project.cost || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                        <td className="p-4 font-mono text-[11px] text-slate-500">{project.dueDate}</td>
                        <td className="p-4"><LocalStatusBadge status={project.status} /></td>
                        <td className="p-4 text-right">
                          <button onClick={() => handleDelete(project.id)} className="p-1.5 border border-slate-200 hover:bg-red-50 rounded-md text-slate-400 hover:text-red-600 cursor-pointer"><Trash2 size={11} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Setup Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-6 shadow-xl text-slate-900">
            <h3 className="text-sm font-black text-slate-900 mb-4">Provision Project Context</h3>
            <form onSubmit={handleCreate} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block text-slate-700 mb-1">Project Name</label>
                <input type="text" value={formName} onChange={e => setFormName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-500" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1">Client Identity</label>
                  <input type="text" value={formClient} onChange={e => setFormClient(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-500" required />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">Assigned Deployer</label>
                  <input type="text" value={formDeveloper} onChange={e => setFormDeveloper(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-500" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1">Valuation ($)</label>
                  <input type="number" step="0.01" value={formCost} onChange={e => setFormCost(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-500" required />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">Target Date</label>
                  <input type="date" value={formDueDate} onChange={e => setFormDueDate(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-700 focus:outline-none focus:border-indigo-500" required />
                </div>
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Pipeline Status</label>
                <select value={formStatus} onChange={e => setFormStatus(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-700 focus:outline-none focus:border-indigo-500 cursor-pointer">
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Context Notes</label>
                <textarea value={formNotes} onChange={e => setFormNotes(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 h-16 text-slate-900 focus:outline-none focus:border-indigo-500" />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-3.5 py-2 text-slate-500 hover:text-slate-800 cursor-pointer">Cancel</button>
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-4 py-2 rounded-lg cursor-pointer">Commit Record</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}