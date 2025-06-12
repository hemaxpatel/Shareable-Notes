import React from "react";
import { FileText, Lock, Pin, Calendar } from "lucide-react";
import "./NotesStats.css";

const NotesStats = ({ notes }) => {
  const totalNotes = notes.length;
  const encryptedNotes = notes.filter((note) => note.isEncrypted).length;
  const pinnedNotes = notes.filter((note) => note.isPinned).length;
  const recentNotes = notes.filter((note) => {
    const daysDiff =
      (new Date() - new Date(note.updatedAt)) / (1000 * 60 * 60 * 24);
    return daysDiff <= 7;
  }).length;

  const totalWords = notes.reduce((sum, note) => {
    const wordCount = note.content
      .replace(/<[^>]*>/g, "")
      .trim()
      .split(/\s+/).length;
    return sum + (note.content ? wordCount : 0);
  }, 0);

  return (
    <div className="notes-stats">
      <div className="stats-header">
        <h3>Your Notes</h3>
      </div>

      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-icon">
            <FileText size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{totalNotes}</span>
            <span className="stat-label">Total Notes</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon encrypted">
            <Lock size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{encryptedNotes}</span>
            <span className="stat-label">Encrypted</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon pinned">
            <Pin size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{pinnedNotes}</span>
            <span className="stat-label">Pinned</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon recent">
            <Calendar size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{recentNotes}</span>
            <span className="stat-label">This Week</span>
          </div>
        </div>
      </div>

      {totalWords > 0 && (
        <div className="word-count-summary">
          <span className="word-count">
            {totalWords.toLocaleString()} words total
          </span>
        </div>
      )}
    </div>
  );
};

export default NotesStats;
