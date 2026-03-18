import React from 'react';
import type { Libro } from './Libro';

interface PilaLibrosProps {
  libros: Libro[];
}

export const PilaLibros: React.FC<PilaLibrosProps> = ({ libros }) => {
  // Invertir el array para mostrar el tope de la pila primero
  const librosInvertidos = [...libros].reverse();

  return (
    <div className="pila-libros">
      <h2>Pila de Libros ({libros.length})</h2>
      {libros.length === 0 ? (
        <p className="sin-libros">No hay libros en la pila</p>
      ) : (
        <div className="contenedor-libros">
          {librosInvertidos.map((libro, indice) => (
            <div key={indice} className="tarjeta-libro">
              <div className="encabezado-libro">
                <h3>{libro.nombre}</h3>
                <span className="posicion">#{libros.length - indice}</span>
              </div>
              <div className="detalles-libro">
                <p><strong>ISBN:</strong> {libro.isbn}</p>
                <p><strong>Autor:</strong> {libro.autor}</p>
                <p><strong>Editorial:</strong> {libro.editorial}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
