import { useState } from 'react';
import './FormularioContacto.css';

interface PropsFormulario {
  onAgregarContacto: (nombre: string, telefono: string) => void;
}

function FormularioContacto({ onAgregarContacto }: PropsFormulario) {
  // estados para guardar el nombre y teléfono
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');

  // función que se ejecuta al enviar el formulario
  const enviarFormulario = (evento: React.FormEvent) => {
    evento.preventDefault();
    
    // validar que el nombre no esté vacío
    if (nombre === '' || nombre.trim() === '') {
      setError('El nombre es obligatorio');
      return;
    }
    
    // validar que el teléfono no esté vacío
    if (telefono === '' || telefono.trim() === '') {
      setError('El teléfono es obligatorio');
      return;
    }

    // agregar el contacto
    onAgregarContacto(nombre, telefono);
    
    // limpiar el formulario
    setNombre('');
    setTelefono('');
    setError('');
  };

  return (
    <form className="formulario-contacto" onSubmit={enviarFormulario}>
      <div className="grupo-formulario">
        <label htmlFor="nombre">Nombre:</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => {
            setNombre(e.target.value);
            setError('');
          }}
          placeholder="Escribe el nombre del contacto"
        />
      </div>

      <div className="grupo-formulario">
        <label htmlFor="telefono">Teléfono:</label>
        <input
          id="telefono"
          type="tel"
          value={telefono}
          onChange={(e) => {
            setTelefono(e.target.value);
            setError('');
          }}
          placeholder="Escribe el número de teléfono"
        />
      </div>

      {error && <p className="mensaje-error">{error}</p>}

      <button type="submit" className="boton-agregar">Agregar Contacto</button>
    </form>
  );
}

export default FormularioContacto;
