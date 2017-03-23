const Api = {
  configure: (router) => {
    router.get('/api', (ctx) => {
      ctx.body = 'result';
    });
  },
};

export default Api;
