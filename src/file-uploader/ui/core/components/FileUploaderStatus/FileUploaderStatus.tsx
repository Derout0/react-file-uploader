import type { ReactElement } from 'react'

import { Text } from '@/shared/ui/Text/Text'

import { useFileUploaderContext } from '../../../../lib/hooks/useFileUploaderContext'
import { FileUploaderBaseComponent } from '../FileUploaderBaseComponent/FileUploaderBaseComponent'
import type { FileUploaderStatus } from '../../../../model/const/reducer'

interface FileUploaderStatusProps {
    className?: {
        wrapper?: string
        remainingText?: string
        totalText?: string
        successText?: string
    }
    children?: ((props: {
        total: number
        remaining: number
        status: FileUploaderStatus | null
    }) => ReactElement)
    visibility?: 'always' | 'uploading' | ((status: FileUploaderStatus | null) => boolean)
}

export const FileUploaderStatusInformation = (props: FileUploaderStatusProps) => {
    const { className, children, visibility = 'uploading' } = props
    const { files = [], status, uploadedCount } = useFileUploaderContext()

    const isVisible = () => {
        if (typeof visibility === 'function') return visibility(status)

        switch (visibility) {
            case 'always': return true
            case 'uploading': return status === 'PENDING' || status === 'UPLOADED'
            default: return true
        }
    }

    if (!isVisible()) return null

    const total = files?.length
    const remaining = uploadedCount

    const defaultComponent = (
        <Text className={className?.wrapper} sx={{ fontSize: 'body-m', fontWeight: '500' }}>
            Загружено
            <Text.SPAN className={className?.remainingText} sx={{ fontWeight: '600' }}>{` ${remaining} `}</Text.SPAN>
            /
            <Text.SPAN className={className?.totalText} sx={{ fontWeight: '600' }}>{` ${total}`}</Text.SPAN>
            {status === 'UPLOADED' && <Text.SPAN className={className?.successText}>. Все файлы загружены.</Text.SPAN>}
        </Text>
    )

    return (
        <FileUploaderBaseComponent functionalProps={{ total, remaining, status }} component={defaultComponent}>
            {children}
        </FileUploaderBaseComponent>
    )
}
