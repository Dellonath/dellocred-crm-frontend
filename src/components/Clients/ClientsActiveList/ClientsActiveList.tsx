// src/components/Clients/ActiveClientsList/ActiveClientsList.tsx
import React from 'react';
import styles from '../Clients.module.css'; // Reusing styles from Clients.module.css
import { Client } from '../types'; // Adjust path based on your project structure

interface ActiveClientsListProps {
  activeClients: Client[];
  loadingActiveClients: boolean;
}

const ActiveClientsList: React.FC<ActiveClientsListProps> = ({ activeClients, loadingActiveClients }) => {
  return (
    <div className={`card ${styles['active-clients-list-card']}`}>
      <h2>Clientes Ativos</h2>
      {loadingActiveClients ? (
        <p>Carregando clientes ativos...</p>
      ) : activeClients.length > 0 ? (
        <div className={styles['clients-table-container']}>
          <table className={styles['clients-table']}>
            <thead>
              <tr>
                <th>CPF</th>
                <th>Nome Completo</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Gênero</th>
                <th>Cidade/Estado</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {activeClients.map((c) => (
                <tr key={c.uuid}>
                  <td>{c.govId}</td>
                  <td>{c.firstName} {c.lastName}</td>
                  <td>{c.email}</td>
                  <td>{c.phoneNumber}</td>
                  <td>{c.gender || 'N/A'}</td>
                  <td>{c.city || 'N/A'}{c.city && c.state ? `, ${c.state}` : c.state ? c.state : 'N/A'}</td>
                  <td>{c.isActive ? 'Ativo' : 'Inativo'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Nenhum cliente ativo encontrado.</p>
      )}
    </div>
  );
};

export default ActiveClientsList;