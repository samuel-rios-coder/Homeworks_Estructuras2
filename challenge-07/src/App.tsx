import { useState } from 'react';
import { ListaDoblementeEnlazada } from './estructuras/ListaDoblementeEnlazada';
import PaginaCanciones from './pages/PaginaCanciones';
import PaginaHistorial from './pages/PaginaHistorial';
import './App.css';

// Crear el historial de páginas
const historialPaginas = new ListaDoblementeEnlazada();
historialPaginas.agregar('Canciones');
historialPaginas.agregar('Historial');

export default function App() {
  const [paginaActual, setPaginaActual] = useState('Canciones');

  const irAPagina = (nombraPagina: string) => {
    setPaginaActual(nombraPagina);
    historialPaginas.agregar(nombraPagina);
  };

  const irAtras = () => {
    if (historialPaginas.irAtras()) {
      setPaginaActual(historialPaginas.obtenerActual());
    }
  };

  const irAdelante = () => {
    if (historialPaginas.irAdelante()) {
      setPaginaActual(historialPaginas.obtenerActual());
    }
  };

  return (
    <div className="contenedor-principal">
      <nav className="navegacion">
        <button 
          onClick={irAtras}
          disabled={!historialPaginas.hayAtras()}
          className="btn-nav"
        >
          Atras
        </button>
        
        <div className="titulo-nav">
          <h1>Gestor de Canciones y Navegacion</h1>
          <p>Pagina actual: {paginaActual}</p>
        </div>

        <button 
          onClick={irAdelante}
          disabled={!historialPaginas.hayAdelante()}
          className="btn-nav"
        >
          Adelante
        </button>
      </nav>

      <div className="contenido-pagina">
        {paginaActual === 'Canciones' && (
          <PaginaCanciones onIrA={irAPagina} />
        )}
        {paginaActual === 'Historial' && (
          <PaginaHistorial 
            onIrA={irAPagina}
          />
        )}
      </div>
    </div>
  );
}
