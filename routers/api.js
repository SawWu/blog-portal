const express= require('express');
const router=express.Router();
const User = require('../models/User');

var responseData;
router.use(function(req, res, next) {
    responseData = {
        code: 0,
        message: ''
    };
    next();
} );


router.post('/user/register',function(req,res){
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;

    //用户是否为空
    if (username == '') {
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        return res.json(responseData);
    }
    //密码不能为空
    if (password == '') {
        responseData.code = 2;
        responseData.message = '密码不能为空';
        return res.json(responseData);
    }
    //两次输入的密码必须一致
    if (password != repassword) {
        responseData.code = 3;
        responseData.message = '两次输入的密码不一致';
        return res.json(responseData);
    }
    User.findOne({
        username: username
    }).then(function(userInfo){
        if(userInfo){
            responseData.code = 4;
            responseData.message = '用户名已经被注册了';
            res.json(responseData);
            return;
        };
        var user = new User({
            username: username,
            password: password
        });
        return user.save();
    }).then(function(){
        responseData.message = '注册成功';
        res.json(responseData);
    });
});

module.exports = router;