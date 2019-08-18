import {postData,getData} from "../../../common/js/fetch";
import UpUIState from './UpUIState';
import CONFIG from '../../../common/js/config';
import 'whatwg-fetch';




//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = 'GET_LOGIN_USER_INFO';
//获取所有年级总览信息
const  GET_ALL_GRADE_PREVIEW = 'GET_ALL_GRADE_PREVIEW';
//获取年级班级信息
const GET_SHCOOL_GRADE_CLASSES = 'GET_SHCOOL_GRADE_CLASSES';
//获取某一年级总览数据
const  GET_THE_GRADE_PREVIEW = 'GET_THE_GRADE_PREVIEW';





//操作的执行
//获取界面初始信息
const  getPageInit = () => {
    return (dispatch,getState) => {

        fetch(`${CONFIG.proxy}/Login?method=GetUserInfo`).then(res => res.json()).then(json => {

            dispatch({type:GET_LOGIN_USER_INFO,data:json.data.result});

            const GradesClassesPromise = getXuGetData('/GradesClasses');

            GradesClassesPromise.then((res)=>{

                if (res.Status===200){

                    dispatch({type:GET_SHCOOL_GRADE_CLASSES,data:res.Data});

                }else{

                    //Status不是200的情况

                }

            });

        });
    }
};

//获取所有的年纪总览数据
const getAllGradePreview = () => {

    return dispatch =>{

        const AdmAllGradePreviewPromise =  getXuGetData('/AdmAllGradePreview');

        AdmAllGradePreviewPromise.then((res)=>{

            dispatch({type:GET_ALL_GRADE_PREVIEW,data:res.Data});

            dispatch({type:UpUIState.APP_LOADING_CLOSE});

        });

    }

};

//获取某一年纪的所有总览数据

const getTheGradePreview = ()=> {

    return dispatch => {

       let AdmTheGradePreviewPromise =  getXuGetData('/AdmTheGradePreview');

       AdmTheGradePreviewPromise.then((res)=>{

           if (res.Status===200){

               dispatch({type:GET_THE_GRADE_PREVIEW,data:res.Data});

               dispatch({type:UpUIState.CLASS_LOADING_HIDE});

               dispatch({type:UpUIState.APP_LOADING_CLOSE});

           }

       });

    }

};


//从徐工那边获取的数据以及数据格式
 const getXuGetData =  async (url) =>{
    try {
        let fetchAsync = '';
        try {
            fetchAsync = await fetch(CONFIG.proxy+url);
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
    getPageInit,
    getAllGradePreview,
    getTheGradePreview,
    GET_LOGIN_USER_INFO,
    GET_ALL_GRADE_PREVIEW,
    GET_SHCOOL_GRADE_CLASSES,
    GET_THE_GRADE_PREVIEW
}