import React, { useEffect, useRef, useState } from "react";
import NoteList from "../components/NoteList";

const NotesPage = ({ notes, fetchNotes, setEditingNote, isLoggedIn }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isLoggedIn && isFirstRender.current) {
      fetchNotes();
      isFirstRender.current = false;
    }
  }, [fetchNotes, isLoggedIn]);

  const filteredNotes = notes.filter(
    (note) =>
      (note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!showFavorites || note.isFavorite)
  );

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <input
          type="text"
          placeholder="Notlarda ara..."
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="form-check mt-2">
          <input
            type="checkbox"
            className="form-check-input"
            checked={showFavorites}
            onChange={(e) => setShowFavorites(e.target.checked)}
          />
          <label className="form-check-label">Sadece Favoriler</label>
        </div>
      </div>
      {notes.length === 0 ? (
        <p className="text-warning fw-bold fs-5">Henüz hiç not eklemediniz.</p>
      ) : filteredNotes.length > 0 ? (
        <NoteList
          notes={filteredNotes}
          fetchNotes={fetchNotes}
          setEditingNote={setEditingNote}
        />
      ) : (
        <p className="text-danger fw-bold fs-5">
          Aradığınız kriterlere göre not bulunamadı.
        </p>
      )}
    </div>
  );
};

export default NotesPage;
