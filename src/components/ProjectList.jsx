import React, { useState } from 'react';
import {
  LayoutGrid,
  List,
  Search,
  Plus,
  Inbox,
  Calendar,
  CheckCircle,
  MoreVertical,
  ExternalLink,
} from 'lucide-react';
import ProjectCard from './ProjectCard';
import ProgressBar from './ProgressBar';

export default function ProjectList({
  projects = [],
  searchTerm = '',
  onSearchChange,
  statusFilter = 'All',
  onStatusFilterChange,
  onOpenNewModal,
  onStatusChange,
  title = 'Projects Portfolio',
  subtitle = 'Manage ongoing sprints, deliverables, and team allocation',
}) {
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'

  const filterOptions = ['All', 'In Progress', 'Completed', 'On Hold'];

  // Filter projects by status and search keyword
  const filteredProjects = projects.filter((project) => {
    const matchesFilter =
      statusFilter === 'All' || project.status.toLowerCase() === statusFilter.toLowerCase();
    const query = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !query ||
      project.name.toLowerCase().includes(query) ||
      project.tag.toLowerCase().includes(query) ||
      (project.description && project.description.toLowerCase().includes(query));
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    let className = 'badge-status ';
    if (status === 'Completed') className += 'completed';
    else if (status === 'On Hold') className += 'on-hold';
    else className += 'in-progress';

    return <span className={className}>{status}</span>;
  };

  const getPriorityBadge = (priority) => {
    return (
      <span className={`badge-priority ${(priority || 'medium').toLowerCase()}`}>
        {priority}
      </span>
    );
  };

  return (
    <div className="card-panel">
      {/* Top Header & Action Controls */}
      <div className="projects-toolbar">
        <div className="card-title-group">
          <h3 className="card-title">{title}</h3>
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>

        {/* Action Button: Create Project */}
        {onOpenNewModal && (
          <button className="btn-primary" onClick={onOpenNewModal}>
            <Plus size={16} strokeWidth={2.5} />
            <span>New Project</span>
          </button>
        )}
      </div>

      {/* Filter and View Controls Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.25rem',
        }}
      >
        <div className="projects-filters-left">
          {/* Status Filter Pills */}
          <div className="filter-pill-group">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                className={`filter-pill-btn ${statusFilter === opt ? 'active' : ''}`}
                onClick={() => onStatusFilterChange(opt)}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div className="search-input-pill">
            <Search size={14} className="search-input-pill-icon" />
            <input
              type="text"
              placeholder="Filter by name, tag..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* View Switcher: Table vs Grid */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Showing {filteredProjects.length} of {projects.length}
          </span>
          <div className="view-mode-toggle">
            <button
              className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Table View"
              aria-label="Table View"
            >
              <List size={16} />
            </button>
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Content Rendering: Empty State, Table View, or Grid View */}
      {filteredProjects.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-state-icon">
            <Inbox size={28} />
          </div>
          <h4 className="empty-state-title">No projects found</h4>
          <p className="empty-state-desc">
            We couldn't find any projects matching "{searchTerm}" under "{statusFilter}".
            Try adjusting your search criteria or clear the filters.
          </p>
          <button
            className="btn-secondary"
            onClick={() => {
              onSearchChange('');
              onStatusFilterChange('All');
            }}
          >
            Reset All Filters
          </button>
        </div>
      ) : viewMode === 'table' ? (
        <div className="table-responsive-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Deadline</th>
                <th>Priority</th>
                <th>Assigned Team</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <div className="project-title-meta">
                      <span className="project-name-text">{project.name}</span>
                      <span className="project-tag-pill">{project.tag}</span>
                    </div>
                  </td>
                  <td>{getStatusBadge(project.status)}</td>
                  <td style={{ minWidth: '160px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                      }}
                    >
                      <ProgressBar
                        progress={project.progress}
                        color={
                          project.progress === 100
                            ? 'var(--color-success)'
                            : project.progress < 40
                            ? 'var(--color-warning)'
                            : 'var(--accent-primary)'
                        }
                        height="6px"
                      />
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          minWidth: '32px',
                          color: 'var(--text-primary)',
                        }}
                      >
                        {project.progress}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        fontSize: '0.8125rem',
                      }}
                    >
                      <Calendar size={13} color="var(--text-muted)" />
                      <span>{project.deadline}</span>
                    </div>
                  </td>
                  <td>{getPriorityBadge(project.priority)}</td>
                  <td>
                    <div className="avatar-stack">
                      {project.team?.map((member, idx) => (
                        <img
                          key={idx}
                          src={member.avatar}
                          alt={member.name}
                          title={member.name}
                          className="avatar-stack-item"
                        />
                      ))}
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {onStatusChange && (
                      <button
                        onClick={() => {
                          const nextStatus =
                            project.status === 'Completed'
                              ? 'In Progress'
                              : project.status === 'In Progress'
                              ? 'Completed'
                              : 'In Progress';
                          onStatusChange(project.id, nextStatus);
                        }}
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: 'var(--accent-primary)',
                          padding: '0.25rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--accent-light)',
                        }}
                        title="Toggle project status"
                      >
                        {project.status === 'Completed' ? 'Reopen' : 'Done'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="projects-cards-grid">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
