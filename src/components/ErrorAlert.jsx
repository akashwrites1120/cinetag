import React from "react";

const ErrorAlert = ({ error, searchTerm }) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        border: "1px solid rgba(239, 68, 68, 0.2)",
        color: "#FCA5A5",
        padding: "1rem",
        borderRadius: "var(--radius)",
        marginBottom: "2rem",
        textAlign: "center",
      }}
    >
      <strong>Oh snap!</strong> '{searchTerm}' resulted in '{error}' error
    </div>
  );
};

export default ErrorAlert;
