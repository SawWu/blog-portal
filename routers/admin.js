const express= require('express');
const router= express.Router();

router.get('/user',function(req,res,next){
    next();
});

router.get('/',function(req,res){
    console.log(req.userInfo);
    res.render('admin/index', {
        userInfo: req.userInfo
    });
});

module.exports = router;
