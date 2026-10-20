import React, { useState } from 'react';
import {
  TrendingUp,
  Zap,
  Clock,
  Target,
  Users,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';
import AnalyticsChart from '../components/AnalyticsChart';
import ProgressBar from '../components/ProgressBar';

export default function AnalyticsPage({
  monthlyData,
  timeframe,
  onTimeframeChange,
  performanceData,
  taskDistribution,
}) {
  const [selectedMetric, setSelectedMetric] = useState('all');

  const performanceKpis = [
    {
      label: 'Sprint Velocity',
      value: '58.4 pts',
      change: '+11.8%',
      isPositive: true,
      desc: 'Average delivery per 2-week cycle',
      icon: Zap,
      color: '#6366f1',
    },
    {
      label: 'On-Time Delivery',
      value: '94.2%',
      change: '+3.4%',
      isPositive: true,
      desc: 'Milestones met before scheduled date',
      icon: Target,
      color: '#10b981',
    },
    {
      label: 'Code Review SLA',
      value: '2.4 hrs',
      change: '-24%',
      isPositive: true,
      desc: 'Turnaround time for PR approvals',
      icon: Clock,
      color: '#06b6d4',
    },
    {
      label: 'Engineering Health',
      value: '98 / 100',
      change: '+2 pts',
      isPositive: true,
      desc: 'Test coverage & build stability',
      icon: CheckCircle2,
      color: '#8b5cf6',
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Analytics & Deep Telemetry</h1>
          <p className="page-description">
            Comprehensive real-time metrics, sprint burndown, and team productivity insights.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Active Timeframe:
          </span>
          <div className="filter-pill-group">
            {['7D', '30D', '90D', '1Y'].map((tf) => (
              <button
                key={tf}
                className={`filter-pill-btn ${timeframe === tf ? 'active' : ''}`}
                onClick={() => onTimeframeChange(tf)}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="stats-grid">
        {performanceKpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="stat-card">
              <div className="stat-card-top">
                <div>
                  <span className="stat-card-label">{kpi.label}</span>
                  <h3 className="stat-card-value">{kpi.value}</h3>
                </div>
                <div
                  className="stat-card-icon-box"
                  style={{
                    backgroundColor: `${kpi.color}15`,
                    color: kpi.color,
                  }}
                >
                  <Icon size={20} strokeWidth={2.5} />
                </div>
              </div>
              <div className="stat-card-bottom">
                <div className="stat-card-trend-row">
                  <span className="stat-badge-trend positive">{kpi.change}</span>
                  <span className="stat-comparison-text">{kpi.desc}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Charts Row */}
      <div className="dashboard-grid-2col">
        {/* Line / Area Chart for Activity */}
        <AnalyticsChart
          type="area"
          title="Engineering Delivery Trend"
          subtitle="Monthly task throughput vs developer hours"
          data={monthlyData}
          timeframe={timeframe}
          onTimeframeChange={onTimeframeChange}
          height={340}
        />

        {/* Donut Chart for Task Distribution */}
        <AnalyticsChart
          type="pie"
          title="Task Distribution Breakdown"
          subtitle="Proportional split of current sprint backlog"
          data={taskDistribution}
          showTimeframeFilter={false}
          height={340}
        />
      </div>

      {/* Bar Chart for Sprint Performance */}
      <div style={{ marginBottom: '1.75rem' }}>
        <AnalyticsChart
          type="bar"
          title="Project Performance: Planned vs Delivered"
          subtitle="Sprint-by-sprint completion velocity comparison"
          data={performanceData}
          showTimeframeFilter={false}
          height={320}
        />
      </div>

      {/* Efficiency Breakdown Panel */}
      <div className="card-panel">
        <div className="card-header-flex">
          <div className="card-title-group">
            <h3 className="card-title">Module Health & Execution Matrix</h3>
            <p className="card-subtitle">Performance breakdown by product subsystem</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.375rem' }}>
              <span style={{ fontWeight: 600 }}>Frontend Architecture (React 19)</span>
              <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>96%</span>
            </div>
            <ProgressBar progress={96} color="#6366f1" height="8px" />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.375rem' }}>
              <span style={{ fontWeight: 600 }}>Cloud API Latency (p99 &lt; 45ms)</span>
              <span style={{ fontWeight: 700, color: 'var(--color-success)' }}>92%</span>
            </div>
            <ProgressBar progress={92} color="#10b981" height="8px" />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.375rem' }}>
              <span style={{ fontWeight: 600 }}>Unit & E2E Test Coverage</span>
              <span style={{ fontWeight: 700, color: 'var(--color-info)' }}>88%</span>
            </div>
            <ProgressBar progress={88} color="#06b6d4" height="8px" />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.375rem' }}>
              <span style={{ fontWeight: 600 }}>Security Compliance Rating</span>
              <span style={{ fontWeight: 700, color: 'var(--color-purple)' }}>100%</span>
            </div>
            <ProgressBar progress={100} color="#8b5cf6" height="8px" />
          </div>
        </div>
      </div>
    </div>
  );
}
