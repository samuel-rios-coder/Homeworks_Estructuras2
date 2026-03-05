import React from 'react';
import { Investor } from '../types';

interface InvestorsListProps {
  investors: Investor[];
}

const InvestorsList: React.FC<InvestorsListProps> = ({ investors }) => {
  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const totalInvested = investors.reduce((sum, inv) => sum + inv.investmentAmount, 0);

  return (
    <div className="investors-section">
      <div className="investors-summary">
        <h3>Resumen de Inversion</h3>
        <div className="summary-card">
          <p>
            <strong>Total Inversionistas:</strong> {investors.length}
          </p>
          <p>
            <strong>Inversion Total:</strong> ${totalInvested.toLocaleString()}
          </p>
          <p>
            <strong>Promedio por Inversor:</strong> $
            {Math.round(totalInvested / (investors.length || 1)).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="investors-list">
        {investors.length > 0 ? (
          investors.map((investor) => (
            <div key={investor.id} className="investor-card">
              <div className="investor-header">
                <div className="investor-icon">[INV]</div>
                <div className="investor-name-email">
                  <h4>{investor.name}</h4>
                  <p>{investor.email}</p>
                </div>
              </div>

              <div className="investor-details">
                <div className="detail">
                  <span className="label">Inversion:</span>
                  <span className="value">${investor.investmentAmount.toLocaleString()}</span>
                </div>
                <div className="detail">
                  <span className="label">Se unio:</span>
                  <span className="value">{formatDate(investor.joinDate)}</span>
                </div>
                <div className="detail">
                  <span className="label">Estado:</span>
                  <span
                    className={`status-badge ${investor.activeStatus ? 'active' : 'inactive'}`}
                  >
                    {investor.activeStatus ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-message">No hay inversionistas registrados.</p>
        )}
      </div>
    </div>
  );
};

export default InvestorsList;
