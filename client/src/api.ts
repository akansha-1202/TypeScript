const API_URL : string = "/api/notes";

export async function getNotes(search : string = "")  {
  const query = search ? `?q=${encodeURIComponent(search)}` : "";
  const res = await fetch(`${API_URL}${query}`);
  if (!res.ok) throw new Error("Failed to load notes");
  return res.json();
}

export async function createNote(note : Object) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!res.ok) {
    const data : any = await res.json();
    throw new Error(data.message || "Failed to create note");
  }
  return res.json();
}

export async function updateNote(id : string, note : Object) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!res.ok) {
    const data : any = await res.json();
    throw new Error(data.message || "Failed to update note");
  }
  return res.json();
}

export async function deleteNote(id : string) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete note");
  return res.json();
}
