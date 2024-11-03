import type { ChangeEvent, HTMLAttributes, ReactElement, ReactNode, RefObject } from 'react'
import { isValidElement } from 'react'
import { cloneElement } from 'react'
import { HiddenInput } from '@/shared/ui/Input'

interface UploadButtonProps extends HTMLAttributes<HTMLInputElement> {
    children: ReactNode
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    multiple?: boolean
    accept?: string[]
    inputRef: RefObject<HTMLInputElement>
}

export const UploadButton = (props: UploadButtonProps) => {
    const {
        children,
        onChange,
        multiple,
        accept,
        inputRef,
        ...other
    } = props

    const handleClick = () => {
        inputRef?.current?.click()
    }

    const mimeTypes = accept?.map(type => type.toString()).join(', ')

    return (
        <>
            {
                isValidElement(children)
                    ? cloneElement(children as ReactElement, { onClick: handleClick })
                    : <button type="button" onClick={handleClick}>{children}</button>
            }
            <HiddenInput ref={inputRef} onChange={onChange} type="file" accept={mimeTypes} multiple={multiple} {...other} />
        </>
    )
}
