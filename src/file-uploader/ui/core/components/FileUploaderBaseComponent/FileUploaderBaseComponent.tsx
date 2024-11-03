import type { ReactElement, ReactNode } from 'react'
import { isChildrenFunction } from '@/shared/lib/utils/reactUtils'

interface FileUploaderBaseComponentProps<T> {
    children?: ((props: T) => ReactNode) | ReactNode
    props: T
    component?: ReactElement | null
    wrapper?: (content: ReactNode) => ReactElement
}

export const FileUploaderBaseComponent = <T = unknown>({ children, props, component, wrapper }: FileUploaderBaseComponentProps<T>) => {
    if (isChildrenFunction(children)) {
        return children(props)
    }

    const content = children || component

    return wrapper ? wrapper(content) : content
}
