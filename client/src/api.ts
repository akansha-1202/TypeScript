const API_URL: string = "/api/notes";

export interface Note {
  readonly id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type NoteInput = Pick<Note, "title" | "content">;

export async function getNotes(search: string = ""): Promise<Note[]> {
  const query = search ? `?q=${encodeURIComponent(search)}` : "";
  const res = await fetch(`${API_URL}${query}`);
  if (!res.ok) throw new Error("Failed to load notes");
  return res.json();
}

export async function createNote(note: NoteInput) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!res.ok) {
    const data: any = await res.json();
    throw new Error(data.message || "Failed to create note");
  }
  return res.json();
}

export async function updateNote(id: string, note: NoteInput) {
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

export async function deleteNote(id: string) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete note");
  return res.json();
}
