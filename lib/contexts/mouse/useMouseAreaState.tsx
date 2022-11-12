import { useEffect, useState } from "react";
import { MOUSE_AREA_MESSAGE_EVENT } from "./constants";
import { useMouseAreaContext } from "./MouseArea";

export function useMouseAreaState<T>(initialValue: T) {
	const { id } = useMouseAreaContext();
	const [state, setState] = useState<T>(initialValue);

	useEffect(() => {
		function handleMouseMessage(e: CustomEvent) {
			if (e.detail.id === id) {
				setState(e.detail.payload);
			}
		}

		window.addEventListener(MOUSE_AREA_MESSAGE_EVENT, handleMouseMessage as EventListener);
		return () => window.removeEventListener(MOUSE_AREA_MESSAGE_EVENT, handleMouseMessage as EventListener);
	}, [id]);

	return state;
}
