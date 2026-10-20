import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import { teamMembersList } from '../data/mockData';

export default function NewProjectModal({ isOpen, onClose, onAddProject }) {
  const [name, setName] = useState('');
  const [tag, setTag] = useState('Web Application');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('In Progress');
  const [progress, setProgress] = useState(25);
  const [deadline, setDeadline] = useState('Nov 30, 2026');
  const [budget, setBudget] = useState('$35,000');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProject = {
      id: `proj-${Date.now()}`,
      name: name.trim(),
      tag,
      priority,
      status,
      progress: Number(progress),
      deadline,
      budget,
      description: description.trim() || 'Custom created SaaS initiative.',
      team: [teamMembersList[0], teamMembersList[1]],
    };

    onAddProject(newProject);
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--accent-light)',
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Plus size={18} strokeWidth={2.5} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Create New Project
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Project Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. NextGen Micro-Frontend Portal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label">Category / Domain</label>
                <select
                  className="form-select"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                >
                  <option value="Web Application">Web Application</option>
                  <option value="UI/UX System">UI/UX System</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Enterprise Suite">Enterprise Suite</option>
                  <option value="Payment & API">Payment & API</option>
                  <option value="DevOps & Sec">DevOps & Sec</option>
                  <option value="Mobile & IoT">Mobile & IoT</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label">Initial Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Target Deadline</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Dec 15, 2026"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.25rem',
                }}
              >
                <label className="form-label">Initial Progress: {progress}%</label>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                style={{ accentColor: 'var(--accent-primary)', width: '100%', cursor: 'pointer' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Project Scope / Summary</label>
              <textarea
                className="form-textarea"
                rows="2"
                placeholder="Briefly describe the key objectives and expected deliverables..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Sparkles size={16} /> Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
