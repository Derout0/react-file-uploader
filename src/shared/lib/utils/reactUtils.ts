import type { ReactNode } from 'react'

export function isChildrenFunction<T = any>(
    children: ((props: T) => ReactNode) | ReactNode,
): children is (props: T) => ReactNode {
    return typeof children === 'function'
}
