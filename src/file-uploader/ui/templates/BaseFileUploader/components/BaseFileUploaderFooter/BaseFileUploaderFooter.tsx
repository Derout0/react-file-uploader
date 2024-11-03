import * as cls from './BaseFileUploaderFooter.module.scss'
import { HStack } from '@/shared/ui/Stack'
import { FileUploader } from '../../../../core/FileUploader/FileUploader'

export const BaseFileUploaderFooter = () => {
    return (
        <HStack className={cls.BaseFileUploaderFooter} gap="20" justify="center" align="center">
            <FileUploader.SubmitButton />
        </HStack>
    )
}
