import * as cls from './BaseFileUploaderHeader.module.scss'
import { HStack } from '@/shared/ui/Stack'
import { FileUploader } from '../../../../core/FileUploader/FileUploader'

export const BaseFileUploaderHeader = () => {
    return (
        <HStack className={cls.BaseFileUploaderHeader} gap="20" align="center">
            <HStack gap="20" align="center">
                <HStack gap="20" align="center">
                    <FileUploader.UploadButton  />
                    <FileUploader.ResetButton />
                </HStack>
                <FileUploader.Status visibility="always" />
            </HStack>
            <HStack gap="20" flexGrow={1} justify="end" align="center">
                <HStack gap="8" align="center">
                    <FileUploader.Details />
                    <FileUploader.Details display="files-count" />
                </HStack>
                <HStack flex="0 0 20rem">
                    <FileUploader.Progressbar />
                </HStack>
            </HStack>
        </HStack>
    )
}
