import React, { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  CheckCircle,
  FileSpreadsheet,
  FileCheck,
  Sparkles,
} from 'lucide-react';
import { reportSummaries } from '../data/mockData';

export default function ReportsPage() {
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState('');

  const handleDownload = (report) => {
    setDownloadingId(report.id);
    setDownloadSuccessMessage('');

    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccessMessage(`Successfully prepared and exported "${report.title}" (${report.type})!`);
      setTimeout(() => setDownloadSuccessMessage(''), 4000);
    }, 800);
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Executive Reports & Audits</h1>
          <p className="page-description">
            Automated intelligence reports, compliance certifications, and performance audits.
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={() => {
            alert('Triggering full portfolio telemetry export for all 8 active projects...');
          }}
        >
          <Sparkles size={16} />
          <span>Generate Custom Report</span>
        </button>
      </div>

      {downloadSuccessMessage && (
        <div
          style={{
            backgroundColor: 'var(--color-success-bg)',
            color: 'var(--color-success)',
            border: '1px solid var(--color-success)',
            borderRadius: 'var(--radius-md)',
            padding: '0.875rem 1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          <CheckCircle size={18} />
          {downloadSuccessMessage}
        </div>
      )}

      {/* Reports Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem',
        }}
      >
        {reportSummaries.map((report) => (
          <div key={report.id} className="card-panel" style={{ justifyContent: 'space-between' }}>
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: report.type === 'PDF' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(16, 185, 129, 0.12)',
                    color: report.type === 'PDF' ? '#ef4444' : '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {report.type === 'PDF' ? <FileText size={20} /> : <FileSpreadsheet size={20} />}
                </div>

                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    padding: '0.125rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-card-active)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {report.fileSize}
                </span>
              </div>

              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.375rem' }}>
                {report.title}
              </h4>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  marginBottom: '0.75rem',
                }}
              >
                <Calendar size={13} />
                <span>{report.date}</span>
              </div>

              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {report.highlights}
              </p>
            </div>

            <div
              style={{
                marginTop: '1.25rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: 'var(--color-success)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <FileCheck size={14} /> Ready to Export
              </span>

              <button
                className="btn-secondary"
                style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
                onClick={() => handleDownload(report)}
                disabled={downloadingId === report.id}
              >
                <Download size={13} />
                {downloadingId === report.id ? 'Exporting...' : `Download ${report.type}`}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quarterly Milestones Table Panel */}
      <div className="card-panel">
        <div className="card-header-flex">
          <div className="card-title-group">
            <h3 className="card-title">2026 Engineering Compliance & SLA Attainment</h3>
            <p className="card-subtitle">Formal audit verification checklist for Auspify Cloud Platform</p>
          </div>
        </div>

        <div className="table-responsive-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Compliance Standard</th>
                <th>Auditor</th>
                <th>Status</th>
                <th>Attainment Date</th>
                <th>Risk Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>SOC2 Type II Annual Recertification</td>
                <td>Ernst & Young Global</td>
                <td><span className="badge-status completed">Certified</span></td>
                <td>Oct 10, 2026</td>
                <td><span className="badge-priority low">0.0 Low</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>ISO/IEC 27001 Information Security</td>
                <td>BSI Standards Group</td>
                <td><span className="badge-status completed">Certified</span></td>
                <td>Sep 14, 2026</td>
                <td><span className="badge-priority low">0.1 Low</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>GDPR & CCPA Data Privacy Verification</td>
                <td>EU Compliance Board</td>
                <td><span className="badge-status in-progress">In Review</span></td>
                <td>Due Nov 30, 2026</td>
                <td><span className="badge-priority medium">Medium</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
