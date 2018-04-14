var request = require('request');

function check_live_token(token) {
    var urlrequest = 'https://graph.facebook.com/v2.12/me?access_token=' + token+'&debug=all&fields=id%2Cname&format=json&method=get&pretty=0&suppress_http_code=1';
    request.get(urlrequest, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });
}

module.exports.check_live_token = check_live_token;