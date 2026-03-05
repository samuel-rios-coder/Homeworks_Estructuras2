import { SinglyLinkedList } from './structures/SinglyLinkedList';
import { DoublyLinkedList } from './structures/DoublyLinkedList';
import { CircularLinkedList } from './structures/CircularLinkedList';
import { CircularDoublyLinkedList } from './structures/CircularDoublyLinkedList';
import { Vehicle, RentalRecord, Investor } from './types';

export class VehicleManagementSystem {
  private availableVehicles: SinglyLinkedList<Vehicle>;
  private rentalHistory: DoublyLinkedList<RentalRecord>;
  private featuredVehicles: CircularLinkedList<Vehicle>;
  private activeInvestors: CircularDoublyLinkedList<Investor>;
  private allVehicles: Map<string, Vehicle> = new Map();
  private rentalRecords: Map<string, RentalRecord> = new Map();

  constructor() {
    this.availableVehicles = new SinglyLinkedList<Vehicle>();
    this.rentalHistory = new DoublyLinkedList<RentalRecord>();
    this.featuredVehicles = new CircularLinkedList<Vehicle>();
    this.activeInvestors = new CircularDoublyLinkedList<Investor>();
  }

  // métodos de vehículos
  // agregar un nuevo vehículo al sistema
  addVehicle(vehicle: Vehicle): void {
    this.allVehicles.set(vehicle.id, vehicle);
    this.availableVehicles.add(vehicle);
    // se agregan los primeros 5 vehículos como destacados
    if (this.featuredVehicles.getSize() < 5) {
      this.featuredVehicles.add(vehicle);
    }
  }

  // obtener todos los vehículos disponibles
  getAvailableVehicles(): Vehicle[] {
    return this.availableVehicles.getAll();
  }

  // obtener todos los vehículos del sistema
  getAllVehicles(): Vehicle[] {
    return Array.from(this.allVehicles.values());
  }

  // buscar un vehículo por id
  getVehicleById(vehicleId: string): Vehicle | undefined {
    return this.allVehicles.get(vehicleId);
  }

  // actualizar el estado de un vehículo
  updateVehicle(vehicleId: string, updates: Partial<Vehicle>): boolean {
    const vehicle = this.allVehicles.get(vehicleId);
    if (!vehicle) return false;

    const updatedVehicle = { ...vehicle, ...updates };
    this.allVehicles.set(vehicleId, updatedVehicle);
    return true;
  }

  // métodos para alquilar y devolver vehículos
  // alquilar un vehículo
  rentVehicle(vehicleId: string): boolean {
    const vehicle = this.getVehicleById(vehicleId);
    if (!vehicle || vehicle.status === 'rented') return false;

    // crear el registro del alquiler
    const rentalRecord: RentalRecord = {
      id: `RENT-${Date.now()}`,
      vehicleId: vehicle.id,
      vehicleBrand: vehicle.brand,
      vehicleModel: vehicle.model,
      licensePlate: vehicle.licensePlate,
      rentalDate: new Date(),
      estimatedPrice: vehicle.pricePerHour,
      status: 'active',
    };

    // agregar al historial
    this.rentalHistory.add(rentalRecord);
    this.rentalRecords.set(rentalRecord.id, rentalRecord);

    // marcar el vehículo como rentado
    vehicle.status = 'rented';
    this.updateVehicle(vehicleId, { status: 'rented' });

    // sacar de la lista de disponibles
    this.availableVehicles.remove(vehicle);

    return true;
  }

  // devolver un vehículo alquilado
  returnVehicle(rentalRecordId: string): boolean {
    const rentalRecord = this.rentalRecords.get(rentalRecordId);
    if (!rentalRecord || rentalRecord.status === 'completed') return false;

    const vehicle = this.getVehicleById(rentalRecord.vehicleId);
    if (!vehicle) return false;

    // calcular el precio basado en las horas
    const rentalDate = new Date(rentalRecord.rentalDate);
    const returnDate = new Date();
    const hours = Math.ceil(
      (returnDate.getTime() - rentalDate.getTime()) / (1000 * 60 * 60)
    );
    const actualPrice = hours * vehicle.pricePerHour;

    // actualizar el registro de alquiler
    rentalRecord.returnDate = returnDate;
    rentalRecord.actualPrice = actualPrice;
    rentalRecord.status = 'completed';

    // marcar el vehículo como disponible
    vehicle.status = 'available';
    this.updateVehicle(rentalRecord.vehicleId, { status: 'available' });

    // añadir nuevamente a la lista de disponibles
    this.availableVehicles.add(vehicle);

    return true;
  }

  // obtener historial de alquileres
  getRentalHistory(): RentalRecord[] {
    return this.rentalHistory.getAll();
  }

  // obtener historial en orden inverso
  getRentalHistoryReverse(): RentalRecord[] {
    return this.rentalHistory.getAllReverse();
  }

  // métodos de vehículos destacados
  // rotar al siguiente vehículo destacado
  getNextFeaturedVehicle(): Vehicle | null {
    if (this.featuredVehicles.isEmpty()) return null;
    this.featuredVehicles.next();
    return this.featuredVehicles.getCurrent();
  }

  // obtener el vehículo destacado actual
  getCurrentFeaturedVehicle(): Vehicle | null {
    return this.featuredVehicles.getCurrent();
  }

  // obtener todos los vehículos destacados
  getFeaturedVehicles(): Vehicle[] {
    return this.featuredVehicles.getAll();
  }

  // agregar un vehículo a destacados
  addFeaturedVehicle(vehicleId: string): boolean {
    const vehicle = this.getVehicleById(vehicleId);
    if (!vehicle) return false;

    // verificar si ya está en destacados
    const featured = this.featuredVehicles.getAll();
    if (!featured.some((v) => v.id === vehicleId)) {
      this.featuredVehicles.add(vehicle);
    }

    return true;
  }

  // remover un vehículo de destacados
  removeFeaturedVehicle(vehicleId: string): boolean {
    const vehicle = this.getVehicleById(vehicleId);
    if (!vehicle) return false;
    return this.featuredVehicles.remove(vehicle);
  }

  // métodos de inversionistas

  // agregar un nuevo inversionista
  addInvestor(investor: Investor): void {
    this.activeInvestors.add(investor);
  }

  // obtener todos los inversionistas activos
  getActiveInvestors(): Investor[] {
    return this.activeInvestors.getAll();
  }

  // remover un inversionista
  removeInvestor(investorId: string): boolean {
    const investors = this.activeInvestors.getAll();
    const investor = investors.find((i) => i.id === investorId);
    if (!investor) return false;

    return this.activeInvestors.remove(investor);
  }

  // obtener inversionistas en orden inverso
  getInvestorsReverse(): Investor[] {
    return this.activeInvestors.getAllReverse();
  }

  // métodos utilitarios
  // obtener estadísticas del sistema
  getStatistics() {
    return {
      totalVehicles: this.allVehicles.size,
      availableVehicles: this.availableVehicles.getSize(),
      rentedVehicles: this.allVehicles.size - this.availableVehicles.getSize(),
      rentalRecords: this.rentalRecords.size,
      activeInvestors: this.activeInvestors.getSize(),
      featuredVehicles: this.featuredVehicles.getSize(),
    };
  }

  // calcular ingresos totales
  getTotalIncome(): number {
    const completedRentals = this.rentalHistory
      .getAll()
      .filter((r) => r.status === 'completed' && r.actualPrice);

    return completedRentals.reduce((sum, r) => sum + (r.actualPrice || 0), 0);
  }

  // limpiar el sistema
  clear(): void {
    this.availableVehicles.clear();
    this.rentalHistory.clear();
    this.featuredVehicles.clear();
    this.activeInvestors.clear();
    this.allVehicles.clear();
    this.rentalRecords.clear();
  }
}
