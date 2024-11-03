export type Mods = Record<string, boolean | string | undefined>

export function classNames(cls: string, mods: Mods = {}, additional: Array<string | undefined> = []): string {
    const modifierClasses = Object
        .entries(mods)
        .filter(([, value]) => Boolean(value))
        .map(([cls]) => cls)

    return [cls, ...modifierClasses, ...additional.filter(Boolean)].join(' ')
}
