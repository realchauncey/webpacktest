const comm = require('./webpack.common');
const merge = require('webpack-merge');
const webpack = require('webpack');

const config = merge(comm, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    }
});
module.exports = config;