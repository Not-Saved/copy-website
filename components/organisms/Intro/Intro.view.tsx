'use client'

import SlideInAnimation from '@atoms/SlideInAnimation'
import LenisTitle from '@organisms/LenisTitle'
import { m, Variants } from 'framer-motion'

type Props = {
    visible: boolean
}

const variants: Variants = {
    initial: {
        clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 0 100%)',
    },
    animate: {
        clipPath: 'polygon(0 0, 100% 0%, 100% 0%, 0 0%)',
    },
}

export default function View({}: Props) {
    return (
        <div className="pointer-events-none fixed top-0 left-0 z-50 h-full w-full overflow-hidden">
            <m.div
                className="h-full w-full overflow-hidden bg-pink px-vw-13 py-vw-10"
                variants={variants}
                animate={'animate'}
                initial={'initial'}
                transition={{
                    duration: 1.5,
                    ease: [0.19, 1, 0.22, 1],
                    delay: 1.5,
                }}
            >
                {<LenisTitle color="black" />}
            </m.div>
        </div>
    )
}
