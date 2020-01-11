import React from "react";
import { CONTROL_BUTTONS } from "./constants/controls.constants";
import Button from "./Button";

import "../styles/styles.css";

const Controls = props => {
  const { onClickHandlers, isAnimating } = props;

  return (
    <div className="controls-container">
      {CONTROL_BUTTONS.map((controlbtn, index) => (
        <Button
          key={controlbtn.name}
          name={controlbtn.name}
          alt={controlbtn.alt}
          imgsrc={controlbtn.imgsrc}
          onClick={onClickHandlers[index]}
          isDisabled={isAnimating}
          flip={controlbtn.hasOwnProperty("flip")}
        />
      ))}
    </div>
  );
};

export default Controls;
