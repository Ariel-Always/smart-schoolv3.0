import React from 'react';

import Method from '../Method';

import AppAlertActions from '../AppAlertActions';

//关于弹窗公共部分
const ADJUST_BY_TEACHER_SHOW = 'ADJUST_BY_TEACHER_SHOW';

const ADJUST_BY_TEACHER_HIDE = 'ADJUST_BY_TEACHER_HIDE';

const ADJUST_BY_TEACHER_TEACHER_LIST_UPDATE = 'ADJUST_BY_TEACHER_TEACHER_LIST_UPDATE';


//找人代课
const REPLACE_SHCEDULE_LOADING_SHOW = 'REPLACE_SHCEDULE_LOADING_SHOW';

const REPLACE_SHCEDULE_LOADING_HIDE = 'REPLACE_SHCEDULE_LOADING_HIDE';

const REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_SHOW = 'REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_SHOW';

const REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_HIDE = 'REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_HIDE';

const REPLACE_SHCEDULE_CLASS_LIST_UPDATE = 'REPLACE_SHCEDULE_CLASS_LIST_UPDATE';

const REPLACE_SHCEDULE_TEACHER_DROP_CHANGE = 'REPLACE_SHCEDULE_TEACHER_DROP_CHANGE';

const REPLACE_SHCEDULE_TEACHER_SEARCH_OPEN = 'REPLACE_SHCEDULE_TEACHER_SEARCH_OPEN';

const REPLACE_SHCEDULE_TEACHER_SEARCH_CLOSE = 'REPLACE_SHCEDULE_TEACHER_SEARCH_CLOSE';

const REPLACE_SHCEDULE_TEACHER_SEARCH_LOADING_SHOW = 'REPLACE_SHCEDULE_TEACHER_SEARCH_LOADING_SHOW';

const REPLACE_SHCEDULE_TEACHER_SEARCH_LIST_UPDATE = 'REPLACE_SHCEDULE_TEACHER_SEARCH_LIST_UPDATE';

const REPLACE_SHCEDULE_TEACHER_SEARCH_LOADING_HIDE = 'REPLACE_SHCEDULE_TEACHER_SEARCH_LOADING_HIDE';





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

const REPLACE_SHCEDULE_DATE_CHECKED = 'REPLACE_SHCEDULE_DATE_CHECKED';

const REPLACE_SHCEDULE_DATE_HEIGHT_CHANGE = 'REPLACE_SHCEDULE_DATE_HEIGHT_CHANGE';

const REPLACE_SHCEDULE_CLASSHOUR_DATE_CHECKED = 'REPLACE_SHCEDULE_CLASSHOUR_DATE_CHECKED';

const REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_LOADING_HIDE = 'REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_LOADING_HIDE';

const REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_LOADING_SHOW = 'REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_LOADING_SHOW';

const REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_UPDATE = 'REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_UPDATE';

const REPLACE_SHCEDULE_CLASSHOUR_LOADING_SHOW = 'REPLACE_SHCEDULE_CLASSHOUR_LOADING_SHOW';

const REPLACE_SHCEDULE_CLASSHOUR_LOADING_HIDE = 'REPLACE_SHCEDULE_CLASSHOUR_LOADING_HIDE';

const REPLACE_SHCEDULE_CLASSHOUR_LIST_CHANGE = 'REPLACE_SHCEDULE_CLASSHOUR_LIST_CHANGE';

const REPLACE_SHCEDULE_CLASSHOUR_CHECKED_LIST_CHANGE = 'REPLACE_SHCEDULE_CLASSHOUR_CHECKED_LIST_CHANGE';

//与人换课
const CHANGE_SHCEDULE_ORIGIN_TEACHER_DROP_CHANGE = 'CHANGE_SHCEDULE_ORIGIN_TEACHER_DROP_CHANGE';

const CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_OPEN = 'CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_OPEN';

const CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_CLOSE = 'CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_CLOSE';

const CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LOADING_SHOW = 'CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LOADING_SHOW';

const CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LIST_UPDATE = 'CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LIST_UPDATE';

const CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LOADING_HIDE = 'CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LOADING_HIDE';

const CHANGE_SHCEDULE_ORIGIN_TEACHER_DATE_PICK = 'CHANGE_SHCEDULE_ORIGIN_TEACHER_DATE_PICK';

const  CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_ABLED = 'CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_ABLED';

const CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_LIST_UPDATE = 'CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_LIST_UPDATE';

const CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_DROP_SELECTD = 'CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_DROP_SELECTD';

const CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_DISABLED = 'CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_DISABLED';


const CHANGE_SHCEDULE_TARGET_TEACHER_DROP_CHANGE = 'CHANGE_SHCEDULE_TARGET_TEACHER_DROP_CHANGE';

const CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_OPEN = 'CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_OPEN';

const CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_CLOSE = 'CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_CLOSE';

const CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LOADING_SHOW = 'CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LOADING_SHOW';

const CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LIST_UPDATE = 'CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LIST_UPDATE';

const CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LOADING_HIDE = 'CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LOADING_HIDE';

const CHANGE_SHCEDULE_TARGET_TEACHER_DATE_PICK = 'CHANGE_SHCEDULE_TARGET_TEACHER_DATE_PICK';

const  CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_ABLED = 'CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_ABLED';

const CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_LIST_UPDATE = 'CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_LIST_UPDATE';

const CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_DROP_SELECTD = 'CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_DROP_SELECTD';

const CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_DISABLED = 'CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_DISABLED';


//调整时间

const CHANGE_TIME_TEACHER_DROP_CHANGE = 'CHANGE_TIME_TEACHER_DROP_CHANGE';

const CHANGE_TIME_ORIGIN_CHANGE = 'CHANGE_TIME_ORIGIN_CHANGE';





//找人代课初始化
const replaceScheduleInit = () => {

    return ( dispatch,getState ) => {

        dispatch({type:REPLACE_SHCEDULE_LOADING_SHOW});

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

           dispatch({type:ADJUST_BY_TEACHER_TEACHER_LIST_UPDATE,data:teacherList});

            dispatch({type:REPLACE_SHCEDULE_LOADING_HIDE});

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

                    dispatch({type:REPLACE_SHCEDULE_WEEK_LIST_UPDATE,data:list});

                }

                if (id === 'classHour'){

                    let morning = { id:1,name:"上午",list:[] };

                    let afternoon = { id:2,name:"下午" ,list:[]};
                    
                    let night = { id:3,name:"晚上" ,list:[]};

                    json.Data.ItemClassHour.map(item => {

                        switch (item.ClassHourType) {

                            case 1:

                                morning['list'].push(item.ClassHourNO);

                                break;

                            case 2:

                                afternoon['list'].push(item.ClassHourNO);

                                break;

                            case 3:

                                night['list'].push(item.ClassHourNO);

                                break;

                            default:

                                morning['list'].push(item.ClassHourNO);

                        }

                    });

                    let classHourList = [];

                    if (morning.list.length>0){

                        classHourList.push(morning);

                    }

                    if (afternoon.list.length>0){

                        classHourList.push(afternoon);

                    }

                    if (night.list.length>0){

                        classHourList.push(night);

                    }

                    let classHourPlainOpts = JSON.parse(JSON.stringify(classHourList));

                    let classHourCheckedList = classHourList.map(item =>{

                        return{

                            id:item.id,

                            name:item.name,

                            checked:false,

                            list:[]

                        }

                    });

                    dispatch({type:REPLACE_SHCEDULE_CLASSHOUR_LIST_CHANGE,data:{classHourList,classHourPlainOpts,classHourCheckedList}});

                    dispatch({type:REPLACE_SHCEDULE_CLASSHOUR_LOADING_HIDE});

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

//日期变化
const dateChecked = (date) => {

    return (dispatch,getState) => {

        let { dateCheckedList } = getState().Manager.AdjustByTeacherModal.replaceSchedule;

        if (date ===''){

            dateCheckedList = [];

        }else{

            dateCheckedList.push(date);

        }

        dispatch({type:REPLACE_SHCEDULE_DATE_CHECKED,data:dateCheckedList});

    }

};
//课时日期选取
const classHourDateChecked = (date) => {

    return dispatch => {

        dispatch({type:REPLACE_SHCEDULE_CLASSHOUR_DATE_CHECKED,data:date});

        dispatch({type:REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_LOADING_SHOW});

        let getDatePromise = Method.getGetData(`/scheduleDateUpdate?ClassDate=${date}`);

        getDatePromise.then(json => {

           if (json.Status === 200){

                let WeekNO = json.Data.WeekNO;

                let weekDay = json.Data.WeekDay;

                let WeekDay = '';

               switch (weekDay) {

                   case 0:

                       WeekDay = '星期一';

                       break;

                   case 1:

                       WeekDay = '星期二';

                       break;

                   case 2:

                       WeekDay = '星期三';

                       break;

                   case 3:

                       WeekDay = '星期四';

                       break;

                   case 4:

                       WeekDay = '星期五';

                       break;

                   case 5:

                       WeekDay = '星期六';

                       break;

                   case 6:

                       WeekDay = '星期日';

                       break;

                   default:

                       WeekDay = '星期一';

               }

               dispatch({type:REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_UPDATE,data:{WeekNO,WeekDay}});

               dispatch({type:REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_LOADING_HIDE});

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


    }

};
//课时选取
const classHourChecked = (opts) => {

    return (dispatch,getState) => {

        const { classHourCheckedList,classHourPlainOpts } = getState().Manager.AdjustByTeacherModal.replaceSchedule;

        let checkedList = [];

        console.log(opts);

        if (opts.type === 'noon'){

            checkedList = classHourCheckedList.map((item) => {

                if (item.id === opts.id){
                    //判断状态如果是已选改为未选

                    if (item.checked){

                        return{

                            id:item.id,

                            checked:false,

                            list:[]

                        }

                    }else{//如果是未选改为已选

                        let list = [];

                        classHourPlainOpts.map(i => {

                            if (i.id === item.id){

                                list = i.list;

                            }

                        });

                        return {

                            id:item.id,

                            checked:true,

                            list

                        }

                    }

                }else{

                    return item;

                }

            });

        }else{

            checkedList = classHourCheckedList.map(item => {

                if (item.id === opts.pid){

                    //如果已经选中，去除选中的状态
                    if (item.list.includes(opts.id)){

                        item.list.remove(opts.id);

                        return {

                            id:item.id,

                            checked:false,

                            list:item.list

                        }

                    }else{//没有选中。先选中然后判断上一层的状态

                        item.list.push(opts.id);

                        let plainOptions = [];

                        classHourPlainOpts.map(i => {

                            if (i.id === item.id){

                                plainOptions = i.list;

                            }

                        });

                        //判断是否是需要置为全选
                        if(item.list.length === plainOptions.length){//需要全选

                            return{

                                id:item.id,

                                checked:true,

                                list:item.list

                            }

                        }else{//不需要全选

                            return{

                                id:item.id,

                                checked:false,

                                list:item.list

                            }

                        }

                    }

                }else{

                    return item;

                }

            });

        }

        dispatch({type:REPLACE_SHCEDULE_CLASSHOUR_CHECKED_LIST_CHANGE,data:checkedList});

    }

};

//与人换课
//点击原始教师选项
const originTeacherDropChange = (info) => {

    return ( dispatch,getState ) => {

        let { originDate } = getState().Manager.AdjustByTeacherModal.changeSchedule;

        dispatch({type:CHANGE_SHCEDULE_ORIGIN_TEACHER_DROP_CHANGE,data:{value:info.id,title:info.value}});

        if (originDate !== ''){

            let TeacherID = info.id;

            let ClassDate = originDate;

            let getChangeSchedulePromise = Method.getGetData(`/scheduleChangeTeacherSchedule?TeacherID${TeacherID}&ClassDate=${ClassDate}`);

            getChangeSchedulePromise.then(json => {

                if (json.StatusCode === 200 ){

                    let list = json.Data.map(item => {

                        let noon = '';

                        switch (item.ClassHourType) {

                            case 1:

                                noon = '上午';

                                break;

                            case 2:

                                noon = '下午';

                                break;

                            case 3:

                                noon = '晚上';

                                break;

                            default:

                                noon = '上午';

                        }

                        let title = <span>第{item.ClassHourNO}节<span className="noon">({noon})</span></span>

                        return {

                            value:item.ScheduleID,

                            title:title

                        }


                    });

                    dispatch({type:CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_ABLED});

                    dispatch({type:CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_LIST_UPDATE,data:list})

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

            }

        }

};
//搜索原始教师
const originTeacherClickSearch = (key) => {

    return (dispatch,getState) => {

        if (key !== ''){

            let SchoolID = getState().LoginUser;

            dispatch({type:CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_OPEN});

            dispatch({type:CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LOADING_SHOW});

            let searchTeacherPromise = Method.getGetData(`/scheduleSubjectTeacherTeacher?SchoolID=${SchoolID}&key=${key}`);

            searchTeacherPromise.then(json => {

                if (json.Status === 200){

                    let teacherSearchList = json.Data.map(item => {

                        return{

                            id:item.Teacher,

                            name:item.TeacherName

                        };

                    });

                    dispatch({type:CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LIST_UPDATE,data:teacherSearchList});

                    dispatch({type:CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LOADING_HIDE});

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
//取消原始教师搜索
const originTeacherSearchClose = () => {

    return dispatch => {

        dispatch({type:CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_CLOSE});

    }

};

//原始教师日期改变
const originDateChecked = (date) => {

    return (dispatch,getState) => {

        dispatch({type:CHANGE_SHCEDULE_ORIGIN_TEACHER_DATE_PICK,data:date});

        if (date !== ''){

            let { originDropSelectd } = getState().Manager.AdjustByTeacherModal.changeSchedule;

            if (originDropSelectd.value){

                let TeacherID = originDropSelectd.value;

                let ClassDate = date;

                let getChangeSchedulePromise = Method.getGetData(`/scheduleChangeTeacherSchedule?TeacherID${TeacherID}&ClassDate=${ClassDate}`);

                getChangeSchedulePromise.then(json => {

                   if (json.StatusCode === 200 ){

                        let list = json.Data.map(item => {

                            let noon = '';

                           switch (item.ClassHourType) {

                               case 1:

                                   noon = '上午';

                                   break;

                               case 2:

                                   noon = '下午';

                                   break;

                               case 3:

                                   noon = '晚上';

                                   break;

                               default:

                                   noon = '上午';

                           }

                           let title = <span>第{item.ClassHourNO}节<span className="noon">({noon})</span></span>

                           return {

                               value:item.ScheduleID,

                               title:title

                           }


                        });

                        dispatch({type:CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_ABLED});

                        dispatch({type:CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_LIST_UPDATE,data:list})

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

            }

        }else{

            dispatch({type:CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_DISABLED});

            dispatch({type:CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_LIST_UPDATE,data:''});

        }

    }

};

//待选节次变更
const originScheduleDropChange = (info) => {

    return ( dispatch ) => {

        console.log(info);

        dispatch({type:CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_DROP_SELECTD,data:info});

    }

};

const targetTeacherDropChange = (info) => {

    return ( dispatch,getState ) => {

        let { targetDate } = getState().Manager.AdjustByTeacherModal.changeSchedule;

        dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_DROP_CHANGE,data:{value:info.id,title:info.value}});

        if (targetDate !== ''){

            let TeacherID = info.id;

            let ClassDate = targetDate;

            let getChangeSchedulePromise = Method.getGetData(`/scheduleChangeTeacherSchedule?TeacherID${TeacherID}&ClassDate=${ClassDate}`);

            getChangeSchedulePromise.then(json => {

                if (json.StatusCode === 200 ){

                    let list = json.Data.map(item => {

                        let noon = '';

                        switch (item.ClassHourType) {

                            case 1:

                                noon = '上午';

                                break;

                            case 2:

                                noon = '下午';

                                break;

                            case 3:

                                noon = '晚上';

                                break;

                            default:

                                noon = '上午';

                        }

                        let title = <span>第{item.ClassHourNO}节<span className="noon">({noon})</span></span>

                        return {

                            value:item.ScheduleID,

                            title:title

                        }


                    });

                    dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_ABLED});

                    dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_LIST_UPDATE,data:list})

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

        }

    }

};
//搜索待选教师
const targetTeacherClickSearch = (key) => {

    return (dispatch,getState) => {

        if (key !== ''){

            let SchoolID = getState().LoginUser;

            dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_OPEN});

            dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LOADING_SHOW});

            let searchTeacherPromise = Method.getGetData(`/scheduleSubjectTeacherTeacher?SchoolID=${SchoolID}&key=${key}`);

            searchTeacherPromise.then(json => {

                if (json.Status === 200){

                    let teacherSearchList = json.Data.map(item => {

                        return{

                            id:item.Teacher,

                            name:item.TeacherName

                        };

                    });

                    dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LIST_UPDATE,data:teacherSearchList});

                    dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LOADING_HIDE});

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
//取消待选教师搜索
const targetTeacherSearchClose = () => {

    return dispatch => {

        dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_CLOSE});

    }

};

//待选教师日期改变
const targetDateChecked = (date) => {

    return (dispatch,getState) => {

        dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_DATE_PICK,data:date});

        if (date !== ''){

            let { targetDropSelectd } = getState().Manager.AdjustByTeacherModal.changeSchedule;

            if (targetDropSelectd.value){

                let TeacherID = targetDropSelectd.value;

                let ClassDate = date;

                let getChangeSchedulePromise = Method.getGetData(`/scheduleChangeTeacherSchedule?TeacherID${TeacherID}&ClassDate=${ClassDate}`);

                getChangeSchedulePromise.then(json => {

                    if (json.StatusCode === 200 ){

                        let list = json.Data.map(item => {

                            let noon = '';

                            switch (item.ClassHourType) {

                                case 1:

                                    noon = '上午';

                                    break;

                                case 2:

                                    noon = '下午';

                                    break;

                                case 3:

                                    noon = '晚上';

                                    break;

                                default:

                                    noon = '上午';

                            }

                            let title = <span>第{item.ClassHourNO}节<span className="noon">({noon})</span></span>

                            return {

                                value:item.ScheduleID,

                                title:title

                            }


                        });

                        dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_ABLED});

                        dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_LIST_UPDATE,data:list})

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

            }

        }else{

            dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_DISABLED});

            dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_LIST_UPDATE,data:''});

        }

    }

};

//待选节次变更
const targetScheduleDropChange = (info) => {

    return ( dispatch ) => {

        dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_DROP_SELECTD,data:info});

    }

};



//教师选择

const changeTimeTeacherDropChange = (info) => {

    return ( dispatch,getState ) => {

        let { originDate } = getState().Manager.AdjustByTeacherModal.changeTime;

        dispatch({type:CHANGE_TIME_TEACHER_DROP_CHANGE,data:{type:'drop',value:{value:info.id,title:info.value}}});


        if (originDate !== ''){

            let TeacherID = info.id;

            let ClassDate = originDate;

            let getChangeTimePromise = Method.getGetData(`/scheduleChangeTeacherSchedule?TeacherID${TeacherID}&ClassDate=${ClassDate}`);

            getChangeTimePromise.then(json => {

                if (json.StatusCode === 200 ){

                    let list = json.Data.map(item => {

                        let noon = '';

                        switch (item.ClassHourType) {

                            case 1:

                                noon = '上午';

                                break;

                            case 2:

                                noon = '下午';

                                break;

                            case 3:

                                noon = '晚上';

                                break;

                            default:

                                noon = '上午';

                        }

                        let title = <span>第{item.ClassHourNO}节<span className="noon">({noon})</span></span>

                        return {

                            value:item.ScheduleID,

                            title:title

                        }


                    });

                    let classRoomList = json.Data.map(item => {

                        return {

                            ScheduleID:item.ScheduleID,

                            ClassRoomID:item.ClassRoomID,

                            ClassRoomName:item.ClassRoomName

                        }


                    });

                    dispatch({type:CHANGE_TIME_ORIGIN_CHANGE,data:{type:"classHourAbled"}});

                    dispatch({type:CHANGE_TIME_ORIGIN_CHANGE,data:{type:'classHourListChange',value:list}});

                    dispatch({type:CHANGE_TIME_ORIGIN_CHANGE,data:{type:"oldClassRoomListChange",value:classRoomList}});


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

        }

    }

};

//点击搜索

const changeTimeTeacherClickSearch = (key) => {

    return (dispatch,getState) => {

        if (key !== ''){

            let SchoolID = getState().LoginUser;

            dispatch({type:CHANGE_TIME_TEACHER_DROP_CHANGE,data:{type:"search"}});

            dispatch({type:CHANGE_TIME_TEACHER_DROP_CHANGE,data:{type:"searchLoadingShow"}});

            let searchTeacherPromise = Method.getGetData(`/scheduleSubjectTeacherTeacher?SchoolID=${SchoolID}&key=${key}`);

            searchTeacherPromise.then(json => {

                if (json.Status === 200){

                    let teacherSearchList = json.Data.map(item => {

                        return{

                            id:item.Teacher,

                            name:item.TeacherName

                        };

                    });

                    dispatch({type:CHANGE_TIME_TEACHER_DROP_CHANGE,data:{type:'teacherListChange',value:teacherSearchList}});

                    dispatch({type:CHANGE_TIME_TEACHER_DROP_CHANGE,data:{type:"searchLoadingHide"}});

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

//点击取消搜索

const changeTimeTeacherSearchClose = () => {

    return dispatch => {

        dispatch({type:CHANGE_TIME_TEACHER_DROP_CHANGE,data:{type:"searchClose"}});

    }

};
//调整时间日期变化
const changeTimeOriginDate = (date) => {


    return (dispatch,getState) => {

        dispatch({type:CHANGE_TIME_ORIGIN_CHANGE,data:{type:"date",value:date}});

        if (date !== ''){

            let { teacherDrop } = getState().Manager.AdjustByTeacherModal.changeTime;

            if (teacherDrop.value!=='none'){

                let TeacherID = teacherDrop.value;

                let ClassDate = date;

                let getChangeTimePromise = Method.getGetData(`/scheduleChangeTeacherSchedule?TeacherID${TeacherID}&ClassDate=${ClassDate}`);

                let getDatePromise = Method.getGetData(`/scheduleDateUpdate?ClassDate=${date}`);

                Promise.all([getChangeTimePromise,getDatePromise]).then(res => {

                    const json1 = res[1];

                    const json2 = res[2];

                    //第一个异步
                    if (json1.StatusCode === 200 ){

                        let list = json1.Data.map(item => {

                            let noon = '';

                            switch (item.ClassHourType) {

                                case 1:

                                    noon = '上午';

                                    break;

                                case 2:

                                    noon = '下午';

                                    break;

                                case 3:

                                    noon = '晚上';

                                    break;

                                default:

                                    noon = '上午';

                            }

                            let title = <span>第{item.ClassHourNO}节<span className="noon">({noon})</span></span>

                            return {

                                value:item.ScheduleID,

                                title:title

                            }


                        });

                        let classRoomList = json1.Data.map(item => {

                            return {

                                ScheduleID:item.ScheduleID,

                                ClassRoomID:item.ClassRoomID,

                                ClassRoomName:item.ClassRoomName

                            }


                        });

                        dispatch({type:CHANGE_TIME_ORIGIN_CHANGE,data:{type:"classHourAbled"}});

                        dispatch({type:CHANGE_TIME_ORIGIN_CHANGE,data:{type:'classHourListChange',value:list}});

                        dispatch({type:CHANGE_TIME_ORIGIN_CHANGE,data:{type:"oldClassRoomListChange",value:classRoomList}});

                    }else{

                        dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                                type:"btn-warn",

                                title:json1.Msg,

                                ok:hideAlert(dispatch),

                                close:hideAlert(dispatch),

                                cancel:hideAlert(dispatch)

                            }});

                    }


                    //第二个异步

                    if (json2.Status === 200){

                        let WeekNO = json2.Data.WeekNO;

                        let weekDay = json2.Data.WeekDay;

                        let WeekDay = '';

                        switch (weekDay) {

                            case 0:

                                WeekDay = '星期一';

                                break;

                            case 1:

                                WeekDay = '星期二';

                                break;

                            case 2:

                                WeekDay = '星期三';

                                break;

                            case 3:

                                WeekDay = '星期四';

                                break;

                            case 4:

                                WeekDay = '星期五';

                                break;

                            case 5:

                                WeekDay = '星期六';

                                break;

                            case 6:

                                WeekDay = '星期日';

                                break;

                            default:

                                WeekDay = '星期一';

                        }

                        dispatch({type:CHANGE_TIME_ORIGIN_CHANGE,data:{type:'weekChange',value:{WeekNO,WeekDay}}});

                    }else{

                        dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                                type:"btn-warn",

                                title:json2.Msg,

                                ok:hideAlert(dispatch),

                                close:hideAlert(dispatch),

                                cancel:hideAlert(dispatch)

                            }});

                    }


                });


            }else{

                let getDatePromise = Method.getGetData(`/scheduleDateUpdate?ClassDate=${date}`);

                getDatePromise.then(json => {

                    if (json.Status === 200){

                        let WeekNO = json.Data.WeekNO;

                        let weekDay = json.Data.WeekDay;

                        let WeekDay = '';

                        switch (weekDay) {

                            case 0:

                                WeekDay = '星期一';

                                break;

                            case 1:

                                WeekDay = '星期二';

                                break;

                            case 2:

                                WeekDay = '星期三';

                                break;

                            case 3:

                                WeekDay = '星期四';

                                break;

                            case 4:

                                WeekDay = '星期五';

                                break;

                            case 5:

                                WeekDay = '星期六';

                                break;

                            case 6:

                                WeekDay = '星期日';

                                break;

                            default:

                                WeekDay = '星期一';

                        }

                        console.log(WeekDay,WeekNO);

                        dispatch({type:CHANGE_TIME_ORIGIN_CHANGE,data:{type:'weekChange',value:{WeekNO,WeekDay}}});

                    }else{

                        dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                                type:"btn-warn",

                                title:json.Msg,

                                ok:hideAlert(dispatch),

                                close:hideAlert(dispatch),

                                cancel:hideAlert(dispatch)

                            }});

                    }

                })

            }

        }else{

            dispatch({type:CHANGE_TIME_ORIGIN_CHANGE,data:{type:"classHourDisabled"}});

            dispatch({type:CHANGE_TIME_ORIGIN_CHANGE,data:{type:"weekChange",value:""}});

        }

    }

};

//旧的课时选取

const changTimeOldClassHourPick = (info) =>{

    return (dispatch,getState) => {

        const { oldClassRoomList,oldClassHourDrop,oldWeek } = getState().Manager.AdjustByTeacherModal.changeTime;

        const { value,title } = info;


        let classRoomObject = oldClassRoomList.find(item=>item.ScheduleID===value);

        dispatch({type:CHANGE_TIME_ORIGIN_CHANGE,data:{type:"classHourPick",value:info}});

        dispatch({type:CHANGE_TIME_ORIGIN_CHANGE,data:{type:"weekChange",value:{...oldWeek,ClassHour:title}}});

    }

};









const hideAlert = (dispatch) => {

    return () => {dispatch({type:AppAlertActions.APP_ALERT_HIDE})};

};

Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === val) return i;
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

    ADJUST_BY_TEACHER_TEACHER_LIST_UPDATE,

    REPLACE_SHCEDULE_LOADING_HIDE,

    REPLACE_SHCEDULE_LOADING_SHOW,

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

    REPLACE_SHCEDULE_TEACHER_SEARCH_CLOSE,

    REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_CLOSE,

    REPLACE_SHCEDULE_CLASS_CHECKED,

    REPLACE_SHCEDULE_RADIO_CHANGE,

    REPLACE_SHCEDULE_MONTHS_LIST_UPDATE,

    REPLACE_SHCEDULE_MONTHS_CHECKED,

    REPLACE_SHCEDULE_WEEK_LIST_UPDATE,

    REPLACE_SHCEDULE_WEEK_CHECKED,

    REPLACE_SHCEDULE_DATE_CHECKED,

    REPLACE_SHCEDULE_CLASSHOUR_DATE_CHECKED,

    REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_LOADING_HIDE,

    REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_LOADING_SHOW,

    REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_UPDATE,

    REPLACE_SHCEDULE_CLASSHOUR_LOADING_SHOW,

    REPLACE_SHCEDULE_CLASSHOUR_LOADING_HIDE,

    REPLACE_SHCEDULE_CLASSHOUR_LIST_CHANGE,

    REPLACE_SHCEDULE_CLASSHOUR_CHECKED_LIST_CHANGE,

    //与人换课
    CHANGE_SHCEDULE_ORIGIN_TEACHER_DROP_CHANGE,

    CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_OPEN,

    CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_CLOSE,

    CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LOADING_SHOW,

    CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LIST_UPDATE,

    CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LOADING_HIDE,

    CHANGE_SHCEDULE_ORIGIN_TEACHER_DATE_PICK,

    CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_ABLED,

    CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_LIST_UPDATE,

    CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_DROP_SELECTD,

    CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_DISABLED,

    CHANGE_SHCEDULE_TARGET_TEACHER_DROP_CHANGE,

    CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_OPEN,

    CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_CLOSE,

    CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LOADING_SHOW,

    CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LIST_UPDATE,

    CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LOADING_HIDE,

    CHANGE_SHCEDULE_TARGET_TEACHER_DATE_PICK,

    CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_ABLED,

    CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_LIST_UPDATE,

    CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_DROP_SELECTD,

    CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_DISABLED,


    //调整时间

    CHANGE_TIME_TEACHER_DROP_CHANGE,

    CHANGE_TIME_ORIGIN_CHANGE,


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

    weekChecked,

    dateChecked,

    classHourDateChecked,

    classHourChecked,

    //与人换课

    originTeacherDropChange,

    originTeacherClickSearch,

    originTeacherSearchClose,

    originDateChecked,

    originScheduleDropChange,

    targetTeacherDropChange,

    targetTeacherClickSearch,

    targetTeacherSearchClose,

    targetDateChecked,

    targetScheduleDropChange,


    //调整时间
    changeTimeTeacherDropChange,

    changeTimeTeacherClickSearch,

    changeTimeTeacherSearchClose,

    changeTimeOriginDate,

    changTimeOldClassHourPick

};