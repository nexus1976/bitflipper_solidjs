const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const pkgVersion = require('./package.json').version;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'eval-source-map',
	entry: path.join(__dirname, 'src', 'index.tsx'),
	plugins: [
		new CleanWebpackPlugin(),
		new Dotenv(),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'index.html'),
			pkgVersion,
			filename: 'index.html'
		}),
		new webpack.optimize.LimitChunkCountPlugin({
		  maxChunks: 1 // disable creating additional chunks
		})
	],
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
		filename: 'index.js',
		libraryTarget: 'umd',
		clean: true
	},
	devServer: {
		allowedHosts: 'all',
		compress: false,
		port: 8891,
		open: true,
		historyApiFallback: true,
		devMiddleware: {
			publicPath: '/',
			stats: {
				contentBase: path.join(__dirname, 'dist'),
				warnings: false
			}
		},
		client: {
			overlay: false
		}
	}
});
