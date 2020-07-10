const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: path.join(__dirname, 'src', 'main', 'resources','static','app', 'index.js'),
    mode: "development",
    devServer: {
        contentBase: './dist',
        compress: true,
        port: 3000,
        allowedHosts: [
            'localhost:8082'
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()],
    resolve: {
        modules: [
            path.join(__dirname, 'src', 'main', 'resources','static', 'app'),
            path.join(__dirname, 'node_modules'),
        ]
    }
    };