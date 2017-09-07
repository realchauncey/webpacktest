const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebPackPlugin = require('clean-webpack-plugin');
const WebPackManifestPlugin = require('webpack-manifest-plugin');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');

const config = {
    entry: {
        app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: "./dist",
        hot: true
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new CleanWebPackPlugin(['dist']),
        new HtmlWebPackPlugin({
            title: 'Output Management'
        }),
        new WebPackManifestPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new UglifyjsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /.\js$/,
                exclude: /(node_modules|bower_components)/,
                use:
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
            }
        ]
    }
};
module.exports = config;