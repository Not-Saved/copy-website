'use client'

import clsx from 'clsx'
import { m, Transition, Variant, Variants } from 'framer-motion'
import Link from 'next/link'

type Props = {
    color?: 'white' | 'pink'
}

const MLink = m(Link)

export default function View({ color = 'pink' }: Props) {
    const backgroundOneClassName = color === 'white' ? 'bg-white' : 'bg-pink'
    const backgroundTwoClassName = color === 'white' ? 'bg-pink' : 'bg-white'

    const transition: Transition = {
        duration: 0.6,
        ease: [0.19, 1, 0.22, 1],
    }

    const enterTransition: Transition = {
        duration: 1.85,
        ease: [0.19, 1, 0.22, 1],
        delay: 1.5,
    }

    return (
        <MLink
            href="/"
            className={clsx(
                'relative flex justify-center p-0.5',
                backgroundOneClassName
            )}
            initial="initial"
            whileHover="hover"
            animate="animate"
            variants={containerVariants}
            transition={enterTransition}
        >
            <m.span className="relative z-10 h-16 w-16 bg-black md:h-vw-16 md:w-vw-16"></m.span>
            <m.span className="relative z-10 m-auto flex-1 px-4">
                <m.span
                    className="m-auto block w-fit"
                    variants={textVariants('normal')}
                    transition={transition}
                >
                    <span className="text-md font-bold uppercase md:text-vw-18">
                        Check it out on github
                    </span>
                </m.span>
                <m.span
                    aria-hidden
                    className="absolute top-0 left-0 m-auto block w-full text-center"
                    variants={textVariants('reverse')}
                    transition={transition}
                >
                    <span className="text-md font-bold uppercase md:text-vw-18">
                        Check it out on github
                    </span>
                </m.span>
            </m.span>
            <m.span
                className={clsx(
                    'absolute top-0 left-0 h-full w-full',
                    backgroundTwoClassName
                )}
                variants={backgroundVariants}
                transition={transition}
            />
        </MLink>
    )
}

const containerVariants: Variants = {
    initial: {
        translateY: '100%',
        opacity: 0,
    },
    animate: {
        translateY: '0%',
        opacity: 1,
    },
}

const backgroundVariants: Variants = {
    hover: {
        scaleY: 1,
        transformOrigin: 'bottom',
    },
    initial: {
        scaleY: 0,
        transformOrigin: 'top',
    },
}

const textVariants = (type: 'normal' | 'reverse') => {
    const show: Variant = {
        scaleY: 1,
        opacity: 1,
        transformOrigin: 'bottom',
    }

    const hide = {
        scaleY: 0,
        opacity: 0,
        transformOrigin: 'top',
    }

    return {
        initial: type === 'normal' ? show : hide,
        hover: type === 'normal' ? hide : show,
    } as Variants
}
