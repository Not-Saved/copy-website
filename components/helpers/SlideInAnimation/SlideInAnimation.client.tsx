'use client'

import { HTMLMotionProps, Variants } from 'framer-motion'
import { Children, cloneElement, ReactElement, ReactNode } from 'react'

type Directions = 'up' | 'down' | 'left' | 'right'

type Props = {
    children: ReactNode
    direction: Directions
    as?: any
} & HTMLMotionProps<'div'>

export default function Client({ children, as, direction, ...rest }: Props) {
    const Wrapper = as || 'div'
    const getVariants = (direction: Directions) => {
        switch (direction) {
            case 'up':
                return fromDown
            case 'down':
                return fromUp
            case 'left':
                return fromRight
            case 'right':
                return fromLeft
        }
    }

    return (
        <Wrapper
            style={{
                overflow: 'hidden',
                width: 'fit-content',
                height: 'fit-content',
            }}
        >
            {Children.map(children, (child) => {
                return cloneElement(child as ReactElement<any>, {
                    variants: getVariants(direction),
                    ...rest,
                })
            })}
        </Wrapper>
    )
}

const fromDown: Variants = {
    initial: {
        translateY: '100%',
    },
    animate: {
        translateY: '0%',
    },
}
const fromUp: Variants = {
    initial: {
        translateY: '-100%',
    },
    animate: {
        translateY: '0%',
    },
}
const fromLeft: Variants = {
    initial: {
        translateX: '-100%',
    },
    animate: {
        translateX: '0%',
    },
}
const fromRight: Variants = {
    initial: {
        translateX: '100%',
    },
    animate: {
        translateX: '0%',
    },
}
