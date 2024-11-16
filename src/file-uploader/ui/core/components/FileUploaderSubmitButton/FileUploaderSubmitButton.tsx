import type { FormEvent, ReactElement, ReactNode } from 'react'

import { Button } from '@/shared/ui/Button/Button'

import { useFileUploaderContext } from '../../../../lib/hooks/useFileUploaderContext'
import { FileUploaderBaseComponent } from '../FileUploaderBaseComponent/FileUploaderBaseComponent'

interface FileUploaderSubmitButtonProps {
    className?: string
    children?: ReactNode | ((props: {
        onSubmit: (event: FormEvent<HTMLFormElement>) => void
    }) => ReactElement)
}

export const FileUploaderSubmitButton = (props: FileUploaderSubmitButtonProps) => {
    const { className, children } = props
    const { onSubmit } = useFileUploaderContext()

    const defaultComponent = (
        <Button className={className} type="submit" theme="filled" color="primary">Отправить файл(ы)</Button>
    )

    return (
        <FileUploaderBaseComponent
            functionalProps={{ onSubmit }}
            componentProps={{
                onClick: onSubmit,
            }}
            component={defaultComponent}
        >
            {children}
        </FileUploaderBaseComponent>
    )
}
