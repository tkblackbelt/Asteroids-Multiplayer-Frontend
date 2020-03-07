const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpackDashboard = require('webpack-dashboard/plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const API_URL = {
    production: JSON.stringify('https://api.chuckbenger.com/v1'),
    development: JSON.stringify('https://api.chuckbenger.com/v1')
}

const SOCKET_URL = {
    production: JSON.stringify('https://socket.chuckbenger.com/socket'),
    development: JSON.stringify('https://socket.chuckbenger.com/socket')
}

var environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';
console.log("ENVIRONMNET = ", environment);
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.(wav)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'audio/'
                        }
                    }
                ]
            },
            {
                test: /\.(png)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new webpackDashboard(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new webpack.DefinePlugin({
            'API_URL': API_URL[environment],
            'SOCKET_URL': SOCKET_URL[environment],
            'ENVIRONMENT': environment
        })
    ],

};