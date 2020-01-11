import React from "react";
import "../styles/styles.css";

const Stats = ({ numberAlive }) => (
  <div className="stats-container">
    <div className="stats alive">
      Alive
      <p>{numberAlive}</p>
    </div>
  </div>
);

export default Stats;
