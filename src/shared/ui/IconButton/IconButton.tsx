import * as cls from './IconButton.module.scss'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Ripple } from '@/shared/ui/Ripple/Ripple'

type ButtonTheme = 'standard' | 'filled' | 'tonal' | 'outlined'
type ButtonSize = 'small' | 'medium' | 'large'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    children: ReactNode
    theme?: ButtonTheme
    size?: ButtonSize
    disabled?: boolean
}

export const IconButton = (props: IconButtonProps) => {
    const {
        className,
        children,
        type = 'button',
        theme = 'standard',
        size,
        disabled,
        ...other
    } = props

    const additional: string[] = [
        className,
        (theme && cls[theme]),
        (size && cls[size]),
    ]

    const mods: Mods = {
        [cls.disabled]: disabled,
    }

    return (
        <Ripple className={classNames(cls.IconButton, mods, additional)} as="button" type={type} center {...other}>
            {children}
        </Ripple>
    )
}
