import type { ReactElement } from 'react'

import { VStack } from '@/shared/ui/Stack'

import { useFileUploaderContext } from '../../../../lib/hooks/useFileUploaderContext'
import type { FileItem } from '../../../../model/types/fileUploader'
import { FileUploaderFileItem } from '../FileUploaderFileItem/FileUploaderFileItem'
import { FileUploaderBaseComponent } from '../FileUploaderBaseComponent/FileUploaderBaseComponent'

interface FileUploaderFilesProps {
    className?: string
    children?: ((props: {
        files: FileItem[] | undefined
    }) => ReactElement)
}

export const FileUploaderFileList = (props: FileUploaderFilesProps) => {
    const { className, children } = props
    const { files } = useFileUploaderContext()

    const defaultComponent = (
        <VStack className={className} gap="8" maxWidth>
            {files?.map(({ id, ...other }) => (
                <FileUploaderFileItem key={`file-row-${id}`} id={id} {...other} />
            ))}
        </VStack>
    )

    return (
        <FileUploaderBaseComponent functionalProps={{ files }} component={defaultComponent}>
            {children}
        </FileUploaderBaseComponent>
    )
}
