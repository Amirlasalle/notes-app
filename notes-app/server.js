const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const next = require("next");

const app = express();
const PORT = process.env.PORT || 3000;

// JSON parsing middleware
app.use(express.json());

// Path to the database file
const dbPath = path.join(__dirname, "db", "db.json");

// Get all notes
app.get("/api/notes", async (req, res) => {
  try {
    const data = await fs.readFile(dbPath, "utf-8");
    const notes = JSON.parse(data || "[]");
    res.json(notes);
  } catch (err) {
    console.error("Error reading notes:", err);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// Add a new note
app.post("/api/notes", async (req, res) => {
  const { title, text } = req.body;

  if (!title || !text) {
    return res.status(400).json({ error: "Missing title or text" });
  }

  try {
    const data = await fs.readFile(dbPath, "utf-8");
    const notes = JSON.parse(data || "[]");
    const newNote = { id: `${Date.now()}`, title, text };
    notes.push(newNote);

    await fs.writeFile(dbPath, JSON.stringify(notes, null, 2));
    res.json(newNote);
  } catch (err) {
    console.error("Error saving note:", err);
    res.status(500).json({ error: "Failed to save note" });
  }
});

// Delete a note
app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await fs.readFile(dbPath, "utf-8");
    const notes = JSON.parse(data || "[]");
    const updatedNotes = notes.filter((note) => note.id !== id);

    if (notes.length === updatedNotes.length) {
      return res.status(404).json({ error: "Note not found" });
    }

    await fs.writeFile(dbPath, JSON.stringify(updatedNotes, null, 2));
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ error: "Failed to delete note" });
  }
});

// Serve the Next.js frontend
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  app.all("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
