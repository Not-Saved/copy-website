'use client'

import { useScrollContext } from '@lib/contexts/Scroll'

import View from './ScrollProgressBar.view'

export default function Client() {
    const { scrollYProgress } = useScrollContext()

    return <View progress={scrollYProgress} />
}
