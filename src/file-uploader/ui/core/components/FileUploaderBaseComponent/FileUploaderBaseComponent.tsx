import type { ReactElement, ReactNode } from 'react'
import { isValidElement } from 'react'
import { cloneElement } from 'react'
import { isChildrenFunction } from '@/shared/lib/utils/reactUtils'

interface FileUploaderBaseComponentProps<T, K extends keyof JSX.IntrinsicElements> {
    children?: ((props: T) => ReactNode) | ReactNode
    functionalProps: T
    componentProps?: Partial<Record<keyof JSX.IntrinsicElements[K], any>>
    component?: ReactElement | null
    wrapper?: (content: ReactNode) => ReactElement
}

export const FileUploaderBaseComponent = <T = unknown, K extends keyof JSX.IntrinsicElements = 'div'>({
    children,
    functionalProps,
    componentProps,
    component,
    wrapper,
}: FileUploaderBaseComponentProps<T, K>) => {
    let content: ReactNode = component

    if (isChildrenFunction(children)) {
        return children(functionalProps)
    }

    if (isValidElement(children)) {
        content = cloneElement(children, componentProps)
    } else if (typeof children === 'string' || typeof children === 'number') {
        content = children
    }

    return wrapper ? wrapper(content) : content
}
