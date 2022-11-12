import { CSSProperties } from "react";
import { m } from "framer-motion";

import { useMouseAreaContext } from "./MouseArea";
import { useMouseAreaState } from "./useMouseAreaState";

export const DefaultMovingCursor = () => {
	const { x, y } = useMouseAreaContext();
	const state = useMouseAreaState<number>(50);

	const cursorContainerStyles: CSSProperties = {
		pointerEvents: "none",
		userSelect: "none",
		width: "fit-content",
		height: "fit-content",
		transform: "translate(-50%, -50%)",
	};

	return (
		<div style={cursorContainerStyles}>
			<m.svg style={{ x, y }} height={100} width={100} viewBox="0 0 200 200">
				<m.clipPath id="my-path" style={{ x, y }}>
					<m.circle r={200} animate={{ r: state }} transition={{ duration: 0.3 }} />
				</m.clipPath>
			</m.svg>
		</div>
	);
};
