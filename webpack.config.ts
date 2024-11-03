import path from 'path'
import { buildWebpackConfig } from './config/build/buildWebpackConfig'
import type { BuildEnv, BuildPaths } from './config/build/types/config'

const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
}

export default (env: BuildEnv) => {
    const mode = env.mode || 'development'
    const PORT = env.port || 3000
    const isDev = mode === 'development'

    return buildWebpackConfig({
        mode: mode,
        paths: paths,
        isDev,
        isProd: !isDev,
        port: PORT,
    })
}
