import {getData,postData} from "../../../common/js/fetch";

const api = 'http://192.168.2.248:8075';


//const api = ' http://47.244.238.75:7300/mock/5d7e0519fdd0dc0457886a3c/webCloudDev';

//获取数据以及封装数据格式
const getGetData =  async (url,level,mode) =>{
    try {
        let fetchAsync = '';
        try {
            /*fetchAsync = await getData(CONFIG.proxy+url);*/

            fetchAsync = await getData(api+url,level,mode);
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

    let mode='no-cors';

    try {
        let fetchAsync = '';
        try {
            /*fetchAsync = await postData(CONFIG.proxy+url,data,level);*/
            fetchAsync = await postData(api+url,data,level);

        }
        catch (e) {

            return  e;

        }


        let json = fetchAsync.json();


        return  json;

    }

    catch (e) {

        return e;

    }

};

/*const getPostData = (url,data,level) => {

    return new Promise((resolve,reject)=>{

        let mode = 'no-cors';

        postData(api+url,data,level).then(res=>{ console.log(res);}).then(json=>{

           if (json.Status === 200){

                resolve(json);

           }

        });


    });

};*/

export default {

    getPostData,

    getGetData

}