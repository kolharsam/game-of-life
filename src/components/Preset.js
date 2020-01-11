import React, { memo } from "react";
import { STARTERS } from "./constants/starters.constants";
import "../styles/styles.css";

const Preset = memo(({ presetName, onClick }) => {
  const currentData = STARTERS.filter(
    starter => starter.name === presetName
  )[0];

  return (
    <div className="preset-tab" onClick={e => onClick(e, currentData.data)}>
      Load {presetName}
    </div>
  );
});

export default Preset;
