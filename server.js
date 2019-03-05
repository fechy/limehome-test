const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const Webpack = require('webpack');
const koaWebpack = require('koa-webpack');

const app = new Koa();
const router = new Router();

const GooglePlaces = require('./src/libs/GooglePlaces');
const apiRoutes= require('./src/routes');
const config = require('./src/config');
const db = require('./src/db');
const webpackConfig = require('./webpack.config');

function initLibs (ctx) {
  ctx.places = new GooglePlaces(config.places.api_key);
  return ctx;
}

(async function () {
  // Init DB
  await db(config.db.conn);

  // Add Google places to the context
  app.context = initLibs(app.context);

  // Set hot module if on development
  if (process.env.NODE_ENV === "production") {
    app.use(serve('./build/public', {index: 'index.html'}));
  } else {
    const compiler = Webpack(webpackConfig);
    const middleware = await koaWebpack({ compiler });
    app.use(middleware);
  }

  // * API
  apiRoutes(router);

  app.use(router.routes());
  app.use(router.allowedMethods());

  try {
    app.listen(config.port, () => {
      console.info(`Application started on port ${config.port}`);
    });
  } catch (e) {
    console.error('Unable to start Application:');
    console.error(e);
  }
})();