import { MutableRefObject } from "react";
import { useMotionValue, useAnimationFrame } from "framer-motion";
import { useMeasureElement } from "./useMeasureElement";
import { useScrollContext } from "./ScrollContext";

type Options = {
	startAt?: "top" | "bottom";
	endAt?: "top" | "bottom";
	overflow?: boolean;
	calcMode?: "frameByFrame" | "onResize";
};

export function useScrollProgress(ref: MutableRefObject<HTMLElement | SVGElement | null>, options: Options = {}) {
	const { startAt = "top", endAt = "top", overflow = false, calcMode = "onResize" } = options;
	const measures = useMeasureElement(ref);
	const progress = useMotionValue(0);

	const { scrollY } = useScrollContext();

	useAnimationFrame(() => {
		let base = scrollY.get() - measures.current.documentTop;
		let height = measures.current.height;
		let value = 0;

		if (ref.current && calcMode === "frameByFrame") {
			const rect = ref.current.getBoundingClientRect();
			base = -rect.top;
			height = rect.height;
		}

		if (startAt === "top" && endAt === "top") {
			value = base / height;
		} else if (startAt === "top" && endAt === "bottom") {
			value = base / (height - window.innerHeight);
		} else if (startAt === "bottom" && endAt === "top") {
			value = (base + window.innerHeight) / (height + window.innerHeight);
		} else {
			value = (base + window.innerHeight) / height;
		}

		if (!overflow) {
			if (value <= 0) progress.set(0);
			else if (value >= 1) progress.set(1);
			else progress.set(value);
		} else {
			progress.set(value);
		}
	});

	return progress;
}
