import React, { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  Palette,
  CheckCircle,
  Save,
  Sun,
  Moon,
} from 'lucide-react';

export default function SettingsPage({
  user,
  onUpdateUser,
  theme,
  onToggleTheme,
}) {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'preferences' | 'notifications' | 'security'
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [title, setTitle] = useState(user.title);
  const [location, setLocation] = useState(user.location || 'San Francisco, CA');

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [sprintNotifs, setSprintNotifs] = useState(true);
  const [securityNotifs, setSecurityNotifs] = useState(true);

  const [toastMessage, setToastMessage] = useState('');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      email,
      title,
      location,
    });
    setToastMessage('Profile information saved successfully!');
    setTimeout(() => setToastMessage(''), 3500);
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Account & Platform Settings</h1>
          <p className="page-description">
            Manage your personal profile, notification thresholds, security policies, and interface theme.
          </p>
        </div>
      </div>

      {toastMessage && (
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
          {toastMessage}
        </div>
      )}

      {/* Settings Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '1.75rem',
          overflowX: 'auto',
          paddingBottom: '0.25rem',
        }}
      >
        <button
          onClick={() => setActiveTab('profile')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
            borderBottom: activeTab === 'profile' ? '2px solid var(--accent-primary)' : '2px solid transparent',
            color: activeTab === 'profile' ? 'var(--accent-primary)' : 'var(--text-secondary)',
          }}
        >
          <User size={16} />
          Profile Details
        </button>

        <button
          onClick={() => setActiveTab('preferences')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
            borderBottom: activeTab === 'preferences' ? '2px solid var(--accent-primary)' : '2px solid transparent',
            color: activeTab === 'preferences' ? 'var(--accent-primary)' : 'var(--text-secondary)',
          }}
        >
          <Palette size={16} />
          Appearance & Theme
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
            borderBottom: activeTab === 'notifications' ? '2px solid var(--accent-primary)' : '2px solid transparent',
            color: activeTab === 'notifications' ? 'var(--accent-primary)' : 'var(--text-secondary)',
          }}
        >
          <Bell size={16} />
          Notifications
        </button>

        <button
          onClick={() => setActiveTab('security')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
            borderBottom: activeTab === 'security' ? '2px solid var(--accent-primary)' : '2px solid transparent',
            color: activeTab === 'security' ? 'var(--accent-primary)' : 'var(--text-secondary)',
          }}
        >
          <Shield size={16} />
          Security & Access
        </button>
      </div>

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <div className="card-panel" style={{ maxWidth: '780px' }}>
          <div className="card-header-flex">
            <div className="card-title-group">
              <h3 className="card-title">Personal Information</h3>
              <p className="card-subtitle">Update your profile identity and public credentials</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <img
                src={user.avatar}
                alt={user.name}
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: 'var(--radius-lg)',
                  objectFit: 'cover',
                  border: '2px solid var(--border-color)',
                }}
              />
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {user.name}
                </h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  {user.title} • {user.department}
                </p>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.625rem' }}
                  onClick={() => alert('Photo upload dialog simulated.')}
                >
                  Change Avatar
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Job Title / Role</label>
                <input
                  type="text"
                  className="form-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Office Location</label>
                <input
                  type="text"
                  className="form-input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div style={{ marginTop: '0.5rem' }}>
              <button type="submit" className="btn-primary">
                <Save size={16} /> Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Preferences (Theme) */}
      {activeTab === 'preferences' && (
        <div className="card-panel" style={{ maxWidth: '780px' }}>
          <div className="card-header-flex">
            <div className="card-title-group">
              <h3 className="card-title">Theme & Visual Experience</h3>
              <p className="card-subtitle">Choose how you want Auspify Dashboard to look on your devices</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
            <div
              onClick={() => theme !== 'light' && onToggleTheme()}
              style={{
                border: theme === 'light' ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                cursor: 'pointer',
                backgroundColor: 'var(--bg-card)',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Sun size={20} color="#f59e0b" />
                <h4 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>Modern Light Mode</h4>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Crisp white cards, soft slate gray background, and high contrast blue/purple accents.
              </p>
              {theme === 'light' && (
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: '0.75rem',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    color: 'var(--accent-primary)',
                  }}
                >
                  ✓ Currently Active
                </span>
              )}
            </div>

            <div
              onClick={() => theme !== 'dark' && onToggleTheme()}
              style={{
                border: theme === 'dark' ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                cursor: 'pointer',
                backgroundColor: 'var(--bg-card)',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Moon size={20} color="#8b5cf6" />
                <h4 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>Sleek Dark Mode</h4>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Deep midnight slate tones designed for night work, low eye fatigue, and vibrant glowing charts.
              </p>
              {theme === 'dark' && (
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: '0.75rem',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    color: 'var(--accent-primary)',
                  }}
                >
                  ✓ Currently Active
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Notifications */}
      {activeTab === 'notifications' && (
        <div className="card-panel" style={{ maxWidth: '780px' }}>
          <div className="card-header-flex">
            <div className="card-title-group">
              <h3 className="card-title">Notification Channels</h3>
              <p className="card-subtitle">Configure alerts for sprint changes and task assignments</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border-light)', cursor: 'pointer' }}>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Daily Digest Emails</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Receive executive rollups every morning at 9:00 AM</div>
              </div>
              <input
                type="checkbox"
                checked={emailNotifs}
                onChange={(e) => setEmailNotifs(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border-light)', cursor: 'pointer' }}>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Sprint & Task Milestones</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Get notified when projects reach 100% or change status</div>
              </div>
              <input
                type="checkbox"
                checked={sprintNotifs}
                onChange={(e) => setSprintNotifs(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', cursor: 'pointer' }}>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Security & Auth Alerts</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Immediate notification for new logins and permission changes</div>
              </div>
              <input
                type="checkbox"
                checked={securityNotifs}
                onChange={(e) => setSecurityNotifs(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
              />
            </label>
          </div>
        </div>
      )}

      {/* Tab 4: Security */}
      {activeTab === 'security' && (
        <div className="card-panel" style={{ maxWidth: '780px' }}>
          <div className="card-header-flex">
            <div className="card-title-group">
              <h3 className="card-title">Security & Two-Factor Authentication</h3>
              <p className="card-subtitle">Manage session tokens, credentials, and authentication layers</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'var(--bg-card-active)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>Two-Factor Authentication (2FA)</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Secured via Authenticator App (TOTP)</p>
              </div>
              <span className="badge-status completed">Enabled</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'var(--bg-card-active)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>Active Workspace Sessions</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Current session: Windows 11 Chrome (San Francisco, CA)</p>
              </div>
              <button
                className="btn-secondary"
                style={{ fontSize: '0.75rem' }}
                onClick={() => alert('All other sessions terminated.')}
              >
                Log out other devices
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
