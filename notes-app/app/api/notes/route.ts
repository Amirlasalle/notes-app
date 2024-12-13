import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";

const dbPath = "./db/db.json";

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

  const notes = JSON.parse(await fs.readFile(dbPath, "utf-8"));
  const newNote = { id: uuidv4(), ...body };
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

  const notes = JSON.parse(await fs.readFile(dbPath, "utf-8"));
  const updatedNotes = notes.filter((note: any) => note.id !== id);
  await fs.writeFile(dbPath, JSON.stringify(updatedNotes, null, 2));
  return NextResponse.json({ success: true });
}
