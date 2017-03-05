var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path");

module.exports = {
    entry: __dirname + '/app/js/main.js',
    output: {
        path: __dirname + "/build/",
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less/,
                loaders: "style-loader!css-loader!less-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        hash: true,
        template: __dirname + "/app/view/index.html" // Load a custom templat
    })]
};