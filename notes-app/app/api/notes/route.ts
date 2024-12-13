// import { NextResponse } from "next/server";
// import { promises as fs } from "fs";
// import { v4 as uuidv4 } from "uuid";

// const dbPath = "./db/db.json";

// export async function GET() {
//   const notes = await fs.readFile(dbPath, "utf-8");
//   return NextResponse.json(JSON.parse(notes));
// }

// export async function POST(request: Request) {
//   const body = await request.json();
//   if (!body.title || !body.text) {
//     return NextResponse.json(
//       { error: "Missing title or text" },
//       { status: 400 }
//     );
//   }

//   const notes = JSON.parse(await fs.readFile(dbPath, "utf-8"));
//   const newNote = { id: uuidv4(), ...body };
//   notes.push(newNote);
//   await fs.writeFile(dbPath, JSON.stringify(notes, null, 2));
//   return NextResponse.json(newNote);
// }

// export async function DELETE(request: Request) {
//   const url = new URL(request.url);
//   const id = url.searchParams.get("id");

//   if (!id) {
//     return NextResponse.json({ error: "Missing ID" }, { status: 400 });
//   }

//   const notes = JSON.parse(await fs.readFile(dbPath, "utf-8"));
//   const updatedNotes = notes.filter((note: any) => note.id !== id);
//   await fs.writeFile(dbPath, JSON.stringify(updatedNotes, null, 2));
//   return NextResponse.json({ success: true });
// }

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const dbPath = path.join(process.cwd(), "db", "db.json");

export async function GET() {
  try {
    const data = await fs.readFile(dbPath, "utf-8");
    const notes = JSON.parse(data || "[]"); // Handle empty file gracefully
    return NextResponse.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title || !body.text) {
      return NextResponse.json(
        { error: "Missing title or text" },
        { status: 400 }
      );
    }

    const data = await fs.readFile(dbPath, "utf-8");
    const notes = JSON.parse(data || "[]");

    const newNote = { id: uuidv4(), ...body };
    notes.push(newNote);

    await fs.writeFile(dbPath, JSON.stringify(notes, null, 2));
    return NextResponse.json(newNote);
  } catch (error) {
    console.error("Error saving note:", error);
    return NextResponse.json({ error: "Failed to save note" }, { status: 500 });
  }
}
