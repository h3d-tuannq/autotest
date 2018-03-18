var express = require('express');
var router = express.Router();
var passport = require('passport');
var automodule = require('../autorun/automodule');
var Token= require('../models/token');
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('render index ');
    res.render('admin/signin');
});

router.get('/signin', notLoggedIn , function(req, res, next) {
    console.log('render signin ');
    res.render('admin/signin');
});

router.get('/control', isLoggedIn, function(req, res, next) {
    console.log('render control ');
    res.render('admin/control');
});

router.post('/insert-token', function (req,res,next) {
    var token = req.body.txtToken;


    var newtoken = new Token();
    newtoken.usertoken = token;
    newtoken.status = "ok";

    newtoken.save(function (err, rs) {
        if(err)
            console.log('save failure');
        else
            console.log('success');
        res.redirect('/admin/insert-token');
    })

    console.log('token :'+ token);
})

router.post('/control-video', function (req,res,next) {
    var urlvideo = req.body.txtUrl;
    var time = parseInt(req.body.txtTime);
    var number = parseInt(req.body.txtNumber);
    console.log('url : '+ urlvideo + ' time : ' + time + 'number' + number );
   /* User.find(function(err,docs){
        if (err)
            console('Error load user');

        var currentNumber = 0;
        while(currentNumber < number){
            for(var i=0; i<docs.length;i++)
            {

                var loginUser = docs[i];
                automodule.autoViewByAccount('email','pass',loginUser.username,loginUser.password,urlvideo,time * 1000);
            }
            currentNumber = currentNumber + docs.length();
        }
    });*/

    Token.find(function (err,tokens) {
        if (err)
            console('Error load user');

        var currentNumberToken = 0;
        console.log('Token List : '+ tokens.length);
        while(currentNumberToken < number){

            for(var itk=0; itk<tokens.length;itk++)
            {

                var token = tokens[itk];
                console.log('autotest token : '+ token.usertoken);
                automodule.autoViewByToken(token.usertoken,urlvideo,time * 1000);
            }
            currentNumberToken = currentNumberToken + tokens.length();
        }
    });

});

router.get('/insert-user', isLoggedIn, function(req, res, next) {
    console.log('render insert-user ');
    var User= require('../models/user');
    Token.find(function (err,docs) {
        if(err)
            console.log('dm tu');
       var tokenList = [];
        console.log("Chieu dai: "+ docs.length);
        res.render('admin/insertuser', {data:docs});
    });
});


router.get('/control-video', isLoggedIn, function(req, res, next) {
    res.render('admin/control-video');
});


router.get('/insert-token', isLoggedIn, function(req, res, next) {
    console.log('render insert-token ');
    var Token= require('../models/token');
    Token.find(function (err,docs) {
        if(err)
            console.log('err');
        var tokenList = [];
        res.render('admin/insert-token', {data:docs});
    });
});

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect : '/admin/control',
    failureRedirect : '/admin/singin',
    failureFlash : true
}));

module.exports = router;

function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
        return next();
    res.redirect('/admin/signin');
}

function notLoggedIn(req, res,next){
    if(!req.isAuthenticated())
        return next();
    res.redirect('/');
}

