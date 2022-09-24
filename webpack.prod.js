const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkgVersion = require('./package.json').version;
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
	mode: 'production',
	plugins: [
		new CleanWebpackPlugin(),
		new DotenvWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'index.html'),
			pkgVersion,
			filename: 'index.html',
			favicon: './src/assets/favicon.ico'
		})
	],
	entry: path.join(__dirname, 'src', 'index.tsx'),
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].[chunkhash].bundle.js',
		publicPath: '/',
		path: path.resolve(__dirname, 'dist'),
		clean: true
	}
})