import * as cls from './Icon.module.scss'
import type { CSSProperties, FC, SVGProps } from 'react'
import { memo, useMemo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'

type IconSize = 'small' | 'medium' | 'large'

interface IconProps extends SVGProps<SVGSVGElement> {
    className?: string
    size?: IconSize
    width?: string
    height?: string
    SVG: FC<SVGProps<SVGSVGElement>>
}

export const Icon = memo((props: IconProps) => {
    const {
        className,
        SVG,
        size,
        width,
        height,
        ...restProps
    } = props

    const style: CSSProperties = useMemo(() => {
        return {
            width,
            height,
            flexBasis: width,
        }
    }, [width, height])

    const additional: string[] = [
        className,
        (size && !width && !height ? cls[size] : null),
    ]

    return (
        <SVG className={classNames(cls.Icon, {}, additional)} style={{ ...style }} {...restProps} />
    )
})
