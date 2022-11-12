import { MutableRefObject, useLayoutEffect, useRef } from 'react'
import { useScrollContext } from './ScrollContext'

type Measures = {
    documentTop: number
    documentBottom: number
    height: number
    width: number
}

const defaultMeasures: Measures = {
    documentTop: 0,
    documentBottom: 0,
    height: 0,
    width: 0,
}

export function useMeasureElement(
    ref: MutableRefObject<HTMLElement | SVGElement | null>
) {
    const { scrollY } = useScrollContext()
    const measures = useRef<Measures>(defaultMeasures)

    useLayoutEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                measures.current = getMeasures(entry.target, scrollY.get())
            }
        })

        function handleScrollWrapperResize() {
            if (ref.current) {
                measures.current = getMeasures(ref.current, scrollY.get())
            }
        }

        if (ref.current) {
            handleScrollWrapperResize()

            resizeObserver.observe(ref.current)
            window.addEventListener(
                'scroll-wrapper-resize',
                handleScrollWrapperResize
            )

            return () => {
                resizeObserver.disconnect()
                window.removeEventListener(
                    'scroll-wrapper-resize',
                    handleScrollWrapperResize
                )
            }
        }
    }, [scrollY, ref])

    return measures
}

function getMeasures(
    target: HTMLElement | SVGElement | Element,
    scrollY: number
) {
    const rect = target.getBoundingClientRect()
    const documentTop = scrollY + rect.top
    const height = rect.height
    const documentBottom = documentTop + height
    return {
        documentTop,
        documentBottom,
        width: rect.width,
        height: rect.height,
    }
}
