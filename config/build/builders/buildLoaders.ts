import type webpack from 'webpack'
import type { BuildOptions } from '../types/config'

import { buildCssLoader } from '../loaders/buildCssLoader'
import { buildSvgLoader } from '../loaders/buildSvgLoader'
import { buildFileLoader } from '../loaders/buildFileLoader'
import { buildBabelLoader } from '../loaders/buildBabelLoader'

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const cssLoader = buildCssLoader(options)
    const svgLoader = buildSvgLoader()
    const fileLoader = buildFileLoader()
    const babelLoader = buildBabelLoader()

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    return [
        svgLoader,
        fileLoader,
        babelLoader,
        typescriptLoader,
        cssLoader,
    ]
}
