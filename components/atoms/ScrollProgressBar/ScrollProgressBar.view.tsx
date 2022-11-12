'use client'

import { m, MotionValue } from 'framer-motion'

type Props = {
    progress: MotionValue<number>
}

export default function View({ progress }: Props) {
    return (
        <m.div
            style={{ scaleX: progress }}
            className="fixed top-0 z-10 h-vw-1 w-full origin-left bg-pink"
        />
    )
}
