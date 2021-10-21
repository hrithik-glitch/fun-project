import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
	const boxSpeed = 100;
	const boxAmount = 10; // per row column
	const colorSmooth = 1; // adjust this for color density btw frames
	const box = { r: 16, g: 0, b: 43 };
	const [boxes, setBoxes] = useState([box]);
	const [ifIncrement, setIfIncrement] = useState();

	useEffect(() => {
		const aniMath = (box) => {
			let r = box.r,
				g = box.g,
				b = box.b,
				lighter = {
					r: r + colorSmooth,
					g: g + colorSmooth,
					b: b + colorSmooth,
				},
				darker = { r: r - colorSmooth, g: g - colorSmooth, b: b - colorSmooth };

			if (ifIncrement) {
				if (r < 255 && g < 255 && b < 255) {
					return lighter;
				} else {
					setIfIncrement(false);
					return darker;
				}
			} else {
				if (r > 0 && g > 0 && b > 0) {
					return darker;
				} else {
					setIfIncrement(true);
					return lighter;
				}
			}
		};
		const interval = setInterval(() => {
			// copy current state
			let copiedBoxes = [...boxes];
			// remove boxes id neccessary
			while (copiedBoxes.length >= Math.pow(boxAmount, 2)) {
				copiedBoxes.shift();
			}
			// add a box to current state
			const nextBox = aniMath(copiedBoxes[copiedBoxes.length - 1]);
			copiedBoxes.push(nextBox);
			// save it
			setBoxes(copiedBoxes);
		}, boxSpeed);

		return () => {
			clearInterval(interval);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [boxes]);

	return (
		<div className="App">
			{boxes.map((box, i) => (
				<div
					key={i}
					className="box"
					style={{
						width: `${100 / boxAmount}vw`,
						height: `${100 / boxAmount}vh`,
						backgroundColor: `rgb(${box.r}, ${box.g}, ${box.b})`,
					}}
				/>
			))}
		</div>
	);
}

export default App;
