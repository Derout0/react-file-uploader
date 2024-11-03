import * as cls from './HiddenInput.module.scss'
import type { InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'

export const HiddenInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    (props, ref) => {
        return (
            <input ref={ref} className={cls.HiddenInput} {...props} />
        )
    },
)
