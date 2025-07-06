import axios from 'axios';
import React, { useState } from 'react';
import { ClientNote, CreateClientNoteDto } from '../types';

import styles from './ClientNotes.module.css'; // Import as a module

interface ClientNotesProps {
  clientUuid: string;
  clientNotes: ClientNote[];
  loadingNotes: boolean;
  onNoteAdded: (clientUuid: string) => void;
}

const notesApi = axios.create({
  baseURL: 'http://localhost:3000/clients/notes/',
});

const addClientNote = (noteData: CreateClientNoteDto) => notesApi.post<ClientNote>('/', noteData);

const ClientNotes: React.FC<ClientNotesProps> = ({ clientUuid, clientNotes, loadingNotes, onNoteAdded }) => {
  const [newNoteText, setNewNoteText] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const handleAddNote = async () => {
    if (!clientUuid || !newNoteText.trim()) {
      alert('Por favor, digite uma nota antes de adicionar.');
      return;
    }

    setIsAddingNote(true);
    try {
      const currentUserUuid = '49590b01-81b3-49bc-9a16-0f4d368a95d5'; // Placeholder: Replace with actual user UUID

      const noteData: CreateClientNoteDto = {
        note: newNoteText.trim(),
        clientUuid: clientUuid,
        userUuid: currentUserUuid,
      };

      await addClientNote(noteData);
      setNewNoteText('');
      onNoteAdded(clientUuid);
    } catch (error) {
      console.error('Failed to add note:', error);
      alert('Erro ao adicionar nota. Verifique o console para mais detalhes.');
    } finally {
      setIsAddingNote(false);
    }
  };

  return (
    <div className={`card ${styles['client-notes-card']}`}>
      <h2>Acompanhamento (Notas)</h2>

      <div className={styles['add-note-area']}>
          <textarea
              className={`input-field ${styles['note-textarea']}`}
              placeholder="Adicionar nova nota..."
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              rows={3}
              disabled={isAddingNote}
          ></textarea>
          <button
              className={`btn-primary ${styles['add-note-btn']}`}
              onClick={handleAddNote}
              disabled={isAddingNote || !newNoteText.trim()}
          >
              {isAddingNote ? 'Adicionando...' : 'Adicionar Nota'}
          </button>
      </div>

      {loadingNotes ? (
          <p>Carregando notas...</p>
      ) : clientNotes.length > 0 ? (
        <div className={styles['notes-timeline']}>
          {clientNotes.map((note, index) => (
            <div key={note.uuid} className={styles['note-item']}>
              <div className={styles['note-date']}>
                {new Date(note.createdAt).toLocaleDateString('pt-BR')}
              </div>
              <div className={styles['note-content']}>
                <span className={styles['note-bullet']}></span> {note.note}
              </div>
              {index < clientNotes.length - 1 && (
                <div className={styles['note-connector']}></div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhuma nota de acompanhamento encontrada para este cliente.</p>
      )}
    </div>
  );
};

export default ClientNotes;