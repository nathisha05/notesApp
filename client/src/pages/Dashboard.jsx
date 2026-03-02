import { useEffect, useState } from "react";
import API from "../api/axios";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [activeTab, setActiveTab] = useState("add");

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await API.get("/notes");
      setNotes(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load notes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotes(); }, []);

  const addNote = async (note) => {
    try {
      await API.post("/notes", note);
      await fetchNotes();
      setActiveTab("view");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add note.");
    }
  };

  const updateNote = async (id, data) => {
    try {
      await API.put(`/notes/${id}`, data);
      setEditingNote(null);
      await fetchNotes();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update note.");
    }
  };

  const deleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      if (editingNote?._id === id) setEditingNote(null);
      await fetchNotes();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete note.");
    }
  };

  const startEdit = (note) => {
    setEditingNote(note);
    setActiveTab("add");
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard">
      <div className="dash-header">
        <h2>My Notes</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === "add" ? "active" : ""}`}
          onClick={() => { setActiveTab("add"); setEditingNote(null); }}
        >
          {editingNote ? "Edit Note" : "Add Note"}
        </button>
        <button
          className={`tab-btn ${activeTab === "view" ? "active" : ""}`}
          onClick={() => setActiveTab("view")}
        >
          View Notes
          {notes.length > 0 && <span className="badge">{notes.length}</span>}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {activeTab === "add" && (
        <NoteForm
          onAdd={addNote}
          onUpdate={updateNote}
          editingNote={editingNote}
          onCancelEdit={() => setEditingNote(null)}
        />
      )}

      {activeTab === "view" && (
        loading ? (
          <div className="state-msg">
            <div className="spinner"></div>
            Loading...
          </div>
        ) : notes.length === 0 ? (
          <div className="state-msg">No notes yet. Use Add Note to create one.</div>
        ) : (
          <div className="notes-list">
            {notes.map((n) => (
              <NoteCard
                key={n._id}
                note={n}
                onDelete={deleteNote}
                onEdit={startEdit}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}
