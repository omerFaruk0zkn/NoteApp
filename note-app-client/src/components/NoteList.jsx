import React from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { getTextColor } from "../utils/getTextColor";

const NoteList = ({ notes, fetchNotes, setEditingNote }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Bu notu silmek istediğinizden emin misiniz ?")) {
      try {
        await API.delete(`/Notes/${id}`);
        fetchNotes();
      } catch (error) {
        console.error("Not silinirken bir hata oluştu:", error);
        alert("Not silinemedi!");
      }
    }
  };

  return (
    <div className="mt-4">
      <h4>Mevcut Notlar</h4>
      <ul className="list-group">
        {notes.map((note) => (
          <li
            key={note.id}
            className="list-group-item my-1"
            style={{
              backgroundColor: note.color || "#f9f9f9",
              color: getTextColor(note.color),
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <strong>{note.title}</strong>
                {note.isFavorite && (
                  <span className="badge bg-warning ms-2">Favori</span>
                )}
              </div>
              <div>
                <Link to="/add-note">
                  <button
                    className="btn btn-primary btn-sm me-2 mb-2 mb-sm-0"
                    onClick={() => setEditingNote(note)}
                  >
                    Düzenle
                  </button>
                </Link>
                <button
                  className="btn btn-danger btn-sm me-2 mb-2 mb-sm-0"
                  onClick={() => handleDelete(note.id)}
                >
                  Sil
                </button>
              </div>
            </div>
            <p className="mb-0 mt-2 text-break">{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
