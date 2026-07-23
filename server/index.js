import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in server/.env");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

// Note schema
const noteSchema = new mongoose.Schema(
  {
    typeOfNote: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, default: "", trim: true },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

function formatNote(note) {
  return {
    id: note._id.toString(),
    typeOfNote: note.typeOfNote,
    title: note.title,
    content: note.content,
  };
}

// GET all notes (optional search: ?q=text)
app.get("/api/notes", async (req, res) => {
  try {
    const q = (req.query.q || "").toString().trim();
    const filter = q
      ? {
          $or: [
            { typeOfNote: { $regex: q, $options: "i" } },
            { title: { $regex: q, $options: "i" } },
            { content: { $regex: q, $options: "i" } },
          ],
        }
      : {};

    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.json(notes.map(formatNote));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one note
app.get("/api/notes/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(formatNote(note));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE note
app.post("/api/notes", async (req, res) => {
  try {
    const { title, content, typeOfNote } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const note = await Note.create({
      title: title.trim(),
      content: (content || "").trim(),
      typeOfNote: typeOfNote.trim(),
    });

    res.status(201).json(formatNote(note));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE note
app.put("/api/notes/:id", async (req, res) => {
  try {
    const { title, content, typeOfNote } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title: title.trim(),
        content: (content || "").trim(),
        typeOfNote: typeOfNote.trim(),
      },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(formatNote(note));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE note
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function start() {
  try {
    await mongoose.connect(MONGODB_URI, {
      family: 4, // prefer IPv4 (helps on some Windows networks)
    });
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`API running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    console.error(
      "Check: 1) Atlas Network Access allows your IP (or 0.0.0.0/0)  2) username/password  3) internet/DNS"
    );
    process.exit(1);
  }
}

start();
