import React, { memo } from "react";
export const Cell = memo(({ onClick, isAlive, pos }) => (
  <div
    onClick={e => onClick(e, pos)}
    className={`cell ${isAlive ? "alive" : "dead"}`}
  />
));
