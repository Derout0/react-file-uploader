import type { RefObject } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export function useHover<T extends HTMLElement = HTMLElement>(ref: RefObject<T>) {
    const [isHover, setIsHover] = useState(false)

    const onMouseEnter = () => {
        setIsHover(true)
    }

    const onMouseLeave = () => {
        setIsHover(false)
    }

    useEffect(() => {
        const element = ref.current

        if (element) {
            element.addEventListener('mouseover', onMouseEnter)
            element.addEventListener('mouseout', onMouseLeave)

            return () => {
                element.removeEventListener('mouseover', onMouseEnter)
                element.removeEventListener('mouseout', onMouseLeave)
            }
        }
    }, [ref])

    return { isHover, setIsHover }
}
