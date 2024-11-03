import * as cls from './Ripple.module.scss'
import { classNames } from "@/shared/lib/classNames/classNames";

import type { ReactNode, ElementType, SyntheticEvent, ComponentPropsWithoutRef } from 'react'
import { useRef, useState } from 'react'
import { TransitionGroup } from 'react-transition-group'

import { RippleItem } from './RippleItem'


interface RippleProps<T extends ElementType = 'div'> {
    className?: string
    children?: ReactNode
    as?: T
    color?: string
    center?: boolean
    timeout?: { enter: number, exit: number }
}

type Props<T extends ElementType> = RippleProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof RippleProps<T>>

export const Ripple = <T extends ElementType = 'div'>(props: Props<T>) => {
    const {
        className,
        children,
        as: Component = 'div',
        color = '#eee',
        center,
        timeout = { enter: 500, exit: 500 },
        ...other
    } = props

    const elementRef = useRef<any | null>(null)
    const [ripples, setRipples] = useState<JSX.Element[]>([])
    const [nextKey, setNextKey] = useState<number>(0)
    const ignoreMouseDown = useRef(false)

    const startRipple = useRef<(() => void) | null>(null)
    const startTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

    const onMouseDown = (event: SyntheticEvent) => start(event)
    const onMouseUp = (event: SyntheticEvent) => stop(event)
    const onMouseLeave = (event: SyntheticEvent) => stop(event)
    const onTouchStart = (event: SyntheticEvent) => start(event)
    const onTouchEnd = (event: SyntheticEvent) => stop(event)
    const onTouchMove = (event: SyntheticEvent) => stop(event)

    const start = (event: SyntheticEvent) => {
        if (event.type === 'mousedown' && ignoreMouseDown.current) {
            ignoreMouseDown.current = false
            return
        }
        if (event.type === 'touchstart') {
            ignoreMouseDown.current = true
        }

        const rect = elementRef.current
            ? elementRef.current.getBoundingClientRect()
            : {
                width: 0,
                height: 0,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            }

        let rippleX, rippleY, rippleSize

        if (center
          || (event.nativeEvent instanceof MouseEvent && event.nativeEvent.clientX === 0 && event.nativeEvent.clientY === 0)
          || (
              (event.nativeEvent instanceof MouseEvent && !event.nativeEvent.clientX)
              && (event.nativeEvent instanceof TouchEvent && !event.nativeEvent.touches))
        ) {
            rippleX = Math.round(rect.width / 2)
            rippleY = Math.round(rect.height / 2)
        }
        else {
            let clientX = 0
            let clientY = 0
            if (event.nativeEvent instanceof MouseEvent) {
                clientX = event.nativeEvent.clientX
                clientY = event.nativeEvent.clientY
            }
            if (event.nativeEvent instanceof TouchEvent) {
                clientX = event.nativeEvent.touches[0].clientX
                clientY = event.nativeEvent.touches[0].clientY
            }

            rippleX = Math.round(clientX - rect.left)
            rippleY = Math.round(clientY - rect.top)
        }

        // Size
        if (center) {
            rippleSize = Math.sqrt((2 * Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) / 3)
        }
        else {
            const sizeX = Math.max(Math.abs((elementRef.current ? elementRef.current.clientWidth : 0) - rippleX), rippleX) * 2 + 2
            const sizeY = Math.max(Math.abs((elementRef.current ? elementRef.current.clientHeight : 0) - rippleY), rippleY) * 2 + 2
            rippleSize = Math.sqrt(Math.pow(sizeX, 2) + Math.pow(sizeY, 2))
        }

        // Mobile delay fix
        if (event.nativeEvent instanceof TouchEvent) {
            startRipple.current = () => createRipple(rippleX, rippleY, rippleSize, timeout)
            startTimeout.current = setTimeout(() => {
                startRipple.current && startRipple.current()
                startRipple.current = null
            }, 80)
        }
        else {
            createRipple(rippleX, rippleY, rippleSize, timeout)
        }
    }

    const stop = (event: SyntheticEvent) => {
        clearTimeout(startTimeout.current)

        if (event.nativeEvent instanceof TouchEvent && startRipple.current) {
            event.persist()
            startRipple.current()
            startRipple.current = null
            startTimeout.current = setTimeout(() => {
                stop(event)
            }, 0)
            return
        }

        startRipple.current = null

        if (ripples.length) {
            setRipples(ripples => ripples.slice(1))
        }
    }

    const createRipple = (rippleX: number, rippleY: number, rippleSize: number, timeout: { enter: number, exit: number }) => {
        const newRipple = (
            <RippleItem key={nextKey} rippleX={rippleX} rippleY={rippleY} rippleSize={rippleSize} color={color} timeout={timeout} />
        )

        setRipples(ripples => [...ripples, newRipple])
        setNextKey(key => key + 1)
    }

    return (
        <Component
            ref={elementRef}
            className={classNames(cls.Ripple, {}, [className])}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onTouchMove={onTouchMove}
            {...other}
        >
            {children}
            <TransitionGroup component="span" enter exit>
                {ripples}
            </TransitionGroup>
        </Component>
    )
}
