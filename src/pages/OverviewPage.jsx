import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle,
  Plus,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import StatCard from '../components/StatCard';
import AnalyticsChart from '../components/AnalyticsChart';
import ProjectList from '../components/ProjectList';
import { recentActivities } from '../data/mockData';

export default function OverviewPage({
  user,
  stats,
  monthlyData,
  timeframe,
  onTimeframeChange,
  taskDistribution,
  projects,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onOpenNewModal,
  onStatusChange,
  onNavigate,
}) {
  return (
    <div>
      {/* Top Welcome Header */}
      <div className="page-header">
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--accent-primary)',
              backgroundColor: 'var(--accent-light)',
              padding: '0.25rem 0.625rem',
              borderRadius: 'var(--radius-full)',
              marginBottom: '0.5rem',
            }}
          >
            <Sparkles size={12} />
            <span>Executive Overview & Telemetry</span>
          </div>
          <h1 className="page-title">
            Welcome back, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="page-description">
            Here is your daily engineering operations summary and project velocity report.
          </p>
        </div>

        {/* Quick Action Button */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            className="btn-secondary"
            onClick={() => onNavigate('analytics')}
          >
            Detailed Analytics <ArrowRight size={14} style={{ marginLeft: 4 }} />
          </button>
          <button className="btn-primary" onClick={onOpenNewModal}>
            <Plus size={16} strokeWidth={2.5} />
            <span>Create Project</span>
          </button>
        </div>
      </div>

      {/* 1. Summary Cards */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* 2. Visual Charts Row */}
      <div className="dashboard-grid-2col">
        {/* Monthly Activity Area Chart */}
        <AnalyticsChart
          type="area"
          title="Monthly Activity & Delivery Velocity"
          subtitle="Real-time completed tasks and logged developer hours"
          data={monthlyData}
          timeframe={timeframe}
          onTimeframeChange={onTimeframeChange}
        />

        {/* Task Distribution Donut */}
        <AnalyticsChart
          type="pie"
          title="Task Distribution"
          subtitle="Breakdown by status"
          data={taskDistribution}
          showTimeframeFilter={false}
        />
      </div>

      {/* 3. Projects Management Section & Recent Activity Feed */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '1.5rem',
        }}
      >
        <div>
          <ProjectList
            projects={projects}
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            statusFilter={statusFilter}
            onStatusFilterChange={onStatusFilterChange}
            onOpenNewModal={onOpenNewModal}
            onStatusChange={onStatusChange}
            title="Active Sprints & Projects"
            subtitle="Current delivery statuses and team allocations"
          />
        </div>

        {/* Live Team Activity Stream */}
        <div className="card-panel">
          <div className="card-header-flex">
            <div className="card-title-group">
              <h3 className="card-title">Live Activity</h3>
              <p className="card-subtitle">Real-time team collaboration</p>
            </div>
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: 'var(--color-success)',
                backgroundColor: 'var(--color-success-bg)',
                padding: '0.125rem 0.5rem',
                borderRadius: 'var(--radius-full)',
              }}
            >
              Live
            </span>
          </div>

          <div className="activity-list">
            {recentActivities.map((act) => (
              <div key={act.id} className="activity-item">
                <img
                  src={act.avatar}
                  alt={act.user}
                  className="activity-avatar"
                />
                <div className="activity-body">
                  <span className="activity-user-bold">{act.user}</span>{' '}
                  {act.action}{' '}
                  <span className="activity-target-bold">{act.target}</span>
                  <span className="activity-time-stamp">
                    <Clock size={10} style={{ display: 'inline', marginRight: 3 }} />
                    {act.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '1.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
              }}
            >
              <ShieldCheck size={15} color="var(--color-success)" />
              System Status: All services healthy (99.98% uptime)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
