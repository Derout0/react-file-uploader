import type { ReactNode, RefObject } from 'react'

import type { MimeTypes } from '@/shared/consts/common'

import { useFileUploader } from '../../../lib/hooks/useFileUploader'
import { FileUploaderContext } from '../../../lib/hooks/useFileUploaderContext'

interface FileUploaderProviderProps {
    api: (arg: any) => Promise<any>
    options?: {
        allowedFileTypes?: MimeTypes[]
        maxFiles?: number
        minFiles?: number
        maxFileSize?: number
        maxTotalSize?: number
    }
    inputRef: RefObject<HTMLInputElement>
    children: ReactNode
}

export const FileUploaderProvider = (props: FileUploaderProviderProps) => {
    const {
        api,
        options,
        inputRef,
        children,
    } = props

    const state = useFileUploader({ api, inputRef, options })

    return (
        <FileUploaderContext.Provider value={state}>
            {children}
        </FileUploaderContext.Provider>
    )
}
