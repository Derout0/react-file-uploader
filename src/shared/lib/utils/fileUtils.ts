type Unit = 'Bytes' | 'KiB' | 'MiB' | 'GiB' | 'TiB' | 'PiB' | 'EiB' | 'ZiB' | 'YiB' |
  'KB' | 'MB' | 'GB' | 'TB' | 'PB' | 'EB' | 'ZB' | 'YB'

export function convertBytes(bytes: number, options?: {
    useBinaryUnits?: boolean
    decimals?: number
    returnAsNumber?: true
    unit?: Unit
}): number

export function convertBytes(bytes: number, options?: {
    useBinaryUnits?: boolean
    decimals?: number
    returnAsNumber?: false
    unit?: Unit
}): string

export function convertBytes(
    bytes: number,
    options: { useBinaryUnits?: boolean, decimals?: number, returnAsNumber?: boolean, unit?: Unit } = {},
): string | number {
    const { useBinaryUnits = false, decimals = 2, returnAsNumber = false, unit } = options

    if (decimals < 0) {
        throw new Error(`Invalid decimals ${decimals}`)
    }

    const base = useBinaryUnits ? 1024 : 1000
    const units = useBinaryUnits
        ? ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
        : ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = unit ? units.indexOf(unit) : Math.floor(Math.log(bytes) / Math.log(base))
    const convertedValue = bytes / Math.pow(base, i)

    if (returnAsNumber) {
        return Number(convertedValue.toFixed(decimals)) // Возвращаем число
    }

    return `${convertedValue.toFixed(decimals)} ${units[i]}`
}

export const convertToBytes = (size: number, unit: 'KB' | 'MB' | 'GB' | 'TB' | 'PB' | 'EB' | 'ZB' | 'YB'): number => {
    const units = {
        bytes: 1,
        KB: 1024,
        MB: 1024 ** 2,
        GB: 1024 ** 3,
        TB: 1024 ** 4,
        PB: 1024 ** 5,
        EB: 1024 ** 6,
        ZB: 1024 ** 7,
        YB: 1024 ** 8,
    }

    return size * (units[unit] || 1)
}
