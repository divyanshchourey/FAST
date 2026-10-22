import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = process.env.DB_FILE || path.join(__dirname, '../../fast.db');
const db = new Database(dbPath);

// Enable WAL mode and foreign keys for performance and integrity
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('student', 'faculty', 'alumni', 'examiner', 'employer', 'parent', 'admin')),
      enrollment_no TEXT,
      department TEXT DEFAULT 'Electrical Engineering',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS feedback_forms (
      form_id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      target_role TEXT NOT NULL,
      semester TEXT,
      academic_year TEXT,
      created_by INTEGER REFERENCES users(user_id),
      status TEXT DEFAULT 'active' CHECK(status IN ('draft', 'active', 'closed')),
      deadline DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS questions (
      question_id INTEGER PRIMARY KEY AUTOINCREMENT,
      form_id INTEGER REFERENCES feedback_forms(form_id) ON DELETE CASCADE,
      question_text TEXT NOT NULL,
      question_type TEXT NOT NULL CHECK(question_type IN ('likert', 'mcq', 'text', 'matrix', 'boolean')),
      category TEXT,
      options TEXT,
      is_required INTEGER DEFAULT 1,
      order_index INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS responses (
      response_id INTEGER PRIMARY KEY AUTOINCREMENT,
      form_id INTEGER REFERENCES feedback_forms(form_id) ON DELETE CASCADE,
      user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
      question_id INTEGER REFERENCES questions(question_id) ON DELETE CASCADE,
      answer_value TEXT,
      answer_text TEXT,
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS analytics (
      analytics_id INTEGER PRIMARY KEY AUTOINCREMENT,
      form_id INTEGER REFERENCES feedback_forms(form_id),
      avg_rating REAL,
      response_count INTEGER,
      sentiment_score REAL,
      category_scores TEXT,
      computed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS solutions (
      solution_id INTEGER PRIMARY KEY AUTOINCREMENT,
      form_id INTEGER REFERENCES feedback_forms(form_id),
      category TEXT,
      problem_summary TEXT,
      recommendation TEXT,
      priority TEXT CHECK(priority IN ('HIGH', 'MEDIUM', 'LOW')),
      status TEXT DEFAULT 'pending'
    );
  `);

  console.log('✅ SQLite database schema initialized at:', dbPath);
}

export default db;
