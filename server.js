const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');

const app = new Koa();
const router = new Router();

const GooglePlaces = require('./src/libs/GooglePlaces');
const apiRoutes= require('./src/routes');
const config = require('./src/config');
const db = require('./src/db');

function initLibs (ctx) {
  if (!config.places.api_key) {
    console.error(`Missing Google Places KEY!`);
  }

  ctx.places = new GooglePlaces(config.places.api_key);
  return ctx;
}

async function initWebpackMiddleware() {
  const webpackConfig = require('./webpack.config');
  const Webpack = require('webpack');
  const koaWebpack = require('koa-webpack');
  const compiler = Webpack(webpackConfig);
  return await koaWebpack({ compiler });
}

try {
  (async function () {
    // Init DB
    await db(config.db.conn);

    // Add Google places to the context
    app.context = initLibs(app.context);

    // Set hot module if on development
    if (process.env.NODE_ENV === "production") {
      app.use(serve('./build/public', {index: 'index.html'}));
    } else {
      const middleware = await initWebpackMiddleware();
      app.use(middleware);
    }

    // * API
    apiRoutes(router);

    app.use(router.routes());
    app.use(router.allowedMethods());

    app.listen(config.port, () => {
      console.info(`Application started on port ${config.port} in ${process.env.NODE_ENV} mode`);
    });
  })();
} catch (e) {
  console.error('Unable to start Application:');
  console.error(e);
}