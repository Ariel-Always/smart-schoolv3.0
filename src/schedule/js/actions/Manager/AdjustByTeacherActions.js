import Method from '../Method';

import Mock from 'mockjs';

import AppAlertActions from '../AppAlertActions';

const ADJUST_BY_TEACHER_SHOW = 'ADJUST_BY_TEACHER_SHOW';

const ADJUST_BY_TEACHER_HIDE = 'ADJUST_BY_TEACHER_HIDE';

const REPLACE_SHCEDULE_LOADING_SHOW = 'REPLACE_SHCEDULE_LOADING_SHOW';

const REPLACE_SHCEDULE_LOADING_HIDE = 'REPLACE_SHCEDULE_LOADING_HIDE';

const REPLACE_SHCEDULE_TEACHER_LIST_UPDATE = 'REPLACE_SHCEDULE_TEACHER_LIST_UPDATE';

const REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_SHOW = 'REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_SHOW';

const REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_HIDE = 'REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_HIDE';

const REPLACE_SHCEDULE_CLASS_LIST_UPDATE = 'REPLACE_SHCEDULE_CLASS_LIST_UPDATE';

const REPLACE_SHCEDULE_TEACHER_DROP_CHANGE = 'REPLACE_SHCEDULE_TEACHER_DROP_CHANGE';

const REPLACE_SHCEDULE_TEACHER_SEARCH_OPEN = 'REPLACE_SHCEDULE_TEACHER_SEARCH_OPEN';

const REPLACE_SHCEDULE_TEACHER_SEARCH_CLOSE = 'REPLACE_SHCEDULE_TEACHER_SEARCH_CLOSE';

const REPLACE_SHCEDULE_TEACHER_SEARCH_LOADING_SHOW = 'REPLACE_SHCEDULE_TEACHER_SEARCH_LOADING_SHOW';

const REPLACE_SHCEDULE_TEACHER_SEARCH_LIST_UPDATE = 'REPLACE_SHCEDULE_TEACHER_SEARCH_LIST_UPDATE';

const REPLACE_SHCEDULE_TEACHER_SEARCH_LOADING_HIDE = 'REPLACE_SHCEDULE_TEACHER_SEARCH_LOADING_HIDE';





const REPLACE_SHCEDULE_REPLACE_TEACHER_LIST_UPDATE = 'REPLACE_SHCEDULE_REPLACE_TEACHER_LIST_UPDATE';

const REPLACE_SHCEDULE_REPLACE_TEACHER_DROP_CHANGE = 'REPLACE_SHCEDULE_REPLACE_TEACHER_DROP_CHANGE';

const REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_OPEN = 'REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_OPEN';

const REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_CLOSE = 'REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_CLOSE';

const REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LOADING_SHOW = 'REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LOADING_SHOW';

const REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LIST_UPDATE = 'REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LIST_UPDATE';

const REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LOADING_HIDE = 'REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LOADING_HIDE';

const REPLACE_SHCEDULE_CLASS_CHECKED = 'REPLACE_SHCEDULE_CLASS_CHECKED';

const REPLACE_SHCEDULE_RADIO_CHANGE = 'REPLACE_SHCEDULE_RADIO_CHANGE';

const REPLACE_SHCEDULE_MONTHS_LIST_UPDATE = 'REPLACE_SHCEDULE_MONTHS_LIST_UPDATE';

const REPLACE_SHCEDULE_MONTHS_CHECKED = 'REPLACE_SHCEDULE_MONTHS_CHECKED';

const REPLACE_SHCEDULE_WEEK_LIST_UPDATE = 'REPLACE_SHCEDULE_WEEK_LIST_UPDATE';

const REPLACE_SHCEDULE_WEEK_CHECKED = 'REPLACE_SHCEDULE_WEEK_CHECKED';



//找人代课初始化
const replaceScheduleInit = () => {

    return ( dispatch,getState ) => {

        dispatch({type:REPLACE_SHCEDULE_LOADING_HIDE});

        let getAllGradePromise = Method.getGetData('/scheduleSubjectGrade');

        let getTeacherPromise = Method.getGetData('/scheduleSubjectTeacherTeacher');

        Promise.all([getAllGradePromise,getTeacherPromise]).then(res => {

           let teacherList = res[0].Data.ItemSubject.map(item => {

              let list =  res[1].Data.map(i => {

                 if (i.SubjectID === item.SubjectID){

                        return{

                            name:i.TeacherName,

                            id:i.Teacher

                        }

                 }else{

                     return;

                 }

              }).filter(itm => itm!==undefined);

              return {

                  id:item.SubjectID,

                  name:item.SubjectName,

                  list

              }

           });

           dispatch({type:REPLACE_SHCEDULE_TEACHER_LIST_UPDATE,data:teacherList});

            dispatch({type:REPLACE_SHCEDULE_REPLACE_TEACHER_LIST_UPDATE,data:teacherList});

        });

    };

};

//教师选择
const teacherDropChange = (info) => {


    return ( dispatch,getState ) => {

        dispatch({type:REPLACE_SHCEDULE_TEACHER_DROP_CHANGE,data:{value:info.id,title:info.value}});

        let teacherInfoPromise = Method.getGetData('/scheduleReplaceTeacherSelectd');

        teacherInfoPromise.then(json => {

            if (json.Status === 200){

                if (json.Data.ItemSubject.length > 1){

                    let  list = json.Data.ItemSubject.map(item => {

                        return {

                            value:item.SubjectID,

                            title:item.SubjectName

                        }

                    });

                    let classList = json.Data.ItemClass.map(item => {

                        if (item.SubjectID === list[0].value){

                            return {

                                id:item.ClassID,

                                name:item.ClasstName

                            }

                        }else{

                            return;

                        }

                    }).filter(i => i!==undefined);

                    dispatch({type:REPLACE_SHCEDULE_CLASS_LIST_UPDATE,data:classList});

                    dispatch({type:REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_SHOW,data:{

                            dropSelectd:{value:list[0].value,title:list[0].title},

                            dropList:list

                        }});

                }else{

                    let  subject =  json.Data.ItemSubject[0];

                    let subjectObj = { id:subject.SubjectID,name:subject.SubjectName };

                    let classList = json.Data.ItemClass.map(item => {

                        return {

                            id:item.ClassID,

                            name:item.ClasstName

                        }

                    });

                    dispatch({type:REPLACE_SHCEDULE_CLASS_LIST_UPDATE,data:classList});

                    dispatch({type:REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_HIDE,data:{

                            id:subjectObj.id,

                            name:subjectObj.name

                        }});

                }

            }else{

                dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                        type:"btn-error",

                        title:json.Msg,

                        ok:hideAlert(dispatch),

                        close:hideAlert(dispatch),

                        cancel:hideAlert(dispatch)

                    }});

            }

        });

    }

};

//教师搜索
const teacherClickSearch = (key) => {

    return (dispatch,getState) => {

        if (key !== ''){

            let SchoolID = getState().LoginUser;

            dispatch({type:REPLACE_SHCEDULE_TEACHER_SEARCH_OPEN});

            dispatch({type:REPLACE_SHCEDULE_TEACHER_SEARCH_LOADING_SHOW});

            let searchTeacherPromise = Method.getGetData(`/scheduleSubjectTeacherTeacher?SchoolID=${SchoolID}&key=${key}`);

            searchTeacherPromise.then(json => {

                if (json.Status === 200){

                    let teacherSearchList = json.Data.map(item => {

                        return{

                            id:item.Teacher,

                            name:item.TeacherName

                        };

                    });

                    dispatch({type:REPLACE_SHCEDULE_TEACHER_SEARCH_LIST_UPDATE,data:teacherSearchList});

                    dispatch({type:REPLACE_SHCEDULE_TEACHER_SEARCH_LOADING_HIDE});

                }else{

                    dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                            type:"btn-warn",

                            title:json.Msg,

                            ok:hideAlert(dispatch),

                            close:hideAlert(dispatch),

                            cancel:hideAlert(dispatch)

                        }});

                }

            });

        }else{

            dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                    type:"btn-warn",

                    title:"搜索的内容不能为空！",

                    ok:hideAlert(dispatch),

                    close:hideAlert(dispatch),

                    cancel:hideAlert(dispatch)

                }});

        }

    };

};

//取消教师的搜索
const teacherSearchClose = () => {

    return dispatch => {

        dispatch({type:REPLACE_SHCEDULE_TEACHER_SEARCH_CLOSE})

    }

};


//教师选择
const replaceTeacherDropChange = (info) => {


    return ( dispatch,getState ) => {

        dispatch({type:REPLACE_SHCEDULE_REPLACE_TEACHER_DROP_CHANGE,data:{value:info.id,title:info.value}});

    }

};

//教师搜索
const replaceTeacherClickSearch = (key) => {

    return (dispatch,getState) => {

        if (key !== ''){

            let SchoolID = getState().LoginUser;

            dispatch({type:REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_OPEN});

            dispatch({type:REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LOADING_SHOW});

            let searchTeacherPromise = Method.getGetData(`/scheduleSubjectTeacherTeacher?SchoolID=${SchoolID}&key=${key}`);

            searchTeacherPromise.then(json => {

                if (json.Status === 200){

                    let teacherSearchList = json.Data.map(item => {

                        return{

                            id:item.Teacher,

                            name:item.TeacherName

                        };

                    });

                    dispatch({type:REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LIST_UPDATE,data:teacherSearchList});

                    dispatch({type:REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LOADING_HIDE});

                }else{

                    dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                            type:"btn-warn",

                            title:json.Msg,

                            ok:hideAlert(dispatch),

                            close:hideAlert(dispatch),

                            cancel:hideAlert(dispatch)

                        }});

                }

            });

        }else{

            dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                    type:"btn-warn",

                    title:"搜索的内容不能为空！",

                    ok:hideAlert(dispatch),

                    close:hideAlert(dispatch),

                    cancel:hideAlert(dispatch)

                }});

        }

    };

};

//取消教师的搜索.
const replaceTeacherSearchClose = (key) => {

    return dispatch => {

        dispatch({type:REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_CLOSE})

    }

};

//点击班级
const classChecked = (id) => {

  return ( dispatch,getState ) => {

      let { classCheckedList } = getState().Manager.AdjustByTeacherModal.replaceSchedule;

      let checked = false;

      classCheckedList.map(item => {

         if (item === id){

             checked = true;

             return;

         }

      });

      if (checked){

            classCheckedList.remove(id);

      }else{

          classCheckedList.push(id);

      }

      dispatch({type:REPLACE_SHCEDULE_CLASS_CHECKED,data:classCheckedList});

  }

};
//radio变化
const radioChange = (id) => {

    return dispatch => {

      dispatch({type:REPLACE_SHCEDULE_RADIO_CHANGE,data:id});

        let getMWC = Method.getGetData('/scheduleUnEndMonths');

        getMWC.then(json => {

            if (json.StatusCode === 200){

                if (id === 'month') {

                    const {ItemMoth} = json.Data;

                    let list = ItemMoth.map(item => {

                        return {

                            id: item.MonthID,

                            name: item.MonthName

                        }

                    });

                    dispatch({type: REPLACE_SHCEDULE_MONTHS_LIST_UPDATE, data: list});
                }

                if (id === 'week'){

                    const { ItemWeek } = json.Data;

                    let  list = ItemWeek.map(item => item.WeekNO);

                    console.log(list);

                    dispatch({type:REPLACE_SHCEDULE_WEEK_LIST_UPDATE,data:list});

                }

            }else{

                dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                        type:"btn-warn",

                        title:json.Msg,

                        ok:hideAlert(dispatch),

                        close:hideAlert(dispatch),

                        cancel:hideAlert(dispatch)

                    }});

            }

        });

    };

};
//月份变化
const monthChecked = (id) => {

    return (dispatch,getState) => {

        let {monthsCheckedList} = getState().Manager.AdjustByTeacherModal.replaceSchedule;

        if (monthsCheckedList.includes(id)){

            monthsCheckedList.remove(id);

        }else{

            monthsCheckedList.push(id);

        }

        dispatch({type:REPLACE_SHCEDULE_MONTHS_CHECKED,data:monthsCheckedList});

    }

};
//周次变化
const weekChecked = (id) => {

    return (dispatch,getState) => {

        let {weeksCheckedList} = getState().Manager.AdjustByTeacherModal.replaceSchedule;

        if (weeksCheckedList.includes(id)){

            weeksCheckedList.remove(id);

        }else{

            weeksCheckedList.push(id);

        }

        dispatch({type:REPLACE_SHCEDULE_MONTHS_CHECKED,data:weeksCheckedList});

    }

};








const hideAlert = (dispatch) => {

    return () => {dispatch({type:AppAlertActions.APP_ALERT_HIDE})};

};

Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};


export default {

    ADJUST_BY_TEACHER_SHOW,

    ADJUST_BY_TEACHER_HIDE,

    REPLACE_SHCEDULE_LOADING_HIDE,

    REPLACE_SHCEDULE_LOADING_SHOW,

    REPLACE_SHCEDULE_TEACHER_LIST_UPDATE,

    REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_SHOW,

    REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_HIDE,

    REPLACE_SHCEDULE_CLASS_LIST_UPDATE,

    REPLACE_SHCEDULE_TEACHER_DROP_CHANGE,

    REPLACE_SHCEDULE_TEACHER_SEARCH_OPEN,

    REPLACE_SHCEDULE_TEACHER_SEARCH_LOADING_SHOW,

    REPLACE_SHCEDULE_TEACHER_SEARCH_LIST_UPDATE,

    REPLACE_SHCEDULE_TEACHER_SEARCH_LOADING_HIDE,

    REPLACE_SHCEDULE_REPLACE_TEACHER_DROP_CHANGE,

    REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_OPEN,

    REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LOADING_SHOW,

    REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LIST_UPDATE,

    REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LOADING_HIDE,

    REPLACE_SHCEDULE_REPLACE_TEACHER_LIST_UPDATE,

    REPLACE_SHCEDULE_TEACHER_SEARCH_CLOSE,

    REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_CLOSE,

    REPLACE_SHCEDULE_CLASS_CHECKED,

    REPLACE_SHCEDULE_RADIO_CHANGE,

    REPLACE_SHCEDULE_MONTHS_LIST_UPDATE,

    REPLACE_SHCEDULE_MONTHS_CHECKED,

    REPLACE_SHCEDULE_WEEK_LIST_UPDATE,

    REPLACE_SHCEDULE_WEEK_CHECKED,

    replaceScheduleInit,

    teacherDropChange,

    teacherClickSearch,

    replaceTeacherDropChange,

    replaceTeacherClickSearch,

    teacherSearchClose,

    replaceTeacherSearchClose,

    classChecked,

    radioChange,

    monthChecked,

    weekChecked

};