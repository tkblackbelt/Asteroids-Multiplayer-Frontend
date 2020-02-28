const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        proxy: {
            '/socket': {
                target: 'http://15.222.46.12:5000',
                secure: false,
                changeOrigin: true,
                ws: true
            },
            // '/**': {
            //     target: 'https://zgn8c4rya7.execute-api.ca-central-1.amazonaws.com/Prod',
            //     secure: false,
            //     changeOrigin: true
            // },
           
        }
    }
});