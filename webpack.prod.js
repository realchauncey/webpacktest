const UglifyjsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const comm = require('./webpack.common');
const webpack = require('webpack');

const config = merge(comm, {
    devtool: 'cheap-source-map',
    plugins: [
        new UglifyjsPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
});
module.exports = config;