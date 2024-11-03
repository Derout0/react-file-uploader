import type { ReactNode } from 'react'
import { useFileUploaderContext } from '../../../../lib/hooks/useFileUploaderContext'

export const FileUploaderForm = ({ className, children }: { className?: string, children: ReactNode }) => {
    const { onSubmit } = useFileUploaderContext()

    return (
        <form className={className} onSubmit={onSubmit}>
            {children}
        </form>
    )
}
