import React, { useEffect } from "react";

const KeyboardShortcuts = ({
  onCreateNote,
  onSave,
  onDeleteNote,
  onToggleBold,
  onToggleItalic,
  onToggleUnderline,
  onSearch,
  selectedNote,
}) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if user is typing in an input/textarea/contenteditable
      const isTyping =
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA" ||
        event.target.contentEditable === "true";

      // Ctrl/Cmd + N: New note
      if ((event.ctrlKey || event.metaKey) && event.key === "n") {
        event.preventDefault();
        onCreateNote();
        return;
      }

      // Ctrl/Cmd + S: Save note
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        onSave();
        return;
      }

      // Ctrl/Cmd + F: Focus search
      if ((event.ctrlKey || event.metaKey) && event.key === "f") {
        event.preventDefault();
        onSearch();
        return;
      }

      // Delete key: Delete note (when not typing)
      if (event.key === "Delete" && !isTyping && selectedNote) {
        event.preventDefault();
        if (window.confirm("Are you sure you want to delete this note?")) {
          onDeleteNote(selectedNote.id);
        }
        return;
      }

      // Formatting shortcuts (only when in editor)
      if (isTyping && event.target.contentEditable === "true") {
        // Ctrl/Cmd + B: Bold
        if ((event.ctrlKey || event.metaKey) && event.key === "b") {
          event.preventDefault();
          onToggleBold();
          return;
        }

        // Ctrl/Cmd + I: Italic
        if ((event.ctrlKey || event.metaKey) && event.key === "i") {
          event.preventDefault();
          onToggleItalic();
          return;
        }

        // Ctrl/Cmd + U: Underline
        if ((event.ctrlKey || event.metaKey) && event.key === "u") {
          event.preventDefault();
          onToggleUnderline();
          return;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    selectedNote,
    onCreateNote,
    onSave,
    onDeleteNote,
    onToggleBold,
    onToggleItalic,
    onToggleUnderline,
    onSearch,
  ]);

  return null; // This component doesn't render anything
};

export default KeyboardShortcuts;
