"use client";

import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronsRight, FiChevronUp } from "react-icons/fi";
import { motion } from "framer-motion";
import { getNotes, saveNote, deleteNote } from "../../lib/notes";
import { IoIosTrash } from "react-icons/io";
import { FaEdit, FaPlus } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

type Note = {
  id: string;
  title: string;
  text: string;
};

type ToggleCloseProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type TitleSectionProps = {
  open: boolean;
};

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [viewMode, setViewMode] = useState<"view" | "add" | "edit">("add");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const fetchedNotes = await getNotes();
    setNotes(fetchedNotes);
  };

  const handleSaveNote = async (title: string, text: string) => {
    if (viewMode === "edit" && activeNote) {
      await deleteNote(activeNote.id); // Remove the old note
    }
    await saveNote({ title, text });
    setActiveNote(null);
    setViewMode("add");
    fetchNotes();
  };

  const handleDeleteNote = async (id: string) => {
    await deleteNote(id);
    fetchNotes();
  };

  const handleSelectNote = (note: Note) => {
    setActiveNote(note);
    setViewMode("view");
  };

  return (
    <div className="flex h-screen bg-indigo-50">
      <Sidebar
        notes={notes}
        onSelect={handleSelectNote}
        onDelete={handleDeleteNote}
        activeNote={activeNote}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <NotesApp
        notes={notes}
        viewMode={viewMode}
        activeNote={activeNote}
        onSave={handleSaveNote}
        setViewMode={setViewMode}
      />
    </div>
  );
};

export default NotesPage;

const Logo: React.FC = () => {
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md"
    >
      <Image src="/images/notes.webp" alt="" width={50} height={50} />
    </motion.div>
  );
};

const TitleSection: React.FC<TitleSectionProps> = ({ open }) => {
  const [managePremium, setManagePremium] = useState(false);
  return (
    <div className="w-full pb-3">
      <div
        onClick={() => {
          setManagePremium((prev) => (prev ? !prev : true));
        }}
        className={`${
          open
            ? "flex cursor-pointer items-center justify-between rounded-lg transition-colors hover:bg-slate-100 p-1"
            : "flex cursor-pointer items-center justify-between rounded-xl transition-colors hover:bg-slate-100 p-1"
        }`}
      >
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-sm font-semibold">Notes App</span>
            </motion.div>
          )}
        </div>
        {managePremium ? (
          <FiChevronUp className={`${open ? "mx-1" : "hidden"}`} />
        ) : (
          <FiChevronDown className={`${open ? "mx-1" : "hidden"}`} />
        )}
      </div>

      {managePremium && (
        <div
          className={` ${
            open
              ? "h-fit w-full flex flex-col items-start justify-center px-2 pt-5 pb-2"
              : "hidden"
          }`}
        >
          <Link
            href="/"
            className="text-slate-500 cursor-pointer hover:text-dark py-1 text-xs capitalize hover:underline underline-offset-2"
          >
            back to Home
          </Link>
          {/* <div className="text-slate-500 cursor-pointer hover:text-dark py-1 text-xs capitalize hover:underline underline-offset-2">
            app tutorial
          </div> */}
          <a
            href="https://www.mirocreate.com/contact"
            target="_blank"
            className="text-slate-500 cursor-pointer hover:text-dark py-1 text-xs capitalize hover:underline underline-offset-2"
          >
            contact support
          </a>
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC<{
  notes: Note[];
  onSelect: (note: Note) => void;
  onDelete: (id: string) => void;
  activeNote: Note | null;
  viewMode: string;
  setViewMode: React.Dispatch<React.SetStateAction<"edit" | "add" | "view">>;
}> = ({ notes, onSelect, onDelete, activeNote, viewMode, setViewMode }) => {
  const [open, setOpen] = useState(true);

  return (
    <motion.nav
      layout
      className="sticky top-0 bottom-0 z-50 h-screen shrink-0 border-r border-slate-300 bg-white p-2 overflow-hidden flex flex-col"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="w-full mb-3 border-b border-slate-300 pb-3">
        <div
          onClick={() => {
            setViewMode("add");
          }}
          // className="w-full flex cursor-pointer items-center justify-between rounded-lg transition-colors px-3 py-1 mt-1 hover:bg-slate-100 text-sm capitalize"
          className={`${
            open
              ? "w-full flex cursor-pointer items-center justify-between rounded-lg transition-colors hover:bg-slate-100 p-1"
              : "w-full flex cursor-pointer items-center justify-center rounded-xl transition-colors hover:bg-slate-100 p-1"
          }`}
        >
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
              className="w-full p-1 flex items-center justify-between"
            >
              <span className="block text-sm font-semibold">Notes App</span>{" "}
              <FaPlus />
            </motion.div>
          )}

          {!open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
              className="w-full py-2 flex items-center justify-center"
            >
              <FaPlus />
            </motion.div>
          )}
        </div>
      </div>

      <div className="space-y-1 w-full h-[105%] pb-20 flex flex-col items-center justify-start overflow-y-scroll">
        {open ? (
          <ul className="space-y-2">
            {notes
              .slice()
              .reverse()
              .map((note) => (
                <li
                  key={note.id}
                  className={`flex justify-between items-center p-2 rounded cursor-pointer ${
                    activeNote?.id === note.id
                      ? "bg-indigo-100 text-indigo-800"
                      : "hover:bg-gray-100 text-slate-600"
                  }`}
                  onClick={() => onSelect(note)}
                >
                  <span
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      touchAction: "pan-y",
                      insetBlockStart: "132px",
                    }}
                    className="overflow-hidden pr-2"
                  >
                    {note.title}
                  </span>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(note.id);
                      window.location.reload();
                    }}
                  >
                    <IoIosTrash />
                  </button>
                </li>
              ))}
          </ul>
        ) : (
          ""
        )}
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const ToggleClose: React.FC<ToggleCloseProps> = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((prev) => !prev)}
      className="absolute bottom-0 left-0 right-0 border-t bg-white border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Collapse Sidebar
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

const NotesApp: React.FC<{
  notes: Note[];
  viewMode: "view" | "add" | "edit";
  activeNote: Note | null;
  onSave: (title: string, text: string) => void;
  setViewMode: React.Dispatch<React.SetStateAction<"view" | "add" | "edit">>;
}> = ({ viewMode, activeNote, onSave, setViewMode }) => {
  return (
    <div className="flex-1 p-4">
      {viewMode === "add" && <AddNote onSave={onSave} />}
      {viewMode === "view" && activeNote && <ViewNote note={activeNote} />}
      {viewMode === "edit" && activeNote && (
        <EditNote note={activeNote} onSave={onSave} />
      )}
      {viewMode === "view" && activeNote && (
        <button
          onClick={() => setViewMode("edit")}
          className="absolute top-4 right-4 text-black hover:text-gray-700"
        >
          <FaEdit />
        </button>
      )}
    </div>
  );
};

// Add Note Component
const AddNote: React.FC<{ onSave: (title: string, text: string) => void }> = ({
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSave = () => {
    onSave(title, text);
    setTitle("");
    setText("");
  };

  const handleResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onInput={handleResize}
        placeholder="Title"
        className="bg-transparent focus:outline-none w-full mt-2 p-2 resize-none font-bold text-xl"
      />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Text"
        className="bg-transparent focus:outline-none w-full mt-2 p-2 h-full resize-none"
      />
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save
      </button>
    </div>
  );
};

// View Note Component
const ViewNote: React.FC<{ note: Note }> = ({ note }) => (
  <div>
    <h3 className="text-2xl font-semibold">{note.title}</h3>
    <p className="mt-2">{note.text}</p>
  </div>
);

// Edit Note Component
const EditNote: React.FC<{
  note: Note;
  onSave: (title: string, text: string) => void;
}> = ({ note, onSave }) => {
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);

  const handleSave = () => {
    onSave(title, text);
  };

  const handleResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onInput={handleResize}
        placeholder="Title"
        className="bg-transparent focus:outline-none w-full mt-2 p-2 resize-none font-bold text-xl"
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="bg-transparent focus:outline-none w-full mt-2 p-2 h-full resize-none"
      />
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save
      </button>
    </div>
  );
};
