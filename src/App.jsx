import React, { useState } from 'react';
import Layout from './components/Layout';
import ProjectManagement from './pages/ProjectManagement';
import ProjectOverview from './pages/ProjectOverview';
import ProjectBuilders from './pages/ProjectBuilders';

export default function App() {
  const [currentPage, setCurrentPage] = useState('overview'); // Landing default route set to top item
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Layout 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
      isCollapsed={isCollapsed}
      setIsCollapsed={setIsCollapsed}
    >
      {currentPage === 'engine' && <ProjectManagement />}
      {currentPage === 'overview' && <ProjectOverview />}
      {currentPage === 'builders' && <ProjectBuilders />}
    </Layout>
  );
}