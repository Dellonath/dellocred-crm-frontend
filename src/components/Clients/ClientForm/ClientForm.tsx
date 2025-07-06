import axios from 'axios';
import React, { FormEvent, useState } from 'react';
import { ChannelType, Client, ClientSector, EducationLevel, Gender, MaritialStatus, NewClient, State, UtmMedium, UtmSource } from '../types';

import styles from './ClientForm.module.css'; // Import as a module

interface ClientFormProps {
  onClientAdded: (client: Client) => void;
}

const clientApi = axios.create({
  baseURL: 'http://localhost:3000/clients/',
});

const createClient = (client: NewClient) => clientApi.post<Client>('/', client);

const ClientForm: React.FC<ClientFormProps> = ({ onClientAdded }) => {
  const [newClient, setNewClient] = useState<NewClient>({
    govId: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    channelType: undefined,
    birthDate: '',
    gender: undefined,
    occupation: '',
    maritialStatus: undefined,
    educationLevel: undefined,
    wage: undefined,
    clientSector: undefined,
    country: '',
    state: undefined,
    city: '',
    addressNeighborhood: '',
    addressStreet: '',
    addressNumber: undefined,
    addressComplement: '',
    postalCode: '',
    utmSource: undefined,
    utmMedium: undefined,
    utmCampaign: '',
    isActive: true,
  });
  const [isCreating, setIsCreating] = useState(false);

  const handleAddClient = async (e: FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const clientDataToSend: Partial<NewClient> = {};
      for (const key in newClient) {
          const value = (newClient as any)[key];
          if (value !== '' && value !== undefined) {
              if (typeof value === 'string' && value.trim() === '') {
              } else if (typeof value === 'number' && isNaN(value)) {
              } else {
                  (clientDataToSend as any)[key] = value;
              }
          }
      }

      if (clientDataToSend.isActive === undefined) {
          clientDataToSend.isActive = true;
      }

      const { data } = await createClient(clientDataToSend as NewClient);
      onClientAdded(data);
      setNewClient({
        govId: '', firstName: '', lastName: '', email: '', phoneNumber: '',
        channelType: undefined, birthDate: '', gender: undefined, occupation: '',
        maritialStatus: undefined, educationLevel: undefined, wage: undefined,
        clientSector: undefined, country: '', state: undefined, city: '',
        addressNeighborhood: '', addressStreet: '', addressNumber: undefined,
        addressComplement: '', postalCode: '', utmSource: undefined,
        utmMedium: undefined, utmCampaign: '', isActive: true,
      });
    } catch (error) {
      console.error('Failed to add client:', error);
      alert('Erro ao cadastrar cliente.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className={`card ${styles['add-client-card']}`}>
      <h2>Cadastrar Novo Cliente</h2>
      <form onSubmit={handleAddClient} className={styles['client-form']}>
        <input
          type="text"
          placeholder="CPF (apenas números)"
          value={newClient.govId}
          onChange={(e) => setNewClient({ ...newClient, govId: e.target.value })}
          required
          className="input-field"
          pattern="\d{11}"
          title="CPF deve conter 11 números."
        />
        <input
          type="text"
          placeholder="Nome"
          value={newClient.firstName}
          onChange={(e) => setNewClient({ ...newClient, firstName: e.target.value })}
          required
          className="input-field"
        />
        <input
          type="text"
          placeholder="Sobrenome"
          value={newClient.lastName}
          onChange={(e) => setNewClient({ ...newClient, lastName: e.target.value })}
          required
          className="input-field"
        />
        <input
          type="email"
          placeholder="Email"
          value={newClient.email}
          onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
          required
          className="input-field"
        />
        <input
          type="text"
          placeholder="Telefone"
          value={newClient.phoneNumber}
          onChange={(e) => setNewClient({ ...newClient, phoneNumber: e.target.value })}
          required
          className="input-field"
          pattern="^\+?\d{10,15}$"
          title="Telefone deve iniciar com '+' (opcional) seguido de 10 a 15 dígitos."
        />

        <select
            className="input-field"
            value={newClient.channelType || ''}
            onChange={(e) => setNewClient({ ...newClient, channelType: e.target.value as ChannelType || undefined })}
        >
            <option value="">Selecione o Tipo de Canal (Opcional)</option>
            {Object.values(ChannelType).map((type) => (
                <option key={type} value={type}>{type}</option>
            ))}
        </select>
        <input
          type="date"
          placeholder="Data de Nascimento (Opcional)"
          value={newClient.birthDate || ''}
          onChange={(e) => setNewClient({ ...newClient, birthDate: e.target.value || undefined })}
          className="input-field"
        />
        <select
            className="input-field"
            value={newClient.gender || ''}
            onChange={(e) => setNewClient({ ...newClient, gender: e.target.value as Gender || undefined })}
        >
            <option value="">Selecione o Gênero (Opcional)</option>
            {Object.values(Gender).map((g) => (
                <option key={g} value={g}>{g}</option>
            ))}
        </select>
        <input
          type="text"
          placeholder="Ocupação (Opcional)"
          value={newClient.occupation || ''}
          onChange={(e) => setNewClient({ ...newClient, occupation: e.target.value })}
          className="input-field"
        />
        <select
            className="input-field"
            value={newClient.maritialStatus || ''}
            onChange={(e) => setNewClient({ ...newClient, maritialStatus: e.target.value as MaritialStatus || undefined })}
        >
            <option value="">Selecione o Estado Civil (Opcional)</option>
            {Object.values(MaritialStatus).map((status) => (
                <option key={status} value={status}>{status}</option>
            ))}
        </select>
        <select
            className="input-field"
            value={newClient.educationLevel || ''}
            onChange={(e) => setNewClient({ ...newClient, educationLevel: e.target.value as EducationLevel || undefined })}
        >
            <option value="">Selecione o Nível de Educação (Opcional)</option>
            {Object.values(EducationLevel).map((level) => (
                <option key={level} value={level}>{level}</option>
            ))}
        </select>
        <input
          type="number"
          placeholder="Renda (Opcional)"
          value={newClient.wage === undefined ? '' : newClient.wage}
          onChange={(e) => setNewClient({ ...newClient, wage: e.target.value ? parseFloat(e.target.value) : undefined })}
          className="input-field"
        />
        <select
            className="input-field"
            value={newClient.clientSector || ''}
            onChange={(e) => setNewClient({ ...newClient, clientSector: e.target.value as ClientSector || undefined })}
        >
            <option value="">Selecione o Setor do Cliente (Opcional)</option>
            {Object.values(ClientSector).map((sector) => (
                <option key={sector} value={sector}>{sector}</option>
            ))}
        </select>

        <input
          type="text"
          placeholder="País (Opcional)"
          value={newClient.country || ''}
          onChange={(e) => setNewClient({ ...newClient, country: e.target.value })}
          className="input-field"
        />
        <select
            className="input-field"
            value={newClient.state || ''}
            onChange={(e) => setNewClient({ ...newClient, state: e.target.value as State || undefined })}
        >
            <option value="">Selecione o Estado (Opcional)</option>
            {Object.values(State).map((s) => (
                <option key={s} value={s}>{s}</option>
            ))}
        </select>
        <input
          type="text"
          placeholder="Cidade (Opcional)"
          value={newClient.city || ''}
          onChange={(e) => setNewClient({ ...newClient, city: e.target.value })}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Bairro (Opcional)"
          value={newClient.addressNeighborhood || ''}
          onChange={(e) => setNewClient({ ...newClient, addressNeighborhood: e.target.value })}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Rua (Opcional)"
          value={newClient.addressStreet || ''}
          onChange={(e) => setNewClient({ ...newClient, addressStreet: e.target.value })}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Número (Opcional)"
          value={newClient.addressNumber === undefined ? '' : newClient.addressNumber}
          onChange={(e) => setNewClient({ ...newClient, addressNumber: e.target.value ? parseInt(e.target.value) : undefined })}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Complemento (Opcional)"
          value={newClient.addressComplement || ''}
          onChange={(e) => setNewClient({ ...newClient, addressComplement: e.target.value })}
          className="input-field"
        />
        <input
          type="text"
          placeholder="CEP (Opcional)"
          value={newClient.postalCode || ''}
          onChange={(e) => setNewClient({ ...newClient, postalCode: e.target.value })}
          className="input-field"
        />

        <select
            className="input-field"
            value={newClient.utmSource || ''}
            onChange={(e) => setNewClient({ ...newClient, utmSource: e.target.value as UtmSource || undefined })}
        >
            <option value="">Selecione a Origem UTM (Opcional)</option>
            {Object.values(UtmSource).map((source) => (
                <option key={source} value={source}>{source}</option>
            ))}
        </select>
        <select
            className="input-field"
            value={newClient.utmMedium || ''}
            onChange={(e) => setNewClient({ ...newClient, utmMedium: e.target.value as UtmMedium || undefined })}
        >
            <option value="">Selecione a Mídia UTM (Opcional)</option>
            {Object.values(UtmMedium).map((medium) => (
                <option key={medium} value={medium}>{medium}</option>
            ))}
        </select>
        <input
          type="text"
          placeholder="Campanha UTM (Opcional)"
          value={newClient.utmCampaign || ''}
          onChange={(e) => setNewClient({ ...newClient, utmCampaign: e.target.value })}
          className="input-field"
        />

        <button type="submit" className="btn-primary" disabled={isCreating}>
          {isCreating ? 'Cadastrando...' : 'Cadastrar Cliente'}
        </button>
      </form>
    </div>
  );
};

export default ClientForm;