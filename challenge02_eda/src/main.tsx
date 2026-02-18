import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style.css'

// renderizar la aplicación
ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
