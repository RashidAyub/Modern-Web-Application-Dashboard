import React from 'react';
import {
  Calendar,
  DollarSign,
  MoreVertical,
  Clock,
  CheckCircle,
} from 'lucide-react';
import ProgressBar from './ProgressBar';

export default function ProjectCard({ project, onStatusChange }) {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'completed';
      case 'On Hold':
        return 'on-hold';
      case 'In Progress':
      default:
        return 'in-progress';
    }
  };

  const getPriorityClass = (priority) => {
    return (priority || 'medium').toLowerCase();
  };

  return (
    <div className="project-card">
      <div>
        <div className="project-card-header">
          <div>
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: 'var(--accent-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {project.tag}
            </span>
            <h4
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginTop: '0.25rem',
              }}
            >
              {project.name}
            </h4>
          </div>

          <span className={`badge-status ${getStatusClass(project.status)}`}>
            {project.status}
          </span>
        </div>

        <p className="project-card-desc" style={{ marginTop: '0.75rem' }}>
          {project.description}
        </p>
      </div>

      <div>
        {/* Progress bar */}
        <div style={{ marginBottom: '1rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: '0.375rem',
            }}
          >
            <span>Progress</span>
            <span style={{ color: 'var(--text-primary)' }}>{project.progress}%</span>
          </div>
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
        </div>

        <div className="project-card-meta-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Calendar size={13} />
            <span>Due {project.deadline}</span>
          </div>
          <span className={`badge-priority ${getPriorityClass(project.priority)}`}>
            {project.priority}
          </span>
        </div>

        {/* Footer with assigned team avatars and toggle status */}
        <div className="project-card-footer">
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
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: 'var(--accent-primary)',
                backgroundColor: 'var(--accent-light)',
                padding: '0.25rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
              title="Click to toggle status"
            >
              <CheckCircle size={12} />
              Toggle Status
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
