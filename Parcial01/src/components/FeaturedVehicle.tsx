import React from 'react';
import { Vehicle } from '../types';

interface FeaturedVehicleProps {
  vehicle: Vehicle | null;
}

const FeaturedVehicle: React.FC<FeaturedVehicleProps> = ({ vehicle }) => {
  const getVehicleIcon = (type: string) => {
    const icons: Record<string, string> = {
      sedan: 'S',
      suv: 'S',
      motorcycle: 'M',
      bicycle: 'B',
      scooter: 'C',
    };
    return icons[type] || 'V';
  };

  if (!vehicle) {
    return (
      <div className="featured-vehicle featured-empty">
        <p>No hay vehículos destacados disponibles</p>
      </div>
    );
  }

  return (
    <div className="featured-vehicle">
      <div className="featured-icon">{getVehicleIcon(vehicle.type)}</div>
      <div className="featured-content">
        <h2 className="featured-title">
          {vehicle.brand} {vehicle.model}
        </h2>
        <p className="featured-subtitle">{vehicle.type.toUpperCase()}</p>

        <div className="featured-details">
          <div className="detail-item">
            <span className="detail-label">Placa:</span>
            <span className="detail-value">{vehicle.licensePlate}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Ubicación:</span>
            <span className="detail-value">{vehicle.location}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Precio/Hora:</span>
            <span className="detail-value featured-price">
              ${vehicle.pricePerHour}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Estado:</span>
            <span className={`status-badge ${vehicle.status}`}>
              {vehicle.status === 'available' ? 'Disponible' : 'Alquilado'}
            </span>
          </div>
        </div>

        <div className="featured-animation">
          <div className="rotating-indicator">
            Se rota automáticamente cada 5 segundos
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedVehicle;
