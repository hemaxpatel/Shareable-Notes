import React, { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Lightbulb,
  CheckCircle,
} from "lucide-react";
import CryptoJS from "crypto-js";
import { TextAnalyzer } from "../utils/textAnalyzer";
import { EncryptionService } from "../services/encryption";
import "./RichTextEditor.css";

const RichTextEditor = ({
  note,
  onUpdateNote,
  isCreatingNote,
  setIsCreatingNote,
}) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [decryptPassword, setDecryptPassword] = useState("");
  const [isDecrypted, setIsDecrypted] = useState(!note.isEncrypted);
  const [decryptedNoteId, setDecryptedNoteId] = useState(null);
  const [showInsights, setShowInsights] = useState(false);
  const [insights, setInsights] = useState(null);
  const [grammarErrors, setGrammarErrors] = useState([]);
  const [glossaryTimer, setGlossaryTimer] = useState(null);
  const editorRef = useRef(null);
  const titleRef = useRef(null);
  const lastContentRef = useRef(content);

  // Glossary terms for auto-highlighting
  const glossaryTerms = {
    "artificial intelligence":
      "A branch of computer science that aims to create machines that can perform tasks that typically require human intelligence.",
    "machine learning":
      "A subset of AI that enables computers to learn and improve from experience without being explicitly programmed.",
    "neural network":
      "A computing system inspired by biological neural networks that constitute animal brains.",
    algorithm:
      "A set of rules or instructions given to a computer to help it learn on its own.",
    "deep learning":
      "A subset of machine learning that uses neural networks with multiple layers.",
    blockchain:
      "A distributed ledger technology that maintains a continuously growing list of records.",
    cryptocurrency:
      "A digital or virtual currency that uses cryptography for security.",
    api: "Application Programming Interface - a set of protocols and tools for building software applications.",
    database:
      "An organized collection of structured information, or data, typically stored electronically.",
    framework:
      "A platform for developing software applications that provides a foundation on which software developers can build programs.",
    javascript:
      "A high-level, interpreted programming language that conforms to the ECMAScript specification.",
    react:
      "A JavaScript library for building user interfaces, particularly web applications.",
    component:
      "A reusable piece of code that defines how a certain part of your UI should appear.",
    state:
      "An object that holds some information that may change over the lifetime of the component.",
    props:
      "Short for properties, these are read-only attributes that are passed from parent to child components.",
  };

  useEffect(() => {
    if (isCreatingNote && titleRef.current) {
      titleRef.current.focus();
      titleRef.current.select();
    }
  }, [isCreatingNote]);
  useEffect(() => {
    setTitle(note.title);

    // Check if this note was already decrypted in this session
    const wasDecrypted = decryptedNoteId === note.id;

    if (note.isEncrypted && !wasDecrypted) {
      setContent("");
      setIsDecrypted(false);
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
      }
    } else {
      setContent(note.content);
      setIsDecrypted(true);
      if (editorRef.current) {
        editorRef.current.innerHTML = note.content;
      }
    }
  }, [note, decryptedNoteId]); // Auto-save functionality - only on title changes
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (title !== note.title) {
        handleSave();
      }
    }, 2000);

    return () => clearTimeout(saveTimer);
  }, [title]);

  // Cleanup glossary timer on unmount
  useEffect(() => {
    return () => {
      if (glossaryTimer) {
        clearTimeout(glossaryTimer);
      }
    };
  }, [glossaryTimer]);
  const handleSave = () => {
    if (note.isEncrypted && !isDecrypted) return;

    // Get content directly from DOM to avoid state sync issues
    let finalContent = "";
    if (editorRef.current) {
      finalContent = editorRef.current.innerHTML;
      // Update our state to match DOM
      setContent(finalContent);
    }

    onUpdateNote({
      ...note,
      title: title || "Untitled Note",
      content: finalContent,
    });
    setIsCreatingNote(false);
  };
  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };
  // Save current selection when user interacts with toolbar
  const saveSelection = () => {
    const selection = window.getSelection();
    console.log("Saving selection:", selection);
    if (
      selection.rangeCount > 0 &&
      editorRef.current?.contains(selection.anchorNode)
    ) {
      const range = selection.getRangeAt(0);
      console.log("Selection range:", range, "collapsed:", range.collapsed);
      savedSelectionRef.current = {
        startContainer: range.startContainer,
        startOffset: range.startOffset,
        endContainer: range.endContainer,
        endOffset: range.endOffset,
        collapsed: range.collapsed,
      };
      console.log("Saved selection:", savedSelectionRef.current);
    } else {
      console.log("No valid selection to save");
    }
  };

  // Restore saved selection
  const restoreSelection = () => {
    if (savedSelectionRef.current && editorRef.current) {
      try {
        const selection = window.getSelection();
        const range = document.createRange();

        // Check if saved nodes are still in the document
        if (
          editorRef.current.contains(
            savedSelectionRef.current.startContainer
          ) &&
          editorRef.current.contains(savedSelectionRef.current.endContainer)
        ) {
          range.setStart(
            savedSelectionRef.current.startContainer,
            savedSelectionRef.current.startOffset
          );
          range.setEnd(
            savedSelectionRef.current.endContainer,
            savedSelectionRef.current.endOffset
          );

          selection.removeAllRanges();
          selection.addRange(range);
          return range;
        }
      } catch (error) {
        console.warn("Could not restore selection:", error);
      }
    }
    return null;
  };
  const handleFontSizeChange = (size) => {
    const selection = window.getSelection();

    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      if (!range.collapsed) {
        // Text is selected - apply formatting using modern approach
        const sizeMap = {
          1: "10px",
          2: "13px",
          3: "16px",
          4: "18px",
          5: "24px",
          6: "32px",
          7: "48px",
        };

        // Save the selection first
        const selectedContent = range.extractContents();

        // Create a span with the font size
        const span = document.createElement("span");
        span.style.fontSize = sizeMap[size] || "16px";
        span.appendChild(selectedContent);

        // Insert the styled span
        range.insertNode(span);

        // Move cursor to end of the styled text
        const endRange = document.createRange();
        endRange.setStartAfter(span);
        endRange.setEndAfter(span);
        selection.removeAllRanges();
        selection.addRange(endRange);

        // Focus back to editor
        editorRef.current?.focus();
      } else {
        // No selection - use execCommand for future typing
        document.execCommand("fontSize", false, size);
        editorRef.current?.focus();
      }
    }
  };
  const handleEncryption = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const validation = EncryptionService.validatePassword(password);
    if (!validation.isValid) {
      alert(validation.feedback.join("\n"));
      return;
    }

    const result = EncryptionService.encrypt(content, password);
    if (result.success) {
      onUpdateNote({
        ...note,
        title,
        content: "",
        isEncrypted: true,
        encryptedContent: result.data,
      });

      setContent("");
      setIsDecrypted(false);
      setPassword("");
      setConfirmPassword("");
      setIsEncrypting(false);
      alert("Note encrypted successfully!");
    } else {
      alert("Encryption failed: " + result.error);
    }
  };
  const handleDecryption = () => {
    const result = EncryptionService.decrypt(
      note.encryptedContent,
      decryptPassword
    );
    if (result.success) {
      setContent(result.data);
      setIsDecrypted(true);
      setDecryptedNoteId(note.id); // Remember this note was decrypted
      setDecryptPassword("");
    } else {
      alert(result.error);
    }
  };
  const removeEncryption = () => {
    if (
      window.confirm(
        "Are you sure you want to remove encryption from this note?"
      )
    ) {
      onUpdateNote({
        ...note,
        isEncrypted: false,
        encryptedContent: null,
      });
      setIsDecrypted(true);
    }
  };

  // AI Insights generation
  const generateInsights = () => {
    const textContent = content.replace(/<[^>]*>/g, "").trim();

    if (!textContent) {
      alert("No content to analyze!");
      return;
    }

    const complexity = TextAnalyzer.analyzeComplexity(textContent);
    const keywords = TextAnalyzer.extractKeywords(textContent, 8);
    const readingTime = TextAnalyzer.calculateReadingTime(textContent);
    const sentiment = TextAnalyzer.analyzeSentiment(textContent);
    const summary = TextAnalyzer.generateSummary(textContent);

    const generatedInsights = {
      ...complexity,
      keywords: keywords.map((k) => k.word || k),
      readingTime,
      sentiment,
      summary,
      suggestions: [],
    };

    // Generate suggestions based on analysis
    if (complexity.words > 500) {
      generatedInsights.suggestions.push(
        "Consider breaking this long note into smaller, focused notes."
      );
    }
    if (complexity.avgWordsPerSentence > 20) {
      generatedInsights.suggestions.push(
        "Your sentences are quite long. Consider breaking them up for better readability."
      );
    }
    if (sentiment === "Negative") {
      generatedInsights.suggestions.push(
        "This note has a negative tone. Consider reviewing for clarity and positivity."
      );
    }
    if (keywords.length > 0) {
      generatedInsights.suggestions.push(
        `Main topics identified: ${keywords
          .slice(0, 3)
          .map((k) => k.word || k)
          .join(", ")}`
      );
    }
    if (generatedInsights.suggestions.length === 0) {
      generatedInsights.suggestions.push(
        "Your writing style looks great! Keep up the good work."
      );
    }

    setInsights(generatedInsights);
    setShowInsights(true);
  };

  // Basic grammar checking
  const checkGrammar = () => {
    const text = content.replace(/<[^>]*>/g, "");
    const errors = [];

    // Simple grammar rules
    const rules = [
      {
        pattern: /\bi\s/gi,
        suggestion: 'Consider capitalizing "I"',
        type: "capitalization",
      },
      {
        pattern: /\s{2,}/g,
        suggestion: "Multiple spaces found",
        type: "spacing",
      },
      {
        pattern: /[.!?]\s*[a-z]/g,
        suggestion: "Sentence should start with capital letter",
        type: "capitalization",
      },
      {
        pattern: /\bteh\b/gi,
        suggestion: 'Did you mean "the"?',
        type: "spelling",
      },
      {
        pattern: /\byour\s+welcome\b/gi,
        suggestion: 'Did you mean "you\'re welcome"?',
        type: "grammar",
      },
    ];

    rules.forEach((rule) => {
      const matches = text.matchAll(rule.pattern);
      for (const match of matches) {
        errors.push({
          text: match[0],
          index: match.index,
          suggestion: rule.suggestion,
          type: rule.type,
        });
      }
    });

    setGrammarErrors(errors);
    if (errors.length === 0) {
      alert("No grammar issues found!");
    }
  };

  // Highlight glossary terms
  const highlightGlossaryTerms = (text) => {
    let highlightedText = text;

    Object.keys(glossaryTerms).forEach((term) => {
      const regex = new RegExp(`\\b${term}\\b`, "gi");
      highlightedText = highlightedText.replace(
        regex,
        (match) =>
          `<span class="glossary-term" data-definition="${
            glossaryTerms[term.toLowerCase()]
          }">${match}</span>`
      );
    });

    return highlightedText;
  };
  const handleContentChange = () => {
    // Only set a timer to update state occasionally, not on every input
    if (glossaryTimer) {
      clearTimeout(glossaryTimer);
    }

    // Set a timer to update state only when user stops typing for a longer time
    const newTimer = setTimeout(() => {
      if (editorRef.current) {
        const currentContent = editorRef.current.innerHTML;
        // Only update if content has actually changed meaningfully
        if (currentContent !== content) {
          setContent(currentContent);
        }
      }
    }, 2000); // Longer delay to reduce interference

    setGlossaryTimer(newTimer);
  };

  if (note.isEncrypted && !isDecrypted) {
    return (
      <div className="editor-container">
        <div className="encrypted-note">
          <div className="encryption-info">
            <Lock size={48} className="lock-icon" />
            <h2>This note is encrypted</h2>
            <p>Enter the password to decrypt and view this note.</p>

            <div className="decrypt-form">
              <input
                type="password"
                placeholder="Enter password"
                value={decryptPassword}
                onChange={(e) => setDecryptPassword(e.target.value)}
                className="password-input"
                onKeyPress={(e) => e.key === "Enter" && handleDecryption()}
              />
              <button onClick={handleDecryption} className="decrypt-btn">
                <Unlock size={16} />
                Decrypt
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="editor-container">
      <div className="editor-header">
        <input
          ref={titleRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="note-title-input"
          placeholder="Note title..."
          onBlur={handleSave}
        />

        <div className="editor-actions">
          {!note.isEncrypted && (
            <button
              onClick={() => setIsEncrypting(true)}
              className="encrypt-btn"
              title="Encrypt Note"
            >
              <Lock size={16} />
            </button>
          )}

          {note.isEncrypted && (
            <button
              onClick={removeEncryption}
              className="remove-encryption-btn"
              title="Remove Encryption"
            >
              <Unlock size={16} />
            </button>
          )}

          <button
            onClick={generateInsights}
            className="insights-btn"
            title="Generate AI Insights"
          >
            <Lightbulb size={16} />
          </button>

          <button
            onClick={checkGrammar}
            className="grammar-btn"
            title="Check Grammar"
          >
            <CheckCircle size={16} />
          </button>
        </div>
      </div>
      {isEncrypting && (
        <div className="encryption-modal">
          <div className="encryption-form">
            <h3>Encrypt Note</h3>
            <p>Set a password to encrypt this note.</p>

            <div className="password-fields">
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-password"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="password-input"
              />
            </div>

            <div className="encryption-actions">
              <button
                onClick={() => setIsEncrypting(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button
                onClick={handleEncryption}
                className="confirm-encrypt-btn"
              >
                Encrypt Note
              </button>
            </div>
          </div>
        </div>
      )}
      {showInsights && insights && (
        <div className="insights-modal">
          <div className="insights-content">
            <div className="insights-header">
              <h3>AI Insights</h3>
              <button
                onClick={() => setShowInsights(false)}
                className="close-btn"
              >
                ×
              </button>
            </div>
            <div className="insights-stats">
              <div className="stat">
                <span className="stat-label">Words:</span>
                <span className="stat-value">{insights.words}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Sentences:</span>
                <span className="stat-value">{insights.sentences}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Reading Time:</span>
                <span className="stat-value">{insights.readingTime} min</span>
              </div>
              <div className="stat">
                <span className="stat-label">Complexity:</span>
                <span className="stat-value">{insights.complexity}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Sentiment:</span>
                <span className="stat-value">{insights.sentiment}</span>
              </div>
            </div>

            {insights.keywords.length > 0 && (
              <div className="keywords">
                <h4>Key Topics:</h4>
                <div className="keyword-tags">
                  {insights.keywords.map((keyword, index) => (
                    <span key={index} className="keyword-tag">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {insights.summary && insights.summary.length > 0 && (
              <div className="summary">
                <h4>AI-Generated Summary:</h4>
                <ul>
                  {insights.summary.map((sentence, index) => (
                    <li key={index}>{sentence}</li>
                  ))}
                </ul>
              </div>
            )}

            {insights.suggestions.length > 0 && (
              <div className="suggestions">
                <h4>Suggestions:</h4>
                <ul>
                  {insights.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      {grammarErrors.length > 0 && (
        <div className="grammar-errors">
          <h4>Grammar Check Results:</h4>
          <ul>
            {grammarErrors.map((error, index) => (
              <li key={index} className={`error-${error.type}`}>
                <strong>"{error.text}"</strong> - {error.suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="toolbar">
        <div className="format-group">
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              execCommand("bold");
            }}
            className="format-btn"
            title="Bold"
          >
            <Bold size={16} />
          </button>

          <button
            onMouseDown={(e) => {
              e.preventDefault();
              execCommand("italic");
            }}
            className="format-btn"
            title="Italic"
          >
            <Italic size={16} />
          </button>

          <button
            onMouseDown={(e) => {
              e.preventDefault();
              execCommand("underline");
            }}
            className="format-btn"
            title="Underline"
          >
            <Underline size={16} />
          </button>
        </div>
        <div className="format-group">
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              execCommand("justifyLeft");
            }}
            className="format-btn"
            title="Align Left"
          >
            <AlignLeft size={16} />
          </button>

          <button
            onMouseDown={(e) => {
              e.preventDefault();
              execCommand("justifyCenter");
            }}
            className="format-btn"
            title="Center"
          >
            <AlignCenter size={16} />
          </button>

          <button
            onMouseDown={(e) => {
              e.preventDefault();
              execCommand("justifyRight");
            }}
            className="format-btn"
            title="Align Right"
          >
            <AlignRight size={16} />
          </button>
        </div>{" "}
        <div className="format-group">
          <Type size={16} />
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              handleFontSizeChange("1");
            }}
            className="format-btn font-size-btn"
            title="Small"
          >
            S
          </button>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              handleFontSizeChange("3");
            }}
            className="format-btn font-size-btn"
            title="Medium"
          >
            M
          </button>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              handleFontSizeChange("5");
            }}
            className="format-btn font-size-btn"
            title="Large"
          >
            L
          </button>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              handleFontSizeChange("7");
            }}
            className="format-btn font-size-btn"
            title="Extra Large"
          >
            XL
          </button>
        </div>
      </div>{" "}
      <div
        ref={editorRef}
        contentEditable
        className="editor-content"
        onBlur={handleSave}
        style={{
          minHeight: "400px",
          padding: "20px",
          border: "1px solid #ddd",
          direction: "ltr",
          unicodeBidi: "normal",
        }}
        suppressContentEditableWarning={true}
      />
      <div className="glossary-tooltip" id="glossary-tooltip"></div>
    </div>
  );
};

export default RichTextEditor;
