import type { MutableRefObject } from 'react'
import { useEffect } from 'react'

export const useAutofocus = (ref: MutableRefObject<any>, condition?: boolean | (() => boolean)) => {
    useEffect(() => {
        const shouldFocus = typeof condition === 'function' ? condition() : !!condition
        const element = ref.current

        if (!shouldFocus) return

        if (element) {
            element.focus()
        }
    }, [condition, ref])
}
