import { useState, useEffect } from "react";

export default function NoteForm({ onAdd, onUpdate, editingNote, onCancelEdit }) {
  const [note, setNote] = useState({ title: "", content: "" });

  // Populate form when editing a note
  useEffect(() => {
    if (editingNote) {
      setNote({ title: editingNote.title, content: editingNote.content });
    } else {
      setNote({ title: "", content: "" });
    }
  }, [editingNote]);

  const submit = (e) => {
    e.preventDefault();
    if (!note.title.trim() || !note.content.trim()) return;

    if (editingNote) {
      onUpdate(editingNote._id, note);
    } else {
      onAdd(note);
      setNote({ title: "", content: "" });
    }
  };

  return (
    <div className="note-form-box">
      <h3>{editingNote ? "Edit Note" : "Add New Note"}</h3>
      <form onSubmit={submit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="Note title"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            rows={5}
            placeholder="Write your note..."
            value={note.content}
            onChange={(e) => setNote({ ...note, content: e.target.value })}
            required
          />
        </div>
        <div className="form-row">
          <button className="primary" type="submit">
            {editingNote ? "Save Changes" : "Add Note"}
          </button>
          {editingNote && (
            <button type="button" onClick={onCancelEdit}>Cancel</button>
          )}
        </div>
      </form>
    </div>
  );
}
