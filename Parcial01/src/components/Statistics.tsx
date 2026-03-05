import React from 'react';

interface StatisticsProps {
  stats: {
    totalVehicles: number;
    availableVehicles: number;
    rentedVehicles: number;
    rentalRecords: number;
    activeInvestors: number;
    featuredVehicles: number;
  };
  totalIncome: number;
}

const Statistics: React.FC<StatisticsProps> = ({ stats, totalIncome }) => {
  const utilizationRate = stats.totalVehicles > 0
    ? ((stats.rentedVehicles / stats.totalVehicles) * 100).toFixed(1)
    : 0;

  return (
    <div className="statistics-section">
      <h2>Estadísticas del Sistema</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">V</div>
          <div className="stat-content">
            <h3>Vehículos Disponibles</h3>
            <p className="stat-value">{stats.availableVehicles}</p>
            <p className="stat-sublabel">de {stats.totalVehicles} total</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">R</div>
          <div className="stat-content">
            <h3>En Renta</h3>
            <p className="stat-value">{stats.rentedVehicles}</p>
            <p className="stat-sublabel">{utilizationRate}% utilización</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">L</div>
          <div className="stat-content">
            <h3>Registros de Alquiler</h3>
            <p className="stat-value">{stats.rentalRecords}</p>
            <p className="stat-sublabel">histórico total</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">$</div>
          <div className="stat-content">
            <h3>Ingresos Totales</h3>
            <p className="stat-value">${totalIncome.toLocaleString()}</p>
            <p className="stat-sublabel">completados</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">*</div>
          <div className="stat-content">
            <h3>Destacados</h3>
            <p className="stat-value">{stats.featuredVehicles}</p>
            <p className="stat-sublabel">en rotación</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">I</div>
          <div className="stat-content">
            <h3>Inversionistas</h3>
            <p className="stat-value">{stats.activeInvestors}</p>
            <p className="stat-sublabel">activos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
