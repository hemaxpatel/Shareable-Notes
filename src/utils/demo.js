// Demo script for Shareable Notes Application
// This file contains sample data and feature demonstrations

export const demoData = {
  // Sample notes to demonstrate features
  sampleNotes: [
    {
      id: "demo-1",
      title: "Welcome to Shareable Notes",
      content: `<h2>Getting Started with Your New Notes App</h2>
      <p>Welcome to <strong>Shareable Notes</strong> - your intelligent note-taking companion! This application combines <em>powerful features</em> with an <u>intuitive interface</u> to enhance your productivity.</p>
      
      <h3>Key Features:</h3>
      <ul>
        <li><strong>Rich Text Editing</strong>: Format your text with bold, italic, underline, and alignment options</li>
        <li><strong>AI-Powered Insights</strong>: Get intelligent analysis of your writing</li>
        <li><strong>Auto Glossary</strong>: Technical terms like <span class="glossary-term" data-definition="A branch of computer science that aims to create machines that can perform tasks that typically require human intelligence.">artificial intelligence</span> and <span class="glossary-term" data-definition="A subset of AI that enables computers to learn and improve from experience without being explicitly programmed.">machine learning</span> are automatically highlighted</li>
        <li><strong>Encryption</strong>: Protect sensitive notes with password encryption</li>
        <li><strong>Smart Search</strong>: Find notes quickly with highlighted search results</li>
      </ul>
      
      <p style="text-align: center;"><em>Try hovering over the highlighted technical terms above!</em></p>`,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      isPinned: true,
      isEncrypted: false,
      tags: ["welcome", "tutorial"],
      category: "general",
    },
  ],

  // Demo functions to showcase features
  loadDemoData: () => {
    localStorage.setItem(
      "shareable-notes",
      JSON.stringify(demoData.sampleNotes)
    );
    console.log("Demo data loaded successfully!");
  },

  clearDemoData: () => {
    localStorage.removeItem("shareable-notes");
    console.log("Demo data cleared!");
  },

  // Feature demonstration scripts
  demonstrateFeatures: {
    // Demonstrate AI insights
    showAIInsights: () => {
      console.log("AI Insights Demo:");
      console.log("1. Create or select a note with substantial content");
      console.log("2. Click the lightbulb icon in the editor toolbar");
      console.log(
        "3. View analysis including word count, complexity, and suggestions"
      );
    },

    // Demonstrate encryption
    showEncryption: () => {
      console.log("Encryption Demo:");
      console.log("1. Create or select a note");
      console.log("2. Click the lock icon in the editor toolbar");
      console.log('3. Set a password (try: "demo123")');
      console.log("4. Note will be encrypted and require password to view");
    },

    // Demonstrate search
    showSearch: () => {
      console.log("Search Demo:");
      console.log('1. Type in the search bar (try: "AI", "React", "project")');
      console.log("2. See real-time filtering and highlighting");
      console.log("3. Search works across titles and content");
    },

    // Demonstrate glossary
    showGlossary: () => {
      console.log("Auto Glossary Demo:");
      console.log(
        '1. Type technical terms like "artificial intelligence", "machine learning", "react"'
      );
      console.log("2. Terms are automatically highlighted");
      console.log("3. Hover over highlighted terms to see definitions");
    },

    // Demonstrate keyboard shortcuts
    showKeyboardShortcuts: () => {
      console.log("Keyboard Shortcuts Demo:");
      console.log("- Ctrl+N: Create new note");
      console.log("- Ctrl+S: Save note");
      console.log("- Ctrl+F: Focus search");
      console.log("- Ctrl+B: Bold text (in editor)");
      console.log("- Ctrl+I: Italic text (in editor)");
      console.log("- Ctrl+U: Underline text (in editor)");
      console.log("- Delete: Delete selected note");
    },
  },
};

// Export demo functions for console access
window.demoData = demoData;
