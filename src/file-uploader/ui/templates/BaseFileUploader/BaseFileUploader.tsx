import type { FileUploaderTemplate } from '../../core/FileUploader/FileUploader'
import { FileUploader } from '../../core/FileUploader/FileUploader'
import { BaseFileUploaderHeader } from './components/BaseFileUploaderHeader/BaseFileUploaderHeader'
import { BaseFileUploaderBody } from './components/BaseFileUploaderBody/BaseFileUploaderBody'
import { BaseFileUploaderFooter } from './components/BaseFileUploaderFooter/BaseFileUploaderFooter'

export const BaseFileUploader = (props: FileUploaderTemplate) => {
    const {
        className,
        api,
        options,
    } = props

    return (
        <FileUploader className={className} api={api} options={options}>
            <BaseFileUploaderHeader />
            <BaseFileUploaderBody />
            <BaseFileUploaderFooter />
        </FileUploader>
    )
}
