const bcrypt = require('bcryptjs');
const UserSchema = require('@/models/user');

const salt = bcrypt.genSaltSync(10);

exports.register=function(params){
    const password = bcrypt.hashSync(params.password, salt);
    const user = new UserSchema({
        ...params,
        password
    });
    return user.save();
}

exports.login = function({username,password}){
    return UserSchema.find({username}).then(res=>{
        if(res.length === 0){
            // 数据库中没有该用户
            return Promise.resolve({
                code:500,
                message:'数据库中无该用户，请先注册'
            });
        }else if(bcrypt.compareSync(password, res[0].password) === true){
            // 密码正确
            return Promise.resolve({
                code:200,
                message:res[0],
            });
        }else{
            // 密码错误
            return Promise.resolve({
                code:500,
                message:'用户名密码错误'
            });
        }
    }).catch(err=>{
        return Promise.reject({
            code:500,
            message:err
        });
    });
}




