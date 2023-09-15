import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "5rem",
        height: "fit-content",
      }}
      data-testid="loader"
    >
      <Spinner
        animation="border"
        role="status"
        style={{
          height: "4rem",
          width: "4rem",
          margin: "1rem",
          color: "#1A4314",
        }}
      />
    </div>
  );
};

export default Loader;
