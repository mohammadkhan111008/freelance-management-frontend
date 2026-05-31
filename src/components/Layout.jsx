import React from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

export default function Layout({ children, currentPage, setCurrentPage, isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col md:flex-row">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out pl-0 ${isCollapsed ? 'md:pl-20' : 'md:pl-64'}`}>
        {/* Sticky Mobile Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between md:hidden shadow-xs">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-white text-xs shadow-xs">
              MF
            </div>
            <span className="text-xs font-black tracking-tight text-slate-900 uppercase font-mono">Manage Freelancer</span>
          </div>
          
          <button 
            onClick={() => setIsMobileOpen(true)}
            className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer"
          >
            <Menu size={18} />
          </button>
        </header>

        <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}