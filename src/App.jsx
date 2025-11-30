import React from "react";
import Header from "./components/Header";
import MoviesPortal from "./components/MoviesPortal";

const App = () => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <main className="container" style={{ flex: 1 }}>
        <MoviesPortal />
      </main>
      <footer
        style={{
          textAlign: "center",
          padding: "2rem",
          color: "var(--text-secondary)",
          borderTop: "1px solid var(--border-color)",
          marginTop: "auto",
        }}
      >
        <p>&copy; {new Date().getFullYear()} CineTag. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
