const path = require('path');

module.exports = {
	resolve: { 
		extensions: ['.ts', '.tsx', '.js', 'jsx']
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				include: [
					path.resolve(__dirname, 'src')
				],
				use: ['babel-loader']
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 12000, // if less than 12000 bytes, add base64 encoded
							// image to css
							name: (file) => `/[path][name].[ext]`,
						},
					},
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/',
						},
					},
				],
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		]		
	}
};
