import React from 'react';
import {
  FolderKanban,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import ProjectList from '../components/ProjectList';

export default function ProjectsPage({
  projects,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onOpenNewModal,
  onStatusChange,
}) {
  const totalCount = projects.length;
  const inProgressCount = projects.filter((p) => p.status === 'In Progress').length;
  const completedCount = projects.filter((p) => p.status === 'Completed').length;
  const onHoldCount = projects.filter((p) => p.status === 'On Hold').length;

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Projects Management</h1>
          <p className="page-description">
            Track roadmaps, sprint progress, assigned developers, and upcoming production milestones.
          </p>
        </div>

        <button className="btn-primary" onClick={onOpenNewModal}>
          <Plus size={16} strokeWidth={2.5} />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Mini metric badges row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.75rem',
        }}
      >
        <div
          className="stat-card"
          style={{ padding: '1rem 1.25rem', flexDirection: 'row', alignItems: 'center' }}
        >
          <div>
            <span className="stat-card-label">Total Initiatives</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{totalCount}</div>
          </div>
          <div
            className="stat-card-icon-box"
            style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-primary)', marginLeft: 'auto' }}
          >
            <FolderKanban size={20} />
          </div>
        </div>

        <div
          className="stat-card"
          style={{ padding: '1rem 1.25rem', flexDirection: 'row', alignItems: 'center' }}
        >
          <div>
            <span className="stat-card-label">In Active Sprints</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
              {inProgressCount}
            </div>
          </div>
          <div
            className="stat-card-icon-box"
            style={{ backgroundColor: 'rgba(99, 102, 241, 0.12)', color: '#6366f1', marginLeft: 'auto' }}
          >
            <Clock size={20} />
          </div>
        </div>

        <div
          className="stat-card"
          style={{ padding: '1rem 1.25rem', flexDirection: 'row', alignItems: 'center' }}
        >
          <div>
            <span className="stat-card-label">Successfully Delivered</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-success)' }}>
              {completedCount}
            </div>
          </div>
          <div
            className="stat-card-icon-box"
            style={{ backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#10b981', marginLeft: 'auto' }}
          >
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div
          className="stat-card"
          style={{ padding: '1rem 1.25rem', flexDirection: 'row', alignItems: 'center' }}
        >
          <div>
            <span className="stat-card-label">On Hold / Backlog</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-warning)' }}>
              {onHoldCount}
            </div>
          </div>
          <div
            className="stat-card-icon-box"
            style={{ backgroundColor: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b', marginLeft: 'auto' }}
          >
            <AlertCircle size={20} />
          </div>
        </div>
      </div>

      {/* Main Project List Component */}
      <ProjectList
        projects={projects}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        statusFilter={statusFilter}
        onStatusFilterChange={onStatusFilterChange}
        onOpenNewModal={onOpenNewModal}
        onStatusChange={onStatusChange}
        title="Enterprise Projects Directory"
        subtitle="Live table view with interactive status toggles and card view"
      />
    </div>
  );
}
