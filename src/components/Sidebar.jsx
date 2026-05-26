import React from 'react';
import { Layers, HelpCircle, Users, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Sidebar({ currentPage, setCurrentPage, isCollapsed, setIsCollapsed }) {
  // Re-ordered items: Overview -> Engine -> Builders
  const menuItems = [
    { id: 'overview', name: 'Project Overview', icon: HelpCircle },
    { id: 'engine', name: 'Project Engine', icon: Layers },
    { id: 'builders', name: 'Engineering Core', icon: Users },
  ];

  return (
    <aside 
      className={`bg-white border-r border-slate-200 fixed inset-y-0 left-0 z-40 flex flex-col justify-between shadow-xs transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-4 flex-1 flex flex-col">
        {/* Brand Header */}
        <div className={`flex items-center gap-3 px-2 py-1 mb-8 transition-all duration-200 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white text-sm shrink-0 shadow-md shadow-indigo-600/20">
            FH
          </div>
          {!isCollapsed && (
            <div className="transition-opacity duration-200">
              <h2 className="text-sm font-black text-slate-900 tracking-tight leading-none">FreelanceHub</h2>
              <p className="text-[10px] font-extrabold text-indigo-600 tracking-wider uppercase font-mono mt-1">Control Panel</p>
            </div>
          )}
        </div>

        {/* Navigation Registry */}
        <nav className="space-y-1 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                title={isCollapsed ? item.name : ''}
                className={`w-full flex items-center rounded-xl text-xs font-black tracking-tight transition-all duration-150 cursor-pointer ${
                  isCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-3'
                } ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Status Panel & Toggle Trigger Button */}
      <div className="border-t border-slate-100 bg-slate-50/60 p-3 space-y-2">
        {!isCollapsed && (
          <div className="flex items-center gap-2.5 px-2 text-slate-500 mb-1 transition-opacity duration-200">
            <Shield size={14} className="text-emerald-600" />
            <div className="font-mono text-[10px] font-bold">
              <p className="text-slate-800">NODE ACTIVE</p>
              <p className="text-slate-400 font-normal">Port: 5173</p>
            </div>
          </div>
        )}

        {/* Dynamic Collapse/Expand Action Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer bg-white"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <div className="flex items-center gap-2 text-[10px] font-black tracking-tight"><ChevronLeft size={14} /> Close Menu</div>}
        </button>
      </div>
    </aside>
  );
}