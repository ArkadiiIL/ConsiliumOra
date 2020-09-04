const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: path.join(__dirname, "src", "main", "resources","static","app", "index.js"),
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
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "fonts/"
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "images/[contenthash].[ext]",
                        }
                    },
                ],
            }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()],
    resolve: {
        modules: [
            path.join(__dirname, "src", "main", "resources","static", "app"),
            path.join(__dirname, "node_modules"),
        ]
    }
};