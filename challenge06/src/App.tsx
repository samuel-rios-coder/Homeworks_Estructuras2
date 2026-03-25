import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/Login';
import { Exercise1 } from './pages/Exercise1';
import { Exercise2 } from './pages/Exercise2';
import { PrivateRoute } from './components/PrivateRoute';
import { Layout } from './components/Layout';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/exercise1" element={<Exercise1 />} />
              <Route path="/exercise2" element={<Exercise2 />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
