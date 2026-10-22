import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

const VALID_ROLES = ['student', 'faculty', 'alumni', 'examiner', 'employer', 'parent', 'admin'];

export function register(req, res) {
  try {
    const { name, email, password, role, enrollment_no, department } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Name, email, password, and role are required.' });
    }

    const normalizedRole = role.toLowerCase();
    if (!VALID_ROLES.includes(normalizedRole)) {
      return res.status(400).json({ error: `Invalid role. Must be one of: ${VALID_ROLES.join(', ')}` });
    }

    const existing = db.prepare('SELECT user_id FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(409).json({ error: 'A user with this email already exists.' });
    }

    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(password, salt);

    const stmt = db.prepare(`
      INSERT INTO users (name, email, password_hash, role, enrollment_no, department)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name,
      email,
      password_hash,
      normalizedRole,
      enrollment_no || null,
      department || 'Electrical Engineering'
    );

    const token = jwt.sign(
      {
        user_id: result.lastInsertRowid,
        email,
        name,
        role: normalizedRole,
        department: department || 'Electrical Engineering'
      },
      process.env.JWT_SECRET || 'fast_secret',
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        user_id: result.lastInsertRowid,
        name,
        email,
        role: normalizedRole,
        department: department || 'Electrical Engineering',
        enrollment_no: enrollment_no || null
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ error: 'Internal server error during registration.' });
  }
}

export function login(req, res) {
  try {
    const { identifier, password, role } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ error: 'Identifier (email or enrollment no) and password are required.' });
    }

    // Lookup user by email OR enrollment_no
    let query = 'SELECT * FROM users WHERE email = ? OR enrollment_no = ?';
    let params = [identifier, identifier];

    // If role is explicitly provided, verify role match
    if (role) {
      query += ' AND role = ?';
      params.push(role.toLowerCase());
    }

    const user = db.prepare(query).get(...params);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials or role mismatch.' });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        name: user.name,
        role: user.role,
        department: user.department
      },
      process.env.JWT_SECRET || 'fast_secret',
      { expiresIn: '7d' }
    );

    return res.json({
      message: 'Login successful',
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        enrollment_no: user.enrollment_no
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error during login.' });
  }
}

export function getMe(req, res) {
  try {
    const user = db.prepare(`
      SELECT user_id, name, email, role, enrollment_no, department, created_at
      FROM users WHERE user_id = ?
    `).get(req.user.user_id);

    if (!user) {
      return res.status(404).json({ error: 'User profile not found.' });
    }

    return res.json({ user });
  } catch (err) {
    console.error('Get profile error:', err);
    return res.status(500).json({ error: 'Failed to retrieve profile.' });
  }
}
