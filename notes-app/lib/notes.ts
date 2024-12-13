// export const getNotes = async () => {
//     const res = await fetch("/api/notes");
//     return res.json();
//   };
  
//   export const saveNote = async (note: { title: string; text: string }) => {
//     await fetch("/api/notes", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(note),
//     });
//   };
  
//   export const deleteNote = async (id: string) => {
//     await fetch(`/api/notes/${id}`, {
//       method: "DELETE",
//     });
//   };

// export const getNotes = async () => {
//   const res = await fetch('/api/notes');
//   if (!res.ok) throw new Error('Failed to fetch notes');
//   return res.json();
// };

// export const saveNote = async (note: { title: string; text: string }) => {
//   const res = await fetch('/api/notes', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(note),
//   });
//   if (!res.ok) throw new Error('Failed to save note');
//   return res.json();
// };

// export const deleteNote = async (id: string) => {
//   const res = await fetch(`/api/notes/${id}`, { method: 'DELETE' });
//   if (!res.ok) throw new Error('Failed to delete note');
//   return res.json();
// };


export const getNotes = async () => {
  const res = await fetch('/api/notes');
  if (!res.ok) throw new Error('Failed to fetch notes');
  return res.json();
};

export const saveNote = async (note: { title: string; text: string }) => {
  const res = await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error('Failed to save note');
  return res.json();
};

export const deleteNote = async (id: string) => {
  const res = await fetch(`/api/notes/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const errorMessage = await res.json();
    console.error('Error deleting note:', errorMessage);
    throw new Error(errorMessage.error || 'Failed to delete note');
  }
  return res.json();
};
