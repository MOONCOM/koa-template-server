const koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const path = require('path');
const session = require('koa-session');
const KoaRouter = require('koa-router');
// 配置node的alias功能
require('module-alias/register');
// 引入自定义的接口路由
const api = require('@/api/index');
// 引入session的配置文件
const SESSION_CONFIG = require('@/config/session.config.js');
// 进行MongoDB的连接
require('@/config/mongodb-connect.js');
//实例化koa对象
const app = new koa();

app.keys = ['xuyong scryet'];
app.use(json());
app.use(bodyParser());

// 静态文件路径
app.use(static(__dirname + '/public'));

// session的配置
app.use(session(SESSION_CONFIG, app));

// 配置接口访问路径
const router = new KoaRouter();
api(router);
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);


