import * as cls from './FileUploaderError.module.scss'
import type { ReactElement, ReactNode } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/Text/Text'

import { useFileUploaderContext } from '../../../../lib/hooks/useFileUploaderContext'
import { FileUploaderBaseComponent } from '../FileUploaderBaseComponent/FileUploaderBaseComponent'

interface FileUploaderErrorProps {
    className?: string
    children?: ReactNode | ((props: {
        error: string | undefined
    }) => ReactElement)
}

export const FileUploaderError = (props: FileUploaderErrorProps) => {
    const { className, children } = props
    const { error } = useFileUploaderContext()

    const defaultComponent = (
        error ? <Text className={classNames(cls.FileUploaderError, {}, [className])} sx={{ color: 'on-error', fontSize: 'body-m' }} align="center">{error}</Text> : null
    )

    return (
        <FileUploaderBaseComponent props={{ error }} component={defaultComponent}>
            {children}
        </FileUploaderBaseComponent>
    )
}
