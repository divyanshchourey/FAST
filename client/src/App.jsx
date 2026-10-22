import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function MainApp() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        color: 'var(--text-muted)',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '18px',
            fontWeight: 800,
            letterSpacing: '1px',
            color: 'var(--primary-400)',
            marginBottom: '8px'
          }}>
            FAST PLATFORM
          </div>
          <div>Initializing authentication &amp; session...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-root">
      <Navbar />
      <main>
        {user ? <Dashboard /> : <Login />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
