import ItemContacto from './ItemContacto';
import './ListaContactos.css';

interface Contacto {
  id: number;
  nombre: string;
  telefono: string;
}

interface PropsLista {
  contactos: Contacto[];
  onEliminarContacto: (id: number) => void;
}

function ListaContactos({ contactos, onEliminarContacto }: PropsLista) {
  // si no hay contactos, mostrar un mensaje
  if (contactos.length === 0) {
    return <div className="estado-vacio">No hay contactos. ¡Agrega uno para comenzar!</div>;
  }

  // mostrar cada contacto
  return (
    <div className="lista-contactos">
      {contactos.map(contacto => (
        <ItemContacto 
          key={contacto.id} 
          contacto={contacto} 
          onEliminar={onEliminarContacto}
        />
      ))}
    </div>
  );
}

export default ListaContactos;
