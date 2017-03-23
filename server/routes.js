import Router from 'koa-router';

import api from './controllers/api.controller';

export default function routes(app) {
  const router = new Router();

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  });

  api.configure(router);

  router.get('/', async (ctx) => {
    await ctx.render('index');
  });

  return router.routes();
}
