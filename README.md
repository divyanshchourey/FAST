# FAST — Feedback Assessment & Solution Tool

> **Department of Electrical Engineering**  
> **Shri Govindram Seksaria Institute of Technology & Science, Indore**  
> **Batch E11 — UG Minor Project (Phase 1 Specification)**

---

## 🚀 Phase 1 Implementation Overview

Phase 1 establishes the **Project Skeleton, Database Architecture & Role-Based Authentication Foundation**.

- **Frontend:** React (Vite) + Lucide Icons + Custom CSS Design System (SGSITS institutional palette, dark glassmorphism, responsive cards).
- **Backend:** Node.js + Express REST API with JWT security and role verification.
- **Database:** SQLite (`fast.db` in `server/`) with tables for `users`, `feedback_forms`, `questions`, `responses`, `analytics`, and `solutions`.

---

## 👥 Seeded Stakeholder Accounts (Pre-configured for Testing)

All accounts share the default password: **`Fast@1234`**

| Role | Name | Email / ID | Context |
| :--- | :--- | :--- | :--- |
| **Student** | Utkarsh Gupta | `utkarsh@sgsits.ac.in` (`0801EE231109`) | Course & Lab Evaluations |
| **Faculty** | Dr. Arun Parakh | `arun.parakh@sgsits.ac.in` (`EMP-EE-104`) | Curriculum Design & Autonomy |
| **Admin** | IQAC Cell | `admin@sgsits.ac.in` (`ADMIN-01`) | Analytics & NAAC Accreditation |
| **Alumni** | Yash Dwivedi | `yash.alumni@sgsits.ac.in` (`0801EE191080`) | Program Relevance & Career Fit |
| **Examiner**| Prof. External | `examiner@sgsits.ac.in` (`EXAM-2026`) | Evaluation & Paper Standards |
| **Employer**| Campus Recruiter| `recruiter@employer.com` (`EMP-CORP-09`) | Graduate Skill Preparedness |
| **Parent**  | Suresh Gupta | `parent.gupta@gmail.com` (`P-0801EE231109`) | Institutional Communication |

---

## 🛠️ How to Run Locally

### 1. Start Backend API
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

### 2. Start Frontend Client
```bash
cd client
npm run dev
# Client runs on http://localhost:5173
```
