const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/koa?readPreference=primary&appname=MongoDB%20Compass&ssl=false');

const db = mongoose.connection;
db.on('error',console.error.bind(console,'=============数据库操作错误============'));
db.once('open',() => {
    console.log('-----------------数据库连接成功----------------');
});
