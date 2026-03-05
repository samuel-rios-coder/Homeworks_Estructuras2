import React from 'react';
import { Vehicle } from '../types';

interface VehicleCardProps {
  vehicle: Vehicle;
  onRent: (vehicleId: string) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onRent }) => {
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

  return (
    <div className="vehicle-card">
      <div className="vehicle-icon">{getVehicleIcon(vehicle.type)}</div>
      <div className="vehicle-info">
        <h3>
          {vehicle.brand} {vehicle.model}
        </h3>
        <p className="license-plate">{vehicle.licensePlate}</p>
        <p className="location">{vehicle.location}</p>
        <div className="vehicle-details">
          <span className="type-badge">{vehicle.type.toUpperCase()}</span>
          <span className="price">${vehicle.pricePerHour}/hr</span>
        </div>
      </div>
      <button
        className="rent-button"
        onClick={() => onRent(vehicle.id)}
        disabled={vehicle.status !== 'available'}
      >
        Alquilar
      </button>
    </div>
  );
};

export default VehicleCard;
