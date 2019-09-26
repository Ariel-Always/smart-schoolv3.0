import Method from './Method';

import UpUIState from './UpUIState';

import UpDataState from './UpDataState';

import SearchLoadingActions from './SearchLoadingActions';

import AppAlertActions from './AppAlertActions';
import PaginationActions from "./PaginationActions";

const STUDENG_CLICK_SEARCH = 'STUDENG_CLICK_SEARCH';

//学生搜索
const StudentSearch = (ClassID,key) => {

    return (dispatch,getState) => {

        dispatch({type:SearchLoadingActions.STUDENT_SEARCH_LOADING_SHOW});

        getStudentList(ClassID,1,10,dispatch,key).then(data=>{


            if (data){

                dispatch({type:UpDataState.GET_THE_CLASS_STUDENTS,data:data});

                dispatch({type:SearchLoadingActions.STUDENT_SEARCH_LOADING_HIDE});


            }

        })

    }

};

//学生取消搜索
const StudentCancelSearch = (ClassID) => {

    return (dispatch,getState) => {

        dispatch({type:SearchLoadingActions.STUDENT_SEARCH_LOADING_SHOW});

        Method.getGetData('/UserMgr/UserInfoMgr/GetStudentToPage',2,'http://192.168.2.248:8075').then(

            json => {

                dispatch({type:UpDataState.GET_THE_CLASS_STUDENTS,data:json.Data});

            }

        );


    }

};



//全校搜索班级
const SchoolClassSearch = (key) => {

    return (dispatch,getState) => {

        let { SchoolID } = getState().DataState.LoginUser;

        dispatch({type:UpDataState.ALL_GRADE_CLASS_LOADING_SHOW});

        dispatch({type:UpDataState.ALL_GRADE_CLASS_CONTENT_SHOW});

        dispatch({type:UpDataState.ALL_GRADE_CLASS_SEARCHKEY_CHANGE,data:key});

        UpDataState.getClassList({SchoolID:SchoolID,PageIndex:0,PageSize:1,dispatch,Keyword:key}).then(data=>{

            if (data){

                dispatch({type:UpDataState.ALL_GRADE_CLASS_LIST_UPDATE,data:data});

                dispatch({type:PaginationActions.GRADE_PAGINATION_CURRENT_UPDATE,data:1});

                dispatch({type:PaginationActions.GRADE_PAGINATION_TOTAL_UPDATE,data:data.Total})

                dispatch({type:UpDataState.ALL_GRADE_CLASS_LOADING_HIDE});
            }

        })

    }

};



//全校内取消搜索
const SchoolCancelClassSearch = () => {

    return (dispatch,getState) => {

        let { SchoolID } = getState().DataState.LoginUser;

        dispatch({type:UpDataState.ALL_GRADE_CLASS_CONTENT_HIDE});

        dispatch({type:UpDataState.ALL_GRADE_CLASS_SEARCHKEY_CHANGE,data:''});

        dispatch({type:PaginationActions.GRADE_PAGINATION_CURRENT_UPDATE,data:1});

        dispatch({type:PaginationActions.GRADE_PAGINATION_TOTAL_UPDATE,data:0});


    }

};



//年级内搜索班级名称

const GradeClassSearch = (GradeID,key) => {

    return (dispatch,getState) => {

        let { SchoolID } = getState().DataState.LoginUser;

        dispatch({type:UpDataState.THE_GRADE_CLASS_LOADING_SHOW});

        dispatch({type:UpDataState.THE_GRADE_CLASS_STATICS_HIDE});

        dispatch({type:UpDataState.THE_GRADE_CLASS_SEARCHKEY_CHANGE,data:key});

        UpDataState.getClassList({SchoolID,GradeID,PageIndex:0,PageSize:1,dispatch,Keyword:key}).then(data=>{

            if (data){

                dispatch({type:UpDataState.THE_GRADE_CLASS_LIST_UPDATE,data:data});

                dispatch({type:PaginationActions.CLASS_PAGINATION_CURRENT_UPDATE,data:1});

                dispatch({type:PaginationActions.CLASS_PAGINATION_TOTAL_UPDATE,data:data.Total})

                dispatch({type:UpDataState.THE_GRADE_CLASS_LOADING_HIDE});

            }

        })

    }

};



//年级内取消搜索

const GradeClassCloseSearch = (GradeID) => {

  return (dispatch,getState) => {

      let { SchoolID } = getState().DataState.LoginUser;

      dispatch({type:UpDataState.THE_GRADE_CLASS_LOADING_SHOW});

      dispatch({type:UpDataState.THE_GRADE_CLASS_STATICS_SHOW});

      dispatch({type:UpDataState.THE_GRADE_CLASS_SEARCHKEY_CHANGE,data:''});

      UpDataState.getClassList({SchoolID,GradeID,PageIndex:0,PageSize:1,dispatch}).then(data=>{

          if (data){

              dispatch({type:UpDataState.GET_THE_GRADE_PREVIEW,data:data});

              dispatch({type:PaginationActions.CLASS_PAGINATION_CURRENT_UPDATE,data:1});

              dispatch({type:PaginationActions.CLASS_PAGINATION_TOTAL_UPDATE,data:data.Total})

              dispatch({type:UpDataState.THE_GRADE_CLASS_LOADING_HIDE});

          }

      })

  }

};





//获取学生列表（包含搜索）

const getStudentList = async (ClassID,PageIndex,PageSize,dispatch,Keyword) => {


  let res = await Method.getGetData(`/UserMgr/UserInfoMgr/GetStudentToPage?ClassID=${ClassID}&PageIndex=${PageIndex}&PageSize=${PageSize}${Keyword?`&Keyword=${Keyword}`:''}`,2,'http://192.168.2.248:8075');

   if (res.Status === 200){

        return res.Data;

   }else{

       dispatch(AppAlertActions.alertError(res.Msg));

   }


} ;




export default {

    STUDENG_CLICK_SEARCH,

    StudentSearch,

    StudentCancelSearch,

    SchoolClassSearch,

    GradeClassSearch,

    GradeClassCloseSearch,

    SchoolCancelClassSearch

}