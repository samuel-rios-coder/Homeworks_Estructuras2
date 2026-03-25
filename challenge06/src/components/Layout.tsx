import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', background: '#f0f0f0' }}>
        <nav style={{ display: 'flex', gap: '15px' }}>
          <Link to="/exercise1">Ejercicio 1</Link>
          <Link to="/exercise2">Ejercicio 2</Link>
        </nav>
        <div>
          <span style={{ marginRight: '15px' }}>Conectado como: <strong>{user}</strong></span>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </header>
      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
};
