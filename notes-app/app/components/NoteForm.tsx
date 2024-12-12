import { useState } from 'react';

type NoteFormProps = {
  onSave: (title: string, text: string) => void;
};

export default function NoteForm({ onSave }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSave = () => {
    onSave(title, text);
    setTitle('');
    setText('');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create Note</h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 mb-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Text"
        className="w-full p-2 mb-2 border rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
}
