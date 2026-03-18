import React, { useState } from 'react';
import type { Libro } from './Libro';

interface FormularioLibroProps {
  alAgregarLibro: (libro: Libro) => void;
}

export const FormularioLibro: React.FC<FormularioLibroProps> = ({ alAgregarLibro }) => {
  const [nombre, setNombre] = useState('');
  const [isbn, setIsbn] = useState('');
  const [autor, setAutor] = useState('');
  const [editorial, setEditorial] = useState('');

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que todos los campos estén llenos
    if (!nombre || !isbn || !autor || !editorial) {
      alert('Por favor, rellena todos los campos');
      return;
    }

    // Crear nuevo libro
    const nuevoLibro: Libro = {
      nombre,
      isbn,
      autor,
      editorial,
    };

    // Agregar libro a la pila
    alAgregarLibro(nuevoLibro);

    // Limpiar formulario
    setNombre('');
    setIsbn('');
    setAutor('');
    setEditorial('');
  };

  return (
    <form onSubmit={manejarEnvio} className="formulario-libro">
      <h2>Agregar Nuevo Libro</h2>
      <div className="campo-formulario">
        <label htmlFor="nombre">Nombre del Libro:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ingresa el nombre del libro"
        />
      </div>

      <div className="campo-formulario">
        <label htmlFor="isbn">ISBN:</label>
        <input
          type="text"
          id="isbn"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          placeholder="Ingresa el ISBN"
        />
      </div>

      <div className="campo-formulario">
        <label htmlFor="autor">Autor:</label>
        <input
          type="text"
          id="autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          placeholder="Ingresa el autor"
        />
      </div>

      <div className="campo-formulario">
        <label htmlFor="editorial">Editorial:</label>
        <input
          type="text"
          id="editorial"
          value={editorial}
          onChange={(e) => setEditorial(e.target.value)}
          placeholder="Ingresa la editorial"
        />
      </div>

      <button type="submit" className="boton-agregar">Agregar Libro</button>
    </form>
  );
};
