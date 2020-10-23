const router = require('koa-router')();
const {register,login} = require('@/dao/users.js');

// 用户注册
router.post('/register',async ctx=>{
  const {body} = ctx.request;
  console.log(body);
  await register(body).then(res=>{
    ctx.status = 200;
    ctx.body = res;
    console.log(res);
  }).catch(err=>{
    console.log(err);
    ctx.status = 500;
    ctx.mesage = '数据库错误';
  });
});

// 用户登录
router.post('/login', async ctx=>{
  const {body} = ctx.request;
  console.log('----------------------');
  console.log(body);
  await login(body).then((res)=>{
    console.log(res);
    ctx.session.userId = res.message.username;
    ctx.body = res;
  }).catch((res)=>{
    console.log(res);
    ctx.status = res.code;
    ctx.body = res;
  });
});

// 用户登出
router.post('/logout', async ctx=>{
  ctx.session.userId = null;
  ctx.body = {
    code: 200,
    message: '登出操作成功',
  };
});

// 获取用户信息
router.post('/getUserInfo', async ctx=>{
  ctx.status = 200;
  ctx.body = {
    code:200,
    message:ctx.session.userId,
  };
});

module.exports = router.routes();
