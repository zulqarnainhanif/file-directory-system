import React from "react";

import "./index.css";

const Dialog = (props) => {
  const { title, contents, handleClose } = props;

  return (
    <div className="Dialog-model" onClick={handleClose}>
      <div
        className="Dialog-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="Dialog-title">{title}</div>
        <div className="Dialog-body">{contents}</div>
      </div>
    </div>
  );
};

export default Dialog;
