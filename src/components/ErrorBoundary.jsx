import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f8f9fa",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h1 style={{ color: "#dc3545", marginBottom: "20px" }}>
            Something went wrong
          </h1>
          <p style={{ color: "#6c757d", marginBottom: "20px" }}>
            The application encountered an error. Please check the console for
            details.
          </p>
          <pre
            style={{
              background: "#f8f9fa",
              padding: "15px",
              borderRadius: "5px",
              border: "1px solid #dee2e6",
              color: "#dc3545",
              fontSize: "14px",
              maxWidth: "80%",
              overflow: "auto",
            }}
          >
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#6c63ff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
