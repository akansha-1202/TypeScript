const API_URL = "/api/notes";

export async function getNotes(search = "") {
  const query = search ? `?q=${encodeURIComponent(search)}` : "";
  const res = await fetch(`${API_URL}${query}`);
  if (!res.ok) throw new Error("Failed to load notes");
  return res.json();
}

export async function createNote(note) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to create note");
  }
  return res.json();
}

export async function updateNote(id, note) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to update note");
  }
  return res.json();
}

export async function deleteNote(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete note");
  return res.json();
}
