const Router = require('koa-router');

const router = new Router;

let subscriptions = [];

router.post('/subscriptions', (ctx) => {
  console.log(typeof ctx.request.body);
  console.log(ctx.request.body);
  
  ctx.response.body = 'subsciptions';

  const { name, phone } = ctx.request.body;

  ctx.response.set('Access-Control-Allow-Origin', '*');

  if (subscriptions.some(sub => sub.phone === phone)) {
    ctx.response.status = 400;
    ctx.response.body = { status: "subscription exists"};

    return;
  }

  subscriptions.push({ name, phone });

  ctx.response.body = { status: "OK" };
}); 

router.delete('/subscriptions/:phone', (ctx) => {
  const { phone } = ctx.params;

  ctx.response.set('Access-Control-Allow-Origin', '*');

  if (subscriptions.every(sub => sub.phone !== phone)) {
    ctx.response.status = 400;
    ctx.response.body = {status: "subscription doesn\'t exists"};

    return;
  }

  subscriptions = subscriptions.filter(sub => sub.phone !== phone);

  ctx.response.body = { status: "OK" };
});

module.exports = router;