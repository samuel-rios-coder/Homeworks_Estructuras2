import React from 'react';
import { RentalRecord } from '../types';

interface RentalHistoryProps {
  records: RentalRecord[];
  onReturn: (recordId: string) => void;
}

const RentalHistory: React.FC<RentalHistoryProps> = ({ records, onReturn }) => {
  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="rental-history">
      {records.length > 0 ? (
        <div className="history-table">
          <div className="table-header">
            <div className="col">Vehículo</div>
            <div className="col">Placa</div>
            <div className="col">Fecha Alquiler</div>
            <div className="col">Estado</div>
            <div className="col">Precio</div>
            <div className="col">Acción</div>
          </div>
          {records.map((record) => (
            <div key={record.id} className="table-row">
              <div className="col">
                {record.vehicleBrand} {record.vehicleModel}
              </div>
              <div className="col">{record.licensePlate}</div>
              <div className="col">{formatDate(record.rentalDate)}</div>
              <div className="col">
                <span
                  className={`status-badge ${record.status}`}
                >
                  {record.status === 'active' ? 'Activo' : 'Completado'}
                </span>
              </div>
              <div className="col">
                ${record.actualPrice || record.estimatedPrice}
              </div>
              <div className="col">
                {record.status === 'active' && (
                  <button
                    className="return-button"
                    onClick={() => onReturn(record.id)}
                  >
                    Devolver
                  </button>
                )}
                {record.status === 'completed' && (
                  <span className="completed">Devuelto</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-message">No hay registros de alquiler.</p>
      )}
    </div>
  );
};

export default RentalHistory;
