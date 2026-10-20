import React, { useRef, useEffect } from 'react';
import {
  Bell,
  CheckCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  Trash2,
} from 'lucide-react';

export default function NotificationDropdown({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onNotificationClick,
  onClearAll,
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

  const unreadCount = notifications.filter((n) => !n.read).length;

  const renderIcon = (type) => {
    switch (type) {
      case 'success':
        return (
          <div
            className="notification-icon-badge"
            style={{ backgroundColor: 'var(--color-success-bg)', color: 'var(--color-success)' }}
          >
            <CheckCircle2 size={16} strokeWidth={2.5} />
          </div>
        );
      case 'warning':
        return (
          <div
            className="notification-icon-badge"
            style={{ backgroundColor: 'var(--color-warning-bg)', color: 'var(--color-warning)' }}
          >
            <AlertTriangle size={16} strokeWidth={2.5} />
          </div>
        );
      case 'info':
      default:
        return (
          <div
            className="notification-icon-badge"
            style={{ backgroundColor: 'var(--color-info-bg)', color: 'var(--color-info)' }}
          >
            <Info size={16} strokeWidth={2.5} />
          </div>
        );
    }
  };

  return (
    <div className="dropdown-menu" ref={dropdownRef}>
      <div className="dropdown-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="dropdown-title">Notifications</span>
          {unreadCount > 0 && (
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                padding: '0.125rem 0.4375rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--accent-primary)',
                color: '#ffffff',
              }}
            >
              {unreadCount} new
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="dropdown-action-link"
              title="Mark all as read"
            >
              Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={onClearAll}
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
              title="Clear all"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div
            style={{
              padding: '2.5rem 1rem',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.8125rem',
            }}
          >
            <CheckCheck
              size={28}
              style={{ margin: '0 auto 0.5rem', opacity: 0.5 }}
            />
            <p>You're all caught up!</p>
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              className={`notification-item ${!item.read ? 'unread' : ''}`}
              onClick={() => onNotificationClick(item.id)}
            >
              {renderIcon(item.type)}
              <div className="notification-content">
                <div className="notification-title">{item.title}</div>
                <div className="notification-desc">{item.message}</div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    color: 'var(--text-muted)',
                    fontSize: '0.6875rem',
                  }}
                >
                  <Clock size={11} />
                  <span>{item.time}</span>
                  {!item.read && (
                    <span
                      style={{
                        marginLeft: 'auto',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent-primary)',
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="dropdown-footer" onClick={onClose}>
        Close notifications
      </div>
    </div>
  );
}
