const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { extract } = require("extract-text-webpack-plugin");

module.exports = (config, options) => {
  const stylesheetLoaders = [
    { test: /\.css/, loader: "css" },
    { test: /\.less/, loader: "css!less" },
  ];

  const loaders = [];
  for (let loader of stylesheetLoaders) {
    if (options.prerender) {
      loader.loader = "null";
    } else if (options.separateStylesheet) {
      loader.loader = extract("style", loader.loader);
    } else {
      loader.loader = `style!${loader.loader}`;
    }

    loaders.push(loader);
  }

  config.module.rules = config.module.rules.concat(loaders);

  if (options.separateStylesheet) {
    config.plugins.push(new ExtractTextPlugin("app.css"));
  }

  return config;
};
