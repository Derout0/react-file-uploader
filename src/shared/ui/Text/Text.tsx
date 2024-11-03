import * as cls from './Text.module.scss'
import { classNames, type Mods } from '@/shared/lib/classNames/classNames'
import { createElement, type ReactNode } from 'react'

import type { TextTheme } from './types'
import {
    type TextColor,
    type TextFontWeight,
    type TextLineHeight,
    type TextSize,
    type TextType,
    type TextAlign,
} from './types'

type TextBlankProps = Omit<TextProps, 'theme' | 'as'>

interface TextSX {
    fontSize?: TextSize
    lineHeight?: TextLineHeight
    fontWeight?: TextFontWeight
    color?: TextColor
}

interface TextProps {
    className?: string
    children?: ReactNode
    sx?: TextSX
    theme?: TextTheme
    as?: TextType
    align?: TextAlign
    noWrap?: boolean
}

export const Text = (props: TextProps) => {
    const {
        className,
        children,
        theme,
        sx = {},
        as = 'div',
        align,
        noWrap,
    } = props

    const {
        fontSize,
        lineHeight,
        fontWeight,
        color,
    } = sx

    const additional: string[] = [
        className,
        (fontSize && cls[fontSize]),
        (lineHeight && cls[lineHeight]),
        (fontWeight && [cls[`fw-${fontWeight}`]]),
        (theme && [cls[`theme-${theme}`]]),
        (color && [cls[color]]),
        (align && cls[align]),
    ]

    const mods: Mods = {
        [cls.noWrap]: noWrap,
    }

    return createElement(as, { className: classNames(cls.Text, mods, additional) }, children)
}

// Ready-made themes
Text.DisplayH1 = (props: TextBlankProps) => <Text {...props} as="h1" theme="display-l" />
Text.DisplayH2 = (props: TextBlankProps) => <Text {...props} as="h2" theme="display-m" />
Text.DisplayH3 = (props: TextBlankProps) => <Text {...props} as="h3" theme="display-s" />

Text.HeadlineH1 = (props: TextBlankProps) => <Text {...props} as="h1" theme="headline-l" />
Text.HeadlineH2 = (props: TextBlankProps) => <Text {...props} as="h2" theme="headline-m" />
Text.HeadlineH3 = (props: TextBlankProps) => <Text {...props} as="h3" theme="headline-s" />

Text.TitleH1 = (props: TextBlankProps) => <Text {...props} as="h1" theme="title-l" />
Text.TitleH2 = (props: TextBlankProps) => <Text {...props} as="h2" theme="title-m" />
Text.TitleH3 = (props: TextBlankProps) => <Text {...props} as="h3" theme="title-s" />

Text.LabelL = (props: TextBlankProps) => <Text {...props} as="label" theme="label-l" />
Text.LabelM = (props: TextBlankProps) => <Text {...props} as="label" theme="label-m" />
Text.LabelS = (props: TextBlankProps) => <Text {...props} as="label" theme="label-s" />

Text.BodyL = (props: TextBlankProps) => <Text {...props} as="p" theme="body-l" />
Text.BodyM = (props: TextBlankProps) => <Text {...props} as="p" theme="body-m" />
Text.BodyS = (props: TextBlankProps) => <Text {...props} as="p" theme="body-s" />

// Default
Text.H1 = (props: TextBlankProps) => <Text {...props} as="h1" />
Text.H2 = (props: TextBlankProps) => <Text {...props} as="h2" />
Text.H3 = (props: TextBlankProps) => <Text {...props} as="h3" />
Text.H4 = (props: TextBlankProps) => <Text {...props} as="h4" />
Text.H5 = (props: TextBlankProps) => <Text {...props} as="h5" />
Text.H6 = (props: TextBlankProps) => <Text {...props} as="h6" />
Text.SPAN = (props: TextBlankProps) => <Text {...props} as="span" />
Text.P = (props: TextBlankProps) => <Text {...props} as="p" />
Text.Label = (props: TextBlankProps) => <Text {...props} as="label" />
