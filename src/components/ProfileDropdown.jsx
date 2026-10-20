import React, { useRef, useEffect } from 'react';
import {
  User,
  Settings,
  HelpCircle,
  LogOut,
  Shield,
  Zap,
} from 'lucide-react';

export default function ProfileDropdown({
  isOpen,
  onClose,
  user,
  onNavigate,
  onLogout,
}) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="dropdown-menu" ref={dropdownRef} style={{ width: '280px' }}>
      <div className="profile-menu-header">
        <div style={{ position: 'relative' }}>
          <img
            src={user.avatar}
            alt={user.name}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              objectFit: 'cover',
            }}
          />
          <span
            style={{
              position: 'absolute',
              bottom: '-2px',
              right: '-2px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-success)',
              border: '2px solid var(--bg-card)',
            }}
          />
        </div>
        <div style={{ overflow: 'hidden' }}>
          <h4
            style={{
              fontSize: '0.875rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {user.name}
          </h4>
          <p
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {user.email}
          </p>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              marginTop: '0.25rem',
              fontSize: '0.625rem',
              fontWeight: 700,
              color: 'var(--accent-primary)',
              backgroundColor: 'var(--accent-light)',
              padding: '0.125rem 0.375rem',
              borderRadius: 'var(--radius-full)',
            }}
          >
            <Zap size={10} /> Pro Plan Active
          </span>
        </div>
      </div>

      <div className="profile-menu-items">
        <button
          className="profile-menu-btn"
          onClick={() => {
            onNavigate('settings');
            onClose();
          }}
        >
          <User size={16} />
          <span>My Profile</span>
        </button>
        <button
          className="profile-menu-btn"
          onClick={() => {
            onNavigate('settings');
            onClose();
          }}
        >
          <Settings size={16} />
          <span>Account Settings</span>
        </button>
        <button
          className="profile-menu-btn"
          onClick={() => {
            alert('Auspify Help & Documentation is available 24/7 in docs.auspify.io');
            onClose();
          }}
        >
          <HelpCircle size={16} />
          <span>Support & Docs</span>
        </button>

        <div
          style={{
            height: '1px',
            backgroundColor: 'var(--border-light)',
            margin: '0.375rem 0',
          }}
        />

        <button
          className="profile-menu-btn danger"
          onClick={() => {
            onLogout();
            onClose();
          }}
        >
          <LogOut size={16} />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}
