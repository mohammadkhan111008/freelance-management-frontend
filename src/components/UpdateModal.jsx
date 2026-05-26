import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projectService } from '../api/projectService';

export default function UpdateModal({ project, onClose, onSuccess }) {
  const [mode, setMode] = useState('PUT');
  
  // PUT Form Configurations
  const [putName, setPutName] = useState(project.projectName);
  const [putClient, setPutClient] = useState(project.clientName);
  const [putDeveloper, setPutDeveloper] = useState(project.assignedDeveloper);
  const [putStatus, setPutStatus] = useState(project.status);
  const [putCost, setPutCost] = useState(project.cost);
  const [putDueDate, setPutDueDate] = useState(project.dueDate);
  const [putNotes, setPutNotes] = useState(project.notes || '');

  // PATCH Form Configurations
  const [patchField, setPatchField] = useState('projectName');
  const [patchValue, setPatchValue] = useState('');

  const handleUpdateExecution = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'PUT') {
        const data = { 
          projectName: putName, 
          clientName: putClient, 
          assignedDeveloper: putDeveloper, 
          status: putStatus, 
          cost: parseFloat(putCost), 
          dueDate: putDueDate, 
          notes: putNotes 
        };
        await projectService.update(project.id, data);
      } else {
        if (!patchValue.trim()) return;
        const adjustedValue = patchField === 'cost' ? parseFloat(patchValue) : patchValue;
        await projectService.partialUpdate(project.id, patchField, adjustedValue);
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Mutation synchronization failure:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#070a13]/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0d111c] border border-slate-700 w-full max-w-md rounded-xl p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-semibold text-white">Alter Operation Profile</h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-white text-lg">&times;</button>
        </div>

        <div className="flex border-b border-slate-800 mb-4">
          <button type="button" onClick={() => setMode('PUT')} className={`flex-1 py-2 text-xs font-medium tracking-wider transition-colors ${mode === 'PUT' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>Full Sync (PUT)</button>
          <button type="button" onClick={() => setMode('PATCH')} className={`flex-1 py-2 text-xs font-medium tracking-wider transition-colors ${mode === 'PATCH' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>Isolated Field (PATCH)</button>
        </div>

        <form onSubmit={handleUpdateExecution} className="space-y-3 text-slate-200">
          {mode === 'PUT' ? (
            <>
              <input type="text" value={putName} onChange={e => setPutName(e.target.value)} className="w-full bg-[#070a13] border border-slate-700 rounded-lg p-2 text-xs" placeholder="Project Name" required />
              <input type="text" value={putClient} onChange={e => setPutClient(e.target.value)} className="w-full bg-[#070a13] border border-slate-700 rounded-lg p-2 text-xs" placeholder="Client Name" required />
              <input type="text" value={putDeveloper} onChange={e => setPutDeveloper(e.target.value)} className="w-full bg-[#070a13] border border-slate-700 rounded-lg p-2 text-xs" placeholder="Developer Name" required />
              <div className="grid grid-cols-2 gap-2">
                <input type="number" step="0.01" value={putCost} onChange={e => setPutCost(e.target.value)} className="w-full bg-[#070a13] border border-slate-700 rounded-lg p-2 text-xs" placeholder="Cost" required />
                <input type="date" value={putDueDate} onChange={e => setPutDueDate(e.target.value)} className="w-full bg-[#070a13] border border-slate-700 rounded-lg p-2 text-xs" required />
              </div>
              <select value={putStatus} onChange={e => setPutStatus(e.target.value)} className="w-full bg-[#070a13] border border-slate-700 rounded-lg p-2 text-xs text-slate-300">
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <textarea value={putNotes} onChange={e => setPutNotes(e.target.value)} className="w-full bg-[#070a13] border border-slate-700 rounded-lg p-2 text-xs h-16" placeholder="Context notes" />
            </>
          ) : (
            <>
              <select value={patchField} onChange={e => { setPatchField(e.target.value); setPatchValue(''); }} className="w-full bg-[#070a13] border border-slate-700 rounded-lg p-2 text-xs text-slate-300">
                <option value="projectName">Modify Field: Project Name</option>
                <option value="clientName">Modify Field: Client Name</option>
                <option value="assignedDeveloper">Modify Field: Assigned Developer</option>
                <option value="status">Modify Field: Execution Status</option>
                <option value="cost">Modify Field: Project Cost</option>
                <option value="notes">Modify Field: Notes</option>
              </select>
              {patchField === 'status' ? (
                <select value={patchValue} onChange={e => setPatchValue(e.target.value)} className="w-full bg-[#070a13] border border-slate-700 rounded-lg p-2 text-xs text-slate-300" required>
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              ) : (
                <input type={patchField === 'cost' ? 'number' : 'text'} value={patchValue} onChange={e => setPatchValue(e.target.value)} className="w-full bg-[#070a13] border border-slate-700 rounded-lg p-2 text-xs text-white" placeholder={`Enter updated ${patchField}`} required />
              )}
            </>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="text-xs px-3 py-1.5 text-slate-400 hover:text-white">Cancel</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-3 py-1.5 rounded-md">Save Changes</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}