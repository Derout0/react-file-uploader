import type { ChangeEvent, FormEvent, RefObject } from 'react'
import type { FileUploaderAction, FileUploaderStatus } from '../../model/const/reducer'

export interface FileItem {
    id: string | number
    src: string
    file: File
}

export interface FileAction {
    type: FileUploaderAction
    files?: FileItem[]
    pending?: FileItem[]
    next?: FileItem | null
    prev?: { id: string | number, file: File }
    uploadedSize?: number
    fileId?: string | number
    error?: string
}

export interface RequiredOptions {
    multiple: boolean
    minFiles: number
    maxFiles: number
    maxFileSize: number
    maxTotalSize: number
    allowedFileTypes: string[]
}

export type FileUploaderOptions = Partial<RequiredOptions>

export interface FileUploaderProps {
    api: (file: File) => Promise<any>
    inputRef: RefObject<HTMLInputElement>
    options?: FileUploaderOptions
}

export interface FileUploaderState {
    files?: FileItem[]
    newFiles?: FileItem[]
    pending?: FileItem[]
    status: FileUploaderStatus | null
    next?: FileItem | null
    uploading: boolean
    uploaded: Record<string, any>
    uploadedSize: number
    uploadedCount: number
    error?: string
}

export interface FileUploaderReturned extends FileUploaderState {
    multiple: boolean
    minFiles: number
    maxFiles: number
    maxFileSize: number
    maxTotalSize: number
    allowedFileTypes: string[]
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
    onChange: (arg: ChangeEvent<HTMLInputElement> | File[]) => void
    onRemoveFile: (fileId: string | number) => void
    onRemoveFiles: () => void
    inputRef: RefObject<HTMLInputElement>
}
