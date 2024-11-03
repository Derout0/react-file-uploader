import type { ChangeEvent, FormEvent } from 'react'
import { useEffect } from 'react'
import { useCallback, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { convertToBytes } from '@/shared/lib/utils/fileUtils'
import { MimeTypes } from '@/shared/consts/common'

import { calculateUploadedSize, clearInput, useDisable } from '../../lib/utils/utils'
import { MAX_FILE_SIZE_MB, MAX_FILES, MAX_TOTAL_SIZE_MB, MIN_FILES } from '../../model/const/default'
import { FileUploaderAction, FileUploaderStatus } from '../../model/const/reducer'
import type {
    FileAction,
    FileUploaderProps,
    FileUploaderReturned,
    FileUploaderState,
    RequiredOptions,
} from '../../model/types/fileUploader'

const initialState: FileUploaderState = {
    files: [],
    newFiles: [],
    pending: [],
    status: null,
    next: null,
    uploading: false,
    uploaded: {},
    uploadedSize: 0,
    uploadedCount: 0,
    error: undefined,
}

const reducer = (state: FileUploaderState = initialState, action: FileAction): FileUploaderState => {
    switch (action.type) {
        case FileUploaderAction.LOAD:
            return {
                ...state,
                status: FileUploaderStatus.LOADED,
                files: action.files,
                newFiles: action.files,
                uploadedCount: 0,
            }

        case FileUploaderAction.SUBMIT:
            return {
                ...state,
                status: FileUploaderStatus.INIT,
                uploading: true,
                pending: state.newFiles,
                error: undefined,
                uploadedCount: 0,
            }

        case FileUploaderAction.NEXT:
            return { ...state, status: FileUploaderStatus.PENDING, next: action.next }

        case FileUploaderAction.REMOVE_FILE:
            return {
                ...state,
                status: state.files ? FileUploaderStatus.LOADED : null,
                files: state.files?.filter(file => file.id !== action.fileId),
                newFiles: state.newFiles?.filter(file => file.id !== action.fileId),
                error: undefined,
            }

        case FileUploaderAction.REMOVE_FILES:
            return {
                ...state,
                status: null,
                files: [],
                newFiles: [],
                error: undefined,
                uploadedCount: 0,
            }

        case FileUploaderAction.FILE_UPLOADED:
            if (action.prev) {
                return {
                    ...state,
                    next: null,
                    pending: action.pending,
                    uploaded: { ...state.uploaded, [action.prev.id]: action.prev.file },
                    uploadedCount: Math.abs((action.pending?.length || 0) - (state.files?.length || 0)),
                }
            }

            return { ...state, next: null, pending: action.pending }

        case FileUploaderAction.FILES_UPLOADED:
            return { ...state, status: FileUploaderStatus.UPLOADED, uploading: false, newFiles: [] }

        case FileUploaderAction.UPDATE_UPLOADED_SIZE: {
            let uploadedSize = 0

            if (state.newFiles) {
                uploadedSize = calculateUploadedSize(state.newFiles)
            }

            return { ...state, uploadedSize }
        }

        case FileUploaderAction.SET_ERROR:
            return { ...state, status: FileUploaderStatus.ERROR, error: action.error }

        case FileUploaderAction.RESET_ERROR:
            return { ...state, status: state.files ? FileUploaderStatus.LOADED : null, error: undefined }

        default: return state
    }
}

export const useFileUploader = (props: FileUploaderProps): FileUploaderReturned => {
    const {
        api,
        inputRef,
        options = {},
    } = props

    const defaultOptions: RequiredOptions = {
        multiple: false,
        minFiles: MIN_FILES,
        maxFiles: MAX_FILES,
        maxFileSize: MAX_FILE_SIZE_MB,
        maxTotalSize: MAX_TOTAL_SIZE_MB,
        allowedFileTypes: [MimeTypes.PNG, MimeTypes.JPEG],
    }

    const calculatedTotalSize = options.maxTotalSize || ((options.maxFiles ?? MAX_FILES) * (options.maxFileSize ?? MAX_FILE_SIZE_MB))

    const resolvedOptions: RequiredOptions = {
        ...defaultOptions,
        ...(Object.fromEntries(Object.entries(options).filter(([_, value]) => value !== undefined))),
        maxTotalSize: calculatedTotalSize,
    }

    const {
        minFiles,
        maxFiles,
        maxFileSize,
        maxTotalSize,
        allowedFileTypes,
    } = resolvedOptions

    const maxFileSizeBytes = convertToBytes(maxFileSize, 'MB')
    const maxTotalSizeBytes = convertToBytes(maxTotalSize, 'MB')

    const [state, dispatch] = useReducer(reducer, initialState)
    const disableOnExecution = useDisable(state.uploading)

    const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if ((state.newFiles?.length || 0) < minFiles) {
            dispatch({
                type: FileUploaderAction.SET_ERROR,
                error: `Необходимо загрузить как минимум ${minFiles} файл(ов).`,
            })
            return
        }

        if (state.newFiles?.length) dispatch({ type: FileUploaderAction.SUBMIT })
    }, [minFiles, state.newFiles?.length])

    const onChange = useCallback((arg: ChangeEvent<HTMLInputElement> | File[]) => {
        const fileList = Array.isArray(arg) ? arg : Array.from(arg.target.files || [])
        let totalSize = convertToBytes(state.uploadedSize, 'MB')

        const validFiles = []

        for (const file of fileList) {
            if (file.size > maxFileSizeBytes) {
                dispatch({
                    type: FileUploaderAction.SET_ERROR,
                    error: `Файл ${file.name} превышает максимальный размер ${MAX_FILE_SIZE_MB} MB.`,
                })
                continue
            }

            if (!allowedFileTypes.includes(file.type as MimeTypes)) {
                dispatch({
                    type: FileUploaderAction.SET_ERROR,
                    error: `Тип файла ${file.name} не допустим.`,
                })
                continue
            }

            totalSize += file.size
            if (totalSize > maxTotalSizeBytes) {
                dispatch({
                    type: FileUploaderAction.SET_ERROR,
                    error: `Общий размер файлов превышает максимальный лимит ${calculatedTotalSize} MB.`,
                })
                return
            }

            dispatch({ type: FileUploaderAction.RESET_ERROR })
            validFiles.push(file)
        }

        if (maxFiles && validFiles.length + (state.newFiles?.length || 0) > maxFiles) {
            dispatch({
                type: FileUploaderAction.SET_ERROR,
                error: `Не может быть загружено более ${maxFiles} файла(ов).`,
            })
            return
        }

        if (validFiles.length) {
            const filesArray = Array.from(validFiles)

            const files = filesArray
                .filter(file => !state.newFiles?.some(existing => existing.file.name === file.name))
                .map((file) => {
                    const src = window.URL.createObjectURL(file)
                    const id = uuidv4()

                    return { file, id, src }
                })

            const updatedFiles = [...(state.newFiles || []), ...files]

            dispatch({ type: FileUploaderAction.LOAD, files: updatedFiles })
            dispatch({ type: FileUploaderAction.UPDATE_UPLOADED_SIZE })
        }
    }, [allowedFileTypes, calculatedTotalSize, maxFileSizeBytes, maxFiles, maxTotalSizeBytes, state.files?.length, state.newFiles, state.uploadedSize])

    const onRemoveFile = useCallback((fileId: string | number) => {
        if (state.uploading) return

        dispatch({ type: FileUploaderAction.REMOVE_FILE, fileId })
        dispatch({ type: FileUploaderAction.UPDATE_UPLOADED_SIZE })
        clearInput(inputRef)
    }, [inputRef, state.uploading])

    const onRemoveFiles = useCallback(() => {
        dispatch({ type: FileUploaderAction.REMOVE_FILES })
        dispatch({ type: FileUploaderAction.UPDATE_UPLOADED_SIZE })
        clearInput(inputRef)
    }, [inputRef])

    useEffect(() => {
        if (state.pending?.length && state.next === null) {
            const next = state.pending[0]
            dispatch({ type: FileUploaderAction.NEXT, next })
        }
    }, [state.next, state.pending])

    // API call, file sending
    useEffect(() => {
        if (state.pending?.length && state.next) {
            const { next } = state

            api(next.file)
                .then(() => {
                    const prev = next
                    const pending = state.pending?.slice(1)
                    dispatch({ type: FileUploaderAction.FILE_UPLOADED, prev, pending })
                })
                .catch((error) => {
                    dispatch({ type: FileUploaderAction.SET_ERROR, error })
                })
        }
    }, [state, api])

    // End of processing
    useEffect(() => {
        if (!state.pending?.length && state.uploading) {
            dispatch({ type: FileUploaderAction.FILES_UPLOADED })
            dispatch({ type: FileUploaderAction.UPDATE_UPLOADED_SIZE })
        }
    }, [state.pending?.length, state.uploading])

    const onSafeSubmit = disableOnExecution(onSubmit)
    const onSafeChange = disableOnExecution(onChange)
    const onSafeRemoveFile = disableOnExecution(onRemoveFile)
    const onSafeRemoveFiles = disableOnExecution(onRemoveFiles)

    return {
        ...state,
        ...resolvedOptions,
        onSubmit: onSafeSubmit,
        onChange: onSafeChange,
        onRemoveFile: onSafeRemoveFile,
        onRemoveFiles: onSafeRemoveFiles,
        inputRef,
    }
}
