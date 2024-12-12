import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dbPath = path.join(process.cwd(), "db", "db.json");

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await fs.readFile(dbPath, "utf-8");
    const notes = JSON.parse(data);
    const updatedNotes = notes.filter((note: { id: string }) => note.id !== id);

    await fs.writeFile(dbPath, JSON.stringify(updatedNotes, null, 2));
    return NextResponse.json({ message: "Note deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete note" }, { status: 500 });
  }
}
