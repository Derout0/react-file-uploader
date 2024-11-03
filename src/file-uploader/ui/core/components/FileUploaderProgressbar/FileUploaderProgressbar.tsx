import type { ReactElement, ReactNode } from 'react'

import type { LinearProgressSize } from '@/shared/ui/Progressbar/LinearProgress/LinearProgress'
import { LinearProgress } from '@/shared/ui/Progressbar/LinearProgress/LinearProgress'

import { useFileUploaderContext } from '../../../../lib/hooks/useFileUploaderContext'
import { FileUploaderBaseComponent } from '../FileUploaderBaseComponent/FileUploaderBaseComponent'

interface FileUploaderProgressbarProps {
    className?: string
    children?: ReactNode | ((props: {
        uploadedSize: number
        maxTotalSize: number
    }) => ReactElement)
    size?: LinearProgressSize
    label?: {
        progress?: boolean
        total?: boolean
    }
}

export const FileUploaderProgressbar = (props: FileUploaderProgressbarProps) => {
    const {
        className,
        children,
        size = 'large',
        label: { progress = true, total = true } = {},
    } = props

    const { uploadedSize, maxTotalSize } = useFileUploaderContext()

    const defaultComponent = (
        <LinearProgress
            className={className}
            size={size}
            progress={{ value: uploadedSize, symbol: 'MB', label: progress }}
            total={{ value: maxTotalSize, symbol: 'MB', label: total }}
        />
    )

    return (
        <FileUploaderBaseComponent props={{ uploadedSize, maxTotalSize }} component={defaultComponent}>
            {children}
        </FileUploaderBaseComponent>
    )
}
