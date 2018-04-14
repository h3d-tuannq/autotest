var automodule = require('./autorun/automodule');
//automodule.autoLoginFacebook('email','pass','husbandmifibears@gmail.com',',true);

//automodule.autoViewByAccount('email','pass','husbandmifibears@gmail.com','',"https://www.facebook.com/Onlinefood.vn/videos/736346233222784/",10000);

//automodule.autoLoginByToken('EAACEdEose0cBADSIzBRx4qQ9akHtnh9MWdiZAe1Fx4mahiUT1AqVSowoTACXzluF9sHcNjUlymPKpLAvnon1SeyRh6oR6ugLCHlb5t8Hz1p4dCqDqWmX9xhFAVuy1XJoMDwKiaHXVCFcvqkoO90msZAUCcdtuRUL7KfH7Wprb5NxOvZCnuPG8cRovFtmHUG1E1yCVYZCJgZDZD',true);

//automodule.loginByCookie('');

var User = require('./models/user');
var user = new User();
user.username = 'husbandmifibears@gmail.com';
user.password = 'chuoclailoilam007anhtuan@';

// automodule.autoViewTimesByAccount('email','pass', user,'https://www.facebook.com/Onlinefood.vn/videos/736346233222784/',10 * 1000,5 );
/*

automodule.autoViewByAccount('email','pass',user,"https://www.facebook.com/Onlinefood.vn/videos/736346233222784/",10000, function () {
    console.log('callback call');
});*/

/*
var request = require('request');
request('https://graph.facebook.com/v2.12/me?access_token=EAACEdEose0cBAMrVjtQOwNn5GEWdzq8zX70nRESpYueHL5XYhZCGfya1D9unm25vlDEV4TFnNoOUFOWsZCumntWKW8DvCkp2YZBeerLid56jIgAlVjXeF03bgZCuZABPGCFw0P2ZAvlQHsZCAmnGfreXZAfATYEv7ta9i8ZBlhCDhUgoErv8zItYdG3CXcz6ZBx7DCMgauvNostgZDZD&debug=all&fields=id%2Cname&format=json&method=get&pretty=0&suppress_http_code=1', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
});
*/
var token = 'EAAAAUaZA8jlABALLgCcfly3klJWbCX72qtGraMEDAvW7CSrATSwQMikq8EGAEiqoxQeBQjggaLeI4KT9TQpZCLxc7HslKngkjU3czo79UtA9KKw6DPAGmzqMpnW4ensaXopLN0TnIOrTK1fvVLelrXzxIMa8ynjqVepUTKj9K6llQOdygMRT4WonEzkFAZD';
// automodule.autoViewByToken(token,"https://www.facebook.com/Onlinefood.vn/videos/736346233222784/",5000, function () {
//     console.log('Callback autoview bytoken');
// });

automodule.autoViewTimesByToken(token,"https://www.facebook.com/Onlinefood.vn/videos/736346233222784/",5000,3);