import * as cls from './Dropzone.module.scss'
import type { ReactNode } from 'react'
import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import UploadFiles from '@/shared/assets/images/UploadFiles.svg?url'
import { AppImage } from '@/shared/ui/AppImage/AppImage'
import { Text } from '@/shared/ui/Text/Text'
import { VStack } from '@/shared/ui/Stack'
import { useDropzone } from '@/shared/lib/hooks/useDropzone/useDropzone'

interface DropzoneProps {
    className?: string
    children: ReactNode
    hasFiles?: boolean
    information?: { title?: string, description?: string | false }
    allowedFileTypes?: string[]
    onDrop: (files: File[] | null) => void
}

const Preview = ({ hasFiles, information }: { hasFiles: boolean, information: { title?: string, description?: string | false } }) => {
    if (hasFiles) return null

    return (
        <VStack gap="20" align="center">
            <AppImage width="68" src={UploadFiles} />
            <VStack gap="8" align="center">
                <Text.BodyL sx={{ fontWeight: '500' }} align="center">{information.title}</Text.BodyL>
                {information.description && <Text.BodyS sx={{ fontWeight: '500' }} align="center">{information.description}</Text.BodyS>}
            </VStack>
        </VStack>
    )
}

export const Dropzone = (props: DropzoneProps) => {
    const {
        className,
        children,
        allowedFileTypes = [],
        hasFiles = false,
        information = {},
        onDrop,
        ...other
    } = props

    const {
        title = 'Drag and Drop Files Here',
        description = allowedFileTypes.length > 0
            ? `Разрешенные типы: ${allowedFileTypes.join(', ')}`
            : undefined,
    } = information

    const [dragging, handlers] = useDropzone(onDrop)

    const mods: Mods = {
        [cls.dragging]: dragging,
    }

    return (
        <VStack className={classNames(cls.Dropzone, mods, [className])} gap="20" align="center" {...handlers} {...other}>
            <Preview hasFiles={hasFiles} information={{ title, description }} />
            {children}
        </VStack>
    )
}
