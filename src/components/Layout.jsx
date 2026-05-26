import React from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

export default function Layout({ children, currentPage, setCurrentPage, isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col md:flex-row">
      {/* Sidebar Core System */}
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      
      {/* Main Structural Gutter Shell */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out 
        /* Clears padding on mobile since sidebar is a floating drawer layout overlay */
        pl-0 
        /* Restores padding gutters based on desk sidebar scale states */
        ${isCollapsed ? 'md:pl-20' : 'md:pl-64'}
      `}>
        
        {/* Sticky Top-Bar for responsive Mobile viewports */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between md:hidden shadow-xs">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-white text-xs shadow-xs">
              FH
            </div>
            <span className="text-xs font-black tracking-tight text-slate-900 uppercase font-mono">Control Panel</span>
          </div>
          
          <button 
            onClick={() => setIsMobileOpen(true)}
            className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer"
          >
            <Menu size={18} />
          </button>
        </header>

        {/* Viewport Main Container */}
        <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}