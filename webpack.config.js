//引入node.js中的一个模块
const path = require('path');
//引入html-webpack-plugin插件，自动创建html文件
const HTMLWebpackPlugin = require('html-webpack-plugin');
//引入clean-webpack-plugin插件
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const loader = require("ts-loader");

//webpack中所有的配置信息都应该写在module.exports中
module.exports = {
    //指定入口文件，从哪开始执行
    entry: './src/index.ts',
    //指定打包文件
    output: {
        //指定打包文件输出到哪个目录
        path: path.resolve(__dirname, 'dist'),
        //打包后输出文件的名称
        filename: 'bundle.js',
        //告诉webpack不使用箭头函数
        environment:{
            arrowFunction:false,
            //不去使用const
            const:false
        }
    },
    //指定webpack打包时使用的loader
    module: {
        //    指定要加载的规则
        rules: [
            {
                //test指定的是规则生效的文件
                test: /\.ts$/,   //以ts结尾的文件
                //使用哪个loader处理test中的文件
                use: [
                    //配置babel
                    {
                        //指定加载器
                        loader: 'babel-loader',
                        //设置babel
                        options:{
                        //    设置预定义的环境
                            presets:[
                                [
                                //    指定环境插件
                                    "@babel/preset-env",
                                    //配置信息
                                    {
                                        //要兼容的浏览器版本
                                        targets:{
                                            "chrome":"58",
                                            "ie":"11"
                                        },
                                        //指定corejs的版本
                                        "corejs":"3",
                                    //    使用corejs的方式，"usage"表示按需加载
                                        "useBuiltIns":"usage"
                                    }
                                ]
                            ]
                        }
                    },
                    {loader: 'ts-loader'}],
                //    要排除的文件
                exclude: /node-modules/
            },
            //设置less文件的处理
            {
                test:/\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    {
                     loader:"postcss-loader",
                        options: {
                         postcssOptions:{
                             plugins: [
                                 [
                                     "postcss-preset-env",
                                     {
                                         //兼容各个浏览器最新的两个版本
                                         browsers:'last 2 versions'
                                     }
                                 ]
                             ]
                         }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    mode: 'production',
//    配置webpack中的插件
    plugins: [
        new HTMLWebpackPlugin({
            //设置html的title
            //title:'这是一个自定义的',
            //以一个自定义的html为模板
            template: './src/index.html'
        }),
        //先将dist文件夹中的文件删除，再创建新文件。
        new CleanWebpackPlugin(),
    ],
    //用来设置引用模块
    resolve: {
        //以js、ts结尾的文件都可以作为模块来使用
        extensions: [".ts", ".js"]
    }
}
