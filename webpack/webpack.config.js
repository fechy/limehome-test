const webpack = require('webpack');
const strategies = require('./strategies');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('dotenv').config();

const isDev = process.env.NODE_ENV !== 'production';
const defaultOptions = {
	development: isDev,
	docs: false,
	test: false,
	optimize: false,
	devServer: isDev,
	separateStylesheet: false,
	prerender: true
};

module.exports = (options) => {
	options = { ...defaultOptions, ...options };

	options.hotPort = 1141;

	const environment = options.test || options.development ? 'development' : 'production';
	const chunkFilename = (options.devServer ? '[id].js' : '[name].js') +
		(options.longTermCaching && !options.prerender ? '?[chunkhash]' : '');
		options.excludeFromStats = [/node_modules[\\\/]react(-router)?[\\\/]/
	];

	const config = {
		entry: [
			'./src/frontend/index.js'
		],

		mode: process.env.NODE_ENV || 'development',

		output: {
			path: __dirname + '/../build/public',
			filename: '[name].js',
			chunkFilename: chunkFilename,
			publicPath: '/',
			sourceMapFilename: 'debugging/[file].map'
		},

		externals: [],

		resolve: {
			extensions: ['.js', '.jsx']
		},

		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						{ loader: "style-loader" },
						{ loader: "css-loader" }
					]
				},
				{
					test: /\.(js|jsx)/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					include: /src\/frontend/,
				},
				{test: /\.html$/, loader: 'html-loader'},
				{test: /\.json/, loader: 'json'},
				{test: /\.(woff|woff2)/, loader: 'url?limit=100000'},
				{test: /\.(png|jpg|jpeg|gif|svg)/, loader: 'url?limit=100000'},
				{test: /\.(ttf|eot)/, loader: 'file'},
			]
		},

		plugins: [
			new webpack.PrefetchPlugin('react'),
			new webpack.PrefetchPlugin('react-bootstrap'),
			new HtmlWebpackPlugin({
				hash: true,
				template: './src/frontend/index.html',
				filename: './index.html' //relative to root of the application
			}),
			new webpack.DefinePlugin({
				'process.env': {NODE_ENV: JSON.stringify(environment)}
			})
		],

		devServer: {
			host: 'localhost',
			port: options.hotPort,
			stats: {
				exclude: options.excludeFromStats
			}
		}
	};

	return strategies.reduce((conf, strategy) => {
		return strategy(conf, options);
	}, config);
};
