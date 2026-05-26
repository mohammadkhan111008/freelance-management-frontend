import React, { useState } from 'react';
import Layout from './components/Layout';
import ProjectManagement from './pages/ProjectManagement';
import ProjectOverview from './pages/ProjectOverview';
import ProjectBuilders from './pages/ProjectBuilders';

export default function App() {
  const [currentPage, setCurrentPage] = useState('overview'); 
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Mobile state control

  return (
    <Layout 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
      isCollapsed={isCollapsed}
      setIsCollapsed={setIsCollapsed}
      isMobileOpen={isMobileOpen}
      setIsMobileOpen={setIsMobileOpen}
    >
      {currentPage === 'engine' && <ProjectManagement />}
      {currentPage === 'overview' && <ProjectOverview />}
      {currentPage === 'builders' && <ProjectBuilders />}
    </Layout>
  );
}