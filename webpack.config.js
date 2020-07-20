const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebPackPlugin = require('html-webpack-plugin');
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contentHash].js'
    },
    mode: 'development',
    optimization: {
        minimizer: [new optimizeCssAssetsPlugin()]
    },
    module: {
        rules: [

            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        attributes: false,
                        minimize: false
                    }
                }, ]
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false
                    }
                }]
            }
        ]
    },
    plugins: [
        new htmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [{
                from: 'src/assets/img',
                to: 'assets/img'
            }]
        })
    ]



};