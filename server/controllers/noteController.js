import Note from "../models/Note.js";

/* Create note */
export const createNote = async (req, res) => {
  try {
    const note = await Note.create({
      title: req.body.title,
      content: req.body.content,
      user: req.user,
    });

    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* Get notes */
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* Update note */
export const updateNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) return res.status(404).json({ message: "Note not found" });

  if (note.user.toString() !== req.user)
    return res.status(401).json({ message: "Not allowed" });

  note.title = req.body.title || note.title;
  note.content = req.body.content || note.content;

  const updated = await note.save();
  res.json(updated);
};

/* Delete note */
export const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) return res.status(404).json({ message: "Note not found" });

  if (note.user.toString() !== req.user)
    return res.status(401).json({ message: "Not allowed" });

  await note.deleteOne();
  res.json({ message: "Note deleted" });
};
