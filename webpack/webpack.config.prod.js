const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');



module.exports = {
    mode: 'production',

    module: {
        rules: [{
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    { loader: 'babel-loader' },
                    {
                        loader: 'react-svg-loader',
                        options: {
                            jsx: true,
                            svgo: {
                                plugins: [{
                                    removeViewBox: false,
                                }, ],
                            }
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{
                    loader: 'file-loader',
                }, ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    {
                        loader: 'css-loader',
                        options: {
                            localsConvention: 'camelCase',
                            sourceMap: true,
                            modules: { localIdentName: '[name]__[local]--[hash:base64:5]' }
                        }
                    },
                    'sass-loader' // compiles Sass to CSS, using Node Sass by default
                ]
            }
        ]
    },
    optimization: {
        minimizer: [new UglifyJSPlugin({
            uglifyOptions: {
                output: {
                    comments: false // use it for removing comments like "/*! ... */"
                }
            }
        })]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        symlinks: false,
        cacheWithContext: false,
        alias: {
            pages: path.resolve('./src/pages'),
            components: path.resolve('./src/components'),
            utils: path.resolve('./src/utils'),
            assets: path.resolve('./src/assets'),
            'react-dom': '@hot-loader/react-dom'
        }
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src', to: 'build/js' },
                { from: 'src/assets', to: 'build/assets' },
            ],
        }),
        new HTMLWebpackPlugin({
            template: 'build/index.html',
            filename: 'index.html',
            hash: true,
            minify: false
        })
    ]
}