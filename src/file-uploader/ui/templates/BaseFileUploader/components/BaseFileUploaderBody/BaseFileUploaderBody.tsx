import * as cls from './BaseFileUploaderBody.module.scss'
import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import { LinearProgress } from '@/shared/ui/Progressbar'
import { FileUploader } from '../../../../core/FileUploader/FileUploader'
import { useFileUploaderDetails } from '../../../../../lib/hooks/useFileUploaderDetails'

export const BaseFileUploaderBody = () => {
    const { uploading } = useFileUploaderDetails()

    const mods: Mods = {
        [cls.uploading]: uploading,
    }

    return (
        <div className={classNames(cls.BaseFileUploaderBody, mods)}>
            <FileUploader.Dropzone className={cls.dropzone}>
                <FileUploader.FileList />
            </FileUploader.Dropzone>
            <FileUploader.Error />
            <LinearProgress className={cls.loader} />
        </div>
    )
}
