import { useState } from 'react';
import { ListaDoblementeEnlazada } from '../estructuras/ListaDoblementeEnlazada';
import '../styles/PaginaHistorial.css';

interface Props {
  onIrA: (pagina: string) => void;
}

export default function PaginaHistorial({ onIrA }: Props) {
  const [historialLocal] = useState(() => {
    const historial = new ListaDoblementeEnlazada();
    historial.agregar('Google.com');
    historial.agregar('YouTube.com');
    historial.agregar('GitHub.com');
    historial.agregar('StackOverflow.com');
    historial.agregar('MDN Docs');
    return historial;
  });

  const [paginaActual, setPaginaActual] = useState(historialLocal.obtenerActual());
  const [todasLasPaginas] = useState(
    historialLocal.obtenerHistorial()
  );

  const irAtrasHistorial = () => {
    if (historialLocal.irAtras()) {
      setPaginaActual(historialLocal.obtenerActual());
    }
  };

  const irAdelanteHistorial = () => {
    if (historialLocal.irAdelante()) {
      setPaginaActual(historialLocal.obtenerActual());
    }
  };

  return (
    <div className="pagina-historial">
      <div className="tarjeta-historial">
        <h2>Historial del Navegador</h2>

        <div className="seccion-historial-completo">
          <h3>Historial Completo:</h3>
          <ul className="lista-historial">
            {todasLasPaginas.map((pagina, index) => (
              <li key={index}>
                {pagina}
              </li>
            ))}
          </ul>
        </div>

        <div className="botonesHistorial">
          <button 
            onClick={irAtrasHistorial}
            disabled={!historialLocal.hayAtras()}
            className="btn atras"
          >
            Página Anterior
          </button>
          
          <button 
            onClick={irAdelanteHistorial}
            disabled={!historialLocal.hayAdelante()}
            className="btn adelante"
          >
            Página Siguiente
          </button>

          <button 
            onClick={() => onIrA('Canciones')} 
            className="btn ir-canciones"
          >
            Ir a Canciones
          </button>
        </div>
      </div>
    </div>
  );
}
