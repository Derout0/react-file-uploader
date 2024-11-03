import type { ChangeEvent, ReactElement, ReactNode, RefObject } from 'react'

import UploadIcon from '@/shared/assets/icons/Upload.svg'
import { IconButton } from '@/shared/ui/IconButton/IconButton'
import { Icon } from '@/shared/ui/Icon/Icon'
import { UploadButton } from '@/shared/ui/UploadButton/UploadButton'

import { useFileUploaderContext } from '../../../../lib/hooks/useFileUploaderContext'
import { FileUploaderBaseComponent } from '../FileUploaderBaseComponent/FileUploaderBaseComponent'

interface FileUploaderUploadButtonProps {
    className?: string
    children?: ReactNode | ((props: {
        onChange: (arg: ChangeEvent<HTMLInputElement> | File[]) => void
        onUploadButtonClick: () => void
        allowedFileTypes: string[]
        inputRef: RefObject<HTMLInputElement>
    }) => ReactElement)
}

export const FileUploaderUploadButton = (props: FileUploaderUploadButtonProps) => {
    const { className, children } = props
    const { onChange, allowedFileTypes, inputRef, multiple } = useFileUploaderContext()

    const onUploadButtonClick = () => {
        inputRef.current?.click()
    }

    const defaultComponent = (
        <IconButton className={className} theme="tonal">
            <Icon SVG={UploadIcon} />
        </IconButton>
    )

    return (
        <FileUploaderBaseComponent
            props={{ onChange, onUploadButtonClick, inputRef, allowedFileTypes }}
            component={defaultComponent}
            wrapper={content => (
                <UploadButton
                    accept={allowedFileTypes}
                    inputRef={inputRef}
                    multiple={multiple}
                    onChange={onChange}
                >
                    {content}
                </UploadButton>
            )}
        >
            {children}
        </FileUploaderBaseComponent>
    )
}
