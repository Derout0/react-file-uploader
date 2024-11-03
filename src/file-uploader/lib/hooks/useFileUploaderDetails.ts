import { useFileUploaderContext } from './useFileUploaderContext'

export const useFileUploaderDetails = () => {
    const {
        status,
        uploading,
        uploaded,
        uploadedCount,
        uploadedSize,
        error,
    } = useFileUploaderContext()

    return {
        status,
        uploading,
        uploaded,
        uploadedCount,
        uploadedSize,
        error,
    }
}
