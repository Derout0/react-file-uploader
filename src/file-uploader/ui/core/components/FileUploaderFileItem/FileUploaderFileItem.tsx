import * as cls from './FileUploaderFileItem.module.scss'
import type { ReactElement, ReactNode } from 'react'
import { useCallback } from 'react'

import { convertBytes } from '@/shared/lib/utils/fileUtils'
import { classNames, type Mods } from '@/shared/lib/classNames/classNames'
import TrashIcon from '@/shared/assets/icons/Trash.svg'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'
import { AppImage } from '@/shared/ui/AppImage/AppImage'
import { IconButton } from '@/shared/ui/IconButton/IconButton'
import { Icon } from '@/shared/ui/Icon/Icon'
import { LinearProgress } from '@/shared/ui/Progressbar'

import { useFileUploaderContext } from '../../../../lib/hooks/useFileUploaderContext'
import { FileUploaderBaseComponent } from '../FileUploaderBaseComponent/FileUploaderBaseComponent'

interface FileUploaderFileItemProps {
    className?: string
    id: string | number
    src: string
    file: File
    children?: ReactNode | ((props: {
        isFileUploaded: boolean
        isFileUploading: boolean
        onRemoveFile: (fileId: string | number) => void
    }) => ReactElement)
}

const Caption = ({ children, label }: { children: ReactNode, label: string }) => (
    <VStack gap="4">
        <Text.SPAN sx={{ fontSize: 'body-s' }}>{label}</Text.SPAN>
        <Text.SPAN sx={{ fontSize: 'body-m', fontWeight: '500', color: 'on-surface' }}>{children}</Text.SPAN>
    </VStack>
)

const UploadedInfo = ({ uploading, uploaded }: { uploading: boolean, uploaded: boolean }) => {
    const getStatusText = () => {
        if (uploading) return 'Загрузка...'
        if (uploaded) return 'Завершено'
        return 'В ожидании'
    }

    return (
        <Text.SPAN
            className={cls.uploadedInfo}
            sx={{ fontWeight: '500', fontSize: 'body-s', color: 'on-tertiary' }}
        >
            {getStatusText()}
        </Text.SPAN>
    )
}

export const FileUploaderFileItem = (props: FileUploaderFileItemProps) => {
    const {
        className,
        children,
        id,
        src,
        file,
    } = props

    const { uploaded, onRemoveFile, next } = useFileUploaderContext()

    const isUploaded = !!uploaded[id]
    const isUploading = !!(next && next.id === id)

    const onRemove = useCallback(() => {
        onRemoveFile(id)
    }, [id, onRemoveFile])

    const mods: Mods = {
        [cls.uploading]: isUploading,
        [cls.uploaded]: isUploaded,
    }

    const defaultComponent = (
        <VStack className={classNames(cls.FileUploaderFileItem, mods, [className])}>
            <HStack gap="20" align="center">
                <HStack gap="20" align="center" flexGrow={1}>
                    <AppImage className={cls.image} src={src} alt={file.name} />
                    <HStack gap="20" align="center">
                        <Caption label="File name">{file.name}</Caption>
                        <Caption label="File size">{convertBytes(file.size, { unit: 'MB' })}</Caption>
                        <UploadedInfo uploading={isUploading} uploaded={isUploaded} />
                    </HStack>
                </HStack>
                <HStack>
                    {!isUploaded && (
                        <IconButton theme="outlined" onClick={onRemove}>
                            <Icon SVG={TrashIcon} />
                        </IconButton>
                    )}
                </HStack>
            </HStack>
            <LinearProgress className={cls.progressbar} />
        </VStack>
    )

    return (
        <FileUploaderBaseComponent
            props={{
                isFileUploaded: isUploaded,
                isFileUploading: isUploading,
                onRemoveFile: onRemove,
            }}
            component={defaultComponent}
        >
            {children}
        </FileUploaderBaseComponent>
    )
}
