const express = require('express');
const swig = require('swig');
const path = require('path');


const app= express();

const port=8001;

app.set('views','./views/');

app.set('view engine','html');

app.engine('html', swig.renderFile);

app.set('view cache', false);


app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
    res.render('index.html');
});

app.listen(port,function(){
    console.log('blog-protal in run http://127.0.0.1:'+port+'/')
});