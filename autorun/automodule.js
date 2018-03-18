var webdriver = require('selenium-webdriver');
function autoLoginFacebook(userKey, passKey, user, pass, isnewwindow) {
    var driver = new webdriver.Builder().forBrowser('chrome').build();
    driver.get('https://www.facebook.com').then(function(){
        driver.findElement(webdriver.By.name(userKey)).sendKeys(user);
        driver.findElement(webdriver.By.name(passKey)).sendKeys(pass);
        driver.wait(function(){
            return driver.findElement(webdriver.By.name(passKey)).getAttribute('value');
        }, 1000).then(function(value){
            console.log(value)
            driver.findElement(webdriver.By.name(userKey)).sendKeys(webdriver.Key.ENTER).then(function () {
                driver.wait(function () {
                    return driver.getTitle();
                },1000).then(function (value) {
                    driver.get('https://www.facebook.com/Onlinefood.vn/videos/736346233222784/').then(function () {
                        setTimeout(function(){
                            console.log('pause');
                            driver.quit();},124000);
                    })
                })
            })
        });
    });
}

function autoViewByAccount(userKey, passKey, user, pass,url, time , callback) {
    var driver = new webdriver.Builder().forBrowser('chrome').build();
    driver.get('https://www.facebook.com').then(function(){
        driver.findElement(webdriver.By.name(userKey)).sendKeys(user);
        driver.findElement(webdriver.By.name(passKey)).sendKeys(pass);
        driver.wait(function(){
            return driver.findElement(webdriver.By.name(passKey)).getAttribute('value');
        }, 1000).then(function(value){
            console.log(value)
            driver.findElement(webdriver.By.name(userKey)).sendKeys(webdriver.Key.ENTER).then(function () {
                driver.wait(function () {
                    return driver.getTitle();
                },1000).then(function (value) {
                    driver.get(url).then(function () {
                        setTimeout(function(){
                            console.log('pause');
                            driver.quit();
                            },time);
                    })
                })
            })
        });
    });
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
                    if(value == '1'){
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

function autoViewByToken(userToken, urlvideo, time) {
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
                    if(value == '1'){
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
                                        driver.manage().addCookie(cookieList[i]);
                                    }
                                    driver.get(url).then(function () {
                                        setTimeout(function(){
                                            console.log('pause');
                                            driver.quit();
                                        },time);
                                    })

                                });
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