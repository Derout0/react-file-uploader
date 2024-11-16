import type { ReactElement, ReactNode } from 'react'

import { Dropzone } from '@/shared/ui/Dropzone/Dropzone'

import { useFileUploaderContext } from '../../../../lib/hooks/useFileUploaderContext'
import { FileUploaderBaseComponent } from '../FileUploaderBaseComponent/FileUploaderBaseComponent'

interface FileUploaderDropzoneProps {
    className?: string
    children?: ReactNode | ((props: {
        allowedFileTypes: string[]
        onDrop: (files: File[] | null) => void
    }) => ReactElement)
    information?: { title?: string, description?: string | false }
}

export const FileUploaderDropzone = (props: FileUploaderDropzoneProps) => {
    const { className, children, information } = props
    const { allowedFileTypes, files, onChange } = useFileUploaderContext()

    const hasFiles = !!files?.length

    const onDrop = (files: File[] | null) => {
        files && onChange(files)
    }

    return (
        <FileUploaderBaseComponent
            functionalProps={{ allowedFileTypes, onDrop }}
            wrapper={content => (
                <Dropzone
                    className={className}
                    information={information}
                    hasFiles={hasFiles}
                    onDrop={onDrop}
                    allowedFileTypes={allowedFileTypes}
                >
                    {content}
                </Dropzone>
            )}
        >
            {children}
        </FileUploaderBaseComponent>
    )
}
