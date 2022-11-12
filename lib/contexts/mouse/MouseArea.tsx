import {
    CSSProperties,
    ReactNode,
    createContext,
    useRef,
    useContext,
    ComponentPropsWithoutRef,
} from 'react'
import { motionValue, MotionValue, useTransform } from 'framer-motion'
import { useMouseContext } from './MouseContext'
import { DefaultMovingCursor } from './DefaultMovingCursor'

type Context = {
    x: MotionValue<number>
    y: MotionValue<number>
    id: string
}

const Context = createContext<Context>({
    x: motionValue(0),
    y: motionValue(0),
    id: '',
})

export const useMouseAreaContext = () => useContext(Context)

type Props = {
    fixed?: boolean
    children?: ReactNode
    id: string
} & ComponentPropsWithoutRef<'div'>

export const MouseArea = ({ fixed, children, id, style, ...rest }: Props) => {
    const areaRef = useRef<HTMLDivElement>(null)
    const { x, y } = useMouseContext()

    const areaY = useTransform(y, (val) => {
        if (areaRef.current && !fixed) {
            const top = areaRef.current.getBoundingClientRect().top
            return val - top
        } else {
            return val
        }
    })

    const areaX = useTransform(x, (val) => {
        if (areaRef.current && !fixed) {
            const left = areaRef.current.getBoundingClientRect().left
            return val - left
        } else {
            return val
        }
    })

    const areaStyles: CSSProperties = {
        pointerEvents: 'none',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
        position: fixed ? 'fixed' : 'absolute',
    }

    return (
        <Context.Provider value={{ x: areaX, y: areaY, id }}>
            <div
                ref={areaRef}
                style={{ ...style, ...areaStyles }}
                id="mouse-pointer-area"
                {...rest}
            >
                {children ? children : <DefaultMovingCursor />}
            </div>
        </Context.Provider>
    )
}
