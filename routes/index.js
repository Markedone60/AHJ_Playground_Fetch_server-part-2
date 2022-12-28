const combineRouters = require('koa-combine-routers');

const index = require('./index/index.js');
const subsciptions = require('./subscriptions');

const router = combineRouters(
  index,
  subscriptions,
);

module.exports = router;