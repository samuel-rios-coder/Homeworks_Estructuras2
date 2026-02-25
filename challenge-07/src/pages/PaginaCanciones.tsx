import { useState } from 'react';
import { ListaEnlazada } from '../estructuras/ListaEnlazada';
import '../styles/PaginaCanciones.css';

interface Props {
  onIrA: (pagina: string) => void;
}

export default function PaginaCanciones({ onIrA }: Props) {
  const [listaEnlazada] = useState(() => {
    const lista = new ListaEnlazada();
    lista.agregar('Tití Me Preguntó - Bad Bunny');
    lista.agregar('Ella Baila Sola - Eslabon Armado');
    lista.agregar('Dakiti - Bad Bunny ft. Jhay Cortez');
    lista.agregar('Mamiii - Becky G ft. Karol G');
    lista.agregar('Pepas - Farruko');
    return lista;
  });

  const [cancionActual, setCancionActual] = useState(listaEnlazada.obtenerActual());
  const [todasLasCanciones] = useState(
    listaEnlazada.obtenerTodas()
  );

  const reproducir = () => {
    if (listaEnlazada.siguiente()) {
      setCancionActual(listaEnlazada.obtenerActual());
    } else {
      alert('Se reprodujeron todas las canciones');
      listaEnlazada.irAlInicio();
      setCancionActual(listaEnlazada.obtenerActual());
    }
  };

  const reiniciar = () => {
    listaEnlazada.irAlInicio();
    setCancionActual(listaEnlazada.obtenerActual());
  };

  return (
    <div className="pagina-canciones">
      <div className="tarjeta-canciones">
        <h2>Reproductor de Canciones</h2>

        <div className="seccion-lista">
          <h3>Todas las Canciones:</h3>
          <ul className="lista-canciones">
            {todasLasCanciones.map((cancion, index) => (
              <li key={index} className={cancion === cancionActual ? 'activa' : ''}>
                {cancion}
              </li>
            ))}
          </ul>
        </div>

        <div className="botonesReproductor">
          <button onClick={reproducir} className="btn reproducir">
            Siguiente Canción
          </button>
          <button onClick={reiniciar} className="btn reiniciar">
            Reiniciar
          </button>
          <button 
            onClick={() => onIrA('Historial')} 
            className="btn ir-historial"
          >
            Ir a Historial
          </button>
        </div>
      </div>
    </div>
  );
}
