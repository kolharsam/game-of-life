import React, { useState, useEffect, memo } from "react";
import ReactDOM from "react-dom";

import Conway from "./components/Conway";
import "./styles/styles.css";

const changeFPS = prevVal => {
	const changeFPSTo = prompt("Change FPS to?");
	if (changeFPSTo === null) {
		return prevVal;
	}
	return parseInt(changeFPSTo, 10);
};

const Index = memo(() => {
	const [fps, updateFPS] = useState(10);

	useEffect(() => {
		document.title = `Game of Life @ ${fps} FPS`;
	}, [fps]);

	return (
		<div
			className="container"
			onDoubleClick={() => {
				const newfps = changeFPS(fps);
				updateFPS(newfps);
			}}
		>
			<Conway rows={35} cols={85} fps={fps} />
		</div>
	);
});

const rootElement = document.getElementById("root");
ReactDOM.render(<Index />, rootElement);
