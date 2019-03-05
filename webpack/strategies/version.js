const fs = require('fs');
const { execSync } = require('child_process');
const { join } = require('path');

const { version } = require('../../package.json');

module.exports = (config, options) => {
  if (!options.prerender) {
    const plugin = function () {
      this.plugin("done", function (stats) {
        const jsonStats = stats.toJson({
          chunkModules: true,
          exclude: options.excludeFromStats,
        });

        jsonStats.publicPath = options.publicPath;
        jsonStats.appVersion = version;
        jsonStats.appCommit = execSync("git rev-parse --short HEAD").toString();

        const folderPath = join(__dirname, '../../', 'build');
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath);
        }

        fs.writeFileSync(join(folderPath, 'stats.json'), JSON.stringify(jsonStats));
      });
    };

    config.plugins.push(plugin);
  }

  return config;
};
