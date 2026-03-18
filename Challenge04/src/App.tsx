import React, { useState, useRef } from 'react';
import { Pila } from './Pila';
import type { Libro } from './Libro';
import { FormularioLibro } from './FormularioLibro';
import { PilaLibros } from './PilaLibros';
import './style.css';

const App: React.FC = () => {
  // crea la pila de libros
  const pilaLibros = useRef(new Pila<Libro>());

  // datos de mock (libros iniciales pa probar)
  const librosIniciales: Libro[] = [
    {
      nombre: 'Don Quijote',
      isbn: '978-8424917235',
      autor: 'Miguel de Cervantes',
      editorial: 'Penguin Clásicos',
    },
    {
      nombre: 'Cien Años de Soledad',
      isbn: '978-8401516873',
      autor: 'Gabriel García Márquez',
      editorial: 'Debolsillo',
    },
    {
      nombre: 'El Código da Vinci',
      isbn: '978-8409006411',
      autor: 'Dan Brown',
      editorial: 'Planeta',
    },
  ];

  // estado para almacenar los libros
  const [libros, setLibros] = useState<Libro[]>(() => {
    // agrega libros iniciales solo la primera vez
    librosIniciales.forEach((libro) => {
      pilaLibros.current.apilar(libro);
    });
    return pilaLibros.current.obtenerElementos();
  });

  // maneja la adición de un nuevo libro
  const manejarAgregarLibro = (nuevoLibro: Libro) => {
    pilaLibros.current.apilar(nuevoLibro);
    setLibros([...pilaLibros.current.obtenerElementos()]);
  };

  return (
    <div className="contenedor-principal">
      <header className="encabezado">
        <h1>Sistema de Libros</h1>
      </header>

      <main className="contenido-principal">
        <div className="seccion-formulario">
          <FormularioLibro alAgregarLibro={manejarAgregarLibro} />
        </div>

        <div className="seccion-pila">
          <PilaLibros libros={libros} />
        </div>
      </main>
    </div>
  );
};

export default App;
