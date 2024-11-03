import type { ReactNode } from 'react'
import { useRef } from 'react'

import type { MimeTypes } from '@/shared/consts/common'

import { FileUploaderProvider } from '../FileUploaderProvider/FileUploaderProvider'
import {
    FileUploaderDetails,
    FileUploaderDropzone,
    FileUploaderError,
    FileUploaderFileItem,
    FileUploaderFileList, FileUploaderForm,
    FileUploaderProgressbar,
    FileUploaderResetButton,
    FileUploaderStatusInformation,
    FileUploaderSubmitButton,
    FileUploaderUploadButton,
} from '../components'

export type FileUploaderTemplate = Omit<FileUploaderProps, 'children'>

interface FileUploaderProps {
    className?: string
    children: ReactNode
    api: (file: File) => Promise<any>
    options?: {
        multiple?: boolean
        allowedFileTypes?: MimeTypes[]
        maxFiles?: number
        minFiles?: number
        maxFileSize?: number
        maxTotalSize?: number
    }
}

export const FileUploader = (props: FileUploaderProps) => {
    const {
        className,
        children,
        api,
        options,
    } = props

    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <FileUploaderProvider api={api} options={options} inputRef={inputRef}>
            <FileUploaderForm className={className}>
                {children}
            </FileUploaderForm>
        </FileUploaderProvider>
    )
}

FileUploader.ResetButton = FileUploaderResetButton
FileUploader.SubmitButton = FileUploaderSubmitButton
FileUploader.UploadButton = FileUploaderUploadButton
FileUploader.Status = FileUploaderStatusInformation
FileUploader.Details = FileUploaderDetails
FileUploader.Progressbar = FileUploaderProgressbar
FileUploader.Dropzone = FileUploaderDropzone
FileUploader.FileList = FileUploaderFileList
FileUploader.FileItem = FileUploaderFileItem
FileUploader.Error = FileUploaderError
