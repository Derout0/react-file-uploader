import type { ReactElement, ReactNode } from 'react'

import TrashIcon from '@/shared/assets/icons/Trash.svg'
import { IconButton } from '@/shared/ui/IconButton/IconButton'
import { Icon } from '@/shared/ui/Icon/Icon'

import { useFileUploaderContext } from '../../../../lib/hooks/useFileUploaderContext'
import { FileUploaderBaseComponent } from '../FileUploaderBaseComponent/FileUploaderBaseComponent'

interface FileUploaderResetButtonProps {
    className?: string
    children?: ReactNode | ((props: { onRemoveFiles: () => void }) => ReactElement)
}

export const FileUploaderResetButton = (props: FileUploaderResetButtonProps) => {
    const { className, children } = props

    const { onRemoveFiles } = useFileUploaderContext()
    const defaultComponent = (
        <IconButton className={className} onClick={onRemoveFiles} theme="tonal">
            <Icon SVG={TrashIcon} />
        </IconButton>
    )

    return (
        <FileUploaderBaseComponent functionalProps={{ onRemoveFiles }} component={defaultComponent}>
            {children}
        </FileUploaderBaseComponent>
    )
}
