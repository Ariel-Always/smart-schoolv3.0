import 'whatwg-fetch';
import 'es6-promise';
import {TESTKEY} from './SecretKey'
import {AESEncryptionBody,AESEncryptionUrl,requestSecure} from './util'





function postData(url, paramsObj, SecurityLevel) {
    let result = fetch(url, {
        method: 'post',//*post、get、put、delete，此项为请求方法相关的配置 
        mode: 'cors',//no-cors(跨域模式但服务器端不支持cors),*cors(跨域模式，需要服务器通过Access-control-Allow-Origin来
        //允许指定的源进行跨域),same-origin(同源)
        cache: 'no-cache',//*no-cache,default,reload,force-cache,only-ifcached,此项为缓存相关配置
        credentials: 'include',//*include(携带cookie)、same-origin(cookie同源携带)、omit(不携带)
        
        headers: {
            'Accept': 'application/json, text/plain, */*',//请求头，代表的、发送端（客户端）希望接收的数据类型
            'Content-Type': 'application/x-www-form-urlencodeed',//实体头，代表发送端（客户端|服务器）发送的实体数据的数据类型
            Autorization: requestSecure(paramsObj,TESTKEY,SecurityLevel),
        },
        redirect: 'follow',//manual、*follow(自动重定向)、error，此项为重定向的相关配置
        // referrer: 'no-referrer',//该首部字段会告知服务器请求的原始资源的URI
        // 注意post时候参数的形式 
        body: AESEncryptionBody(paramsObj,TESTKEY)//此处需要和headers里的"Content-Type"相对应
    })

    result.then(res => {//做提前处理
        return res.json()
    }, err => {

    }).then(json => {
        console.log(json);

    })

    return result;
}

function getData(url, SecurityLevel) {
    let result = fetch(AESEncryptionUrl(url,TESTKEY), {
        method: 'get',//*post、get、put、delete，此项为请求方法相关的配置 
        mode: 'cors',//no-cors(跨域模式但服务器端不支持cors),*cors(跨域模式，需要服务器通过Access-control-Allow-Origin来
        //允许指定的源进行跨域),same-origin(同源)
        cache: 'no-cache',//*no-cache,default,reload,force-cache,only-ifcached,此项为缓存相关配置
        credentials: 'include',//*include(携带cookie)、same-origin(cookie同源携带)、omit(不携带)
        
        headers: {
            'Accept': 'application/json, text/plain, */*',//请求头，代表的、发送端（客户端）希望接收的数据类型
            'Content-Type': 'application/x-www-form-urlencodeed',//实体头，代表发送端（客户端|服务器）发送的实体数据的数据类型
            Autorization: requestSecure(url,TESTKEY,SecurityLevel),
        },
        redirect: 'follow',//manual、*follow(自动重定向)、error，此项为重定向的相关配置
        // referrer: 'no-referrer',//该首部字段会告知服务器请求的原始资源的URI
        
    })

    result.then(res => {
        return res.json()
    }, err => {

    }).then(json => {
        console.log(json)
    })

    return result;
}


export {
    postData,
    getData
}