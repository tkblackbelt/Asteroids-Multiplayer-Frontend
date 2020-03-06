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
                target: 'http://0.0.0.0:5000',
                secure: false,
                changeOrigin: true,
                ws: true
            },
            '/**': {
                target: 'https://api.chuckbenger.com/v1/',
                secure: false,
                changeOrigin: true
            },
           
        }
    }
});