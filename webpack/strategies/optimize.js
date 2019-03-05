const { optimize, NoErrorsPlugin } = require('webpack');

module.exports = (config, options) => {
  if (options.optimize) {
    config = { ...config,
      output: { ...config.output,
        filename: "[name].min.js",
      },
    };

    config.plugins = config.plugins.concat([
      new optimize.UglifyJsPlugin(),
      new optimize.DedupePlugin(),
      new NoErrorsPlugin(),
    ]);
  }

  return config;
};
