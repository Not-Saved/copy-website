import { useMotionValue, useTransform } from 'framer-motion'
import { MutableRefObject, useEffect, useRef } from 'react'
import { useMouseContext } from './MouseContext'

export function useMouseDistance(
    ref: MutableRefObject<HTMLElement | SVGElement | null>
) {
    const { x: mouseX, y: mouseY } = useMouseContext()
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const inView = useRef(false)

    useEffect(() => {
        if (ref.current) {
            const target = ref.current
            return mouseX.onChange((l) => {
                if (inView.current) {
                    const { x: tX, width } = target.getBoundingClientRect()
                    x.set(l - tX - width / 2)
                }
            })
        }
    }, [mouseX, x, ref])

    useEffect(() => {
        if (ref.current) {
            const target = ref.current
            return mouseY.onChange((l) => {
                if (inView.current) {
                    const { y: tY, height } = target.getBoundingClientRect()
                    y.set(l - tY - height / 2)
                }
            })
        }
    }, [mouseY, y, ref])

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.0,
        }
        if (ref.current) {
            let observer = new IntersectionObserver((entries) => {
                for (const entry of entries) {
                    inView.current = entry.intersectionRatio > 0
                }
            }, options)
            observer.observe(ref.current)
            return () => observer.disconnect()
        }
    }, [ref])

    return { x, y }
}
