import './ItemContacto.css';

interface Contacto {
  id: number;
  nombre: string;
  telefono: string;
}

interface PropsItem {
  contacto: Contacto;
  onEliminar: (id: number) => void;
}

function ItemContacto({ contacto, onEliminar }: PropsItem) {
  // función para eliminar el contacto
  const eliminar = () => {
    // preguntar si está seguro
    const confirmado = window.confirm(`¿Estás seguro de que quieres eliminar a ${contacto.nombre}?`);
    
    // si dice que sí, eliminar
    if (confirmado) {
      onEliminar(contacto.id);
    }
  };

  return (
    <div className="item-contacto">
      <div className="info-contacto">
        <h3>{contacto.nombre}</h3>
        <p>{contacto.telefono}</p>
      </div>
      <button 
        className="boton-eliminar" 
        onClick={eliminar}
      >
        Eliminar
      </button>
    </div>
  );
}

export default ItemContacto;
