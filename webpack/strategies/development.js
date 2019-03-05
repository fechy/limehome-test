module.exports = (config, options) => {
	if (options.development) {
		config = { ...config,
			devtool: 'cheap-module-eval-source-map'
		};
	}

	return config;
};
