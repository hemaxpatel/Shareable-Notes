import { useEffect } from "react";
import NotesApp from "./components/NotesApp";
import ErrorBoundary from "./components/ErrorBoundary";
import { demoData } from "./utils/demo";
import "./App.css";

function App() {
  useEffect(() => {
    console.log("App component mounted");

    // Load demo data if no notes exist
    try {
      const existingNotes = localStorage.getItem("shareable-notes");
      if (!existingNotes) {
        console.log("Loading demo data...");
        demoData.loadDemoData();
      }
    } catch (error) {
      console.error("Error loading demo data:", error);
    }

    // Add glossary tooltip functionality
    const handleMouseOver = (e) => {
      if (e.target.classList.contains("glossary-term")) {
        const tooltip = document.getElementById("glossary-tooltip");
        if (tooltip) {
          tooltip.textContent = e.target.dataset.definition;
          tooltip.style.display = "block";
          tooltip.style.left = e.pageX + 10 + "px";
          tooltip.style.top = e.pageY - 30 + "px";
        }
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.classList.contains("glossary-term")) {
        const tooltip = document.getElementById("glossary-tooltip");
        if (tooltip) {
          tooltip.style.display = "none";
        }
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  console.log("App rendering...");

  return (
    <ErrorBoundary>
      <div style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
        <NotesApp />
      </div>
    </ErrorBoundary>
  );
}

export default App;
