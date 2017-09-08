# 学习记录

## 安装

使用npm webpack和webpack测试服务

     npm install --save-dev webpack webpack-dev-server

## 配置

默认webpack的配置是写再webpack.config.js里的，但是考虑到生产环境和开发环境的需求不同，所以将
配置写再三个不同的js文件里，分别是:

- webpack.common.js（公共部分配置）
- webpack.dev.js(开发环境配置)
- webpack.prod.js(生产环境配置)

需要合并工具:

    npm install --save-dev webpack-merge

### webpack.common.js

entry是webpack的入口，它告诉webpack起点是哪里，需要打包的内容。
以下代码中，将lodash等第三方模块归入到vendor模块中（需要配合
CommonsChunkPlugin),这样有个好处，因为第三方模块代码不会频繁变动，
将他们分离到单独模块中，只要保证导出的模块名不发生变化(配合HashedModuleIdsPlugin)，
就能让浏览器不频繁缓存他们

    entry: {
            app: "./src/index.js",
            vendor:[
                'lodash'
            ]
        }

output是与entry相对应的,它告诉webpack应该打包代码到哪里。
chunkFilename:导出非入口模块的名称(动态加载模块)

    output:{
        filename:'[name].[chunkhash].js',
        chunkFilename:'[name].[chunkhash].js',
        path:path.resolve(__dirname,'dist')
    }

plugins是webpack中添加插件的地方。

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

module是配置loader的地方,通过各种loader，可以让webpack理解各种资源，就像理解javascript
一样

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

### webpack.dev.js

通过merge可以将common部分合并起来,考虑到调试方便设置 devtool: 'inline-source-map'
有异常发生时，可以快速定位

    const config = merge(comm, {
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './dist',
            hot:true
        },
        plugin:[
            new webpack.HotModuleReplacementPlugin()
        ]
    });
    module.exports = config;


### webpack.prod.js

通过UglifyjsPlugin对代码进行压缩，去除重复引用
DefinePlugin设置环境变量指定当前环境，触发各library可能进行的优化处理

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





