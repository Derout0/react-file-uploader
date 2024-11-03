import type webpack from 'webpack'
import type { BuildOptions } from './types/config'
import { buildDevServer, buildLoaders, buildPlugins, buildResolvers } from './builders/build'

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const { paths, mode, isDev } = options

    return {
        mode: mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
            publicPath: '/',
        },
        plugins: buildPlugins(options),
        resolve: buildResolvers(options),
        module: {
            rules: buildLoaders(options),
        },

        // Dev Server
        devServer: isDev ? buildDevServer(options) : undefined,
        devtool: isDev ? 'eval-cheap-module-source-map' : undefined,
    }
}
