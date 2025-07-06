// src/components/Clients/Clients.tsx
import axios from 'axios';
import { FormEvent, useCallback, useEffect, useState } from 'react'; // Import useEffect
import ClientDetails from './ClientDetails/ClientDetails';
import ClientForm from './ClientForm/ClientForm';
import ActiveClientsList from './ClientsActiveList/ClientsActiveList';
import { Client, ClientNote } from './types';


// Import global CSS once in your root App.tsx or index.ts if not already there
import './styles/global.css';

import styles from './Clients.module.css';

// API instances
const clientApi = axios.create({
  baseURL: 'http://localhost:3000/clients/',
});

const notesApi = axios.create({
  baseURL: 'http://localhost:3000/clients/notes/',
});

const searchClientByGovId = (govId: string) => clientApi.get<Client>(`${govId}`);
const fetchNotesByClientUuid = (clientUuid: string) => notesApi.get<ClientNote[]>(`${clientUuid}`);
const listActiveClients = () => clientApi.get<Client[]>('/actives');

function Clients() {
  const [searchGovId, setSearchGovId] = useState('');
  const [client, setClient] = useState<Client | null>(null);
  const [clientNotes, setClientNotes] = useState<ClientNote[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [activeClients, setActiveClients] = useState<Client[]>([]);
  const [loadingActiveClients, setLoadingActiveClients] = useState(false);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [showActiveClientsList, setShowActiveClientsList] = useState(false);

  // --- DEBUGGING LOG: Observe state changes ---
  useEffect(() => {
    console.group('Clients.tsx State Update');
    console.log('  client status:', client ? 'Present (UUID: ' + client.uuid + ')' : 'Null');
    console.log('  notFound:', notFound);
    console.log('  showActiveClientsList:', showActiveClientsList);
    console.groupEnd();
  }, [client, notFound, showActiveClientsList]);
  // --- END DEBUGGING LOG ---

  const fetchAndSetNotes = useCallback(async (clientUuid: string) => {
    setLoadingNotes(true);
    try {
      const { data: notesData } = await fetchNotesByClientUuid(clientUuid);
      setClientNotes(notesData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (notesError) {
      console.warn('No notes found for this client or error fetching notes:', notesError);
      setClientNotes([]);
    } finally {
        setLoadingNotes(false);
    }
  }, []);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    console.log('handleSearch initiated...');
    setClient(null); // Clear any existing client data
    setClientNotes([]);
    setActiveClients([]); // Clear active clients list
    setNotFound(false); // Reset notFound flag
    setShowMessage(false); // Hide any previous messages
    setShowActiveClientsList(false); // Hide active clients list when performing a search

    try {
      const { data: clientData } = await searchClientByGovId(searchGovId);
      console.log('handleSearch: Client found successfully.');
      setClient(clientData); // Set the found client
      setNotFound(false); // Ensure notFound is false after a successful search

      if (clientData.uuid) {
        await fetchAndSetNotes(clientData.uuid);
      }

    } catch (error) {
      console.error('handleSearch: Client not found or error fetching:', error);
      setClient(null); // Confirm client is null on error
      setClientNotes([]);
      setNotFound(true); // Set notFound to true
      setShowMessage(true); // Show message
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  const handleClientAdded = useCallback((addedClient: Client) => {
    console.log('handleClientAdded: Client added.');
    setClient(addedClient); // Display the newly added client
    setNotFound(false); // Clear notFound state as client is now found/added
    setClientNotes([]); // New client has no notes initially
    setShowMessage(false); // Hide the not found message
    setShowActiveClientsList(false); // Hide active clients list when a client is added
    if (addedClient.uuid) {
      fetchAndSetNotes(addedClient.uuid);
    }
  }, [fetchAndSetNotes]);

  const handleListActiveClients = async () => {
    console.log('handleListActiveClients initiated...');
    setLoadingActiveClients(true);
    setClient(null); // Clear single client view
    setClientNotes([]); // Clear notes
    setNotFound(false); // Reset notFound
    setShowMessage(false); // Hide messages
    setShowActiveClientsList(true); // Show active clients list when button is clicked

    try {
      const { data } = await listActiveClients();
      console.log('handleListActiveClients: Active clients fetched.');
      setActiveClients(data);
    } catch (error) {
      console.error('handleListActiveClients: Failed to fetch active clients:', error);
      setActiveClients([]);
    } finally {
      setLoadingActiveClients(false);
    }
  };

  const handleClientUpdated = useCallback((updatedClient: Client) => {
    console.log('handleClientUpdated: Client successfully updated.');
    setClient(updatedClient); // Update the client state with the fresh data
    setNotFound(false); // Ensure notFound is false, keeping ClientDetails visible
    // No change to showActiveClientsList here, as we remain in a single-client view
    if (updatedClient.uuid) {
      fetchAndSetNotes(updatedClient.uuid);
    }
  }, [fetchAndSetNotes]);

  return (
    <div className={styles['page-content']}>
      <h1 className={styles['page-title']}>Gerenciar Clientes</h1>

      <div className={`card ${styles['search-card']}`}>
        <div className="card-header">
          <h2>Buscar Cliente por CPF</h2>
          <button
            type="button"
            className="btn-secondary"
            onClick={handleListActiveClients}
            disabled={loadingActiveClients}
          >
            {loadingActiveClients ? 'Carregando...' : 'Listar Clientes Ativos'}
          </button>
        </div>
        <form onSubmit={handleSearch} className={styles['search-form']}>
          <input
            type="text"
            placeholder="Digite o CPF do cliente"
            value={searchGovId}
            onChange={(e) => setSearchGovId(e.target.value)}
            required
            className="input-field"
          />
          <button type="submit" className="btn-primary">Buscar</button>
        </form>
      </div>

      {showMessage && notFound && <div className="alert alert-error">Cliente não encontrado. Preencha os dados para cadastrar.</div>}

      {/* Render ClientDetails if a client object exists */}
      {client && (
        <ClientDetails
          client={client}
          clientNotes={clientNotes}
          loadingNotes={loadingNotes}
          onNoteAdded={fetchAndSetNotes}
          onClientUpdated={handleClientUpdated}
        />
      )}

      {/* Render ClientForm only if no client is found AND the notFound flag is true */}
      {!client && notFound && (
        <ClientForm
          onClientAdded={handleClientAdded}
        />
      )}

      {/* Render the ActiveClientsList component only if showActiveClientsList is true */}
      {showActiveClientsList && (
        <ActiveClientsList activeClients={activeClients} loadingActiveClients={loadingActiveClients} />
      )}

    </div>
  );
}

export default Clients;