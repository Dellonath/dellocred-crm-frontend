// src/components/Clients/ClientDetails/ClientDetails.tsx
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import ClientNotes from '../ClientNotes/ClientNotes';
import {
    ChannelType,
    Client,
    ClientNote,
    ClientSector,
    EducationLevel,
    Gender,
    MaritialStatus,
    State,
    UtmMedium,
    UtmSource,
} from '../types';

import styles from './ClientDetails.module.css';

interface ClientDetailsProps {
  client: Client;
  clientNotes: ClientNote[];
  loadingNotes: boolean;
  onNoteAdded: (clientUuid: string) => void;
  onClientUpdated: (updatedClient: Client) => void;
}

const clientApi = axios.create({
  baseURL: 'http://localhost:3000/clients/',
});

const ClientDetails: React.FC<ClientDetailsProps> = ({ client, clientNotes, loadingNotes, onNoteAdded, onClientUpdated }) => {
  const [editableClient, setEditableClient] = useState<Client>(client);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);

  useEffect(() => {
    setEditableClient(client);
    setShowUpdateSuccess(false);
  }, [client]);

  const handleChange = useCallback((
    field: keyof Client,
    value: string | number | boolean | undefined | null
  ) => {
    let processedValue: any = value;

    if (field === 'wage' || field === 'addressNumber') {
      processedValue = value === '' ? undefined : Number(value);
      if (isNaN(processedValue)) processedValue = undefined;
    } else if (field === 'birthDate') {
      processedValue = (value !== null && value !== undefined && value !== '')
        ? new Date(String(value)).toISOString()
        : undefined;
    } else if (field === 'isActive') {
      processedValue = Boolean(value);
    }
    if (typeof processedValue === 'string' && processedValue.trim() === '') {
        processedValue = undefined;
    }

    setEditableClient(prev => {
      const updated = { ...prev, [field]: processedValue };
      return updated;
    });
  }, []);

  const handleUpdateClick = async () => {
    if (!editableClient.govId) {
      alert('CPF/CNPJ do cliente não encontrado para atualização.');
      return;
    }

    setIsUpdating(true);
    setShowUpdateSuccess(false);

    const clientToUpdate: Partial<Client> = { ...editableClient };

    // Explicitly ensure 'wage' is a number or undefined
    if (typeof clientToUpdate.wage === 'string' && clientToUpdate.wage !== '') {
      clientToUpdate.wage = Number(clientToUpdate.wage);
      if (isNaN(clientToUpdate.wage)) {
        clientToUpdate.wage = undefined;
      }
    } else if (clientToUpdate.wage === null || String(clientToUpdate.wage) === '') {
      clientToUpdate.wage = undefined;
    }

    // Explicitly ensure 'addressNumber' is a number or undefined
    if (typeof clientToUpdate.addressNumber === 'string' && clientToUpdate.addressNumber !== '') {
      clientToUpdate.addressNumber = Number(clientToUpdate.addressNumber);
      if (isNaN(clientToUpdate.addressNumber)) {
        clientToUpdate.addressNumber = undefined;
      }
    } else if (clientToUpdate.addressNumber === null || String(clientToUpdate.addressNumber) === '') {
        clientToUpdate.addressNumber = undefined;
    }

    // Ensure birthDate is consistently YYYY-MM-DD or undefined for the POST/PATCH request
    if (typeof clientToUpdate.birthDate === 'string' && clientToUpdate.birthDate !== '') {
        try {
            const dateObj = new Date(clientToUpdate.birthDate);
            if (!isNaN(dateObj.getTime())) {
                clientToUpdate.birthDate = dateObj.toISOString().split('T')[0];
            } else {
                clientToUpdate.birthDate = undefined;
            }
        } catch (e) {
            clientToUpdate.birthDate = undefined;
        }
    } else if (clientToUpdate.birthDate === null || clientToUpdate.birthDate === '') {
        clientToUpdate.birthDate = undefined;
    }

    // Defensive check for gender: Ensure it's one of the valid enum values or undefined
    // Assuming Gender enum members are `Gender.Female` and `Gender.Male`
    if (clientToUpdate.gender !== Gender.FEMALE && clientToUpdate.gender !== Gender.MALE) {
        clientToUpdate.gender = undefined;
    }

    console.log('ClientDetails: Sending clientToUpdate payload:', clientToUpdate);

    try {
      const response = await clientApi.patch<Client>(
        `${editableClient.govId}`,
        clientToUpdate
      );
      console.log('ClientDetails: Client updated successfully (response):', response.data);
      setShowUpdateSuccess(true);
      setTimeout(() => {
        setShowUpdateSuccess(false);
      }, 3000);

      onClientUpdated(response.data); // Notify parent component of successful update
      setEditableClient(response.data); // Update local state with fresh data from backend
    } catch (error) {
      console.error('ClientDetails: Failed to update client:', error);
      alert('Erro ao atualizar cliente. Verifique o console para mais detalhes.');
      // Revert local state to original client on error
      // Note: If onClientUpdated is not called, parent state won't change
      setEditableClient(client);
    } finally {
      setIsUpdating(false);
    }
  };

  const renderField = (
    label: string,
    field: keyof Client,
    type: 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'readonly' = 'text',
    options?: any[],
    placeholder: string = 'N/A'
  ) => {
    const value: any = editableClient[field];
    const isReadOnly = ['uuid', 'govId', 'createdByUserUuid'].includes(field);
    const displayValueForInput = value === null || value === undefined || (typeof value === 'string' && value.trim() === '') ? '' : String(value);

    if (field === 'isActive' && type !== 'readonly') {
        return (
            <div key={field} className={styles['detail-item']}>
                <strong>{label}:</strong>
                <input
                    type="checkbox"
                    checked={!!value}
                    onChange={(e) => handleChange(field, e.target.checked)}
                />
            </div>
        );
    }

    if (isReadOnly) {
      let displayOutput: string;
      if (field === 'isActive') {
          displayOutput = value ? 'Ativo' : 'Inativo';
      } else if (field === 'birthDate' && value) {
          displayOutput = new Date(String(value)).toLocaleDateString('pt-BR');
      } else if (value === null || value === undefined || String(value).trim() === '') {
          displayOutput = placeholder;
      }
      else {
          displayOutput = String(value);
      }

      return (
        <p key={field}>
          <strong>{label}:</strong> <span>{displayOutput}</span>
        </p>
      );
    }

    if (type === 'select' && options) {
      return (
        <div key={field} className={styles['detail-item']}>
          <strong>{label}:</strong>
          <select
            className="input-field"
            value={value === undefined || value === null ? '' : String(value)}
            onChange={(e) => handleChange(field, e.target.value)}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      );
    }

    if (type === 'date') {
      let dateValueFormatted = '';
      if (value) {
        if (typeof value === 'string') {
          const parsedDate = new Date(value);
          if (!isNaN(parsedDate.getTime())) {
            dateValueFormatted = parsedDate.toISOString().split('T')[0];
          }
        } else if (typeof value === 'object' && value instanceof Date && !isNaN(value.getTime())) {
          dateValueFormatted = value.toISOString().split('T')[0];
        }
      }

      return (
        <div key={field} className={styles['detail-item']}>
          <strong>{label}:</strong>
          <input
            type="date"
            className={`input-field ${styles['editable-field']}`}
            value={dateValueFormatted}
            onChange={(e) => handleChange(field, e.target.value)}
            placeholder={placeholder}
          />
        </div>
      );
    }

    return (
      <div key={field} className={styles['detail-item']}>
        <strong>{label}:</strong>
        <input
          type={type}
          className={`input-field ${styles['editable-field']}`}
          value={displayValueForInput}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder}
        />
      </div>
    );
  };

  return (
    <div className={styles['client-found-display']}>
      <div className={`card ${styles['client-details-card']}`}>
        <h2>Dados do Cliente</h2>
        <div className={styles['detail-grid']}>
          {renderField('UUID', 'uuid', 'readonly')}
          {renderField('CPF', 'govId', 'readonly')}
          {renderField('Nome', 'firstName', 'text', undefined, 'Não informado')}
          {renderField('Sobrenome', 'lastName', 'text', undefined, 'Não informado')}
          {renderField('Email', 'email', 'text', undefined, 'Não informado')}
          {renderField('Telefone', 'phoneNumber', 'text', undefined, 'Não informado')}
          {renderField('Tipo de Canal', 'channelType', 'select', Object.values(ChannelType), 'Selecione')}
          {renderField('Data de Nascimento', 'birthDate', 'date', undefined, 'Não informado')}
          {renderField('Gênero', 'gender', 'select', Object.values(Gender), 'Selecione')}
          {renderField('Ocupação', 'occupation', 'text', undefined, 'Não informado')}
          {renderField('Estado Civil', 'maritialStatus', 'select', Object.values(MaritialStatus), 'Selecione')}
          {renderField('Nível de Educação', 'educationLevel', 'select', Object.values(EducationLevel), 'Selecione')}
          {renderField('Salário', 'wage', 'number', undefined, 'Não informado')}
          {renderField('Setor', 'clientSector', 'select', Object.values(ClientSector), 'Selecione')}
          {renderField('País', 'country', 'text', undefined, 'Não informado')}
          {renderField('Estado (UF)', 'state', 'select', Object.values(State), 'Selecione')}
          {renderField('Cidade', 'city', 'text', undefined, 'Não informado')}
          {renderField('Bairro', 'addressNeighborhood', 'text', undefined, 'Não informado')}
          {renderField('Rua', 'addressStreet', 'text', undefined, 'Não informado')}
          {renderField('Número', 'addressNumber', 'number', undefined, 'Não informado')}
          {renderField('Complemento', 'addressComplement', 'text', undefined, 'Não informado')}
          {renderField('CEP', 'postalCode', 'text', undefined, 'Não informado')}
          {renderField('Origem UTM', 'utmSource', 'select', Object.values(UtmSource), 'Selecione')}
          {renderField('Mídia UTM', 'utmMedium', 'select', Object.values(UtmMedium), 'Selecione')}
          {renderField('Campanha UTM', 'utmCampaign', 'text', undefined, 'Não informado')}
          {renderField('UUID do Criador', 'createdByUserUuid', 'readonly')}
          {renderField('Status', 'isActive', 'checkbox')}
        </div>
        <div className={styles['update-button-container']}>
            <button
                type="button"
                className="btn-primary"
                onClick={handleUpdateClick}
                disabled={isUpdating}
            >
                {isUpdating ? 'Atualizando...' : 'Atualizar Cliente'}
            </button>
        </div>
        {showUpdateSuccess && (
            <div className="alert alert-success">
                Cliente atualizado com sucesso!
            </div>
        )}
      </div>

      {client.uuid && (
        <ClientNotes
          clientUuid={client.uuid}
          clientNotes={clientNotes}
          loadingNotes={loadingNotes}
          onNoteAdded={onNoteAdded}
        />
      )}
    </div>
  );
};

export default ClientDetails;