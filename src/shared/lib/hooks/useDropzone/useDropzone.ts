import type { DragEvent, DragEventHandler } from 'react'
import { useMemo } from 'react'
import { useRef } from 'react'
import { useState } from 'react'

interface Handlers {
    onDragEnter: DragEventHandler
    onDragLeave: DragEventHandler
    onDrop: DragEventHandler
}

export const useDropzone = (onDrop: (files: File[] | null) => void): [boolean, Handlers] => {
    const [dragging, setDragging] = useState<boolean>(false)
    const counter = useRef<number>(0)

    const handlers = useMemo(() => ({
        onDragEnter(event: DragEvent) {
            event.preventDefault()
            counter.current++
            setDragging(true)
        },
        onDragOver(event: DragEvent) {
            event.preventDefault()
        },
        onDragLeave(event: DragEvent) {
            event.preventDefault()
            counter.current--
            if (counter.current === 0) {
                setDragging(false)
            }
        },
        onDrop(event: DragEvent) {
            event.preventDefault()
            counter.current = 0
            setDragging(false)
            const files = Array.from(event?.dataTransfer?.files ?? [])
            if (files.length === 0) {
                onDrop(null)
                return
            }
            onDrop(files)
        },
    }), [onDrop])

    return [dragging, handlers]
}
