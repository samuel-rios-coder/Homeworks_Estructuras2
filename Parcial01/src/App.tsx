import React from 'react';
import './style.css';
import { VehicleManagementSystem } from './VehicleManagementSystem';
import { Vehicle, RentalRecord, Investor } from './types';

const App: React.FC = () => {
  const [system] = React.useState(() => new VehicleManagementSystem());
  const [vehiculosDisponibles, setVehiculosDisponibles] = React.useState<Vehicle[]>([]);
  const [historialAlquileres, setHistorialAlquileres] = React.useState<RentalRecord[]>([]);
  const [inversionistas, setInversionistas] = React.useState<Investor[]>([]);
  const [vehiculoDestacado, setVehiculoDestacado] = React.useState<Vehicle | null>(null);
  const [vista, setVista] = React.useState<string>('vehiculos');
  const inicializadoRef = React.useRef(false);

  const cargarDatos = () => {
    setVehiculosDisponibles(system.getAvailableVehicles());
    setHistorialAlquileres(system.getRentalHistory());
    setInversionistas(system.getActiveInvestors());
  };

  React.useEffect(() => {
    if (inicializadoRef.current) return;
    inicializadoRef.current = true;

    const vehiculos: Vehicle[] = [
      { id: 'V1', brand: 'Tesla', model: 'S', licensePlate: 'ABC111', type: 'sedan', pricePerHour: 2500000, status: 'available', location: 'Centro' },
      { id: 'V2', brand: 'Honda', model: 'Civic', licensePlate: 'DEF101', type: 'sedan', pricePerHour: 1500000, status: 'available', location: 'Norte' },
      { id: 'V3', brand: 'Toyota', model: 'RAV4', licensePlate: 'GHI789', type: 'suv', pricePerHour: 3000000, status: 'available', location: 'Sur' },
    ];

    const inversores: Investor[] = [
      { id: 'I1', name: 'Juan David Caicedo', email: 'juancaicedo@gmail.com', investmentAmount: 50000000, activeStatus: true, joinDate: new Date('2024-01-15') },
      { id: 'I2', name: 'Maria Cepeda', email: 'mariacepeda@hotmail.com', investmentAmount: 75000000, activeStatus: true, joinDate: new Date('2024-02-10') },
    ];

    vehiculos.forEach(v => system.addVehicle(v));
    inversores.forEach(inv => system.addInvestor(inv));

    cargarDatos();
    setVehiculoDestacado(vehiculos[0]);
  }, []);

  // Rotación automática del vehículo destacado cada 5 segundos
  React.useEffect(() => {
    const todosLosVehiculos = system.getAllVehicles();
    if (todosLosVehiculos.length === 0) return;

    let indice = 0;

    const intervalo = setInterval(() => {
      setVehiculoDestacado(todosLosVehiculos[indice]);
      indice = (indice + 1) % todosLosVehiculos.length;
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  const manejarAlquiler = (id: string) => {
    system.rentVehicle(id);
    cargarDatos();
  };

  const manejarDevolucion = (id: string) => {
    system.returnVehicle(id);
    cargarDatos();
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Sistema de Gestion de Movilidad Urbana</h1>
      </header>

      {vehiculoDestacado && (
        <section className="destacado">
          <h2>Vehiculos Destacados</h2>
          <div className="card-destacado">
            <h3>{vehiculoDestacado.brand} {vehiculoDestacado.model}</h3>
            <p><strong>Placa:</strong> {vehiculoDestacado.licensePlate}</p>
            <p><strong>Tipo:</strong> {vehiculoDestacado.type}</p>
            <p><strong>Ubicacion:</strong> {vehiculoDestacado.location}</p>
            <p><strong>Precio:</strong> ${vehiculoDestacado.pricePerHour.toLocaleString('es-CO')} COP por hora</p>
            <p className="estado">{vehiculoDestacado.status === 'available' ? 'Disponible' : 'Rentado'}</p>
          </div>
        </section>
      )}

      <nav className="nav">
        <button onClick={() => setVista('vehiculos')} className={vista === 'vehiculos' ? 'active' : ''}>
          Vehiculos Disponibles
        </button>
        <button onClick={() => setVista('alquileres')} className={vista === 'alquileres' ? 'active' : ''}>
          Historial de Alquileres
        </button>
        <button onClick={() => setVista('inversionistas')} className={vista === 'inversionistas' ? 'active' : ''}>
          Inversionistas Activos
        </button>
      </nav>

      <main className="main">
        {vista === 'vehiculos' && (
          <section>
            <h2>Vehiculos Disponibles para Alquilar</h2>
            <div className="lista">
              {vehiculosDisponibles.length > 0 ? (
                vehiculosDisponibles.map(v => (
                  <div key={v.id} className="card">
                    <div className="card-content">
                      <h3>{v.brand} {v.model}</h3>
                      <p><strong>Placa:</strong> {v.licensePlate}</p>
                      <p><strong>Tipo:</strong> {v.type} | <strong>Ubicacion:</strong> {v.location}</p>
                      <p className="precio">Precio: ${v.pricePerHour.toLocaleString('es-CO')} COP por hora</p>
                    </div>
                    <button onClick={() => manejarAlquiler(v.id)} className="btn-alquilar">Alquilar Ahora</button>
                  </div>
                ))
              ) : (
                <p className="vacio">No hay vehiculos disponibles en este momento</p>
              )}
            </div>
          </section>
        )}

        {vista === 'alquileres' && (
          <section>
            <h2>Historial de Alquileres</h2>
            <div className="lista">
              {historialAlquileres.length > 0 ? (
                historialAlquileres.map(r => (
                  <div key={r.id} className="card">
                    <div className="card-content">
                      <h3>{r.vehicleBrand} {r.vehicleModel}</h3>
                      <p><strong>Placa:</strong> {r.licensePlate}</p>
                      <p><strong>Fecha de alquiler:</strong> {new Date(r.rentalDate).toLocaleDateString('es-ES')}</p>
                      <p><strong>Estado:</strong> {r.status === 'active' ? 'Activo' : 'Completado'}</p>
                      <p className="precio">Precio: ${(r.actualPrice || r.estimatedPrice).toLocaleString('es-CO')} COP</p>
                    </div>
                    {r.status === 'active' && (
                      <button onClick={() => manejarDevolucion(r.id)} className="btn-devolver">Devolver Vehiculo</button>
                    )}
                  </div>
                ))
              ) : (
                <p className="vacio">No hay registros de alquileres todavia</p>
              )}
            </div>
          </section>
        )}

        {vista === 'inversionistas' && (
          <section>
            <h2>Inversionistas Activos</h2>
            <div className="lista">
              {inversionistas.length > 0 ? (
                inversionistas.map(inv => (
                  <div key={inv.id} className="card">
                    <div className="card-content">
                      <h3>{inv.name}</h3>
                      <p><strong>Email:</strong> {inv.email}</p>
                      <p><strong>Inversion:</strong> ${inv.investmentAmount.toLocaleString('es-CO')} COP</p>
                      <p><strong>Fecha de union:</strong> {new Date(inv.joinDate).toLocaleDateString('es-ES')}</p>
                      <p className="estado">{inv.activeStatus ? 'Activo' : 'Inactivo'}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="vacio">No hay inversionistas registrados</p>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default App;
