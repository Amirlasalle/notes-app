export const getNotes = async () => {
    const res = await fetch("/api/notes");
    return res.json();
  };
  
  export const saveNote = async (note: { title: string; text: string }) => {
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
  };
  
  export const deleteNote = async (id: string) => {
    await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });
  };