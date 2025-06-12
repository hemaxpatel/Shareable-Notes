# Shareable Notes - Advanced Notes Application

A feature-rich, AI-powered notes application built with React and Vite, designed for efficient note-taking and management with advanced features like encryption, AI insights, and custom rich text editing.

## 🚀 Features

### Core Functionalities

#### ✨ Custom Rich Text Editor

- **Built from scratch** (no pre-made libraries like TinyMCE or Quill)
- **Text formatting**: Bold, Italic, Underline
- **Text alignment**: Left, Center, Right
- **Font size control**: Multiple size options
- **Keyboard shortcuts**: Standard shortcuts for formatting (Ctrl+B, Ctrl+I, Ctrl+U)

#### 📝 Note Management

- **Create, edit, delete, and list notes**
- **Pin important notes** to the top with visual pin indicator
- **Auto-save functionality** with 1-second debounce
- **Search functionality** with real-time highlighting
- **Note statistics** showing total, encrypted, pinned, and recent notes

#### 🎨 User Interface

- **Clean and intuitive design** with modern UI components
- **Sidebar navigation** with collapsible notes list
- **Search bar** with instant filtering
- **Responsive design** for desktop, tablet, and mobile
- **Dark/light mode compatible** styling

#### 🤖 AI-Powered Features

##### Auto Glossary Highlighting

- **Automatic identification** of technical terms
- **Hover tooltips** with definitions for highlighted terms
- **Extensive glossary** covering programming, AI, and technology terms

##### AI-Driven Insights

- **Text analysis**: Word count, sentence count, reading time
- **Complexity analysis**: Simple, Moderate, or Complex rating
- **Keyword extraction**: Automatically identifies main topics
- **Sentiment analysis**: Positive, Negative, or Neutral tone detection
- **AI-generated summaries**: Key sentence extraction
- **Writing suggestions**: Readability and improvement recommendations

##### Grammar Check

- **Real-time grammar checking** with error highlighting
- **Spell checking** for common misspellings
- **Writing style suggestions** for better readability
- **Error categorization**: Capitalization, spacing, spelling, grammar

### Bonus Functionalities

#### 📱 Responsive Design

- **Mobile-first approach** with touch-friendly interface
- **Adaptive layouts** for different screen sizes
- **Optimized navigation** for smaller screens
- **Touch gestures support** for mobile devices

#### 💾 Data Persistence

- **Local storage integration** for note persistence
- **Auto-save functionality** prevents data loss
- **Export/Import capabilities** with JSON format
- **Data backup and restore** functionality

#### 🔒 Note Encryption

- **Password-protected notes** with end-to-end encryption
- **AES encryption** using CryptoJS library
- **Password strength validation** with feedback
- **Secure note indicators** in the notes list
- **Decryption interface** with password validation

#### 🧠 Advanced AI Features

- **Content summarization** for lengthy notes
- **Theme identification** and keyword clustering
- **Related content suggestions** based on analysis
- **Writing pattern recognition** and style insights

## 🛠️ Technical Implementation

### Technology Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite
- **Styling**: CSS3 with CSS Grid and Flexbox
- **Icons**: Lucide React
- **Encryption**: CryptoJS
- **State Management**: React Hooks (useState, useEffect, custom hooks)
- **Storage**: Browser LocalStorage API

### Project Structure

```
src/
├── components/
│   ├── NotesApp.jsx           # Main application component
│   ├── RichTextEditor.jsx     # Custom rich text editor
│   ├── NotesList.jsx          # Notes sidebar list
│   ├── NotesStats.jsx         # Statistics component
│   ├── HelpModal.jsx          # Help and shortcuts modal
│   └── KeyboardShortcuts.jsx  # Keyboard shortcut handler
├── hooks/
│   └── useNotes.js            # Custom hook for note management
├── services/
│   └── encryption.js          # Encryption service
├── utils/
│   ├── storage.js             # LocalStorage utilities
│   └── textAnalyzer.js        # AI text analysis utilities
└── App.jsx                    # Root component
```

### Key Components

#### NotesApp.jsx

- Main application container
- State management for notes and UI
- Integration of all child components
- Export/import functionality

#### RichTextEditor.jsx

- Custom contentEditable-based editor
- Formatting toolbar implementation
- Auto-save and manual save triggers
- Encryption/decryption interface
- AI insights integration
- Grammar checking functionality

#### useNotes.js (Custom Hook)

- Centralized note management logic
- LocalStorage integration
- CRUD operations for notes
- Search and filtering functionality
- Export/import capabilities

### AI Implementation Details

#### Text Analysis Engine

```javascript
// Keyword extraction with frequency analysis
extractKeywords(text, limit) {
  // Remove stop words and analyze frequency
  // Return sorted keywords by relevance
}

// Complexity analysis based on sentence structure
analyzeComplexity(text) {
  // Calculate average words per sentence
  // Analyze character patterns
  // Return complexity rating
}

// Sentiment analysis using word classification
analyzeSentiment(text) {
  // Positive/negative word matching
  // Contextual analysis
  // Return sentiment score
}
```

#### Encryption Implementation

```javascript
// AES encryption with password validation
encrypt(content, password) {
  // Validate password strength
  // Apply AES encryption
  // Return encrypted data with success status
}

// Secure decryption with error handling
decrypt(encryptedContent, password) {
  // Attempt decryption
  // Validate decrypted content
  // Return success status and data
}
```

## 🎯 Usage Instructions

### Getting Started

1. **Create a new note**: Click the "+" button or press Ctrl+N
2. **Edit content**: Click in the editor area and start typing
3. **Format text**: Use the toolbar buttons or keyboard shortcuts
4. **Save notes**: Auto-saved every second, or press Ctrl+S
5. **Search notes**: Use the search bar to find specific content
6. **Pin important notes**: Click the pin icon to keep notes at the top

### Keyboard Shortcuts

- `Ctrl/Cmd + N`: Create new note
- `Ctrl/Cmd + S`: Save current note
- `Ctrl/Cmd + F`: Focus search bar
- `Ctrl/Cmd + B`: Bold text (in editor)
- `Ctrl/Cmd + I`: Italic text (in editor)
- `Ctrl/Cmd + U`: Underline text (in editor)
- `Delete`: Delete selected note (with confirmation)

### Advanced Features

- **Encrypt notes**: Click the lock icon to set password protection
- **Generate insights**: Click the lightbulb icon for AI analysis
- **Check grammar**: Click the checkmark icon for grammar review
- **Export data**: Click download icon to backup notes
- **Import data**: Click upload icon to restore notes

## 🔧 Installation & Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Setup

```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd shareable-notes

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎨 Design Philosophy

### User Experience

- **Intuitive interface** with minimal learning curve
- **Consistent visual language** throughout the application
- **Accessibility-first design** with proper contrast and focus management
- **Performance optimization** with efficient rendering and state management

### Code Quality

- **Modular architecture** with reusable components
- **Separation of concerns** between UI, logic, and data
- **Custom implementations** avoiding heavy external dependencies
- **Comprehensive error handling** and user feedback

### Security

- **Client-side encryption** for sensitive data
- **Password validation** with strength requirements
- **Secure storage practices** with encrypted local storage
- **No data transmission** - fully offline application

## 🚀 Performance Features

### Optimization Techniques

- **Debounced auto-save** to prevent excessive storage writes
- **Efficient search** with optimized filtering algorithms
- **Lazy loading** for large note collections
- **Memory management** with proper cleanup of event listeners

### Responsive Performance

- **CSS Grid and Flexbox** for efficient layouts
- **Optimized images** and icon usage
- **Minimal bundle size** with tree-shaking
- **Fast startup** with optimized component loading

## 🔮 Future Enhancements

### Planned Features

- **Cloud synchronization** with encrypted remote storage
- **Collaborative editing** with real-time updates
- **Advanced AI models** integration for better insights
- **Plugin system** for extensible functionality
- **Themes and customization** options
- **Advanced search** with filters and tags
- **Note templates** for common use cases
- **Markdown support** alongside rich text

### Technical Improvements

- **Progressive Web App** capabilities
- **Offline-first architecture** with service workers
- **Advanced encryption** with key derivation functions
- **Performance monitoring** and analytics
- **Automated testing** suite
- **Accessibility enhancements** with screen reader support

## 📄 License

This project is developed as part of the PlayPower Labs Frontend Assessment. All rights reserved.

## 🤝 Contributing

This is an assessment project. Please refer to the original requirements and maintain code quality standards.

---

**Built with ❤️ for PlayPower Labs Frontend Assessment**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
