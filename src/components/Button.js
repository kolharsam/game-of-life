import React, { memo } from "react";
import "../styles/styles.css";

const Button = memo(({ name, alt, imgsrc, onClick, isDisabled, flip }) => (
  <button
    className="button"
    onClick={e => onClick(e)}
    disabled={flip ? !isDisabled : isDisabled}
  >
    <span className="button content">
      <img src={imgsrc} alt={alt} />
      {name}
    </span>
  </button>
));

export default Button;
