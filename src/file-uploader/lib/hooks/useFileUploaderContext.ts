import { createContext, useContext } from 'react'
import type { FileUploaderReturned } from '../../model/types/fileUploader'

export const FileUploaderContext = createContext<FileUploaderReturned | undefined>(undefined)

export const useFileUploaderContext = () => {
    const context = useContext(FileUploaderContext)

    if (!context) {
        throw new Error('useFileUploaderContext must be used inside FileUploaderProvider')
    }

    return context
}
