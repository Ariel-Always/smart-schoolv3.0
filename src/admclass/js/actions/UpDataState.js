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
//获取某一班级的教师列表
const GET_THE_CLASS_THEACHERS = 'GET_THE_CLASS_THEACHERS';
//获取某一班级的学生列表
const GET_THE_CLASS_STUDENTS = 'GET_THE_CLASS_STUDENTS';
//初始所有的学生选项
const INIT_STUDEUNT_PLAIN_OPTIONS = 'INIT_STUDEUNT_PLAIN_OPTIONS';
//学生多选框变化
const STUDENTS_CHECK_LIST_CHANGE = 'STUDENTS_CHECK_LIST_CHANGE';
//学生的全选和全不选
const STUDENTS_CHECKED_ALL = 'STUDENTS_CHECKED_ALL';
const STUDENTS_CHECKED_NONE = 'STUDENTS_CHECKED_NONE';
//添加教师的弹窗
const ADD_TEACHER_UPDATA_TEACHERLIST = 'ADD_TEACHER_UPDATA_TEACHERLIST';
const ADD_TEACHER_UPDATA_SUBJECTS = 'ADD_TEACHER_UPDATA_SUBJECTS';


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

                }else if (res.Status===400||res.Status===500) {

                    dispatch({type:UpUIState.SHOW_ERROR_ALERT,title:res.Msg});

                    //Status不是200的情况

                }

            });

        });
    }
};

//获取所有的年纪总览数据
const getAllGradePreview = () => {

    return dispatch =>{

        dispatch({type:UpUIState.GRADE_LOADING_SHOW});

        const AdmAllGradePreviewPromise =  getXuGetData('/AdmAllGradePreview?Token=Token&SchoolID=SchoolID');

        AdmAllGradePreviewPromise.then((res)=>{

            if (res.Status===200){

                dispatch({type:GET_ALL_GRADE_PREVIEW,data:res.Data});

                dispatch({type:UpUIState.GRADE_LOADING_HIDE});

                dispatch({type:UpUIState.APP_LOADING_CLOSE});

            }else if (res.Status===400||res.Status===500){

                dispatch({type:UpUIState.SHOW_ERROR_ALERT,title:res.Msg});
                //Status不是200的情况

            }

        });

    }

};

//获取某一年纪的所有总览数据
const getTheGradePreview = ()=> {

    return dispatch => {

        dispatch({type:UpUIState.CLASS_LOADING_SHOW});

       let AdmTheGradePreviewPromise =  getXuGetData('/AdmTheGradePreview?Token=Token&GradeID=GradeID&PageIndex=PageIndex&PageSize=9');

       AdmTheGradePreviewPromise.then((res)=>{

           if (res.Status===200){

               dispatch({type:GET_THE_GRADE_PREVIEW,data:res.Data});

               dispatch({type:UpUIState.CLASS_LOADING_HIDE});

               dispatch({type:UpUIState.APP_LOADING_CLOSE});

           }

       });

    }

};
//获取某一班级的数据
const getTheClassPreview = () =>{
    return (dispatch,nextState) => {

        dispatch({type:UpUIState.STUDENT_LOADING_SHOW});

        let getAmdClassTeachersPromise = getXuGetData('/AmdClassTeachers');

        let getAmdClassStudentPromise = getXuGetData('/AmdClassStudents');

        Promise.all([getAmdClassStudentPromise,getAmdClassTeachersPromise]).then((res) => {

            dispatch({type:GET_THE_CLASS_STUDENTS,data:res[0].Data});

            dispatch({type:GET_THE_CLASS_THEACHERS,data:res[1].Data});

            let {TheStudentList} = nextState().DataState;
            //获取最新的学生列表信息，传递给待选项。
            if (TheStudentList.List.length>0&&TheStudentList.Total>0){

                let list = TheStudentList.List.map(item =>{return JSON.stringify({id:item.UserID,name:item.UserName})});

                dispatch({type:INIT_STUDEUNT_PLAIN_OPTIONS,list:list});

            }

            dispatch({type:STUDENTS_CHECK_LIST_CHANGE,list:[]});

            dispatch({type:STUDENTS_CHECKED_NONE});

            dispatch({type:UpUIState.STUDENT_LOADING_HIDE});

            dispatch({type:UpUIState.APP_LOADING_CLOSE});

        });

    }
};

//学生选择组件发生改变
const changeStudentCheckList = (checkList) => {

    return (dispatch,getState) => {

        dispatch({type:STUDENTS_CHECK_LIST_CHANGE,list:checkList});

        let {StudentsPlainOptions,StudentsCheckList} =  getState().DataState;

        //判断是不是全选。

        if (StudentsCheckList.length===StudentsPlainOptions.length){

            dispatch({type:STUDENTS_CHECKED_ALL});

        }else{

            dispatch({type:STUDENTS_CHECKED_NONE});

        }

    }

};

//添加班级
const addClass = () =>{
    return dispatch => {
        //关闭的弹窗的时候重置一些操作
        dispatch({type:UpUIState.ADD_CLASS_MODAL_HIDE});

    }

};
//调班
const postAdjustClass = (data) => {

  return dispatch => {

      let adjustPostPromise = postXuData('/admAdjustClass',data);

     adjustPostPromise.then((json)=>{

         if (json.Status===200){
             dispatch({type:UpUIState.ADJUST_CLASS_MODAL_HIDE});

             dispatch({type:UpUIState.SHOW_ERROR_ALERT,msg:{
                     type:'success',
                     title:"调班成功！",
                     hide:()=>{
                         dispatch({type:UpUIState.CLOSE_ERROR_ALERT});
                         dispatch(getTheClassPreview());
                     }
             }});


         }else if (json.Status===400||json.Status===500){

             dispatch({type:UpUIState.SHOW_ERROR_ALERT,msg:{
                    type:'error',
                     title:json.msg,
                     onHide:()=>{dispatch({type:UpUIState.CLOSE_ERROR_ALERT})}
                 }})

         }

     });

  }

};

//添加教师弹框获取所有的教师和学科的数据
const getAddTeacherData = () =>{

    return dispatch =>{

        let getSubjectPromise = getXuGetData('/admSubjects');

        let getTeachersPromise = getXuGetData('/admTeachers');

        Promise.all([getSubjectPromise,getTeachersPromise]).then(res=>{



        }).catch( e=>{

            console.log(e);

        })

    }

}



//从徐工那边获取的数据以及数据格式
 const getXuGetData =  async (url) =>{
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
//从徐工那边调用post接口
const postXuData = async (url,data,level) =>{

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
    getPageInit,
    getAllGradePreview,
    getTheGradePreview,
    getTheClassPreview,
    changeStudentCheckList,
    addClass,
    postAdjustClass,
    getAddTeacherData,
    GET_LOGIN_USER_INFO,
    GET_ALL_GRADE_PREVIEW,
    GET_SHCOOL_GRADE_CLASSES,
    GET_THE_GRADE_PREVIEW,
    GET_THE_CLASS_THEACHERS,
    GET_THE_CLASS_STUDENTS,
    STUDENTS_CHECK_LIST_CHANGE,
    STUDENTS_CHECKED_ALL,
    STUDENTS_CHECKED_NONE,
    INIT_STUDEUNT_PLAIN_OPTIONS,
    ADD_TEACHER_UPDATA_SUBJECTS,
    ADD_TEACHER_UPDATA_TEACHERLIST
}