import React from "react";
import NoteForm from "../components/NoteForm";

const AddOrEditNotePage = ({ fetchNotes, editingNote, setEditingNote }) => {
  return (
    <div className="container mt-4">
      <NoteForm
        fetchNotes={fetchNotes}
        editingNote={editingNote}
        setEditingNote={setEditingNote}
      />
    </div>
  );
};

export default AddOrEditNotePage;
