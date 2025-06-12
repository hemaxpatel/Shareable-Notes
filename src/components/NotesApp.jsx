import React, { useState, useRef } from "react";
import { Download, Upload } from "lucide-react";
import { useNotes } from "../hooks/useNotes";
import NotesList from "./NotesList";
import RichTextEditor from "./RichTextEditor";
import HelpModal from "./HelpModal";
import KeyboardShortcuts from "./KeyboardShortcuts";
import NotesStats from "./NotesStats";
import "./NotesApp.css";

const NotesApp = () => {
  console.log("NotesApp component rendering...");

  const {
    notes,
    selectedNote,
    loading,
    setSelectedNote,
    createNote,
    updateNote,
    deleteNote,
    pinNote,
    searchNotes,
    exportNotes,
    importNotes,
  } = useNotes();

  console.log("Notes loaded:", notes.length, "Loading:", loading);

  const [searchTerm, setSearchTerm] = useState("");
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const fileInputRef = useRef(null);
  const searchInputRef = useRef(null);
  const handleCreateNote = () => {
    const newNote = createNote();
    setIsCreatingNote(true);
  };

  const handleExport = () => {
    exportNotes();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const result = await importNotes(file);
      if (result.success) {
        alert(`Successfully imported ${result.imported} notes!`);
      } else {
        alert(`Import failed: ${result.error}`);
      }
    }
    // Reset file input
    event.target.value = "";
  };

  const handleFocusSearch = () => {
    searchInputRef.current?.focus();
  };

  const handleSave = () => {
    // This will be handled by the RichTextEditor's auto-save
    console.log("Save triggered");
  };

  const handleDeleteNote = (noteId) => {
    deleteNote(noteId);
  };

  const filteredNotes = searchNotes(searchTerm);

  console.log("Filtered notes:", filteredNotes.length);
  console.log("Selected note:", selectedNote?.title);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f8f9fa",
          fontSize: "18px",
          color: "#6c757d",
        }}
      >
        Loading notes...
      </div>
    );
  }
  return (
    <div
      className="notes-app"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      <div className="notes-sidebar">
        <div className="sidebar-header">
          <h1>Shareable Notes</h1>
          <div className="header-actions">
            <button
              className="action-btn"
              onClick={handleExport}
              title="Export Notes"
            >
              <Download size={16} />
            </button>
            <button
              className="action-btn"
              onClick={handleImportClick}
              title="Import Notes"
            >
              <Upload size={16} />
            </button>
            <HelpModal />
            <button
              className="new-note-btn"
              onClick={handleCreateNote}
              title="Create New Note"
            >
              +
            </button>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          style={{ display: "none" }}
          onChange={handleImportFile}
        />
        <div className="search-container">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <NotesStats notes={notes} />
        <NotesList
          notes={filteredNotes}
          selectedNote={selectedNote}
          onSelectNote={setSelectedNote}
          onDeleteNote={deleteNote}
          onPinNote={pinNote}
          searchTerm={searchTerm}
        />
      </div>
      <div className="notes-main">
        {selectedNote ? (
          <RichTextEditor
            note={selectedNote}
            onUpdateNote={updateNote}
            isCreatingNote={isCreatingNote}
            setIsCreatingNote={setIsCreatingNote}
          />
        ) : (
          <div className="no-note-selected">
            <h2>Welcome to Shareable Notes</h2>
            <p>
              Select a note from the sidebar or create a new one to get started.
            </p>
            <button
              onClick={handleCreateNote}
              className="create-first-note-btn"
            >
              Create Your First Note
            </button>
          </div>
        )}
      </div>
      <KeyboardShortcuts
        onCreateNote={handleCreateNote}
        onSave={handleSave}
        onDeleteNote={handleDeleteNote}
        onSearch={handleFocusSearch}
        selectedNote={selectedNote}
        onToggleBold={() => document.execCommand("bold")}
        onToggleItalic={() => document.execCommand("italic")}
        onToggleUnderline={() => document.execCommand("underline")}
      />
    </div>
  );
};

export default NotesApp;
