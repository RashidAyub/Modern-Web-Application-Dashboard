import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import NewProjectModal from './components/NewProjectModal';

// Pages
import OverviewPage from './pages/OverviewPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ProjectsPage from './pages/ProjectsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

// Mock Data
import {
  userProfile as initialUser,
  initialStats,
  initialProjects,
  monthlyActivityData,
  projectPerformanceData,
  taskDistributionData,
  initialNotifications,
} from './data/mockData';

export default function App() {
  // Navigation & Theme States
  const [activeTab, setActiveTab] = useState('overview');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('auspify_theme') || 'light';
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // App Data States
  const [user, setUser] = useState(initialUser);
  const [projects, setProjects] = useState(initialProjects);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [timeframe, setTimeframe] = useState('30D');
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  // Synchronize theme with HTML document element and persistent storage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('auspify_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Add project handler
  const handleAddProject = (newProject) => {
    setProjects([newProject, ...projects]);
    // Also add a live notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: `Project Created: ${newProject.name}`,
      message: `Initial progress set at ${newProject.progress}%. Tagged as ${newProject.tag}.`,
      time: 'Just now',
      type: 'info',
      read: false,
    };
    setNotifications([newNotif, ...notifications]);
  };

  // Toggle project status handler (e.g. In Progress <-> Completed)
  const handleStatusChange = (projectId, newStatus) => {
    setProjects((prevProjects) =>
      prevProjects.map((p) => {
        if (p.id === projectId) {
          const updatedProgress = newStatus === 'Completed' ? 100 : p.progress === 100 ? 50 : p.progress;
          return {
            ...p,
            status: newStatus,
            progress: updatedProgress,
          };
        }
        return p;
      })
    );
  };

  // Notification actions
  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  // Dynamically recalculate stats based on current projects state
  const activeCount = projects.filter((p) => p.status === 'In Progress').length;
  const completedCount = projects.filter((p) => p.status === 'Completed').length;
  const totalCount = projects.length;
  const avgProgress = Math.round(
    projects.reduce((acc, p) => acc + (p.progress || 0), 0) / (projects.length || 1)
  );

  const dynamicStats = [
    {
      id: 'total-projects',
      title: 'Total Projects',
      value: `${totalCount}`,
      change: '+14.2%',
      isPositive: true,
      comparison: 'vs last month',
      icon: 'FolderKanban',
      color: '#6366f1',
      bgLight: 'rgba(99, 102, 241, 0.12)',
      progress: Math.min(Math.round((totalCount / 40) * 100), 100),
      subtext: `${completedCount} completed this quarter`,
    },
    {
      id: 'active-projects',
      title: 'Active Projects',
      value: `${activeCount}`,
      change: '+8.5%',
      isPositive: true,
      comparison: 'vs last month',
      icon: 'Activity',
      color: '#06b6d4',
      bgLight: 'rgba(6, 182, 212, 0.12)',
      progress: Math.min(Math.round((activeCount / totalCount) * 100), 100),
      subtext: `${projects.filter((p) => p.status === 'On Hold').length} on hold`,
    },
    {
      id: 'completed-tasks',
      title: 'Completed Tasks',
      value: '342',
      change: '+22.4%',
      isPositive: true,
      comparison: 'vs last month',
      icon: 'CheckCircle2',
      color: '#10b981',
      bgLight: 'rgba(16, 185, 129, 0.12)',
      progress: 88,
      subtext: '48 tasks finished this week',
    },
    {
      id: 'overall-progress',
      title: 'Overall Progress',
      value: `${avgProgress}%`,
      change: '+5.1%',
      isPositive: true,
      comparison: 'across all portfolios',
      icon: 'TrendingUp',
      color: '#8b5cf6',
      bgLight: 'rgba(139, 92, 246, 0.12)',
      progress: avgProgress,
      subtext: 'Target 85% by end of Q4',
    },
  ];

  // Dynamic monthly activity chart data based on selected timeframe
  const currentMonthlyData = monthlyActivityData[timeframe] || monthlyActivityData['30D'];

  return (
    <div className="app-container">
      {/* 1. Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Wrapper */}
      <div
        className="main-content-wrapper"
        style={{
          marginLeft: isSidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        }}
      >
        {/* Top Navbar */}
        <Navbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          theme={theme}
          onToggleTheme={toggleTheme}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          notifications={notifications}
          onMarkAllAsRead={handleMarkAllNotificationsRead}
          onNotificationClick={handleNotificationClick}
          onClearAllNotifications={handleClearAllNotifications}
          user={user}
          onNavigate={setActiveTab}
          onLogout={() => {
            alert('Logout simulated: You are currently running in demo mode.');
          }}
        />

        {/* View / Page Content */}
        <main className="main-page-container">
          {activeTab === 'overview' && (
            <OverviewPage
              user={user}
              stats={dynamicStats}
              monthlyData={currentMonthlyData}
              timeframe={timeframe}
              onTimeframeChange={setTimeframe}
              taskDistribution={taskDistributionData}
              projects={projects}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              onOpenNewModal={() => setIsNewProjectModalOpen(true)}
              onStatusChange={handleStatusChange}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsPage
              monthlyData={currentMonthlyData}
              timeframe={timeframe}
              onTimeframeChange={setTimeframe}
              performanceData={projectPerformanceData}
              taskDistribution={taskDistributionData}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsPage
              projects={projects}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              onOpenNewModal={() => setIsNewProjectModalOpen(true)}
              onStatusChange={handleStatusChange}
            />
          )}

          {activeTab === 'reports' && <ReportsPage />}

          {activeTab === 'settings' && (
            <SettingsPage
              user={user}
              onUpdateUser={setUser}
              theme={theme}
              onToggleTheme={toggleTheme}
            />
          )}
        </main>
      </div>

      {/* New Project Creation Modal */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onAddProject={handleAddProject}
      />
    </div>
  );
}
