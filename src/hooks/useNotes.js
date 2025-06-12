import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { StorageManager } from "../utils/storage";

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load notes from localStorage on hook initialization
  useEffect(() => {
    const loadNotes = () => {
      try {
        const savedNotes = StorageManager.loadNotes();
        if (savedNotes.length > 0) {
          // Sort notes to put pinned notes at the top
          const sortedNotes = savedNotes.sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return new Date(b.updatedAt) - new Date(a.updatedAt);
          });
          setNotes(sortedNotes);
          setSelectedNote(sortedNotes[0]);
        }
      } catch (error) {
        console.error("Error loading notes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    if (!loading && notes.length > 0) {
      StorageManager.saveNotes(notes);
    }
  }, [notes, loading]);

  const createNote = () => {
    const newNote = {
      id: uuidv4(),
      title: "Untitled Note",
      content: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPinned: false,
      isEncrypted: false,
      encryptedContent: null,
      tags: [],
      category: "general",
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setSelectedNote(newNote);
    return newNote;
  };

  const updateNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === updatedNote.id
          ? { ...updatedNote, updatedAt: new Date().toISOString() }
          : note
      )
    );
    setSelectedNote(updatedNote);
  };

  const deleteNote = (noteId) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter((note) => note.id !== noteId);

      // If we're deleting the selected note, select another one
      if (selectedNote && selectedNote.id === noteId) {
        setSelectedNote(updatedNotes.length > 0 ? updatedNotes[0] : null);
      }

      return updatedNotes;
    });
  };

  const pinNote = (noteId) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              isPinned: !note.isPinned,
              updatedAt: new Date().toISOString(),
            }
          : note
      );

      // Sort notes to put pinned notes at the top
      return updatedNotes.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
    });
  };

  const duplicateNote = (noteId) => {
    const noteToDuplicate = notes.find((note) => note.id === noteId);
    if (!noteToDuplicate) return;

    const duplicatedNote = {
      ...noteToDuplicate,
      id: uuidv4(),
      title: `${noteToDuplicate.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPinned: false,
    };

    setNotes((prevNotes) => [duplicatedNote, ...prevNotes]);
    setSelectedNote(duplicatedNote);
    return duplicatedNote;
  };

  const searchNotes = (searchTerm) => {
    if (!searchTerm.trim()) return notes;

    const term = searchTerm.toLowerCase();
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(term) ||
        note.content.toLowerCase().includes(term) ||
        (note.tags && note.tags.some((tag) => tag.toLowerCase().includes(term)))
    );
  };

  const getNotesByCategory = (category) => {
    return notes.filter((note) => note.category === category);
  };

  const getCategories = () => {
    const categories = [
      ...new Set(notes.map((note) => note.category || "general")),
    ];
    return categories.sort();
  };

  const exportNotes = () => {
    StorageManager.exportNotes(notes);
  };

  const importNotes = async (file) => {
    try {
      const importedNotes = await StorageManager.importNotes(file);

      // Merge with existing notes, avoiding duplicates
      const existingIds = new Set(notes.map((note) => note.id));
      const newNotes = importedNotes.filter(
        (note) => !existingIds.has(note.id)
      );

      if (newNotes.length > 0) {
        setNotes((prevNotes) => [...newNotes, ...prevNotes]);
        return { success: true, imported: newNotes.length };
      } else {
        return { success: false, error: "No new notes to import" };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const clearAllNotes = () => {
    setNotes([]);
    setSelectedNote(null);
    StorageManager.clearNotes();
  };

  return {
    notes,
    selectedNote,
    loading,
    setSelectedNote,
    createNote,
    updateNote,
    deleteNote,
    pinNote,
    duplicateNote,
    searchNotes,
    getNotesByCategory,
    getCategories,
    exportNotes,
    importNotes,
    clearAllNotes,
  };
};
