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
      
      <p style="text-align: center;"><em>Try hovering over the highlighted technical terms above!</em></p>
      
      <h3>Keyboard Shortcuts:</h3>
      <p>Use <strong>Ctrl+N</strong> to create new notes, <strong>Ctrl+S</strong> to save, and <strong>Ctrl+F</strong> to search.</p>`,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      isPinned: true,
      isEncrypted: false,
      tags: ["welcome", "tutorial"],
      category: "general",
    },
    {
      id: "demo-2",
      title: "AI and Machine Learning Concepts",
      content: `<h1>Understanding AI and Machine Learning</h1>
      
      <p>This document explores key concepts in <strong>artificial intelligence</strong> and <strong>machine learning</strong>, two rapidly evolving fields that are transforming technology.</p>
      
      <h2>Core Concepts</h2>
      <h3>Neural Networks</h3>
      <p>A <em>neural network</em> is a computing system inspired by biological neural networks. These networks consist of interconnected nodes (neurons) that process information in layers.</p>
      
      <h3>Deep Learning</h3>
      <p><u>Deep learning</u> is a subset of machine learning that uses neural networks with multiple layers to analyze data patterns. It has revolutionized image recognition, natural language processing, and many other domains.</p>
      
      <h3>Algorithms</h3>
      <p>An <strong>algorithm</strong> is a set of rules or instructions that defines how a computer should solve a specific problem. In machine learning, algorithms learn patterns from data to make predictions or decisions.</p>
      
      <h2>Applications</h2>
      <ul>
        <li>Computer Vision and Image Recognition</li>
        <li>Natural Language Processing</li>
        <li>Autonomous Vehicles</li>
        <li>Recommendation Systems</li>
        <li>Medical Diagnosis</li>
      </ul>
      
      <p style="text-align: right;"><em>This note demonstrates AI-powered glossary highlighting!</em></p>`,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      isPinned: false,
      isEncrypted: false,
      tags: ["ai", "machine-learning", "technology"],
      category: "education",
    },
    {
      id: "demo-3",
      title: "Web Development Technologies",
      content: `<h1>Modern Web Development Stack</h1>
      
      <p>This note covers essential technologies for modern web development using <strong>JavaScript</strong> and popular frameworks.</p>
      
      <h2>Frontend Technologies</h2>
      <h3>React Framework</h3>
      <p><strong>React</strong> is a powerful JavaScript library for building user interfaces. It uses a <em>component</em>-based architecture where each component manages its own <u>state</u> and receives data through <strong>props</strong>.</p>
      
      <h3>Key Concepts:</h3>
      <ul>
        <li><strong>Components</strong>: Reusable UI building blocks</li>
        <li><strong>State Management</strong>: Handling dynamic data</li>
        <li><strong>Props</strong>: Data flow between components</li>
        <li><strong>Hooks</strong>: Modern React features for state and lifecycle</li>
      </ul>
      
      <h2>Backend & Database</h2>
      <p>A robust <em>database</em> system is crucial for storing and retrieving application data. Modern applications often use <strong>APIs</strong> to communicate between frontend and backend systems.</p>
      
      <h2>Development Tools</h2>
      <p>Modern development relies on powerful tools and <u>frameworks</u> that streamline the development process and improve code quality.</p>
      
      <p style="text-align: center;"><strong>Remember:</strong> The key to successful web development is understanding both the technologies and the problems they solve!</p>`,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      isPinned: true,
      isEncrypted: false,
      tags: ["web-development", "javascript", "react"],
      category: "programming",
    },
    {
      id: "demo-4",
      title: "Encrypted Personal Notes",
      content: "",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      isPinned: false,
      isEncrypted: true,
      encryptedContent: "U2FsdGVkX1+8QGme5mEkjjfPOHMZQQXJHL6jhJLSQqo=", // Encrypted "This is a secret note with sensitive information!"
      tags: ["personal", "private"],
      category: "personal",
    },
    {
      id: "demo-5",
      title: "Project Ideas and Brainstorming",
      content: `<h1>Innovative Project Ideas</h1>
      
      <p>This note contains brainstorming session results for potential new projects. Each idea focuses on solving real-world problems using technology.</p>
      
      <h2>Mobile Applications</h2>
      <ul>
        <li><strong>Smart Shopping Assistant</strong>: AI-powered app that helps users find the best deals and compare prices across multiple platforms</li>
        <li><strong>Personal Health Tracker</strong>: Comprehensive wellness app that combines fitness tracking with mental health monitoring</li>
        <li><strong>Language Learning Companion</strong>: Interactive app that uses natural conversation practice with AI tutors</li>
      </ul>
      
      <h2>Web Applications</h2>
      <ul>
        <li><strong>Collaborative Note-Taking Platform</strong>: Real-time collaboration tool for teams and students</li>
        <li><strong>Environmental Impact Calculator</strong>: Tool that helps individuals and businesses track their carbon footprint</li>
        <li><strong>Creative Portfolio Builder</strong>: Platform for artists and designers to showcase their work professionally</li>
      </ul>
      
      <h2>Emerging Technologies</h2>
      <ul>
        <li><strong>Blockchain-based Voting System</strong>: Secure and transparent digital voting platform</li>
        <li><strong>AR Navigation Assistant</strong>: Augmented reality app for indoor navigation in large buildings</li>
        <li><strong>IoT Home Automation</strong>: Smart home system that learns user preferences and optimizes energy usage</li>
      </ul>
      
      <h2>Next Steps</h2>
      <ol>
        <li>Research market demand for each idea</li>
        <li>Analyze technical feasibility and required resources</li>
        <li>Create detailed project proposals for top 3 ideas</li>
        <li>Seek feedback from potential users and stakeholders</li>
      </ol>
      
      <p><em>Remember to consider user experience, scalability, and monetization strategies for each project!</em></p>`,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      isPinned: false,
      isEncrypted: false,
      tags: ["projects", "brainstorming", "innovation"],
      category: "planning",
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
