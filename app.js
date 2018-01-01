const express = require('express');
const swig = require('swig');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const User = require('./models/User');

const app= express();

const port=process.env.PORT || 8081;

const host='127.0.0.1';

swig.setDefaults({
    cache: false
});

app.set('view cache', false);

app.set('views','./views/');

app.set('view engine','html');

app.engine('html', swig.renderFile);

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(function(req, res, next){
    req.userInfo = {};
    if(req.cookies.userInfo){
        req.userInfo = JSON.parse(req.cookies.userInfo);
        User.findById(req.userInfo._id).then(function(userInfo) {
            req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
        });
    }
    setTimeout(function(){
        next();
    },100)
});

app.use('/',require('./routers/main.js'));

app.use('/admin',require('./routers/admin'));

app.use('/api',require('./routers/api.js'));


mongoose.connect(`mongodb://${host}:27017/blog`, function(err){
    if(err){
        console.log(`数据库连接失败!:${err}`);
    }else{
        console.log(`数据库连接成功!`);
        app.listen(port,function(){
            console.log(`blog-protal run in http://${host}:${port}/`)
        });
    }
});

