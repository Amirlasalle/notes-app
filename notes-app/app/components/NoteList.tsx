type NoteListProps = {
    notes: { id: string; title: string; text: string }[];
    onDelete: (id: string) => void;
  };
  
  export default function NoteList({ notes, onDelete }: NoteListProps) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Your Notes</h2>
        <ul>
          {notes.map((note) => (
            <li key={note.id} className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-bold">{note.title}</h3>
                <p>{note.text}</p>
              </div>
              <button
                onClick={() => onDelete(note.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li> 
          ))}
        </ul>
      </div>
    );
  }
  