const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const pkg = require('./package.json')

const APP_NAME = pkg.name
const APP_VERSION = pkg.version
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 9080
const {
    BUILD_ENV = 'production',
    NODE_ENV,
} = process.env
const SRC = path.resolve(__dirname, 'src')
const DIST = path.resolve(__dirname, 'build/public')
const NODE_MODULES = path.resolve(__dirname, 'node_modules')
const EXTERNALS = path.resolve(__dirname, 'externals')
const STORAGE = path.resolve(__dirname, '__storage__')

const EXCLUDE_DEFAULT = [NODE_MODULES, EXTERNALS, STORAGE]
const MODE = NODE_ENV !== 'development' ? 'production' : 'development'

const config = {
    mode: MODE,
    resolve: {
        extensions: ['.ts', '.tsx', '.json', '.js'],
    },
    output: {
        path: DIST,
        publicPath: '/',
    },
    devtool: 'source-map',
    performance: {
        maxEntrypointSize: MODE === 'production' ? 1000000 : 5000000,
        maxAssetSize: MODE === 'production' ? 1000000 : 5000000,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                include: SRC,
                exclude: EXCLUDE_DEFAULT,
                use: (() => {
                    if (MODE === 'development') {
                        return [
                            'style-loader',
                            'css-loader',
                            'sass-loader',
                        ]
                    }

                    return [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ]
                })(),
            },
            {
                test: /\.m?js$/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.tsx?$/,
                include: SRC,
                exclude: EXCLUDE_DEFAULT,
                use: {
                    loader: 'ts-loader',
                },
            },
        ],
    },
    plugins: [
        new webpack.WatchIgnorePlugin({ paths: EXCLUDE_DEFAULT }),
        new webpack.DefinePlugin({
            APP_NAME: JSON.stringify(APP_NAME),
            APP_VERSION: JSON.stringify(APP_VERSION),
            MODE: JSON.stringify(MODE),
            NODE_ENV: JSON.stringify(NODE_ENV),
            BUILD_ENV: JSON.stringify(BUILD_ENV),
            process: JSON.stringify({}),
        }),
        new HtmlWebpackPlugin({
            filename: `${DIST}/index.html`,
            template: `${SRC}/index.ejs`,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:4].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${SRC}/assets/img/favicon.png`,
                    to: `${DIST}/favicon.png`,
                },
                {
                    from: `${SRC}/assets/img`,
                    to: `${DIST}/img`,
                    globOptions: {
                        ignore: ['.DS_Store'],
                    },
                },
            ],
        }),
    ],
}

if (MODE === 'development') {
    config.devServer = {
        host: HOST,
        port: PORT,
        client: {
            logging: 'info',
            overlay: {
                errors: true,
                warnings: true,
            },
        },
        devMiddleware: {
            publicPath: '/',
            stats: 'minimal',
        },
        server: 'https',
        historyApiFallback: {
            index: '/index.html',
        },
        allowedHosts: 'all',
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
            },
        },
    }
}

if (MODE === 'production') {
    config.output.chunkFilename = '[name].[chunkhash:4].js'
    config.output.filename = '[name].[chunkhash:4].js'
    config.optimization = {
        splitChunks: {
            chunks: 'initial',
        },
        runtimeChunk: {
            name: 'manifest',
        },
    }
}

module.exports = config
