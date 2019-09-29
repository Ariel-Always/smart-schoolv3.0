import Method from './Method';

import UpUIState from './UpUIState';

import UpDataState from './UpDataState';

import AppAlertActions from './AppAlertActions';

import PaginationActions from "./PaginationActions";


//学生搜索
const StudentSearch = (ClassID,key) => {

    return (dispatch,getState) => {

        dispatch({type:UpDataState.STUDENT_WRAPPER_LOADING_SHOW});

        dispatch({type:UpDataState.STUDENT_SEARCHKEY_CHANGE,data:key});

        UpDataState.getStudents({ClassID,PageIndex:0,PageSize:12,dispatch,Keyword:key}).then(data=>{


            if (data){

                dispatch({type:UpDataState.GET_THE_CLASS_STUDENTS,data:data});

                dispatch({type:PaginationActions.STUDENT_PAGINATION_CURRENT_UPDATE,data:1});

                dispatch({type:PaginationActions.STUDENT_PAGINATION_TOTAL_UPDATE,data:data.Total});

                if (data.List.length>0){

                    let list = data.List.map(item =>{return JSON.stringify({id:item.UserID,name:item.UserName})})

                    dispatch({type:UpDataState.INIT_STUDEUNT_PLAIN_OPTIONS,data:list});

                }else{

                    dispatch({type:UpDataState.INIT_STUDEUNT_PLAIN_OPTIONS,data:[]});

                }

                dispatch({type:UpDataState.STUDENTS_CHECKED_NONE});

            }

            dispatch({type:UpDataState.STUDENT_WRAPPER_LOADING_HIDE});

        })

    }

};

//学生取消搜索
const StudentCancelSearch = (ClassID) => {

    return (dispatch,getState) => {

        dispatch({type:UpDataState.STUDENT_WRAPPER_LOADING_SHOW});

        dispatch({type:UpDataState.STUDENT_SEARCHKEY_CHANGE,data:''});

        UpDataState.getStudents({ClassID:ClassID,dispatch,PageIndex:0,PageSize:12}).then(

            data => {

                if (data){

                    dispatch({type:UpDataState.GET_THE_CLASS_STUDENTS,data:data});

                    dispatch({type:PaginationActions.STUDENT_PAGINATION_CURRENT_UPDATE,data:1});

                    dispatch({type:PaginationActions.STUDENT_PAGINATION_TOTAL_UPDATE,data:data.Total});

                    if (data.List.length>0){

                        let list = data.List.map(item =>{return JSON.stringify({id:item.UserID,name:item.UserName})})

                        dispatch({type:UpDataState.INIT_STUDEUNT_PLAIN_OPTIONS,data:list});

                    }else{

                        dispatch({type:UpDataState.INIT_STUDEUNT_PLAIN_OPTIONS,data:[]});

                    }

                    dispatch({type:UpDataState.STUDENTS_CHECKED_NONE});

                }

                dispatch({type:UpDataState.STUDENT_WRAPPER_LOADING_HIDE});

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

        UpDataState.getClassList({SchoolID:SchoolID,PageIndex:0,PageSize:12,dispatch,Keyword:key}).then(data=>{

            if (data){

                dispatch({type:UpDataState.ALL_GRADE_CLASS_LIST_UPDATE,data:data});

                dispatch({type:PaginationActions.GRADE_PAGINATION_CURRENT_UPDATE,data:1});

                dispatch({type:PaginationActions.GRADE_PAGINATION_TOTAL_UPDATE,data:data.Total});
            }

            dispatch({type:UpDataState.ALL_GRADE_CLASS_LOADING_HIDE});

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

        UpDataState.getClassList({SchoolID,GradeID,PageIndex:0,PageSize:12,dispatch,Keyword:key}).then(data=>{

            if (data){

                dispatch({type:UpDataState.THE_GRADE_CLASS_LIST_UPDATE,data:data});

                dispatch({type:PaginationActions.CLASS_PAGINATION_CURRENT_UPDATE,data:1});

                dispatch({type:PaginationActions.CLASS_PAGINATION_TOTAL_UPDATE,data:data.Total})

            }

            dispatch({type:UpDataState.THE_GRADE_CLASS_LOADING_HIDE});

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

      UpDataState.getClassList({SchoolID,GradeID,PageIndex:0,PageSize:12,dispatch}).then(data=>{

          if (data){

              dispatch({type:UpDataState.GET_THE_GRADE_PREVIEW,data:data});

              dispatch({type:PaginationActions.CLASS_PAGINATION_CURRENT_UPDATE,data:1});

              dispatch({type:PaginationActions.CLASS_PAGINATION_TOTAL_UPDATE,data:data.Total})

          }

          dispatch({type:UpDataState.THE_GRADE_CLASS_LOADING_HIDE});

      })

  }

};









export default {

    StudentSearch,

    StudentCancelSearch,

    SchoolClassSearch,

    GradeClassSearch,

    GradeClassCloseSearch,

    SchoolCancelClassSearch

}