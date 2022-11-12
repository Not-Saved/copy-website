'use client'

import { useScrollContext } from '@lib/contexts/Scroll/ScrollContext'
import { useEffect, useState } from 'react'

import View from './Intro.view'

export default function Client() {
    const { setOverflowHidden } = useScrollContext()
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        if (visible) {
            setOverflowHidden(true)
        } else {
            setOverflowHidden(false)
        }
    }, [visible, setOverflowHidden])

    useEffect(() => {
        setTimeout(() => setVisible(false), 3000)
    }, [])

    return <View visible={visible} />
}
