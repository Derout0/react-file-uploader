import '@/styles/index.scss'
import { createRoot } from 'react-dom/client'
import {BaseFileUploader, FileUploader} from "@/file-uploader";

const rootElement = document.getElementById('root') as HTMLElement
const root = createRoot(rootElement)

const api = {
    api({ timeout = 1000 }) {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve()
            }, timeout)
        })
    },
}

root.render(
    <div className='App'>
        <BaseFileUploader className='BaseFileUploader' api={() => api.api({ timeout: 1000 })} />
    </div>
)
