import React from 'react';
import {
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Database,
  X,
} from 'lucide-react';
import ProgressBar from './ProgressBar';

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'projects', label: 'Projects', icon: FolderKanban, badge: '8' },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({
  activeTab,
  onTabChange,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) {
  return (
    <>
      {/* Mobile backdrop overlay */}
      {isMobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${
          isMobileOpen ? 'mobile-open' : ''
        }`}
      >
        {/* Brand Header */}
        <div className="sidebar-header">
          <div className="brand-link">
            <div className="brand-icon-box">
              <Sparkles size={20} strokeWidth={2.5} />
            </div>
            {!isCollapsed && (
              <div className="brand-info">
                <span className="brand-title">Auspify</span>
                <span className="brand-subtitle">Enterprise OS</span>
              </div>
            )}
          </div>

          {/* Desktop collapse toggle */}
          <button
            className="sidebar-toggle-btn desktop-only"
            onClick={onToggleCollapse}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label="Toggle sidebar collapse"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>

          {/* Mobile close toggle */}
          {isMobileOpen && (
            <button
              className="sidebar-toggle-btn mobile-close-btn"
              onClick={onCloseMobile}
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          {!isCollapsed && (
            <span className="nav-section-title">Main Navigation</span>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                className={`nav-item-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onTabChange(item.id);
                  if (isMobileOpen) onCloseMobile();
                }}
                title={isCollapsed ? item.label : undefined}
              >
                <span className="nav-item-icon">
                  <Icon size={19} strokeWidth={isActive ? 2.5 : 2} />
                </span>
                {!isCollapsed && (
                  <span className="nav-item-label">{item.label}</span>
                )}
                {!isCollapsed && item.badge && (
                  <span className="nav-item-badge">{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Workspace Storage & Cloud Status Footer */}
        {!isCollapsed && (
          <div className="sidebar-footer">
            <div className="sidebar-storage-card">
              <div className="storage-header">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Database size={13} color="var(--accent-primary)" />
                  Cloud Storage
                </span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                  74%
                </span>
              </div>
              <ProgressBar progress={74} color="var(--accent-primary)" height="5px" />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.6875rem',
                  color: 'var(--text-muted)',
                }}
              >
                <span>7.4 GB of 10 GB</span>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 600, cursor: 'pointer' }}>
                  Upgrade
                </span>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
