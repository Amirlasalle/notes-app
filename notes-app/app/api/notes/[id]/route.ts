// import { NextResponse } from "next/server";
// import fs from "fs/promises";
// import path from "path";

// const dbPath = path.join(process.cwd(), "db", "db.json");

// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const { id } = params;
//     const data = await fs.readFile(dbPath, "utf-8");
//     const notes = JSON.parse(data);
//     const updatedNotes = notes.filter((note: { id: string }) => note.id !== id);

//     await fs.writeFile(dbPath, JSON.stringify(updatedNotes, null, 2));
//     return NextResponse.json({ message: "Note deleted" });
//   } catch {
//     return NextResponse.json({ error: "Failed to delete note" }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";
// import fs from "fs/promises";
// import path from "path";

// const dbPath = path.join(process.cwd(), "db", "db.json");

// // Define the type for notes
// interface Note {
//   id: string;
//   title: string;
//   text: string;
// }

// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const { id } = params;

//     // Read the database file
//     const data = await fs.readFile(dbPath, "utf-8");
//     const notes: Note[] = JSON.parse(data);

//     // Filter out the note with the given id
//     const updatedNotes = notes.filter((note) => note.id !== id);

//     if (updatedNotes.length === notes.length) {
//       // If no note was deleted (i.e., id not found)
//       return NextResponse.json({ error: "Note not found" }, { status: 404 });
//     }

//     // Write the updated notes back to the file
//     await fs.writeFile(dbPath, JSON.stringify(updatedNotes, null, 2));

//     // Return success message
//     return NextResponse.json({ message: "Note deleted" }, { status: 204 });
//   } catch (error) {
//     // Return a more specific error message for debugging
//     console.error(error);
//     return NextResponse.json({ error: "Failed to delete note" }, { status: 500 });
//   }
// }





import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";

const dbPath = "./db/db.json";

// Define the type for a note
interface Note {
  id: string;
  title: string;
  text: string;
}

export async function GET() {
  const notes = await fs.readFile(dbPath, "utf-8");
  return NextResponse.json(JSON.parse(notes));
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.title || !body.text) {
    return NextResponse.json(
      { error: "Missing title or text" },
      { status: 400 }
    );
  }

  const notes: Note[] = JSON.parse(await fs.readFile(dbPath, "utf-8"));
  const newNote: Note = { id: uuidv4(), ...body };
  notes.push(newNote);
  await fs.writeFile(dbPath, JSON.stringify(notes, null, 2));
  return NextResponse.json(newNote);
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  const notes: Note[] = JSON.parse(await fs.readFile(dbPath, "utf-8"));
  const updatedNotes = notes.filter((note) => note.id !== id);
  await fs.writeFile(dbPath, JSON.stringify(updatedNotes, null, 2));
  return NextResponse.json({ success: true });
}
