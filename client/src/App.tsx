import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { getNotes, createNote, updateNote, deleteNote, Note, NoteInput, NoteType } from "./api";

const emptyForm: NoteInput = { title: "", content: "" , typeOfNote: NoteType.PERSONAL};

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<NoteInput>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadNotes(query = search) {
    setLoading(true);
    setError("");
    try {
      const data = await getNotes(query);
      setNotes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotes("");
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function startEdit(note: Note) {
    setEditId(note.id);
    setForm({ title: note.title, content: note.content, typeOfNote: note.typeOfNote });
    setError("");
  }

  function cancelEdit() {
    setEditId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    try {
      if (editId) {
        await updateNote(editId, form);
      } else {
        await createNote(form);
      }
      setForm(emptyForm);
      setEditId(null);
      await loadNotes(search);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this note?")) return;

    try {
      await deleteNote(id);
      if (editId === id) cancelEdit();
      await loadNotes(search);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    loadNotes(search);
  }

  return (
    <div className="app">
      <h1>Notes App</h1>
      <p className="subtitle">Simple React + Vite CRUD (api in TypeScript)</p>

      {error && <div className="error">{error}</div>}

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
        <button
          type="button"
          onClick={() => {
            setSearch("");
            loadNotes("");
          }}
        >
          Clear
        </button>
      </form>

      <form className="note-form" onSubmit={handleSubmit}>
        <h2>{editId ? "Edit Note" : "Create Note"}</h2>
        <select name="typeOfNote" value={form.typeOfNote} onChange={handleChange}>
          <option value={NoteType.PERSONAL}>Personal</option>
          <option value={NoteType.WORK}>Work</option>
          <option value={NoteType.OTHER}>Other</option>
        </select>
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          rows={3}
        />
        <div className="actions">
          <button type="submit">{editId ? "Update" : "Create"}</button>
          {editId && (
            <button type="button" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <section className="notes-list">
        <h2>All Notes {loading ? "(loading...)" : `(${notes.length})`}</h2>
        {notes.length === 0 && !loading && <p>No notes found.</p>}

        {notes.map((note) => (
          <article key={note.id} className="note-card">
            <p>{note.typeOfNote}</p>
            <h3>{note.title}</h3>
            <p>{note.content || <em>No content</em>}</p>
            <div className="actions">
              <button type="button" onClick={() => startEdit(note)}>
                Edit
              </button>
              <button type="button" className="danger" onClick={() => handleDelete(note.id)}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
