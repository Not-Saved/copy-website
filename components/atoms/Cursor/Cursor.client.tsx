'use client'

import { useMouseAreaContext } from '@lib/contexts/mouse'
import { useSpring } from 'framer-motion'
import View from './Cursor.view'

const springOptions = { stiffness: 410, damping: 40, mass: 1.1 }

export default function Client() {
    const { x, y } = useMouseAreaContext()
    const xSpring = useSpring(x, springOptions)
    const ySpring = useSpring(y, springOptions)

    return <View x={xSpring} y={ySpring} />
}
