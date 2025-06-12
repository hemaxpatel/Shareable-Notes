import React, { useState } from "react";
import { HelpCircle, X } from "lucide-react";
import "./HelpModal.css";

const HelpModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { key: "Ctrl/Cmd + N", description: "Create new note" },
    { key: "Ctrl/Cmd + S", description: "Save current note" },
    { key: "Ctrl/Cmd + F", description: "Focus search" },
    { key: "Delete", description: "Delete selected note" },
    { key: "Ctrl/Cmd + B", description: "Bold text (in editor)" },
    { key: "Ctrl/Cmd + I", description: "Italic text (in editor)" },
    { key: "Ctrl/Cmd + U", description: "Underline text (in editor)" },
  ];

  const features = [
    "Rich text editing with custom toolbar",
    "Note encryption with password protection",
    "Auto-glossary highlighting for technical terms",
    "AI-powered insights and text analysis",
    "Grammar checking with suggestions",
    "Pin important notes to the top",
    "Search and highlight functionality",
    "Export/import notes as JSON",
    "Responsive design for all devices",
    "Local storage for data persistence",
  ];

  return (
    <>
      <button
        className="help-trigger"
        onClick={() => setIsOpen(true)}
        title="Help & Shortcuts"
      >
        <HelpCircle size={16} />
      </button>

      {isOpen && (
        <div className="help-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="help-modal" onClick={(e) => e.stopPropagation()}>
            <div className="help-header">
              <h2>Shareable Notes - Help</h2>
              <button className="close-help" onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="help-content">
              <section className="help-section">
                <h3>Keyboard Shortcuts</h3>
                <div className="shortcuts-grid">
                  {shortcuts.map((shortcut, index) => (
                    <div key={index} className="shortcut-item">
                      <kbd className="shortcut-key">{shortcut.key}</kbd>
                      <span className="shortcut-desc">
                        {shortcut.description}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="help-section">
                <h3>Features</h3>
                <ul className="features-list">
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </section>

              <section className="help-section">
                <h3>Getting Started</h3>
                <ol className="getting-started">
                  <li>
                    Click the "+" button or press Ctrl/Cmd + N to create your
                    first note
                  </li>
                  <li>Use the formatting toolbar to style your text</li>
                  <li>Pin important notes using the pin icon</li>
                  <li>Encrypt sensitive notes with password protection</li>
                  <li>Use AI insights to analyze your writing</li>
                  <li>Export your notes to backup or share them</li>
                </ol>
              </section>

              <section className="help-section">
                <h3>AI Features</h3>
                <div className="ai-features">
                  <div className="ai-feature">
                    <strong>Auto Glossary:</strong> Technical terms are
                    automatically highlighted. Hover over them to see
                    definitions.
                  </div>
                  <div className="ai-feature">
                    <strong>Smart Insights:</strong> Get word count, reading
                    time, complexity analysis, and content suggestions.
                  </div>
                  <div className="ai-feature">
                    <strong>Grammar Check:</strong> Basic grammar checking with
                    suggestions for improvements.
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpModal;
