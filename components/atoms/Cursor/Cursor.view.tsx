'use client'

import type { MotionValue } from 'framer-motion'
import type { CSSProperties } from 'react'

import { m } from 'framer-motion'

type Props = {
    x: MotionValue<number>
    y: MotionValue<number>
}

export default function View({ x, y }: Props) {
    const cursorContainerStyles: CSSProperties = {
        pointerEvents: 'none',
        userSelect: 'none',
        width: 'fit-content',
        height: 'fit-content',
        transform: 'translate(-50%, -50%)',
    }

    return (
        <m.div style={{ x, y }}>
            <div style={cursorContainerStyles}>
                <div className="pointer-events-none h-10 w-10 rounded-full border-2 border-pink opacity-50" />
            </div>
        </m.div>
    )
}
