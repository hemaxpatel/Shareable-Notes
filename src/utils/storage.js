// Storage utility for managing notes data
export const StorageManager = {
  STORAGE_KEY: "shareable-notes",

  // Save notes to localStorage
  saveNotes: (notes) => {
    try {
      localStorage.setItem(StorageManager.STORAGE_KEY, JSON.stringify(notes));
      return true;
    } catch (error) {
      console.error("Error saving notes:", error);
      return false;
    }
  },

  // Load notes from localStorage
  loadNotes: () => {
    try {
      const saved = localStorage.getItem(StorageManager.STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading notes:", error);
      return [];
    }
  },

  // Clear all notes
  clearNotes: () => {
    try {
      localStorage.removeItem(StorageManager.STORAGE_KEY);
      return true;
    } catch (error) {
      console.error("Error clearing notes:", error);
      return false;
    }
  },

  // Export notes as JSON
  exportNotes: (notes) => {
    const dataStr = JSON.stringify(notes, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(dataBlob);
    link.download = `shareable-notes-${
      new Date().toISOString().split("T")[0]
    }.json`;
    link.click();

    URL.revokeObjectURL(link.href);
  },

  // Import notes from JSON file
  importNotes: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const notes = JSON.parse(e.target.result);
          if (Array.isArray(notes)) {
            resolve(notes);
          } else {
            reject(new Error("Invalid notes format"));
          }
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error("Error reading file"));
      reader.readAsText(file);
    });
  },
};
