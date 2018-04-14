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
   // var token = req.body.txtToken;

    var tokenlist = req.body.txtTokenList;

    var tokenarr = tokenlist.split('\n');
    console.log('List Token : ' + tokenlist)

    for (var i=0; i<tokenarr.length;i++){
        var newtoken = new Token();
        newtoken.usertoken = tokenarr[i].trim();
        newtoken.status = "ok1";
        newtoken.save(function (err, rs) {
            if(err)
                console.log('save failure');
            else
                console.log('success');
        })
    }

    res.redirect('/admin/insert-token');

});

router.post('/insert-user', function (req,res,next) {
    var username = req.body.email;
    var password = req.body.password;
    var newUser = new User();
    newUser.username = username;
    newUser.password = password;
    console.log('username : ' +username + ' password: '+ password);
    newUser.state = 1;
    newUser.usertoken = 'abc';
    newUser.save(function (err, rs) {
        if(err)
            console.log('save failure');
        else
            console.log('success');
    });

    res.redirect('/admin/insert-user');
});

router.post('/control-video', function (req,res,next) {
    var urlvideo = req.body.txtUrl;
    var time = parseInt(req.body.txtTime);
    var number = parseInt(req.body.txtNumber);
    console.log('url : '+ urlvideo + ' time : ' + time + 'number' + number );
  /*  User.find(function(err,docs) {
        if (err)
            console('Error load user');

        /!*for(var i = 0; i<docs.length; i++)
            docs[i].state = 0;*!/

        var times = 0;

        var currentNumber = 0;
        //   while(currentNumber < number) {
        var l = 0;
        while (l < 3) {
            for (var i = 0; i < docs.length; i++) {
                var loginUser = docs[i];
                console.log('in autoview');
                //  loginUser.state =1 ;
                automodule.autoViewByAccount('email', 'pass', loginUser, urlvideo, time * 1000, function () {
                    times++;
                    console.log('call back call' + times);
                });
            }
            setTimeout(function () {
                console.log('on time out');
            }, 3000);
            console.log('out timeout');
            l++
        }


            currentNumber = currentNumber + docs.length;
       // }

        console.log('So lan da dc xem video : ' + times);

    });*/


    Token.find(function (err,tokens) {
        if (err)
            console('Error load user');

        var currentNumberToken = 0;
        console.log('Token List : '+ tokens.length);
        var minTimes = Math.floor(number/tokens.length);
        var modView= number % tokens.length;
        var i1 = 0;
        for (i1 = 0;i1<modView;i1++)
        {
            automodule.autoViewTimesByToken(tokens[i1].usertoken,urlvideo,time, minTimes + 1);
        }

        if(minTimes > 0){
            for ( i1 = modView;i1<tokens.length;i1++)
            {
                automodule.autoViewTimesByToken(tokens[i1].usertoken,urlvideo,time, minTimes);
            }
        }

    });

});

router.get('/insert-user', isLoggedIn, function(req, res, next) {
    console.log('render insert-user ');
    var User= require('../models/user');
    User.find(function (err,docs) {
        if(err)
            console.log('dm tu');
       var tokenList = [];
        console.log("Chieu dai: "+ docs.length);
        res.render('admin/insertuser', {data:docs, index:1});
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

