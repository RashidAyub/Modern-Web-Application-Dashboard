import React from 'react';
import {
  FolderKanban,
  Activity,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Layers,
} from 'lucide-react';
import ProgressBar from './ProgressBar';

const iconMap = {
  FolderKanban: FolderKanban,
  Activity: Activity,
  CheckCircle2: CheckCircle2,
  TrendingUp: TrendingUp,
  Sparkles: Sparkles,
  Layers: Layers,
};

export default function StatCard({
  title,
  value,
  change,
  isPositive = true,
  comparison = 'vs last month',
  icon = 'FolderKanban',
  color = '#6366f1',
  bgLight = 'rgba(99, 102, 241, 0.12)',
  progress = 0,
  subtext = '',
}) {
  const IconComponent = iconMap[icon] || Activity;

  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div>
          <span className="stat-card-label">{title}</span>
          <h3 className="stat-card-value">{value}</h3>
        </div>
        <div
          className="stat-card-icon-box"
          style={{ backgroundColor: bgLight, color: color }}
        >
          <IconComponent size={22} strokeWidth={2.2} />
        </div>
      </div>

      <div className="stat-card-bottom">
        <ProgressBar progress={progress} color={color} height="5px" />

        <div className="stat-card-trend-row">
          <span
            className={`stat-badge-trend ${isPositive ? 'positive' : 'negative'}`}
          >
            {isPositive ? (
              <ArrowUpRight size={13} strokeWidth={2.5} />
            ) : (
              <ArrowDownRight size={13} strokeWidth={2.5} />
            )}
            {change}
          </span>
          <span className="stat-comparison-text">{comparison}</span>
        </div>

        {subtext && (
          <div
            style={{
              fontSize: '0.6875rem',
              color: 'var(--text-muted)',
              marginTop: '0.125rem',
            }}
          >
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
}
