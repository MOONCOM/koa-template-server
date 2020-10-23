const users = require('./users');


module.exports = function(router){
    router.use('/user',users);
    router.get('/demo',async ctx=>{
        ctx.body = '这是首页';
    });
};