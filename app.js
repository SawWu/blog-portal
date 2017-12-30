const express = require('express');
const swig = require('swig');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app= express();

const port=process.env.PORT || 8081;

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

app.use('/',require('./routers/main.js'));

app.use('/admin',require('./routers/admin'));

app.use('/api',require('./routers/api.js'));


mongoose.connect('mongodb://localhost:27017/blog', function(err){
    if(err){
        console.log('数据库连接失败!');
    }else{
        console.log('数据库连接成功!');
        app.listen(port,function(){
            console.log('blog-protal in run http://127.0.0.1:'+port+'/')
        });
    }
});

