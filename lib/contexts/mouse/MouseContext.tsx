import { createContext, ReactNode, useCallback, useContext, useLayoutEffect } from "react";
import { MotionValue, motionValue, useMotionValue } from "framer-motion";
import { MOUSE_AREA_MESSAGE_EVENT } from "./constants";

type Context = {
	x: MotionValue<number>;
	y: MotionValue<number>;
	setMouseSubscriberState: (mouseAreaId: string, payload: any) => void;
};

const Context = createContext<Context>({
	x: motionValue(0),
	y: motionValue(0),
	setMouseSubscriberState: () => null,
});

export const useMouseContext = () => useContext(Context);

type Props = {
	children?: ReactNode;
};

export function MouseProvider({ children }: Props) {
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	useLayoutEffect(() => {
		function handleMouseMove(e: MouseEvent) {
			x.set(e.clientX);
			y.set(e.clientY);
		}
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [x, y]);

	const setMouseSubscriberState = useCallback((mouseAreaId: string, payload: any) => {
		window.dispatchEvent(new CustomEvent(MOUSE_AREA_MESSAGE_EVENT, { detail: { id: mouseAreaId, payload } }));
	}, []);

	return <Context.Provider value={{ x, y, setMouseSubscriberState }}>{children}</Context.Provider>;
}
