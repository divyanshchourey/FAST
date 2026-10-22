import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  BarChart3, 
  FileText, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  Layers,
  ChevronRight,
  DownloadCloud,
  CheckCircle2
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [submittedForms, setSubmittedForms] = useState({});

  const isAdmin = user?.role === 'admin';

  const handleSimulateSubmit = (formId) => {
    setSubmittedForms((prev) => ({ ...prev, [formId]: true }));
  };

  return (
    <div className="dashboard-container">
      {/* Top Welcome Bar */}
      <div className="welcome-banner glass-panel">
        <div className="welcome-info">
          <div className="role-tag-badge">
            <span className="dot-pulse" />
            <span>ROLE: {user?.role?.toUpperCase()}</span>
          </div>
          <h1 className="welcome-heading">
            Welcome back, {user?.name}
          </h1>
          <p className="welcome-sub">
            {user?.department} · {user?.enrollment_no ? `ID: ${user?.enrollment_no}` : 'IQAC Cell'} · Academic Session 2026–27
          </p>
        </div>

        <div className="quick-meta-pill">
          <div className="meta-item">
            <span className="meta-label">Accreditation Cycle</span>
            <span className="meta-value">NAAC Criterion 1.4</span>
          </div>
          <div className="meta-divider" />
          <div className="meta-item">
            <span className="meta-label">System Status</span>
            <span className="meta-value text-accent">Active &amp; Collecting</span>
          </div>
        </div>
      </div>

      {isAdmin ? (
        /* Admin / IQAC Dashboard View (Mockup Slide 18) */
        <div className="admin-grid">
          {/* Stat Cards */}
          <div className="stats-row">
            <div className="stat-card glass-panel">
              <div className="stat-label">TOTAL RESPONSES</div>
              <div className="stat-value text-primary">1,247</div>
              <div className="stat-note">↑ 18% from last semester</div>
            </div>

            <div className="stat-card glass-panel">
              <div className="stat-label">RESPONSE RATE</div>
              <div className="stat-value text-accent">73.4%</div>
              <div className="stat-note">Target: 70%+ achieved</div>
            </div>

            <div className="stat-card glass-panel">
              <div className="stat-label">AVERAGE RATING</div>
              <div className="stat-value text-amber">4.2 <span className="stat-sub">/ 5.0</span></div>
              <div className="stat-note">Across 6 stakeholder groups</div>
            </div>

            <div className="stat-card glass-panel">
              <div className="stat-label">ACTIVE FORMS</div>
              <div className="stat-value text-primary">8</div>
              <div className="stat-note">2 ending in 48 hours</div>
            </div>
          </div>

          {/* Admin Control Tabs */}
          <div className="admin-content-box glass-panel">
            <div className="tabs-header">
              <button 
                onClick={() => setActiveTab('overview')} 
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              >
                <BarChart3 size={16} />
                <span>Response Analytics</span>
              </button>
              <button 
                onClick={() => setActiveTab('forms')} 
                className={`tab-btn ${activeTab === 'forms' ? 'active' : ''}`}
              >
                <FileText size={16} />
                <span>Active Feedback Forms</span>
              </button>
              <button 
                onClick={() => setActiveTab('solutions')} 
                className={`tab-btn ${activeTab === 'solutions' ? 'active' : ''}`}
              >
                <Sparkles size={16} />
                <span>AI Solution Reports</span>
              </button>
            </div>

            <div className="tab-body">
              {activeTab === 'overview' && (
                <div className="tab-pane animate-fade-in">
                  <div className="analytics-summary-grid">
                    <div className="chart-placeholder-box">
                      <div className="box-title">Stakeholder Participation Breakdown</div>
                      <div className="mini-bars-list">
                        <div className="bar-row">
                          <span className="row-name">Students (UG / PG)</span>
                          <div className="bar-track"><div className="bar-fill" style={{ width: '84%', background: 'var(--primary-500)' }} /></div>
                          <span className="row-pct">84%</span>
                        </div>
                        <div className="bar-row">
                          <span className="row-name">Faculty Members</span>
                          <div className="bar-track"><div className="bar-fill" style={{ width: '92%', background: 'var(--primary-400)' }} /></div>
                          <span className="row-pct">92%</span>
                        </div>
                        <div className="bar-row">
                          <span className="row-name">Alumni Network</span>
                          <div className="bar-track"><div className="bar-fill" style={{ width: '58%', background: 'var(--accent-500)' }} /></div>
                          <span className="row-pct">58%</span>
                        </div>
                        <div className="bar-row">
                          <span className="row-name">Industry Employers</span>
                          <div className="bar-track"><div className="bar-fill" style={{ width: '64%', background: 'var(--warning-500)' }} /></div>
                          <span className="row-pct">64%</span>
                        </div>
                        <div className="bar-row">
                          <span className="row-name">Parents / Guardians</span>
                          <div className="bar-track"><div className="bar-fill" style={{ width: '47%', background: '#8b5cf6' }} /></div>
                          <span className="row-pct">47%</span>
                        </div>
                      </div>
                    </div>

                    <div className="chart-placeholder-box">
                      <div className="box-title">Real-Time Sentiment Index</div>
                      <div className="sentiment-gauges">
                        <div className="sentiment-card positive">
                          <span className="s-emoji">😊</span>
                          <span className="s-val">68%</span>
                          <span className="s-lbl">Positive Remarks</span>
                        </div>
                        <div className="sentiment-card neutral">
                          <span className="s-emoji">😐</span>
                          <span className="s-val">22%</span>
                          <span className="s-lbl">Neutral Feedback</span>
                        </div>
                        <div className="sentiment-card negative">
                          <span className="s-emoji">⚠️</span>
                          <span className="s-val">10%</span>
                          <span className="s-lbl">Issues Flagged</span>
                        </div>
                      </div>
                      <div className="sentiment-note">
                        Analyzed using NLP sentiment scoring on qualitative feedback submissions.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'forms' && (
                <div className="tab-pane animate-fade-in">
                  <table className="fast-table">
                    <thead>
                      <tr>
                        <th>Form Title</th>
                        <th>Target Group</th>
                        <th>Semester / Academic Year</th>
                        <th>Status</th>
                        <th>Deadline</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-bold">Course Evaluation &amp; Lab Quality</td>
                        <td><span className="role-pill-sm student">Student</span></td>
                        <td>VII Sem · 2026-27</td>
                        <td><span className="status-badge open">Active</span></td>
                        <td>15 Nov 2026</td>
                      </tr>
                      <tr>
                        <td className="font-bold">Curriculum Design &amp; OBE Review</td>
                        <td><span className="role-pill-sm faculty">Faculty</span></td>
                        <td>Annual 2026-27</td>
                        <td><span className="status-badge open">Active</span></td>
                        <td>20 Nov 2026</td>
                      </tr>
                      <tr>
                        <td className="font-bold">Graduate Skill Preparedness &amp; Industry Fit</td>
                        <td><span className="role-pill-sm employer">Employer</span></td>
                        <td>Batch 2026</td>
                        <td><span className="status-badge open">Active</span></td>
                        <td>30 Nov 2026</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'solutions' && (
                <div className="tab-pane animate-fade-in">
                  <div className="solutions-list">
                    <div className="solution-item priority-high">
                      <div className="sol-badge high">⚠️ HIGH PRIORITY</div>
                      <h4 className="sol-title">Lab Equipment Modernization (Electrical Machines Lab)</h4>
                      <p className="sol-desc">
                        67% of student responses flagged outdated test benches and multimeters in Lab 2.
                      </p>
                      <div className="sol-action">
                        <strong>Action Recommendation:</strong> Procure 8 updated digital storage oscilloscopes and motor test units. Estimated Budget: ₹3.5L.
                      </div>
                    </div>

                    <div className="solution-item priority-medium">
                      <div className="sol-badge med">⚡ MEDIUM PRIORITY</div>
                      <h4 className="sol-title">Embedded Systems &amp; IoT Curriculum Integration</h4>
                      <p className="sol-desc">
                        Employer surveys from 4 recruiters highlighted a gap in hands-on PLC and ARM microcontroller programming.
                      </p>
                      <div className="sol-action">
                        <strong>Action Recommendation:</strong> Introduce 2 elective modules in VII/VIII semester and organize weekend workshop with industry partners.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Stakeholder Assigned Forms View */
        <div className="stakeholder-view">
          <div className="section-title-row">
            <h2 className="section-title">
              Assigned Institutional Feedback Forms
            </h2>
            <span className="badge-light">Role-Tailored Questionnaire</span>
          </div>

          <div className="forms-deck">
            <div className="form-survey-card glass-panel">
              <div className="survey-top">
                <span className="survey-category">ACADEMIC &amp; FACILITY ASSESSMENT</span>
                <span className="survey-status">
                  {submittedForms['form-1'] ? (
                    <span className="submitted-tag"><CheckCircle2 size={14} /> Submitted</span>
                  ) : (
                    <span className="pending-tag"><Clock size={14} /> Response Pending</span>
                  )}
                </span>
              </div>

              <h3 className="survey-title">
                {user?.role === 'student' && 'Course Evaluation & Laboratory Infrastructure Survey'}
                {user?.role === 'faculty' && 'Curriculum Design, Resource Availability & Academic Autonomy'}
                {user?.role === 'alumni' && 'Long-term Career Preparedness & Curriculum Relevance'}
                {user?.role === 'examiner' && 'Evaluation Rigor, Question Paper Standard & Student Performance'}
                {user?.role === 'employer' && 'Industry Readiness, Technical Aptitude & Soft Skills Assessment'}
                {user?.role === 'parent' && 'Institutional Communication, Mentorship & Campus Amenities'}
              </h3>

              <p className="survey-desc">
                Your direct inputs are compiled anonymously and feed into the NAAC/NBA compliance cycle to drive targeted infrastructural and academic enhancements.
              </p>

              <div className="survey-meta-row">
                <span>Academic Year: <strong>2026–27</strong></span>
                <span>Deadline: <strong>15 Nov 2026</strong></span>
                <span>Format: <strong>Likert Scale (1–5) + Qualitative Remarks</strong></span>
              </div>

              <div className="survey-actions">
                {submittedForms['form-1'] ? (
                  <button disabled className="btn btn-secondary w-full">
                    <CheckCircle size={16} />
                    Thank you! Response recorded into FAST database.
                  </button>
                ) : (
                  <button 
                    onClick={() => handleSimulateSubmit('form-1')} 
                    className="btn btn-primary"
                  >
                    <span>Proceed to Feedback Form (Phase 2 Preview)</span>
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .dashboard-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .welcome-banner {
          padding: 24px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-left: 4px solid var(--accent-500);
        }
        .role-tag-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(5, 150, 105, 0.2);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: var(--accent-400);
          padding: 3px 10px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.8px;
          margin-bottom: 8px;
        }
        .dot-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-400);
          box-shadow: 0 0 8px var(--accent-400);
        }
        .welcome-heading {
          font-size: 24px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 2px;
        }
        .welcome-sub {
          font-size: 13px;
          color: var(--text-muted);
        }
        .quick-meta-pill {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 10px 18px;
          border-radius: var(--radius-md);
        }
        .meta-item {
          display: flex;
          flex-direction: column;
        }
        .meta-label {
          font-size: 10.5px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .meta-value {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-main);
        }
        .meta-divider {
          width: 1px;
          height: 28px;
          background: rgba(255, 255, 255, 0.1);
        }

        /* Stats Row */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        .stat-card {
          padding: 20px;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .stat-label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          color: var(--text-muted);
        }
        .stat-value {
          font-size: 32px;
          font-weight: 900;
          line-height: 1.1;
        }
        .stat-sub {
          font-size: 14px;
          color: var(--text-muted);
          font-weight: 500;
        }
        .stat-note {
          font-size: 11.5px;
          color: var(--text-sub);
          margin-top: 4px;
        }
        .text-primary { color: var(--primary-400); }
        .text-accent { color: var(--accent-400); }
        .text-amber { color: var(--warning-500); }

        /* Admin Content Box */
        .admin-content-box {
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        .tabs-header {
          display: flex;
          gap: 2px;
          background: rgba(0, 0, 0, 0.3);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 8px 12px 0 12px;
        }
        .tab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 18px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: var(--transition);
        }
        .tab-btn:hover {
          color: var(--text-main);
        }
        .tab-btn.active {
          color: var(--primary-400);
          border-bottom-color: var(--primary-400);
          background: rgba(255, 255, 255, 0.03);
          border-radius: var(--radius-sm) var(--radius-sm) 0 0;
        }

        .tab-body {
          padding: 24px;
        }
        .analytics-summary-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 20px;
        }
        .chart-placeholder-box {
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: var(--radius-md);
          padding: 20px;
        }
        .box-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 16px;
        }
        .mini-bars-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .bar-row {
          display: grid;
          grid-template-columns: 140px 1fr 40px;
          align-items: center;
          gap: 12px;
          font-size: 12.5px;
        }
        .row-name {
          color: var(--text-sub);
          font-weight: 500;
        }
        .bar-track {
          height: 10px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          overflow: hidden;
        }
        .bar-fill {
          height: 100%;
          border-radius: 10px;
          transition: width 0.5s ease;
        }
        .row-pct {
          color: var(--text-main);
          font-weight: 700;
          text-align: right;
        }

        .sentiment-gauges {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 16px;
        }
        .sentiment-card {
          background: rgba(255, 255, 255, 0.04);
          border-radius: var(--radius-sm);
          padding: 14px 8px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .s-emoji { font-size: 22px; }
        .s-val { font-size: 20px; font-weight: 900; }
        .s-lbl { font-size: 10px; color: var(--text-muted); }
        .sentiment-card.positive .s-val { color: var(--accent-400); }
        .sentiment-card.neutral .s-val { color: var(--warning-500); }
        .sentiment-card.negative .s-val { color: var(--danger-500); }
        .sentiment-note {
          font-size: 11.5px;
          color: var(--text-muted);
          line-height: 1.5;
        }

        /* Table */
        .fast-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13.5px;
        }
        .fast-table th {
          text-align: left;
          padding: 12px 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-muted);
          font-size: 11.5px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .fast-table td {
          padding: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--text-sub);
        }
        .font-bold { font-weight: 700; color: #ffffff; }
        .role-pill-sm {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 700;
        }
        .role-pill-sm.student { background: rgba(37, 99, 235, 0.2); color: var(--primary-100); }
        .role-pill-sm.faculty { background: rgba(16, 185, 129, 0.2); color: var(--accent-100); }
        .role-pill-sm.employer { background: rgba(245, 158, 11, 0.2); color: var(--warning-100); }
        .status-badge.open {
          background: rgba(16, 185, 129, 0.15);
          color: var(--accent-400);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          font-size: 11px;
          font-weight: 700;
        }

        /* Solutions */
        .solutions-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .solution-item {
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-md);
          padding: 18px;
        }
        .solution-item.priority-high {
          border-left: 4px solid var(--danger-500);
        }
        .solution-item.priority-medium {
          border-left: 4px solid var(--warning-500);
        }
        .sol-badge {
          display: inline-block;
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 0.5px;
          padding: 3px 8px;
          border-radius: 4px;
          margin-bottom: 8px;
        }
        .sol-badge.high { background: rgba(239, 68, 68, 0.2); color: #fca5a5; }
        .sol-badge.med { background: rgba(245, 158, 11, 0.2); color: #fde68a; }
        .sol-title {
          font-size: 15px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .sol-desc {
          font-size: 13px;
          color: var(--text-sub);
          margin-bottom: 10px;
        }
        .sol-action {
          font-size: 12.5px;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 6px;
          padding: 8px 12px;
          color: var(--text-main);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        /* Stakeholder Assigned Forms */
        .stakeholder-view {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .section-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .section-title {
          font-size: 18px;
          font-weight: 800;
          color: #ffffff;
        }
        .badge-light {
          font-size: 11px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 4px 12px;
          border-radius: 100px;
          color: var(--text-sub);
        }
        .form-survey-card {
          padding: 28px;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .survey-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .survey-category {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          color: var(--primary-400);
        }
        .pending-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #fde68a;
          background: rgba(245, 158, 11, 0.15);
          border: 1px solid rgba(245, 158, 11, 0.3);
          padding: 4px 10px;
          border-radius: 100px;
          font-weight: 700;
        }
        .submitted-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #86efac;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 4px 10px;
          border-radius: 100px;
          font-weight: 700;
        }
        .survey-title {
          font-size: 20px;
          font-weight: 800;
          color: #ffffff;
        }
        .survey-desc {
          font-size: 14px;
          color: var(--text-sub);
          line-height: 1.6;
        }
        .survey-meta-row {
          display: flex;
          gap: 24px;
          font-size: 12.5px;
          color: var(--text-muted);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 14px;
        }
        .survey-meta-row strong {
          color: var(--text-main);
        }
        .survey-actions {
          margin-top: 6px;
        }

        @media (max-width: 1024px) {
          .stats-row {
            grid-template-columns: 1fr 1fr;
          }
          .analytics-summary-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
