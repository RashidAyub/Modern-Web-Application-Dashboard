import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function ProfileSection({ user, onClick, isOpen = false }) {
  return (
    <button
      className="profile-trigger-btn"
      onClick={onClick}
      aria-label="User Profile Menu"
      aria-expanded={isOpen}
    >
      <div className="profile-avatar-wrapper">
        <img
          src={user.avatar}
          alt={user.name}
          className="profile-avatar-img"
        />
        <span className="status-indicator" />
      </div>

      <div className="profile-meta-text">
        <span className="profile-name">{user.name}</span>
        <span className="profile-role">{user.title}</span>
      </div>

      <ChevronDown
        size={14}
        color="var(--text-muted)"
        style={{
          transition: 'transform 0.2s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
      />
    </button>
  );
}
