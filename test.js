var User = require('./models/adminaccount');

var newUser = new User();
newUser.user = 'admin';
newUser.pass = 'anhtuan007';
newUser.type = '0';

newUser.save(function (err, result) {
    if (err)
        console.log('save failure %j', err);
    else
        console.log('save successful');

})

/*
User.find(function (err,docs) {
    if(err)
        console.log('Find Error');
    for(var i = 0;i<docs.length;i++)
    {
        console.log('abc'+ docs.length);
        console.log(docs[i]);
        var loginUser = docs[i];
    //    autoLogin.autoLoginFacebook('email','pass',loginUser.username,loginUser.password,true);
    }

    console.log('Log All %j',docs);
});*/
