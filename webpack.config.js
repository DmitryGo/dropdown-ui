const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
	cache: true,
	entry: './src/index.tsx',
	resolve: {
		modules: ['node_modules', path.resolve(__dirname, 'src')],
		extensions: ['.ts', '.tsx', '.js'],
	},
	output: {
		filename: 'bundle-[hash].js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				useShortDoctype: true
			}
		}),
		new MiniCssExtractPlugin({
			filename: 'css/bundle-[hash].css',
		}),
	],
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'cache-loader',
						options: {
							cacheDirectory: path.resolve(__dirname, '.cache'),
						},
					},
					{
						loader: 'ts-loader',
						options: {},
					},
				],
			},
			{
				test: /\.(js)$/,
				include: path.resolve(__dirname, 'src'),
				use: [
					{
						loader: 'cache-loader',
						options: {
							cacheDirectory: path.resolve(__dirname, '.cache'),
						},
					},
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							cacheCompression: false,
							compact: false,
						},
					},
				],
			},
			{
				test: /\.module\.css$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: {
								mode: 'local',
								exportLocalsConvention: 'dashesOnly',
								localIdentName: '[name]__[local]__[hash:base64:5]',
							},
						},
					},
				],
			},
		],
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 3001,
	},
};
