'use client'

import type { ReactNode } from 'react'

import { LazyMotion, domAnimation } from 'framer-motion'

import { ScrollProvider } from '@lib/contexts/Scroll'
import { MouseArea, MouseProvider } from '@lib/contexts/mouse'

import Cursor from '@atoms/Cursor'

export default function Contexts({ children }: { children: ReactNode }) {
    return (
        <LazyMotion features={domAnimation}>
            <MouseProvider>
                <ScrollProvider as="main">
                    {children}
                    <MouseArea fixed id="general-mouse-area">
                        <Cursor />
                    </MouseArea>
                </ScrollProvider>
            </MouseProvider>
        </LazyMotion>
    )
}
