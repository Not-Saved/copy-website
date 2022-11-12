'use client'

import { m, Transition } from 'framer-motion'
import Letter from './_partials/Letter'

export type Props = {
    color: 'pink' | 'black'
}

export default function View({ color = 'black' }: Props) {
    const fillClassName = color === 'pink' ? 'fill-pink' : 'fill-black'

    const bottomLettersTransition: Transition = {
        duration: 1.5,
        ease: [0.19, 1, 0.22, 1],
        delay: 1.5,
    }

    return (
        <div className="relative w-full min-w-full">
            <m.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1360 336"
                className="w-full"
            >
                <g className={fillClassName}>
                    <Letter letter="L" index={0} />
                    <Letter letter="N" index={1} />
                    <Letter letter="S" index={2} />
                </g>
            </m.svg>
            <m.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1360 336"
                className="absolute top-0 w-full"
                initial={{ translateY: '100%' }}
                animate={{ translateY: '0%' }}
                transition={bottomLettersTransition}
            >
                <g className={fillClassName}>
                    <Letter letter="E" index={3} />
                    <Letter letter="I" index={4} />
                </g>
            </m.svg>
        </div>
    )
}
