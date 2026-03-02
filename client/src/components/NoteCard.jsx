export default function NoteCard({ note, onDelete, onEdit }) {
  const date = new Date(note.updatedAt || note.createdAt).toLocaleDateString();

  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="note-card-footer">
        <span className="note-date">{date}</span>
        <div className="note-actions">
          <button onClick={() => onEdit(note)}>Edit</button>
          <button className="danger" onClick={() => onDelete(note._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
