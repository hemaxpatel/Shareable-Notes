import React, { useState, useRef, useEffect } from "react";
import { Download, Upload, Menu, X } from "lucide-react";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const fileInputRef = useRef(null);
  const searchInputRef = useRef(null);
  const handleSelectNote = (note) => {
    setSelectedNote(note);
    // Close sidebar on mobile when note is selected
    setIsSidebarOpen(false);
  };
  const handleCreateNote = () => {
    const newNote = createNote();
    setIsCreatingNote(true);
    // Close sidebar on mobile when creating note
    setIsSidebarOpen(false);
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

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

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
      {/* Hamburger Menu Button - Only visible on mobile */}
      <button
        className="hamburger-btn"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        title="Toggle Menu"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className={`notes-sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
        {/* Close button for mobile sidebar */}
        <button
          className="sidebar-close-btn"
          onClick={() => setIsSidebarOpen(false)}
          title="Close Menu"
        >
          <X size={20} />
        </button>
        <div className="sidebar-header">
          <h1>Shareable Notes</h1>
          <div className="header-actions">
            <button
              className="action-btn"
              onClick={handleExport}
              title="Export Notes"
            >
              <Download size={20} />
            </button>
            <button
              className="action-btn"
              onClick={handleImportClick}
              title="Import Notes"
            >
              <Upload size={20} />
            </button>
            {/* <HelpModal /> */}
            <button
              className="action-btn"
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
        <NotesStats notes={notes} />{" "}
        <NotesList
          notes={filteredNotes}
          selectedNote={selectedNote}
          onSelectNote={handleSelectNote}
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
