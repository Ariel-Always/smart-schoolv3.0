import config from '../config'

import $ from 'jquery'

import Public from '../public'

export function TokenCheck(IsDesk = false, SysID = '000') {

    let session_token = sessionStorage.getItem('token');

    let url_token = getQueryVariable('lg_tk'); //lg_tk为链接上带的token

    let preUrl = encodeURIComponent(Public.getLg_tk(window.location.href));

    let url = window.location.href;

    if (!session_token && !url_token) { //没有token,跳转至掉线界面

        //根据是否传参来判断是否是桌面方调用

        sessionStorage.clear();

        if (IsDesk) { //如果是桌面调用

            window.location.href = '/UserMgr/Login/Login.aspx';

        } else {

            if (!url.includes('html/admDisconnect') && !getQueryVariable('lg_preurl')) {

                window.location.href = '/html/admDisconnect?lg_preurl=' + preUrl;

            }

        }


    } else { //有token，对token进行验证

        let token = session_token || url_token;



        //回调函数
        let jsoncallback = (json) => {

                console.log(json + 1);

            }
            //jsonp验证token
        $.ajax({
            url: config.TokenProxy + '/UserMgr/Login/Api/Login.ashx?token=' + token + '&method=tokenCheck&params=' + SysID,
            type: "GET",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            success: function(data) { //验证成功，则
                let json = data;
                // if (!sessionStorage.getItem('UserInfo'))
                // console.log(json, getQueryVariable('lg_preurl'))
                if (json.data.result) { //result为true

                    sessionStorage.setItem('token', token);

                    if (!sessionStorage.getItem('UserInfo')) {

                        getUserInfo(token, '000')

                    }

                    if (url.split('html/')[1]) { //有就说明不在登录页
                        if (url.split('html/')[1].split('?')[0] === 'admDisconnect') { //本身在掉线界面

                            if (getQueryVariable('lg_preurl')) { //查询是否有lg_preurl,有则跳至该地址，没有则跳至桌面

                                window.location.href = decodeURIComponent(url.split('lg_preurl=')[1]);

                            } else {
                                window.location.href = '/';
                            }
                        } else {
                            return;
                        }
                    } else {

                        return;

                    }





                    /* else if (getQueryVariable('lg_preurl')) {//查询是否有lg_preurl,有则跳至该地址，没有则跳至桌面
                         window.location.href = getQueryVariable('lg_preurl');
                     } else {
                         window.location.href = config.BasicProxy;
                     }*/



                } else { //验证不成功
                    //sessionStorage.setItem('token', '')
                    //回调函数
                    let jsoncallback = (json) => {

                        console.log(json + 1);

                    };
                    if (token !== url_token) { //如果第一个验证失败，判断是否用的是session的token，不是就进行url的token验证
                        //jsonp验证token



                        $.ajax({
                            url: config.TokenProxy + '/UserMgr/Login/Api/Login.ashx?token=' + url_token + '&method=tokenCheck&params=' + SysID,
                            type: "GET",
                            dataType: "jsonp",
                            jsonp: 'jsoncallback', //这里的值需要和回调函数名一样
                            success: function(data) { //验证成功，则

                                let json = data;
                                // if (!sessionStorage.getItem('UserInfo'))


                                if (json.data.result) { //result为true
                                    // if (url.split('html/')[1]) {//有就说明不在登录页

                                    sessionStorage.setItem('token', url_token);


                                    if (!sessionStorage.getItem('UserInfo')) {

                                        getUserInfo(token, '000');

                                    }

                                    if (url.includes('html/admDisconnect')) { //本身在掉线界面

                                        if (getQueryVariable('lg_preurl')) { //查询是否有lg_preurl,有则跳至该地址，没有则跳至桌面

                                            window.location.href = decodeURIComponent(url.split('lg_preurl=')[1]);

                                        } else {

                                            window.location.href = '/';

                                        }
                                    } else {

                                        return;

                                    }
                                    // } else if (!getQueryVariable('lg_preurl')) {//查询是否有lg_preurl,有则跳至该地址，没有则跳至桌面
                                    //     window.location.href = getQueryVariable('lg_preurl');
                                    // } else {
                                    //     window.location.href = config.BasicProxy;
                                    // }
                                } else { //验证不成功
                                    // if (url.split('html/')[1]) {//有就说明不在登录页

                                    sessionStorage.clear();

                                    if (!url.includes('html/admDisconnect')) {

                                        if (IsDesk) {

                                            window.location.href = '/UserMgr/Login/Login.aspx';

                                        } else {

                                            window.location.href = '/html/admDisconnect?lg_preurl=' + encodeURIComponent(Public.getLg_tk(url));

                                        }

                                        // } else {
                                        //     return;
                                        // }
                                    } else {
                                        return;
                                    }
                                }
                            }
                        })
                    } else {

                        sessionStorage.clear();

                        // if (url.split('html/')[1]) {//有就说明不在登录页
                        if (!url.includes('html/admDisconnect')) {

                            if (IsDesk) {

                                window.location.href = '/UserMgr/Login/Login.aspx';


                            } else {

                                window.location.href = '/html/admDisconnect?lg_preurl=' + encodeURIComponent(Public.getLg_tk(url));

                            }


                            // } else {
                            //     return;
                            // }
                        } else {

                            return;

                        }
                    }

                }
            },
            error: function(textStatus) { //请求失败后调用的函数
                console.log(JSON.stringify(textStatus));
                // if (url.split('html/')[1]) {//有就说明不在登录页
                if (url.includes('html/admDisconnect')) {

                    window.location.href = '/html/admDisconnect?lg_preurl=' + encodeURIComponent(Public.getLg_tk(url));

                } else {
                    return;
                }
                // } else {
                //     return;
                // }
            }
        })


    }

}
//获取url参数
export function getQueryVariable(variable) {
    var query = window.location.search.substring(1) || window.location.href.split('?')[1] || window.location.href;

    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) { return pair[1]; }
    }
    return (false);
}
//验证成功后进行用户信息获取
export function getUserInfo(token, SysID) {
    let date = new Date();
    let time = date.getTime()
        //回调函数
    let jsoncallback = (json) => {

        console.log(json + 1);

    }
    $.ajax({
        url: config.TokenProxy + '/UserMgr/Login/Api/Login.ashx?token=' + token + '&method=GetUserInfo&params=' + SysID,
        type: "GET",
        dataType: "jsonp",
        jsonp: 'jsoncallback', //这里的值需要和回调函数名一样
        success: function(data) {

            let loginInfo = data.data;

            let UserInfo = {};

            for (let [key, value] of Object.entries(loginInfo)) {

                UserInfo[key] = decodeURIComponent(value);

            }
            // console.log(JSON.stringify(UserInfo))
            sessionStorage.setItem('UserInfo', JSON.stringify(UserInfo));
            sessionStorage.setItem('lastTime', time)
        },
        error: function() {

        }
    })
}

export function TokenCheck_Disconnect() {
    TokenCheck()
    let i = 0
    console.log(i++)
    setInterval(function() {
        TokenCheck()
        console.log(i++)

    }, 60000)
}

export function TokenCheck_Connect(IsDesk) {
    let lastTime = sessionStorage.getItem('lastTime')
    let date = new Date();
    let time = date.getTime()
        /*   if (time - lastTime >= 60000) {*/
    TokenCheck(IsDesk);
    sessionStorage.setItem('lastTime', time)
        /*}*/
    setInterval(function() {
        let lastTime = sessionStorage.getItem('lastTime')
        let date = new Date();
        let time = date.getTime()
        if (time - lastTime >= 60000) {
            TokenCheck(IsDesk)
            sessionStorage.setItem('lastTime', time)
        }

    }, 60000)
}


export function LogOut(SysID = '000') {

    let token = sessionStorage.getItem('token') || getQueryVariable('lg_tk');

    $.ajax({
        url: config.TokenProxy + '/UserMgr/Login/Api/Login.ashx?token=' + token + '&method=Logout&params=' + SysID,
        type: "GET",
        dataType: "jsonp",
        jsonp: 'jsoncallback', //这里的值需要和回调函数名一样
        success: function(data) { //验证成功，则
            let json = data;

            if (json.data.result) { //result为true

                sessionStorage.clear();

                window.location.href = '/UserMgr/Login/Login.aspx';

            }

        },

        error: function(textStatus, err) { //请求失败后调用的函数

            alert(err);

        }
    })

}