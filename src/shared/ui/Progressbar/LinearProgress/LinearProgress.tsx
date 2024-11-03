import * as cls from './LinearProgress.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'

export type LinearProgressSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large'

interface ProgressInfo {
    value?: number
    symbol?: string
    label?: boolean
}

interface LinearProgressProps {
    className?: string
    size?: LinearProgressSize
    progress?: ProgressInfo
    total?: ProgressInfo
}

const IndeterminateBar = () => (
    <div className={cls.inner}>
        <span className={`${cls.linearBar} ${cls.indeterminateBar1}`}></span>
        <span className={`${cls.linearBar} ${cls.indeterminateBar2}`}></span>
    </div>
)

const LabelBar = (props: { progress: ProgressInfo, total: ProgressInfo }) => {
    const {
        progress: { value: currentValue = 0, symbol: currentSymbol = '%', label: currentLabel },
        total: { value: totalValue = 100, symbol: totalSymbol = '%', label: totalLabel },
    } = props

    const percentage = (currentValue / totalValue) * 100

    return (
        <HStack gap="8" align="center">
            <HStack gap="4" align="center">
                {currentLabel && <Text.SPAN sx={{ fontSize: 'body-m', fontWeight: '500' }}>{`${currentValue} ${currentSymbol}`}</Text.SPAN>}
                {currentLabel && totalLabel && '/'}
                {totalLabel && <Text.SPAN sx={{ fontSize: 'body-m', fontWeight: '500' }}>{`${totalValue} ${totalSymbol}`}</Text.SPAN>}
            </HStack>
            <HStack flexGrow={1} className={cls.inner}>
                <span className={cls.linearBar} style={{ width: `${percentage}%` }}></span>
            </HStack>
        </HStack>

    )
}

export const LinearProgress = (props: LinearProgressProps) => {
    const {
        className,
        size,
        progress = { value: undefined, symbol: '%' },
        total = { value: undefined, symbol: '%' },
    } = props

    let Bar = <IndeterminateBar />

    if (progress.value !== undefined) {
        Bar = <LabelBar progress={progress} total={total} />
    }

    const additional: string[] = [
        className,
        (size && cls[size]),
    ]

    return (
        <div className={classNames(cls.LinearProgress, {}, additional)}>
            {Bar}
        </div>
    )
}
