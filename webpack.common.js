const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const config = {
    entry: {
        app: "./src/index.js",
        vendor:[
            'lodash'
        ]
    },
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_moudules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env'],
                            plugins: [require('babel-plugin-syntax-dynamic-import')]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanPlugin(['dist']),
        new HtmlPlugin({
            title: 'config merge'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime' // 指定公共 bundle 的名称。
        }),

    ]
};
module.exports = config;