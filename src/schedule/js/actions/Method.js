import {getData,postData} from "../../../common/js/fetch";

import CONFIG from  '../../../common/js/config';
//获取数据以及封装数据格式
const getGetData =  async (url) =>{
    try {
        let fetchAsync = '';
        try {
            fetchAsync = await getData(CONFIG.proxy+url);
        }
        catch (e) {
            return  e;
        }

        let json = await fetchAsync.json();

        return  json;

    }
    catch (e) {

        return e;

    }
};
//调用post接口
const getPostData = async (url,data,level) =>{

    try {
        let fetchAsync = '';
        try {
            fetchAsync = await postData(CONFIG.proxy+url,data,level);
        }
        catch (e) {
            return  e;
        }

        let json = await fetchAsync.json();

        return  json;

    }
    catch (e) {

        return e;

    }

};

export default {

    getPostData,

    getGetData

}