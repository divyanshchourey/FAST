import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, ShieldCheck, GraduationCap, Building2, User } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <ShieldCheck size={16} className="text-emerald-400" />;
      case 'faculty': return <Building2 size={16} className="text-blue-400" />;
      case 'student': return <GraduationCap size={16} className="text-amber-400" />;
      default: return <User size={16} className="text-slate-400" />;
    }
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <div className="brand-logo-badge">FAST</div>
          <div>
            <div className="brand-title">
              FEEDBACK ASSESSMENT &amp; SOLUTION TOOL
            </div>
            <div className="brand-subtitle">
              SGSITS INDORE · DEPT. OF ELECTRICAL ENGINEERING · BATCH E11
            </div>
          </div>
        </div>

        <div className="nav-actions">
          {user ? (
            <div className="user-profile-bar">
              <div className="user-badge">
                <span className="role-dot" />
                <span className="user-role-tag">{user.role?.toUpperCase()}</span>
                <span className="user-name">{user.name}</span>
              </div>
              <button onClick={logout} className="btn-logout" title="Sign Out">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="batch-pill">
              MINOR PROJECT · PHASE 1
            </div>
          )}
        </div>
      </div>

      <style>{`
        .navbar {
          background: rgba(12, 35, 64, 0.9);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 12px 28px;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .brand-logo-badge {
          background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-700) 100%);
          color: white;
          font-size: 16px;
          font-weight: 900;
          letter-spacing: 1.5px;
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          box-shadow: 0 0 15px rgba(37, 99, 235, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .brand-title {
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.8px;
          color: #ffffff;
        }
        .brand-subtitle {
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.5px;
          font-weight: 500;
        }
        .batch-pill {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 4px 14px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          color: var(--primary-100);
        }
        .user-profile-bar {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .user-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border);
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 12px;
        }
        .role-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-400);
          box-shadow: 0 0 8px var(--accent-400);
        }
        .user-role-tag {
          font-weight: 800;
          color: var(--primary-400);
          letter-spacing: 0.5px;
        }
        .user-name {
          color: var(--text-main);
          font-weight: 600;
        }
        .btn-logout {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }
        .btn-logout:hover {
          background: rgba(239, 68, 68, 0.25);
          color: #ffffff;
        }
      `}</style>
    </header>
  );
}
