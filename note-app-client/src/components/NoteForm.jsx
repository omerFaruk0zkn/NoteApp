import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const NoteForm = ({ fetchNotes, editingNote, setEditingNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [isFavorite, setIsFavorite] = useState(false);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setColor(editingNote.color || "#ffffff");
      setIsFavorite(editingNote.isFavorite || false);
    }
  }, [editingNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      const noteData = { title, content, color, isFavorite };

      if (editingNote) {
        await API.put(`/Notes/${editingNote.id}`, noteData);
        setEditingNote(null);
        navigate("/");
      } else {
        await API.post("/Notes", noteData);
        navigate("/");
      }

      fetchNotes();
      setTitle("");
      setContent("");
      setColor("#ffffff");
      setIsFavorite(false);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const errorData = error.response.data.errors; 
        const formattedErrors = []; 
        for (const key in errorData) {
          if (Array.isArray(errorData[key])) {
            formattedErrors.push(...errorData[key]);
          }
        }
        setErrors(formattedErrors);
      } else {
        alert("Not kaydedilemedi!");
      }
    }
  };

  return (
    <div className="mt-4">
      <h4>{editingNote ? "Notu Düzenle" : "Yeni Not Ekle"}</h4>
      <form onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <div className="alert alert-danger">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="mb-3">
          <label>Başlık</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>İçerik</label>
          <textarea
            className="form-control"
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label>Renk Seç</label>
          <input
            type="color"
            className="form-control form-control-color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            value={isFavorite}
            onChange={(e) => setIsFavorite(e.target.checked)}
          />
          <label className="form-check-label">Favori olarak işaretle</label>
        </div>
        <button type="submit" className="btn btn-success">
          {editingNote ? "Güncelle" : "Ekle"}
        </button>
        {editingNote && (
          <Link to="/">
            <button
              type="button"
              className="btn btn-danger ms-2"
              onClick={() => setEditingNote(null)}
            >
              İptal
            </button>
          </Link>
        )}
      </form>
    </div>
  );
};

export default NoteForm;
