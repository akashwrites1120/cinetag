const Header = () => {
  return (
    <header
      style={{
        padding: "1.5rem 0",
        borderBottom: "1px solid var(--border-color)",
        backgroundColor: "rgba(11, 14, 20, 0.8)",
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <a
          href="#"
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "var(--text-color)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span style={{ color: "var(--primary-color)" }}>Cine</span>Tag
        </a>
        <nav>
          {/* Placeholder links for a fuller look */}
          <div style={{ display: "flex", gap: "2rem" }}>
            <a
              href="#"
              style={{ color: "var(--text-color)", fontWeight: "500" }}
            >
              Home
            </a>
            <a href="#" style={{ color: "var(--text-secondary)" }}>
              Trending
            </a>
            <a href="#" style={{ color: "var(--text-secondary)" }}>
              Favorites
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
