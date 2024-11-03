import type { RefObject } from 'react'
import { convertBytes } from '@/shared/lib/utils/fileUtils'
import type { FileItem } from '../../model/types/fileUploader'

export const clearInput = (ref: RefObject<HTMLInputElement>) => {
    if (ref.current) {
        ref.current.value = ''
    }
}

export const calculateUploadedSize = (files: FileItem[] | undefined) => {
    return convertBytes((files || []).reduce((total, current) => total + current.file.size, 0),
        { returnAsNumber: true, unit: 'MB' },
    )
}

export const useDisable = (uploading: boolean) => {
    return (callback: (...args: any[]) => void) => {
        return (...args: any[]) => {
            if (uploading) {
                return
            }
            return callback(...args)
        }
    }
}
