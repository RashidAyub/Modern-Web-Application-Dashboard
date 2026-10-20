import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
} from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import ProfileSection from './ProfileSection';

export default function Navbar({
  searchTerm,
  onSearchChange,
  theme,
  onToggleTheme,
  onToggleMobileSidebar,
  notifications,
  onMarkAllAsRead,
  onNotificationClick,
  onClearAllNotifications,
  user,
  onNavigate,
  onLogout,
}) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const searchInputRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Keyboard shortcut Ctrl+K or / to focus search
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="navbar">
      {/* Left section: mobile hamburger & search bar */}
      <div className="navbar-left">
        <button
          className="mobile-menu-btn"
          onClick={onToggleMobileSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="navbar-search-wrapper">
          <Search size={16} className="navbar-search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            className="navbar-search-input"
            placeholder="Search projects, tasks, or metrics..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchTerm ? (
            <button
              onClick={() => onSearchChange('')}
              style={{
                position: 'absolute',
                right: '0.625rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Clear search"
            >
              <X size={14} />
            </button>
          ) : (
            <kbd className="navbar-search-shortcut">⌘K</kbd>
          )}
        </div>
      </div>

      {/* Right section: theme toggle, notification bell, profile */}
      <div className="navbar-right">
        {/* Theme Switcher */}
        <button
          className="icon-action-btn"
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun size={18} color="#f59e0b" />
          ) : (
            <Moon size={18} />
          )}
        </button>

        {/* Notifications Icon & Dropdown */}
        <div className="dropdown-container">
          <button
            className="icon-action-btn"
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              if (isProfileOpen) setIsProfileOpen(false);
            }}
            title="Notifications"
            aria-label="Open notifications"
            aria-expanded={isNotifOpen}
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="badge-dot" />}
          </button>

          <NotificationDropdown
            isOpen={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
            notifications={notifications}
            onMarkAllAsRead={onMarkAllAsRead}
            onNotificationClick={onNotificationClick}
            onClearAll={onClearAllNotifications}
          />
        </div>

        <div className="divider-vertical" />

        {/* User Profile Section & Dropdown */}
        <div className="dropdown-container">
          <ProfileSection
            user={user}
            isOpen={isProfileOpen}
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              if (isNotifOpen) setIsNotifOpen(false);
            }}
          />

          <ProfileDropdown
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            user={user}
            onNavigate={onNavigate}
            onLogout={onLogout}
          />
        </div>
      </div>
    </header>
  );
}
