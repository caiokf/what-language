import Koa from 'koa';
import serve from 'koa-static';
import views from 'koa-views';

import config from './config';
import routes from './routes';

const port = process.env.PORT || config.site.port;
const app = new Koa();

app.proxy = true;
app.use(serve('./public'));
app.use(views('./public', { extension: 'pug' }));

app.use(routes(app));

app.listen(port, () => {
  console.log(`:: now listening on port ${port}`);
});

process.on('SIGINT', () => {
  process.exit();
});
