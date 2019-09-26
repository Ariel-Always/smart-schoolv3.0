import {postData,getData} from "../../../common/js/fetch";

import UpUIState from './UpUIState';

import Method from './Method';

import AppAlertActions from './AppAlertActions';

import PaginationActions from './PaginationActions';

// const CONFIG = {proxy:"http://47.244.238.75:7300/mock/5d7e0519fdd0dc0457886a3c/webCloudDev"};


//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = 'GET_LOGIN_USER_INFO';
//获取所有年级总览信息
const  GET_ALL_GRADE_PREVIEW = 'GET_ALL_GRADE_PREVIEW';
//获取年级班级信息
const GET_SHCOOL_GRADE_CLASSES = 'GET_SHCOOL_GRADE_CLASSES';
//获取某一年级总览数据
const  GET_THE_GRADE_PREVIEW = 'GET_THE_GRADE_PREVIEW';

//某一年级内classloading展现

const THE_GRADE_CLASS_LOADING_SHOW = 'THE_GRADE_CLASS_LOADING_SHOW';

const THE_GRADE_CLASS_LOADING_HIDE = 'THE_GRADE_CLASS_LOADING_HIDE';


//某一年级内是否出现统计

const THE_GRADE_CLASS_STATICS_SHOW = 'THE_GRADE_CLASS_STATICS_SHOW';

const THE_GRADE_CLASS_STATICS_HIDE = 'THE_GRADE_CLASS_STATICS_HIDE';


//搜索值的变化
const THE_GRADE_CLASS_SEARCHKEY_CHANGE = 'THE_GRADE_CLASS_SEARCHKEY_CHANGE';

//list更新
const THE_GRADE_CLASS_LIST_UPDATE = 'THE_GRADE_CLASS_LIST_UPDATE';


const ALL_GRADE_CLASS_SEARCHKEY_CHANGE = 'ALL_GRADE_CLASS_SEARCHKEY_CHANGE';

const ALL_GRADE_CLASS_LOADING_HIDE = 'ALL_GRADE_CLASS_LOADING_HIDE';

const ALL_GRADE_CLASS_LOADING_SHOW = 'ALL_GRADE_CLASS_LOADING_SHOW';

const ALL_GRADE_CLASS_CONTENT_SHOW = 'ALL_GRADE_CLASS_CONTENT_SHOW';

const ALL_GRADE_CLASS_CONTENT_HIDE = 'ALL_GRADE_CLASS_CONTENT_HIDE';

const ALL_GRADE_CLASS_LIST_UPDATE = 'ALL_GRADE_CLASS_LIST_UPDATE';


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
//教师的弹窗
const ADD_TEACHER_UPDATA_TEACHERLIST = 'ADD_TEACHER_UPDATA_TEACHERLIST';
const ADD_TEACHER_UPDATA_SUBJECTS = 'ADD_TEACHER_UPDATA_SUBJECTS';
const ADD_TEACHER_CLOSE_SHOW = 'ADD_TEACHER_CLOSE_SHOW';
const ADD_TEACHER_CLOSE_HIDE = 'ADD_TEACHER_CLOSE_HIDE';
const ADD_TEACHER_UPDATE_NEW_TEACHER = 'ADD_TEACHER_UPDATE_NEW_TEACHER';
const ADD_TEACHER_UPDATE_ORIGIN_TEACHER = 'ADD_TEACHER_UPDATE_ORIGIN_TEACHER';
const ADD_TEACHER_ORIGIN_TEACHER_SHOW = 'ADD_TEACHER_ORIGIN_TEACHER_SHOW';
const ADD_TEACHER_ORIGIN_TEACHER_HIDE = 'ADD_TEACHER_ORIGIN_TEACHER_HIDE';
const ADD_TEACHER_NEW_TEACHER_TITLE = 'ADD_TEACHER_NEW_TEACHER_TITLE';

//操作的执行
//获取界面初始信息
const  getPageInit = () => {

    return (dispatch,getState) => {

        getLogin(dispatch).then(data => {

            if (data){

                dispatch({type:GET_LOGIN_USER_INFO,data:data.result});

                let SchoolID = data.result.SchoolID;

                 getGradeClass(SchoolID,dispatch).then(data=>{

                     if (data){

                         dispatch({type:GET_SHCOOL_GRADE_CLASSES,data:data});


                     }

                 });

               /* let getSchoolPromise = getSchoolData(SchoolID,dispatch);*/

             /*   Promise.all([getGradeClassPromise,getSchoolPromise]).then(res=>{

                    if (res){

                       dispatch({type:GET_SHCOOL_GRADE_CLASSES,data:res[0]});

                        dispatch({type:GET_ALL_GRADE_PREVIEW,data:res[1]});

                        dispatch({type:UpUIState.GRADE_LOADING_HIDE});

                        dispatch({type:UpUIState.APP_LOADING_CLOSE});

                    }

                });*/

            }

        });
    }
};

//获取所有的年纪总览数据
const getAllGradePreview = () => {

    return (dispatch,getState) =>{

        dispatch({type:UpUIState.GRADE_LOADING_SHOW});

        let { SchoolID } = getState().DataState.LoginUser;

        if (SchoolID){

            getSchoolData(SchoolID,dispatch).then(data=>{

                if (data){

                    dispatch({type:GET_ALL_GRADE_PREVIEW,data:data});

                    dispatch({type:UpUIState.GRADE_LOADING_HIDE});

                    dispatch({type:UpUIState.APP_LOADING_CLOSE});

                }

            });

        }else{

            let waitUser = setInterval(()=>{

                let id = getState().DataState.LoginUser.SchoolID;


                if (id){

                    clearInterval(waitUser);

                    getSchoolData(id,dispatch).then(data=>{

                        if (data){

                            dispatch({type:GET_ALL_GRADE_PREVIEW,data:data});

                            dispatch({type:UpUIState.GRADE_LOADING_HIDE});

                            dispatch({type:UpUIState.APP_LOADING_CLOSE});

                        }

                    });

                }

            },50);

        }

    }

};

//获取某一年纪的所有总览数据
const getTheGradePreview = (GradeID)=> {

    return (dispatch,getState) => {

        let { SchoolID } = getState().DataState.LoginUser;

        dispatch({type:UpUIState.CLASS_LOADING_SHOW});

        getClassList({SchoolID,GradeID,PageIndex:0,PageSize:1,dispatch}).then(data=>{


            if (data){

                dispatch({type:GET_THE_GRADE_PREVIEW,data:data});

                dispatch({type:PaginationActions.CLASS_PAGINATION_CURRENT_UPDATE,data:1});

                dispatch({type:PaginationActions.CLASS_PAGINATION_TOTAL_UPDATE,data:data.Total});

                dispatch({type:UpUIState.CLASS_LOADING_HIDE});

                dispatch({type:UpUIState.APP_LOADING_CLOSE});

            }

        });

    }

};
//获取某一班级的数据
const getTheClassPreview = (ClassID) =>{

    return (dispatch,getState) => {

        dispatch({type:UpUIState.STUDENT_LOADING_SHOW});

        let getTeachersPromise = getTeachers({ClassID:ClassID,dispatch});

        let getStudentsPromise = getStudents({ClassID:ClassID,dispatch,PageSize:16,PageIndex:0});

        Promise.all([getStudentsPromise,getTeachersPromise]).then((res) => {

            dispatch({type:GET_THE_CLASS_STUDENTS,data:res[0]});

            dispatch({type:GET_THE_CLASS_THEACHERS,data:res[1]});

            console.log(res[0]);

            let { TheStudentList } = getState().DataState;

            console.log(TheStudentList);
            //获取最新的学生列表信息，传递给待选项。
            if (TheStudentList.List&&TheStudentList.List.length>0&&TheStudentList.Total>0){

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

             dispatch({type:UpUIState.SHOW_ERROR_ALERT,data:{
                     type:'success',
                     title:"调班成功！",
                     hide:()=>{
                         dispatch({type:UpUIState.CLOSE_ERROR_ALERT});
                         dispatch(getTheClassPreview());
                     }
             }});


         }else if (json.Status===400||json.Status===500){

             dispatch({type:UpUIState.SHOW_ERROR_ALERT,data:{
                    type:'error',
                     title:json.msg,
                     onHide:()=>{dispatch({type:UpUIState.CLOSE_ERROR_ALERT})}
                 }})

         }

     });

  }

};

//添加教师弹框获取所有的教师和学科的数据
const getAddTeacherData = (opts) =>{

    return (dispatch,getState) => {


        if (opts.type===1||opts.type===3) {//如果类型是添加


        }else{//如果类型是更新，需要获取到已选择的教师的ID

            console.log(getState().UIState.AddTeacherModal.originTeacherInfo.id);

        }

        //查看是否已经有获取过的学科数据了如果有的话就不请求后台学科数据
        if(getState().UIState.AddTeacherModal.subjects.length>0){

            let getTeachersPromise = getXuGetData('/admTeachers');

            getTeachersPromise.then(json=>{

                dispatch({type:ADD_TEACHER_UPDATA_TEACHERLIST,list:json.Data});

                dispatch({type:UpUIState.ADD_TEACHER_LOADING_HIDE});

            }).catch((e) => {

                console.log(e);

            })

        }else{//如果没有学科数据的情况下，则学科数据和教师数据一块请求

            let getSubjectPromise = getXuGetData('/admSubjects');

            let getTeachersPromise = getXuGetData('/admTeachers');

            Promise.all([getSubjectPromise,getTeachersPromise]).then(res=>{

                dispatch({type:ADD_TEACHER_UPDATA_SUBJECTS,list:res[0].Data.SubjectList});

                dispatch({type:ADD_TEACHER_UPDATA_TEACHERLIST,list:res[1].Data});

                dispatch({type:UpUIState.ADD_TEACHER_LOADING_HIDE});

            }).catch( e=>{

                console.log(e);

            })

        }


    }

};

//教师弹窗选择的学科发生改变

const teacherModalSelectChange = (selectData) => {

    return (dispatch,getState) => {

        const {type,inputContent} = getState().UIState.AddTeacherModal;

        dispatch({type:UpUIState.ADD_TEACHER_LIST_LOADING_SHOW});

        if (type ===1||type===3){ //如果type是1或者3类型的代表新增不需要将已有教师ID排除


        }else{

            console.log(getState().UIState.AddTeacherModal.originTeacherInfo.id);

        }

        if (selectData.value!=='all'){//选择的是某一门学科



        }

        let postTeacherListPromise = getXuGetData('/admTeachers');

        postTeacherListPromise.then(json => {

            if (json.Status===200){  //成功之后

                dispatch({type:ADD_TEACHER_UPDATA_TEACHERLIST,list:json.Data});

                dispatch({type:UpUIState.ADD_TEACHER_LIST_LOADING_HIDE});

            }else{



            }

        });

    }

};

//教师弹窗点击搜索按钮
const  teacherSearchBtnClick = () => {

  return (dispatch,getState) => {
      //展示loading
      dispatch({type:UpUIState.ADD_TEACHER_LIST_LOADING_SHOW});

      dispatch({type:UpUIState.ADD_TEACHER_CLOSE_SHOW});

      let state = getState().UIState.AddTeacherModal;

      if (state.type===1||state.type===3){//不需要排除教师ID



      }else{



      }

      if (state.subjectsSelect!=='all'){ //如果是某一门学科的情况下



      }else{



      }

      let postTeacherListPromise = getXuGetData('/admTeachers');

      postTeacherListPromise.then(json => {

          if (json.Status===200){  //成功之后

              dispatch({type:ADD_TEACHER_UPDATA_TEACHERLIST,list:json.Data});

              dispatch({type:UpUIState.ADD_TEACHER_LIST_LOADING_HIDE});

          }else{



          }

      });


  }

};

//教师弹窗点击取消搜索
const teacherSearchClose = () => {

    return (dispatch,getState) => {

        dispatch({type:UpUIState.ADD_TEACHER_LIST_LOADING_SHOW});

        let subjectsSelect = getState().UIState.AddTeacherModal;

        if (subjectsSelect.value!=='all'){



        }

        let postTeacherListPromise = getXuGetData('/admTeachers');

        postTeacherListPromise.then(json => {

            if (json.Status===200){

                dispatch({type:ADD_TEACHER_UPDATA_TEACHERLIST,list:json.Data});

                dispatch({type:UpUIState.ADD_TEACHER_LIST_LOADING_HIDE});

            }else{



            }

        });

    }

};
//更改班主任
const updateGenger = (classInfo) =>{

    return (dispatch,getState) => {

        const newTeacherId = getState().UIState.AddTeacherModal.newPickTeacher.value;

        const classId = classInfo.ClassID;

        const type = getState().UIState.AddTeacherModal.type;

        let tips = '';

        switch (type) {

            case 3:

                tips = '添加班主任成功';

                break;

            case 4:

                tips = '更改班主任成功！';

                break;

            default:

                tips = '';

        }

        dispatch({type:UpUIState.ADD_TEACHER_MODAL_HIDE});

        let updateGengerPromise = postXuData('/admUpdateGenger');

        updateGengerPromise.then((json) => {

           if (json.Status === 200){

               dispatch({

                   type:UpUIState.SHOW_ERROR_ALERT,

                   data:{

                       type:"success",

                       title:tips,

                       hide:() => {dispatch({type:UpUIState.CLOSE_ERROR_ALERT});dispatch(getTheClassPreview())}

                   }

               });

           }

        });


    }

};

//更改任课教师
const updateTeacher = (classInfo) => {

    return (dispatch,getState) => {

        const newTeacherId = getState().UIState.AddTeacherModal.newPickTeacher.value;

        const classId = classInfo.ClassID;

        const subjectId = getState().UIState.AddTeacherModal.subjectsSelect.value;

        const type = getState().UIState.AddTeacherModal.type;

        let tips = '';

        switch (type) {

            case 1:

                tips = '添加任课教师成功';

                break;

            case 2:

                tips = '更改任课教师成功！';

                break;

            default:

                tips = '';

        }

        dispatch({type:UpUIState.ADD_TEACHER_MODAL_HIDE});

        let updateTeacherPromise = postXuData('/admUpdateTeacher');

        updateTeacherPromise.then((json) => {

            if (json.Status === 200){

                dispatch({

                    type:UpUIState.SHOW_ERROR_ALERT,

                    data:{

                        type:"success",

                        title:tips,

                        hide:() => {dispatch({type:UpUIState.CLOSE_ERROR_ALERT});dispatch(getTheClassPreview())}

                    }

                });

            }

        });


    }

};






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




//接口


//获取login信息
const getLogin = async (dispatch) => {

   let res = await Method.getGetData('/Login?method=GetUserInfo');

   if (res.error === 0){

       return res.data;

   }else{

    dispatch(AppAlertActions.alertError(res.Msg));

   }

};



//获取所有的年级班级信息

const getGradeClass = async (SchoolID,dispatch) => {

    let res = await Method.getGetData(`/UserMgr/UserInfoMgr/GetGradeClassTree?SchoolID=${SchoolID}`,2,'http://192.168.2.248:8075');

    if (res.Status === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError(res.Msg));

    }

};




//获取班级总览数据

const getSchoolData = async (SchoolID,dispatch) => {

    let res = await Method.getGetData(`/UserMgr/ClassMgr/GetSummary?SchoolID=${SchoolID}`,2,'http://192.168.2.248:8075');

    if (res.Status === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError(res.Msg));

    }

};


//获取班级列表

const getClassList = async ({SchoolID,PageIndex,PageSize,dispatch,Keyword,GradeID}) => {


    let res = await Method.getGetData(`/UserMgr/ClassMgr/GetGradeSummary?SchoolID=${SchoolID}&PageIndex=${PageIndex}&PageSize=${PageSize}${Keyword?`&Keyword=${Keyword}`:''}${GradeID?`&GradeID=${GradeID}`:''}`,2,'http://192.168.2.248:8075');

    if (res.Status === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError(res.Msg));

    }


};



//获取教师接口

const getTeachers = async ({ClassID,dispatch}) => {

    let res = await Method.getGetData(`/UserMgr/ClassMgr/GetTeacherToPage?ClassID=${ClassID}`,2,'http://192.168.2.248:8075');

    if (res.Status === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError(res.Msg));

    }


};



//获取学生接口

const getStudents = async ({ClassID,dispatch,Keyword,PageIndex,PageSize}) => {

    let res = await Method.getGetData(`/UserMgr/UserInfoMgr/GetStudentToPage?ClassID=${ClassID}&PageIndex=${PageIndex}&PageSize=${PageSize}${Keyword?`&Keyword=${Keyword}`:''}`,2,'http://192.168.2.248:8075');

    if (res.Status === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError(res.Msg));

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
    teacherModalSelectChange,
    teacherSearchBtnClick,
    teacherSearchClose,
    updateGenger,
    updateTeacher,

    getClassList,

    GET_LOGIN_USER_INFO,
    GET_ALL_GRADE_PREVIEW,
    GET_SHCOOL_GRADE_CLASSES,
    GET_THE_GRADE_PREVIEW,

    THE_GRADE_CLASS_LOADING_SHOW,

    THE_GRADE_CLASS_LOADING_HIDE,

    THE_GRADE_CLASS_STATICS_SHOW,

    THE_GRADE_CLASS_STATICS_HIDE,

    THE_GRADE_CLASS_SEARCHKEY_CHANGE,

    THE_GRADE_CLASS_LIST_UPDATE,

    ALL_GRADE_CLASS_SEARCHKEY_CHANGE,

    ALL_GRADE_CLASS_LOADING_HIDE,

    ALL_GRADE_CLASS_LOADING_SHOW,

    ALL_GRADE_CLASS_CONTENT_SHOW,

    ALL_GRADE_CLASS_CONTENT_HIDE,

    ALL_GRADE_CLASS_LIST_UPDATE,

    GET_THE_CLASS_THEACHERS,
    GET_THE_CLASS_STUDENTS,
    STUDENTS_CHECK_LIST_CHANGE,
    STUDENTS_CHECKED_ALL,
    STUDENTS_CHECKED_NONE,
    INIT_STUDEUNT_PLAIN_OPTIONS,
    ADD_TEACHER_UPDATA_SUBJECTS,
    ADD_TEACHER_UPDATA_TEACHERLIST,
    ADD_TEACHER_CLOSE_HIDE,
    ADD_TEACHER_CLOSE_SHOW,
    ADD_TEACHER_UPDATE_NEW_TEACHER,
    ADD_TEACHER_UPDATE_ORIGIN_TEACHER,
    ADD_TEACHER_ORIGIN_TEACHER_SHOW,
    ADD_TEACHER_ORIGIN_TEACHER_HIDE,
    ADD_TEACHER_NEW_TEACHER_TITLE
}