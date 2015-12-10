var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer-core');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './js/app.js',
    output: {
        path: __dirname + '/dist',
        publicPath: BUILD ? '/' : 'http://localhost:8080/',
        filename: BUILD ? '[name].[hash].js' : '[name].bundle.js',
        chunkFilename: BUILD ? '[name].[hash].js' : '[name].bundle.js'
    },
    loaders: [
        {
            test: /\.js?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel?optional[]=runtime'
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
        },
        {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file'
        },
        {
            test: /\.html$/,
            loader: 'raw'
        }
    ],
    postcss: [
        autoprefixer({
            browsers: ['last 2 version']
    })],
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            minify: BUILD
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()

    ],
    devServer: {
        contentBase: './public',
        stats: {
            modules: false,
            cached: false,
            colors: true,
            chunk: false
        }
    }
};
