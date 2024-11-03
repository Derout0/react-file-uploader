import type { ReactElement, ReactNode } from 'react'

import { Text } from '@/shared/ui/Text/Text'

import { useFileUploaderContext } from '../../../../lib/hooks/useFileUploaderContext'
import { FileUploaderBaseComponent } from '../FileUploaderBaseComponent/FileUploaderBaseComponent'

interface FileUploaderDetailsProps {
    className?: {
        wrapper?: string
        currentValue?: string
    }
    children?: ReactNode | ((props: {
        maxFileSize: number
        minFiles: number
        maxFiles: number
        maxTotalSize: number
        allowedFileTypes: string[]
    }) => ReactElement)
    display?: 'file-size' | 'files-count'
}

export const FileUploaderDetails = (props: FileUploaderDetailsProps) => {
    const { className, children, display = 'file-size' } = props
    const { maxFileSize, minFiles, maxFiles, maxTotalSize, allowedFileTypes } = useFileUploaderContext()

    let defaultComponent

    switch (display) {
        case 'file-size':
            defaultComponent = (
                <Text className={className?.wrapper} sx={{ fontSize: 'body-m', fontWeight: '500' }}>
                    Макс. размер файла:
                    <Text.SPAN className={className?.currentValue} sx={{ fontWeight: '600' }}>{` ${maxFileSize} MB`}</Text.SPAN>
                </Text>
            )
            break
        case 'files-count':
            defaultComponent = (
                <Text className={className?.wrapper} sx={{ fontSize: 'body-m', fontWeight: '500' }}>
                    Макс. кол-во файлов:
                    <Text.SPAN className={className?.currentValue} sx={{ fontWeight: '600' }}>{` ${maxFiles} шт`}</Text.SPAN>
                </Text>
            )
    }

    return (
        <FileUploaderBaseComponent props={{ maxFiles, minFiles, maxFileSize, maxTotalSize, allowedFileTypes }} component={defaultComponent}>
            {children}
        </FileUploaderBaseComponent>
    )
}
