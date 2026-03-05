// Tipos de datos para el sistema de gestión de vehículos

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  licensePlate: string;
  type: 'sedan' | 'suv' | 'motorcycle' | 'bicycle' | 'scooter';
  pricePerHour: number;
  status: 'available' | 'rented';
  location: string;
}

export interface RentalRecord {
  id: string;
  vehicleId: string;
  vehicleBrand: string;
  vehicleModel: string;
  licensePlate: string;
  rentalDate: Date;
  returnDate?: Date;
  estimatedPrice: number;
  actualPrice?: number;
  status: 'active' | 'completed';
}

export interface Investor {
  id: string;
  name: string;
  email: string;
  investmentAmount: number;
  activeStatus: boolean;
  joinDate: Date;
}
