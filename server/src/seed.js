import bcrypt from 'bcryptjs';
import db, { initDatabase } from './config/db.js';

initDatabase();

const salt = bcrypt.genSaltSync(10);
const defaultPasswordHash = bcrypt.hashSync('Fast@1234', salt);

const seedUsers = [
  {
    name: 'Utkarsh Gupta',
    email: 'utkarsh@sgsits.ac.in',
    role: 'student',
    enrollment_no: '0801EE231109',
    department: 'Electrical Engineering'
  },
  {
    name: 'Dr. Arun Parakh',
    email: 'arun.parakh@sgsits.ac.in',
    role: 'faculty',
    enrollment_no: 'EMP-EE-104',
    department: 'Electrical Engineering'
  },
  {
    name: 'IQAC Admin Cell',
    email: 'admin@sgsits.ac.in',
    role: 'admin',
    enrollment_no: 'ADMIN-01',
    department: 'Academic Affairs'
  },
  {
    name: 'Yash Dwivedi (Alumnus)',
    email: 'yash.alumni@sgsits.ac.in',
    role: 'alumni',
    enrollment_no: '0801EE191080',
    department: 'Electrical Engineering'
  },
  {
    name: 'Prof. External Examiner',
    email: 'examiner@sgsits.ac.in',
    role: 'examiner',
    enrollment_no: 'EXAM-2026',
    department: 'Electrical Engineering'
  },
  {
    name: 'Campus Recruiter',
    email: 'recruiter@employer.com',
    role: 'employer',
    enrollment_no: 'EMP-CORP-09',
    department: 'Talent Acquisition'
  },
  {
    name: 'Parent / Guardian',
    email: 'parent.gupta@gmail.com',
    role: 'parent',
    enrollment_no: 'P-0801EE231109',
    department: 'Electrical Engineering'
  }
];

const insertStmt = db.prepare(`
  INSERT OR IGNORE INTO users (name, email, password_hash, role, enrollment_no, department)
  VALUES (?, ?, ?, ?, ?, ?)
`);

console.log('🌱 Seeding default users for all 7 roles...');

for (const u of seedUsers) {
  insertStmt.run(u.name, u.email, defaultPasswordHash, u.role, u.enrollment_no, u.department);
  console.log(`  ✓ ${u.role.toUpperCase()}: ${u.email} (pass: Fast@1234)`);
}

// Add a sample feedback form for Student Course Evaluation to verify Phase 1 DB link
const sampleFormStmt = db.prepare(`
  INSERT OR IGNORE INTO feedback_forms (form_id, title, description, target_role, semester, academic_year, status, deadline)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

sampleFormStmt.run(
  1,
  'Course Evaluation & Lab Quality — Odd Semester 2026',
  'NAAC Criterion 1.4 mandatory feedback on teaching effectiveness and lab infrastructure.',
  'student',
  'VII Sem',
  '2026-27',
  'active',
  '2026-11-15'
);

console.log('✅ Seeding complete!');
