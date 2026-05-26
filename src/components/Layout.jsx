import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children, currentPage, setCurrentPage, isCollapsed, setIsCollapsed }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* Sidebar instance receiving visibility toggle hooks */}
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
      />
      
      {/* Content wrapper transitions fluidly between broad and compressed gutters */}
      <div className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'pl-20' : 'pl-64'}`}>
        <main className="p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}