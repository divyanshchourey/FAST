import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, 
  Building2, 
  Users, 
  FileCheck2, 
  Briefcase, 
  HeartHandshake, 
  ShieldAlert, 
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const ROLES = [
  { id: 'student', label: 'Student', icon: GraduationCap, desc: 'Course & Lab Evaluations', demoUser: 'utkarsh@sgsits.ac.in', demoEnroll: '0801EE231109' },
  { id: 'faculty', label: 'Faculty', icon: Building2, desc: 'Curriculum & Resources', demoUser: 'arun.parakh@sgsits.ac.in', demoEnroll: 'EMP-EE-104' },
  { id: 'alumni', label: 'Alumni', icon: Users, desc: 'Program & Career Impact', demoUser: 'yash.alumni@sgsits.ac.in', demoEnroll: '0801EE191080' },
  { id: 'examiner', label: 'Examiner', icon: FileCheck2, desc: 'Examination Process', demoUser: 'examiner@sgsits.ac.in', demoEnroll: 'EXAM-2026' },
  { id: 'employer', label: 'Employer', icon: Briefcase, desc: 'Graduate Skill Readiness', demoUser: 'recruiter@employer.com', demoEnroll: 'EMP-CORP-09' },
  { id: 'parent', label: 'Parent', icon: HeartHandshake, desc: 'Institutional Satisfaction', demoUser: 'parent.gupta@gmail.com', demoEnroll: 'P-0801EE231109' },
  { id: 'admin', label: 'Admin (IQAC)', icon: ShieldAlert, desc: 'Analytics & NAAC Reports', demoUser: 'admin@sgsits.ac.in', demoEnroll: 'ADMIN-01' }
];

export default function Login() {
  const { login, register } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState('student');
  const [identifier, setIdentifier] = useState('utkarsh@sgsits.ac.in');
  const [password, setPassword] = useState('Fast@1234');
  
  // Registration fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('Fast@1234');
  const [regEnrollment, setRegEnrollment] = useState('');
  const [regDepartment, setRegDepartment] = useState('Electrical Engineering');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuickSelectRole = (roleItem) => {
    setSelectedRole(roleItem.id);
    if (!isRegisterMode) {
      setIdentifier(roleItem.demoUser);
      setPassword('Fast@1234');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(identifier, password, selectedRole);
    } catch (err) {
      setError(err.message || 'Failed to authenticate. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register({
        name: regName,
        email: regEmail,
        password: regPassword,
        role: selectedRole,
        enrollment_no: regEnrollment,
        department: regDepartment
      });
    } catch (err) {
      setError(err.message || 'Failed to register account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        
        {/* Left Side: Presentation-inspired Hero Info */}
        <div className="hero-pane glass-panel">
          <div className="hero-top">
            <span className="hero-badge">PHASE 1 PRESENTATION SPECIFICATION</span>
            <h1 className="hero-title">
              Feedback Assessment &amp; Solution Tool
            </h1>
            <p className="hero-acronym">FAST — Closed-Loop Quality Framework</p>
            <p className="hero-desc">
              Automating the complete institutional feedback lifecycle across 6 stakeholder groups.
              Engineered for continuous improvement and direct <strong>NAAC Criterion 1.4</strong> &amp; <strong>NBA OBE</strong> compliance.
            </p>
          </div>

          <div className="role-guide">
            <div className="role-guide-title">
              <Sparkles size={16} className="text-amber-400" />
              <span>Select Stakeholder Persona for Instant Test:</span>
            </div>
            <div className="role-chips-grid">
              {ROLES.map((r) => {
                const Icon = r.icon;
                const isSelected = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleQuickSelectRole(r)}
                    className={`role-chip ${isSelected ? 'active' : ''}`}
                  >
                    <Icon size={16} />
                    <div className="chip-text">
                      <span className="chip-name">{r.label}</span>
                      <span className="chip-desc">{r.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hero-footer">
            <div>Department of Electrical Engineering</div>
            <div>Shri Govindram Seksaria Institute of Technology &amp; Science, Indore</div>
          </div>
        </div>

        {/* Right Side: Authentication Mockup (Slide 17) */}
        <div className="auth-pane glass-panel">
          <div className="mockup-header-bar">
            <div className="dots-group">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="url-slug">fast.sgsits.ac.in/auth/{isRegisterMode ? 'register' : 'login'}</div>
          </div>

          <div className="auth-body">
            <div className="form-toggle-bar">
              <button
                type="button"
                className={`toggle-tab ${!isRegisterMode ? 'active' : ''}`}
                onClick={() => { setIsRegisterMode(false); setError(''); }}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`toggle-tab ${isRegisterMode ? 'active' : ''}`}
                onClick={() => { setIsRegisterMode(true); setError(''); }}
              >
                Register
              </button>
            </div>

            {error && (
              <div className="alert-box error">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {!isRegisterMode ? (
              <form onSubmit={handleLoginSubmit} className="auth-form">
                <div className="form-group">
                  <label>Email or Enrollment / Employee No.</label>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. utkarsh@sgsits.ac.in or 0801EE231109"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <div className="field-hint">Default test password: <code>Fast@1234</code></div>
                </div>

                <div className="form-group">
                  <label>Active Role Context</label>
                  <div className="role-pills-row">
                    {ROLES.slice(0, 6).map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => handleQuickSelectRole(r)}
                        className={`pill-btn ${selectedRole === r.id ? 'active' : ''}`}
                      >
                        {r.label}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleQuickSelectRole(ROLES[6])}
                      className={`pill-btn admin-pill ${selectedRole === 'admin' ? 'active' : ''}`}
                    >
                      Admin
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary submit-btn">
                  {loading ? 'Authenticating...' : `Sign In as ${selectedRole.toUpperCase()}`}
                  <ArrowRight size={16} />
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="auth-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Karan Sankhla"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="karan@sgsits.ac.in"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Role</label>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="select-input"
                    >
                      {ROLES.map((r) => (
                        <option key={r.id} value={r.id}>{r.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Enrollment / ID</label>
                    <input
                      type="text"
                      value={regEnrollment}
                      onChange={(e) => setRegEnrollment(e.target.value)}
                      placeholder="0801EE231047"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                  />
                </div>

                <button type="submit" disabled={loading} className="btn btn-accent submit-btn">
                  {loading ? 'Registering...' : 'Create Account & Sign In'}
                  <CheckCircle2 size={16} />
                </button>
              </form>
            )}

            <div className="demo-hint-box">
              <span className="demo-hint-title">⚡ Quick-Fill Tip:</span>
              <span>Click any role card on the left to auto-populate seeded credentials.</span>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .login-wrapper {
          min-height: calc(100vh - 65px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 20px;
        }
        .login-container {
          max-width: 1250px;
          width: 100%;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 28px;
          align-items: stretch;
        }

        /* Hero Pane */
        .hero-pane {
          padding: 36px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-left: 4px solid var(--primary-500);
        }
        .hero-badge {
          display: inline-block;
          background: rgba(37, 99, 235, 0.2);
          border: 1px solid rgba(59, 130, 246, 0.4);
          color: var(--primary-100);
          padding: 5px 12px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          margin-bottom: 16px;
        }
        .hero-title {
          font-size: 32px;
          font-weight: 900;
          line-height: 1.2;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .hero-acronym {
          font-size: 16px;
          color: var(--accent-400);
          font-weight: 700;
          margin-bottom: 16px;
        }
        .hero-desc {
          font-size: 14.5px;
          color: var(--text-sub);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .role-guide {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-lg);
          padding: 16px;
          margin-bottom: 24px;
        }
        .role-guide-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 12px;
        }
        .role-chips-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .role-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-md);
          color: var(--text-sub);
          cursor: pointer;
          transition: var(--transition);
          text-align: left;
        }
        .role-chip:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }
        .role-chip.active {
          background: rgba(37, 99, 235, 0.2);
          border-color: var(--primary-400);
          color: #ffffff;
          box-shadow: 0 0 14px rgba(37, 99, 235, 0.3);
        }
        .chip-text {
          display: flex;
          flex-direction: column;
        }
        .chip-name {
          font-size: 13px;
          font-weight: 700;
        }
        .chip-desc {
          font-size: 10.5px;
          color: var(--text-muted);
        }

        .hero-footer {
          font-size: 11.5px;
          color: var(--text-muted);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 14px;
          line-height: 1.5;
        }

        /* Auth Pane */
        .auth-pane {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .mockup-header-bar {
          background: rgba(0, 0, 0, 0.35);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 10px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .dots-group {
          display: flex;
          gap: 6px;
        }
        .dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
        }
        .dot-red { background: #ef4444; }
        .dot-yellow { background: #f59e0b; }
        .dot-green { background: #22c55e; }

        .url-slug {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.05);
          padding: 2px 10px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          flex: 1;
        }

        .auth-body {
          padding: 28px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .form-toggle-bar {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: rgba(0, 0, 0, 0.25);
          border-radius: var(--radius-sm);
          padding: 4px;
          margin-bottom: 20px;
        }
        .toggle-tab {
          padding: 8px;
          border-radius: var(--radius-sm);
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: var(--transition);
        }
        .toggle-tab.active {
          background: var(--primary-500);
          color: #ffffff;
        }

        .alert-box {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: var(--radius-md);
          font-size: 12.5px;
          margin-bottom: 16px;
        }
        .alert-box.error {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.4);
          color: #fca5a5;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .form-group label {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--text-sub);
        }
        .form-group input, .select-input {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          color: #ffffff;
          font-size: 13.5px;
          outline: none;
          transition: var(--transition);
        }
        .form-group input:focus, .select-input:focus {
          border-color: var(--primary-400);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
        }
        .field-hint {
          font-size: 11px;
          color: var(--text-muted);
        }
        .field-hint code {
          background: rgba(255, 255, 255, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
          color: var(--accent-400);
          font-family: 'JetBrains Mono', monospace;
        }

        .role-pills-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }
        .pill-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-sub);
          padding: 6px 8px;
          border-radius: 6px;
          font-size: 11.5px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          text-align: center;
        }
        .pill-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .pill-btn.active {
          background: var(--primary-500);
          border-color: var(--primary-400);
          color: white;
          font-weight: 700;
        }
        .pill-btn.admin-pill.active {
          background: var(--accent-500);
          border-color: var(--accent-400);
        }

        .submit-btn {
          margin-top: 8px;
          width: 100%;
          padding: 12px;
          font-size: 14px;
        }

        .demo-hint-box {
          margin-top: 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px dashed rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          font-size: 11.5px;
          color: var(--text-muted);
          line-height: 1.5;
        }
        .demo-hint-title {
          font-weight: 700;
          color: var(--primary-400);
          margin-right: 6px;
        }

        @media (max-width: 960px) {
          .login-container {
            grid-template-columns: 1fr;
          }
          .role-chips-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
