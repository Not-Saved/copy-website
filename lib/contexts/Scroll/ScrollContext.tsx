'use client'

import Lenis from '@studio-freight/lenis'
import {
    MotionValue,
    motionValue,
    useMotionValue,
    useAnimationFrame,
} from 'framer-motion'

import {
    createContext,
    MutableRefObject,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
} from 'react'

type Context = {
    scrollY: MotionValue<number>
    scrollYProgress: MotionValue<number>
    lenis: MutableRefObject<Lenis | null>
    setOverflowHidden: (hidden: boolean) => void
}

const Context = createContext<Context>({
    scrollY: motionValue(0),
    scrollYProgress: motionValue(0),
    lenis: { current: null },
    setOverflowHidden: () => null,
})

type LenisOptions = {
    duration?: number
    easing?: (t: number) => number
    smooth?: boolean
    mouseMultiplier?: number
    smoothTouch?: boolean
    touchMultiplier?: number
    direction?: 'vertical' | 'horizontal'
    gestureDirection?: 'both' | 'vertical' | 'horizontal'
    infinite?: boolean
    wrapper?: HTMLElement | Window
    content?: HTMLElement
}

const defaultOptions: LenisOptions = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: 'vertical', // vertical, horizontal
    gestureDirection: 'vertical', // vertical, horizontal, both
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
}

type ScrollProviderProps = {
    children?: ReactNode
    as?: any
    lenisOptions?: LenisOptions
    withScrollContainer?: boolean
}

export function ScrollProvider({
    children,
    as,
    lenisOptions,
    withScrollContainer,
}: ScrollProviderProps) {
    const Wrapper = as || 'div'
    const scrollY = useMotionValue(0)
    const scrollYProgress = useMotionValue(0)

    const wrapperRef = useRef<HTMLElement>(null)
    const contentRef = useRef(null)

    const lenis = useRef<Lenis | null>(null)

    useEffect(() => {
        lenis.current = new Lenis({
            ...defaultOptions,
            content:
                contentRef.current && withScrollContainer
                    ? contentRef.current
                    : undefined,
            wrapper:
                wrapperRef.current && withScrollContainer
                    ? wrapperRef.current
                    : undefined,
            ...lenisOptions,
        })
    }, [lenisOptions, withScrollContainer])

    useLayoutEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            window.dispatchEvent(new CustomEvent('scroll-wrapper-resized'))
        })
        if (wrapperRef.current) {
            resizeObserver.observe(wrapperRef.current)
            return () => resizeObserver.disconnect()
        }
    }, [])

    const setOverflowHidden = useCallback(
        (hidden: boolean) => {
            if (hidden) {
                lenis.current?.stop()
                if (!lenis.current) {
                    setTimeout(() => lenis.current?.stop(), 10)
                }

                if (wrapperRef.current && withScrollContainer) {
                    wrapperRef.current.style.overflowY = 'hidden'
                } else {
                    document.body.style.overflowY = 'hidden'
                }
            } else {
                lenis.current?.start()
                if (!lenis.current) {
                    setTimeout(() => lenis.current?.start(), 10)
                }

                if (wrapperRef.current && withScrollContainer) {
                    wrapperRef.current.style.overflowY = 'scroll'
                } else {
                    document.body.style.overflowY = 'scroll'
                }
            }
        },
        [withScrollContainer]
    )

    useAnimationFrame((time) => {
        if (lenis.current) {
            lenis.current.raf(time)
            scrollYProgress.set(
                lenis.current.scroll /
                    (lenis.current.contentHeight - lenis.current.wrapperHeight)
            )
            scrollY.set(lenis.current.scroll)
        }
    })

    return (
        <Context.Provider
            value={{
                scrollY,
                scrollYProgress,
                lenis: lenis,
                setOverflowHidden,
            }}
        >
            <Wrapper
                ref={wrapperRef}
                style={
                    withScrollContainer
                        ? { maxHeight: '100vh', overflowY: 'scroll' }
                        : undefined
                }
            >
                <div ref={contentRef}>{children}</div>
            </Wrapper>
        </Context.Provider>
    )
}

export const useScrollContext = () => useContext(Context)
