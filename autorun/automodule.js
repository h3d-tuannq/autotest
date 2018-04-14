var webdriver = require('selenium-webdriver');
function autoLoginFacebook(userKey, passKey, user, pass, isnewwindow) {
    var driver = new webdriver.Builder().forBrowser('chrome').build();
    driver.get('https://www.facebook.com').then(function(){
        driver.findElement(webdriver.By.name(userKey)).sendKeys(user);
        driver.findElement(webdriver.By.name(passKey)).sendKeys(pass);
        driver.wait(function(){
            return driver.findElement(webdriver.By.name(passKey)).getAttribute('value');
        }, 1000).then(function(value){
            driver.findElement(webdriver.By.name(userKey)).sendKeys(webdriver.Key.ENTER).then(function () {
                driver.wait(function () {
                    return driver.getTitle();
                },1000).then(function (value) {
                    driver.get('https://www.facebook.com/Onlinefood.vn/videos/736346233222784/').then(function () {
                        setTimeout(function(){
                            driver.quit();},124000);
                    })
                })
            })
        });
    });
}

function autoViewByAccount(userKey, passKey, user ,url, time , callback) {
    console.log('autoviewbyaccout');
    var driver = new webdriver.Builder().forBrowser('chrome').build();
    driver.get('https://www.facebook.com').then(function(){
        driver.findElement(webdriver.By.name(userKey)).sendKeys(user.username);
        driver.findElement(webdriver.By.name(passKey)).sendKeys(user.password);
        driver.wait(function(){
            return driver.findElement(webdriver.By.name(passKey)).getAttribute('value');
        }, 1000).then(function(value){
            driver.findElement(webdriver.By.name(userKey)).sendKeys(webdriver.Key.ENTER).then(function () {
                driver.wait(function () {
                    return driver.getTitle();
                },1000).then(function (value) {
                    driver.get(url).then(function () {
                        setTimeout(function(){
                            driver.quit();
                            if (callback)
                                callback();
                            },time);
                    })
                })
            })
        });
    });
}

function autoViewTimesByToken(token ,url, time ,times){
    console.log('Token is running: ' + token);
    var callback = function () {
        times--;
        if(times >= 0) {
            autoViewByToken(token,url, time , callback);
        }
        console.log('callback call');
    };

    autoViewByToken(token ,url, time , callback);
}

function autoViewByToken(userToken, urlvideo, time, callback) {
    var driver = new webdriver.Builder().forBrowser('chrome').build();
    driver.get("https://www.google.com.vn");
    var request = require('request');
    var url = 'https://b-api.facebook.com/method/auth.getSessionForApp?format=json&access_token=' + userToken + '&new_app_id=350685531728&generate_session_cookies=1&__mref=message_bubble';
    request(url, function (error, response, data) {
        if (!error && response.statusCode == 200) {
            console.log(data) // Print the google web page.
            data = JSON.parse(data);
            console.log('session_cookies : '+data.session_cookies);
          //  var cokie = [{"name":"c_user","value":"100025244663664","expires":"Fri, 12 Apr 2019 23:58:44 GMT","expires_timestamp":1555113524,"domain":".facebook.com","path":"/","secure":true},{"name":"xs","value":"17:R3tczPbldQl_pA:2:1523370110:-1:-1","expires":"Fri, 12 Apr 2019 23:58:44 GMT","expires_timestamp":1555113524,"domain":".facebook.com","path":"/","secure":true,"httponly":true},{"name":"fr","value":"0htakkMBDQCqMnti6.AWX4kV6uAO2xM2ctFPxc6eRxY1A.Baz_K0..AAA.0.0.Baz_K0.AWWKhDYO","expires":"Fri, 12 Apr 2019 23:58:44 GMT","expires_timestamp":1555113524,"domain":".facebook.com","path":"/","secure":true,"httponly":true},{"name":"datr","value":"tPLPWlBVQdiP9FvQaVoxJpgY","expires":"Sat, 11 Apr 2020 23:58:44 GMT","expires_timestamp":1586649524,"domain":".facebook.com","path":"/","secure":true,"httponly":true}];
            for(var i=0;i<data.session_cookies.length;i++){
                driver.manage().addCookie(data.session_cookies[i]);
                console.log('cookieList: %j', data.session_cookies[i]);
            }
            setTimeout(function () {
                driver.get(urlvideo).then(function () {
                    setTimeout(function(){
                        driver.quit();
                        if (callback)
                            callback();
                    },time);
                })
            },5000);

        }
    });

}


function autoViewTimesByAccount(userKey, passKey, user ,url, time ,times){

    var callback = function () {
            times--;
            if(times >= 0) {
                autoViewByAccount(userKey, passKey, user ,url, time , callback);
            }
          console.log('callback call');
    };

    autoViewByAccount(userKey, passKey, user ,url, time , callback);
}

function autoLoginByToken(userToken, isnewwindow) {
    var driver = new webdriver.Builder().forBrowser('chrome').build();
    driver.get("https://vnlike.net/token/chuyen-token-thanh-cookie.php").then(function () {
        driver.findElement(webdriver.By.id('access_token')).sendKeys(userToken).then(function () {
            driver.findElement(webdriver.By.id('option')).sendKeys('editthiscookies');
            driver.wait(function () {
                return driver.findElement(webdriver.By.id('option'));
            },1000).then(function (value) {
                driver.wait(function () {
                    return driver.findElement(webdriver.By.id('option')).getAttribute('selectedIndex');
                }, 1000).then(function (value) {
                    console.log("Value:" + value);
                    if(value === '1'){
                        console.log('clicked');
                        driver.findElement(webdriver.By.id('submit')).click();

                        driver.wait(function () {
                            return driver.findElement(webdriver.By.id('output_access_token')).getAttribute('value');
                        }, 1000).then (function (value) {
                            console.log("cookie: %j " +value);
                            if(value !== '')
                            {
                                driver.get('https://www.facebook.com').then(function(){
                                    var cookieList = value;
                                    for(var i=0;i<cookieList.length;i++){
                                        console.log('Set cookie item');
                                        driver.manage().addCookie(cookieList[i]);
                                    }
                                });
                            }
                        });
                    }
                })
                console.log('setcookie');
            });
        });
    });
}

function loginByCookie(){
    var cookieList = [{"name":"c_user","value":"100024937632341","expires":"Mon, 18 Mar 2019 18:03:34 GMT","expires_timestamp":1552932214,"domain":".facebook.com","path":"/","secure":true},{"name":"xs","value":"26:b2vQnlxM3ntiOg:2:1521308114:-1:-1","expires":"Mon, 18 Mar 2019 18:03:34 GMT","expires_timestamp":1552932214,"domain":".facebook.com","path":"/","secure":true,"httponly":true},{"name":"fr","value":"0WHoI0HqBYsAkMQfA.AWVcYXynKxk83A3qX0-YmNeNyLw.Barqn2..AAA.0.0.Barqn2.AWWZWCwj","expires":"Mon, 18 Mar 2019 18:03:34 GMT","expires_timestamp":1552932214,"domain":".facebook.com","path":"/","secure":true,"httponly":true},{"name":"datr","value":"9qmuWt5tklGQLCqIC8kQpxXA","expires":"Tue, 17 Mar 2020 18:03:34 GMT","expires_timestamp":1584468214,"domain":".facebook.com","path":"/","secure":true,"httponly":true}];
    var driver = new webdriver.Builder().forBrowser('chrome').build();
    driver.get('https://google.com');
    for(var i=0;i<cookieList.length;i++){
        console.log('Set cookie item %j' + cookieList[i]);
        driver.manage().addCookie(cookieList[i]);
    }

    setTimeout(function () {
        driver.get('https://www.facebook.com');
    },5000);
}

function autoViewByToken_old(userToken, urlvideo, time) {
    var driver = new webdriver.Builder().forBrowser('chrome').build();
    driver.get("https://vnlike.net/token/chuyen-token-thanh-cookie.php").then(function () {
        driver.findElement(webdriver.By.id('access_token')).sendKeys(userToken).then(function () {
            driver.findElement(webdriver.By.id('option')).sendKeys('editthiscookies');
            driver.wait(function () {
                return driver.findElement(webdriver.By.id('option'));
            },1000).then(function (value) {

                driver.wait(function () {
                    return driver.findElement(webdriver.By.id('option')).getAttribute('selectedIndex');
                }, 1000).then(function (value) {
                    if(value === '1'){
                        console.log('clicked');
                        driver.findElement(webdriver.By.id('submit')).click();

                        driver.wait(function () {
                            return driver.findElement(webdriver.By.id('output_access_token')).getAttribute('value');
                        }, 1000).then (function (value) {
                            console.log("cookie: %j " +value);
                            if(value !== '')
                            {
                             /*   driver.get('https://www.facebook.com').then(function(){*/
                                    var cookieList = value;
                                    for(var i=0;i<cookieList.length;i++){
                                        driver.manage().addCookie(cookieList[i]);
                                    }
                                    driver.get(urlvideo).then(function () {
                                        setTimeout(function(){
                                            driver.quit();
                                        },time);
                                    })

                           /*     });*/
                            }

                        });
                    }

                });
            });
        });


    });
}


module.exports.autoLoginFacebook = autoLoginFacebook;
module.exports.autoLoginByToken = autoLoginByToken;
module.exports.autoViewByAccount = autoViewByAccount;
module.exports.autoViewByToken = autoViewByToken;
module.exports.loginByCookie = loginByCookie;
module.exports.autoViewTimesByAccount = autoViewTimesByAccount;
module.exports.autoViewTimesByToken = autoViewTimesByToken;