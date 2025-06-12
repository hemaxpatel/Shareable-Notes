import React from "react";
import { Pin, Trash2, Lock } from "lucide-react";
import "./NotesList.css";

const NotesList = ({
  notes,
  selectedNote,
  onSelectNote,
  onDeleteNote,
  onPinNote,
  searchTerm = "",
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return "Today";
    } else if (diffDays === 2) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays - 1} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  const getPreview = (content) => {
    // Strip HTML tags and get first 100 characters
    const textContent = content.replace(/<[^>]*>/g, "").trim();
    return textContent.length > 100
      ? textContent.substring(0, 100) + "..."
      : textContent || "No content";
  };

  const highlightSearchTerm = (text, term) => {
    if (!term) return text;

    const regex = new RegExp(
      `(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    return text.replace(regex, "<mark>$1</mark>");
  };

  const handleDeleteClick = (e, noteId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this note?")) {
      onDeleteNote(noteId);
    }
  };

  const handlePinClick = (e, noteId) => {
    e.stopPropagation();
    onPinNote(noteId);
  };

  return (
    <div className="notes-list">
      {notes.length === 0 ? (
        <div className="empty-notes">
          <p>No notes found</p>
        </div>
      ) : (
        notes.map((note) => (
          <div
            key={note.id}
            className={`note-item ${
              selectedNote?.id === note.id ? "selected" : ""
            } ${note.isPinned ? "pinned" : ""}`}
            onClick={() => onSelectNote(note)}
          >
            {" "}
            <div className="note-header">
              <h3 className="note-title">
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightSearchTerm(note.title, searchTerm),
                  }}
                />
                {note.isEncrypted && (
                  <Lock size={14} className="encryption-icon" />
                )}
              </h3>
              <div className="note-actions">
                <button
                  className={`pin-btn ${note.isPinned ? "pinned" : ""}`}
                  onClick={(e) => handlePinClick(e, note.id)}
                  title={note.isPinned ? "Unpin note" : "Pin note"}
                >
                  <Pin size={14} />
                </button>
                <button
                  className="delete-btn"
                  onClick={(e) => handleDeleteClick(e, note.id)}
                  title="Delete note"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <p
              className="note-preview"
              dangerouslySetInnerHTML={{
                __html: highlightSearchTerm(
                  getPreview(note.content),
                  searchTerm
                ),
              }}
            />
            <div className="note-meta">
              <span className="note-date">{formatDate(note.updatedAt)}</span>
              {note.isPinned && <span className="pinned-badge">Pinned</span>}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NotesList;
