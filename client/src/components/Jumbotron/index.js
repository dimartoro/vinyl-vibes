import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 560, clear: "both", paddingTop: 120, textAlign: "center" }}
    >
      {children} {/* Render the children components or elements */}
    </div>
  );
}

export default Jumbotron;
