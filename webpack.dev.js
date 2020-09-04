const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: "development",
    devServer: {
        contentBase: "./dist",
        compress: true,
        port: 3000,
        allowedHosts: [
            "localhost:8082"
        ]
    }
});