import React from 'react';

/**
 * Reusable animated progress bar component with custom colors and labels
 */
export default function ProgressBar({
  progress = 0,
  color = '#6366f1',
  height = '6px',
  showLabel = false,
  className = '',
}) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`progress-container ${className}`} style={{ width: '100%' }}>
      {showLabel && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            fontWeight: '600',
            marginBottom: '0.375rem',
            color: 'var(--text-secondary)',
          }}
        >
          <span>Progress</span>
          <span style={{ color: 'var(--text-primary)' }}>{clampedProgress}%</span>
        </div>
      )}
      <div className="progress-track" style={{ height }}>
        <div
          className="progress-fill"
          style={{
            width: `${clampedProgress}%`,
            backgroundColor: color,
            backgroundImage: `linear-gradient(90deg, ${color}, ${color}dd)`,
          }}
        />
      </div>
    </div>
  );
}
