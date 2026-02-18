import { useState, useEffect } from 'react';
import Cargador from './components/Cargador';
import ListaContactos from './components/ListaContactos';
import FormularioContacto from './components/FormularioContacto';
import './App.css';

// define la estructura de un contacto
interface Contacto {
  id: number;
  nombre: string;
  telefono: string;
}

function App() {
  // estado para guardar los contactos
  const [contactos, setContactos] = useState<Contacto[]>([]);
  // estado para saber si está cargando
  const [cargando, setCargando] = useState(true);

  // cargar datos al iniciar la aplicación
  useEffect(() => {
    // esperar 2 segundos para simular la carga
    setTimeout(() => {
      // datos iniciales
      const contactosIniciales: Contacto[] = [
        { id: 1, nombre: 'Juan García', telefono: '3226351111' },
      ];
      
      // guardar los contactos
      setContactos(contactosIniciales);
      // dejar de mostrar el cargador
      setCargando(false);
    }, 2000);
  }, []);

  // función para agregar un nuevo contacto
  const agregarContacto = (nombre: string, telefono: string) => {
    const nuevoContacto: Contacto = {
      id: Date.now(),
      nombre,
      telefono,
    };
    setContactos([...contactos, nuevoContacto]);
  };

  // función para eliminar un contacto
  const eliminarContacto = (id: number) => {
    setContactos(contactos.filter(contacto => contacto.id !== id));
  };

  // si está cargando, mostrar el cargador
  if (cargando) {
    return <Cargador />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Gestor de Contactos</h1>
      </header>
      
      <main className="app-main">
        <section className="form-section">
          <h2>Agregar Nuevo Contacto</h2>
          <FormularioContacto onAgregarContacto={agregarContacto} />
        </section>

        <section className="list-section">
          <h2>Contactos ({contactos.length})</h2>
          <ListaContactos 
            contactos={contactos} 
            onEliminarContacto={eliminarContacto}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
