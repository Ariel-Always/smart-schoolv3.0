import React from 'react';

import AppAlertActions from '../AppAlertActions';

import ApiActions from '../ApiActions';

import ComPageRefresh from '../ComPageRefresh'

//关于弹窗公共部分
const MANAGER_ADJUST_BY_CLASSROOM_SHOW = 'MANAGER_ADJUST_BY_CLASSROOM_SHOW';

const MANAGER_ADJUST_BY_CLASSROOM_HIDE = 'MANAGER_ADJUST_BY_CLASSROOM_HIDE';

const MANAGER_ADJUST_BY_CLASSROOM_CLASSROOM_LIST_UPDATE = 'MANAGER_ADJUST_BY_CLASSROOM_CLASSROOM_LIST_UPDATE';

const MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_CLASSROOM_CHANGE = 'MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_CLASSROOM_CHANGE';

const MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_OPEN = 'MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_OPEN';

const MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LOADING_SHOW = 'MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LOADING_SHOW';

const MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LOADING_HIDE = 'MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LOADING_HIDE';

const MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LIST_UPDATE = 'MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LIST_UPDATE';

const MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_CLOSE = 'MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_CLOSE';


const MANAGER_ADJUST_BY_CLASSROOM_TARGET_CLASSROOM_CHANGE = 'MANAGER_ADJUST_BY_CLASSROOM_TARGET_CLASSROOM_CHANGE';

const MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_OPEN = 'MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_OPEN';

const MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LOADING_SHOW = 'MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LOADING_SHOW';

const MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LOADING_HIDE = 'MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LOADING_HIDE';

const MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LIST_UPDATE = 'MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LIST_UPDATE';

const MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_CLOSE = 'MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_CLOSE';





const MANAGER_ADJUST_BY_CLASSROOM_LOADING_SHOW = 'MANAGER_ADJUST_BY_CLASSROOM_LOADING_SHOW';

const MANAGER_ADJUST_BY_CLASSROOM_LOADING_HIDE = 'MANAGER_ADJUST_BY_CLASSROOM_LOADING_HIDE';





const REPLACE_SHCEDULE_ERROR_TIPS_SHOW = 'REPLACE_SHCEDULE_ERROR_TIPS_SHOW';

const REPLACE_SHCEDULE_ERROR_TIPS_HIDE = 'REPLACE_SHCEDULE_ERROR_TIPS_HIDE';




//找人代课初始化
const PageInit = () => {

    return ( dispatch,getState ) => {

        dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_LOADING_SHOW});

        let {LoginUser} = getState();

        let { SchoolID } = LoginUser;

        ApiActions.GetAllOptionForAddSchedule({SchoolID,dispatch}).then(data => {

            if (data){

                let ClassRoomList = data.ItemClassRoomType.map(item => {

                    let list =  data.ItemClassRoom.map(i => {

                        if (i.ClassRoomTypeID === item.ClassRoomTypeID){

                            return{

                                name:i.ClassRoomName,

                                id:i.ClassRoomID

                            }

                        }else{

                            return;

                        }

                    }).filter(itm => itm!==undefined);

                    return {

                        id:item.ClassRoomTypeID,

                        name:item.ClassRoomTypeName,

                        list

                    }

                });

                dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_CLASSROOM_LIST_UPDATE,data:ClassRoomList});

            }

            dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_LOADING_HIDE});

        });

    };

};

//教室搜索
const OriginClassRoomSearch = (key) => {

    return (dispatch,getState) => {

        if (key !== ''){

            let {SchoolID} = getState().LoginUser;

            dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_OPEN});

            dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LOADING_SHOW});

            ApiActions.GetClassRoomByClassTypeAndKey({SchoolID,PeriodID:'',ClassRoomTypeID:'',Key:key,dispatch}).then(data=>{

                if (data){

                    let SearchList = data.map(item => {

                        return{

                            id:item.ClassRoomID,

                            name:item.ClassRoomName

                        };

                    });

                    dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LIST_UPDATE,data:SearchList});


                }

                dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LOADING_HIDE});


            });


        }else{

           dispatch(AppAlertActions.alertWarn({title:"搜索的内容不能为空！"}));

        }

    };

};

//取消教师的搜索
const OriginClassRoomCancelSearch = () => {

    return dispatch => {

        dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_CLOSE});

    }

};


//目标教室搜索
const TargetClassRoomSearch = (key) => {

    return (dispatch,getState) => {

        if (key !== ''){

            let {SchoolID} = getState().LoginUser;

            dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_OPEN});

            dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LOADING_SHOW});

            ApiActions.GetClassRoomByClassTypeAndKey({SchoolID,PeriodID:'',ClassRoomTypeID:'',Key:key,dispatch}).then(data=>{

                if (data){

                    let SearchList = data.map(item => {

                        return{

                            id:item.ClassRoomID,

                            name:item.ClassRoomName

                        };

                    });

                    dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LIST_UPDATE,data:SearchList});


                }

                dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LOADING_HIDE});


            });


        }else{

            dispatch(AppAlertActions.alertWarn({title:"搜索的内容不能为空！"}));

        }

    };

};

//取消目标教室的搜索
const TargetClassRoomCancelSearch = () => {

    return dispatch => {

        dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_CLOSE});

    }

};




//radio变化
const radioChange = (id) => {

    return (dispatch,getState) => {

      dispatch({type:REPLACE_SHCEDULE_RADIO_CHANGE,data:id});

        let { SchoolID } = getState().LoginUser;

        ApiActions.GetAllDateTimeInfo({SchoolID,dispatch}).then(data => {

            if (data) {

                if (id === 'month') {

                    const {ItemMonth} = data;



                    let list = ItemMonth.map(item => {

                        return {

                            id: item.MonthID,

                            name: item.MonthName

                        }

                    });

                    dispatch({type: REPLACE_SHCEDULE_MONTHS_LIST_UPDATE, data: list});



                }

                if (id === 'week') {

                    const {ItemWeek} = data;

                    let list = ItemWeek.map(item => item.WeekNO);

                    dispatch({type: REPLACE_SHCEDULE_WEEK_LIST_UPDATE, data: list});

                }

                if (id === 'classHour') {

                    let morning = {id: 1, name: "上午", list: []};

                    let afternoon = {id: 2, name: "下午", list: []};

                    let night = {id: 3, name: "晚上", list: []};

                    data.ItemClassHour.map(item => {

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

                    if (morning.list.length > 0) {

                        classHourList.push(morning);

                    }

                    if (afternoon.list.length > 0) {

                        classHourList.push(afternoon);

                    }

                    if (night.list.length > 0) {

                        classHourList.push(night);

                    }

                    let classHourPlainOpts = JSON.parse(JSON.stringify(classHourList));

                    let classHourCheckedList = classHourList.map(item => {

                        return {

                            id: item.id,

                            name: item.name,

                            checked: false,

                            list: []

                        }

                    });

                    dispatch({
                        type: REPLACE_SHCEDULE_CLASSHOUR_LIST_CHANGE,
                        data: {classHourList, classHourPlainOpts, classHourCheckedList}
                    });

                    dispatch({type: REPLACE_SHCEDULE_CLASSHOUR_LOADING_HIDE});

                }

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

    return (dispatch,getState) => {

        dispatch({type:REPLACE_SHCEDULE_CLASSHOUR_DATE_CHECKED,data:date});

        dispatch({type:REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_LOADING_SHOW});

        let { SchoolID } = getState().LoginUser;

        if (date){

            ApiActions.GetWeekInfoByDate({SchoolID,ClassDate:date,dispatch}).then(data => {

                if (data){

                    let WeekNO = data.WeekNO;

                    let weekDay = data.WeekDay;

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

                }

            });

        }

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








//提交按教师修改弹窗

//提交弹窗

const ModalCommit = () => {

  return (dispatch,getState) => {

      const { AdjustByTeacherModal } = getState().Manager;

      const { activeKey } = AdjustByTeacherModal;

      const { replaceSchedule,changeSchedule,changeTime,ChangeClassRoom,StopSchedule } = AdjustByTeacherModal;

      //是否是第一个tab

      if (activeKey==='1'){

        let {

            activeRadio,

            teacherOptions,

            replaceTeacherOptions,

            classCheckedList,

            classList,

            monthsCheckedList,

            weeksCheckedList,

            dateCheckedList,

            classHourCheckedList,

            classHourDate

        } = replaceSchedule;

        let originTeacherOk,replaceTeacherOk,classOk,dayLineOk = false;

        //判断原始教师是否已被选择
        if (teacherOptions.dropSelectd.value==='none'){

            dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"originTeacher",title:"请选择教师"}});

        }else{

            originTeacherOk = true;

            dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"originTeacher"}});


        }

        //判断替代的教师是否已被选择
          if (replaceTeacherOptions.dropSelectd.value==='none'){

              dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"replaceTeacher",title:"请选择教师"}});

          }else{

              replaceTeacherOk = true;

              dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"replaceTeacher"}});

          }

          //判断班级是否选择

          if (classList.length>0){

              if (classCheckedList.length>0){

                  classOk = true;

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"class"}});

              }else{

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"class",title:"请选择班级"}});

              }

          }


          if (activeRadio === 'all'){

              dayLineOk = true;

          }

          if (activeRadio === 'month'){

              if(monthsCheckedList.length>0){

                  dayLineOk = true;

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"month"}})

              }else{

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"month",title:"请选择月份"}})

              }

          }

          if (activeRadio === 'week'){

              if(weeksCheckedList.length>0){

                  dayLineOk = true;

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"week"}})

              }else{

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"week",title:"请选择周次"}})

              }

          }

          if (activeRadio === 'date'){

              if(dateCheckedList.length>0){

                  dayLineOk = true;

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"date"}})

              }else{

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"date",title:"请选择日期"}})

              }

          }

          if (activeRadio === 'classHour'){

              let thisDateOk,thisClassHourOk = false;

              let classHourLength = 0;

              classHourCheckedList.map(item => {

                  classHourLength = classHourLength + item.list.length;

              });

              if (classHourDate){

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"classHourDate"}});

                  thisDateOk = true;

              }else {

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"classHourDate",title:"请选择日期"}});


              }



              if (classHourLength>0){

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"classHour"}});

                  thisClassHourOk = true;

              }else {

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"classHour",title:"请选择课时"}});


              }


              if (thisDateOk&&thisClassHourOk){

                  dayLineOk = true;

              }

          }


          //所有的都已经OK了可以向后台发送请求了
          if (originTeacherOk&replaceTeacherOk&classOk&dayLineOk){

              let Type,Item = '';

              switch (activeRadio) {

                  case 'all':

                      Type = 0;

                      break;

                  case 'month':

                      Type = 1;

                      Item = monthsCheckedList.join(',');

                      break;

                  case 'week':

                      Type = 2;

                      Item = weeksCheckedList.join(',');

                      break;

                  case 'date':

                      Type = 3;

                      Item = dateCheckedList.join(',');

                      break;

                  case 'classHour':

                      Type = 4;

                       let list = classHourCheckedList.map(item=>item.list);

                       let ClassHoursLit = [...list];

                      Item = `${classHourDate};${ClassHoursLit.join(',')}`;

                      break;

                  default:

                      Type = 0;

                      Item = '';


              }

              let { SchoolID,UserID,UserType } = getState().LoginUser;

              let TeacherID1 = teacherOptions.dropSelectd.value;

              let TeacherID2 = replaceTeacherOptions.dropSelectd.value;

              let SubjectID = '';

              let {teacherSubject,classCheckedList} =  getState().Manager.AdjustByTeacherModal.replaceSchedule;

              if (teacherSubject.dropShow){

                 SubjectID = teacherSubject.select.dropSelectd.value;

              }else{

                  SubjectID = teacherSubject.id;

              }

              let ClassID = classCheckedList.join(',');

              let ClassNameList = classCheckedList.map(item=>{

                  return classList.find(i=>i.id===item).name

              }).join(',');



              dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_LOADING_SHOW});

              ApiActions.SetSubstituteTeacher({

                  Type,Item,TeacherID1,TeacherID2,dispatch,

                  SchoolID,UserID,UserType:parseInt(UserType),SubjectID,ClassID,ClassName:ClassNameList

              }).then((data) => {

                  if (data===0){

                      dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_HIDE});

                      dispatch(AppAlertActions.alertSuccess({title:"找人代课成功！"}));

                      ComPageRefresh.ComPageUpdate(dispatch);

                  }

                  dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_LOADING_HIDE});

              })

          }


      }


      if (activeKey==='2'){

        let {

            originDropSelectd,originDate,originScheduleDropSelectd,

            targetDropSelectd,targetDate,targetScheduleDropSelectd } = changeSchedule;

        let originTeacherOk,originDateOk,originScheduleOk,targetTeacherOk,targetDateOk,targetScheduleOk = false;


        if (originDropSelectd.value==='none'){

                dispatch({type:CHANGE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"originTeacher"}});

            }else{

                dispatch({type:CHANGE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"originTeacher"}});

                originTeacherOk = true;

            }


          if (originDate){

              dispatch({type:CHANGE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"originDate"}});

              originDateOk = true;

          }else{

              dispatch({type:CHANGE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"originDate"}});

          }

          if (originScheduleDropSelectd.value==='none'){

              dispatch({type:CHANGE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"originSchedule"}});

          }else{

              dispatch({type:CHANGE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"originSchedule"}});

              originScheduleOk = true;

          }

          if (targetDropSelectd.value==='none'){

              dispatch({type:CHANGE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"targetTeacher"}});

          }else{

              dispatch({type:CHANGE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"targetTeacher"}});

              targetTeacherOk = true;

          }

          if (targetDate){

              dispatch({type:CHANGE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"targetDate"}});

              targetDateOk = true;

          }else{

              dispatch({type:CHANGE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"targetDate"}});

          }

          if (targetScheduleDropSelectd.value==='none'){

              dispatch({type:CHANGE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"targetSchedule"}});

          }else{

              dispatch({type:CHANGE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"targetSchedule"}});

              targetScheduleOk = true;

          }

          if (originDateOk&&originTeacherOk&&originScheduleOk&&targetTeacherOk&&targetDateOk&&targetScheduleOk){


              const { UserID,UserType } = getState().LoginUser;

              let ScheduleID1 = originScheduleDropSelectd.value;

              let ScheduleID2 = targetScheduleDropSelectd.value;

              dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_LOADING_SHOW});

              ApiActions.ExchangeTeacherSchedule({UserID,UserType:parseInt(UserType),ScheduleID1,ScheduleID2,dispatch}).then(data=>{

                 if (data===0){

                     dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_HIDE});

                     dispatch(AppAlertActions.alertSuccess({title:"与人换课成功！"}));

                     ComPageRefresh.ComPageUpdate(dispatch);

                 }

                  dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_LOADING_HIDE});

              });

          }

      }

      if (activeKey==='3'){

            let { oldClassHourList,errorTips,teacherDrop,originDate,oldClassHourDrop,newDate,newClassHourDrop,newClassRoomDrop } = changeTime;


            let teacherOk,originDateOk,originSchedukeOk,targetDateOk,targetScheduleOk,targetClassRoomOk = false;

            if (teacherDrop.value==='none'){

                dispatch({type:CHANGE_TIME_ERROR_TIPS_SHOW,data:{type:"teacher"}});

            }else{

                dispatch({type:CHANGE_TIME_ERROR_TIPS_HIDE,data:{type:"teacher"}});

                teacherOk = true;

            }

          if (originDate){

              dispatch({type:CHANGE_TIME_ERROR_TIPS_HIDE,data:{type:"originDate"}});

              originDateOk = true;

          }else{

              dispatch({type:CHANGE_TIME_ERROR_TIPS_SHOW,data:{type:"originDate"}});

          }

          if (oldClassHourDrop.value==='none'){

              dispatch({type:CHANGE_TIME_ERROR_TIPS_SHOW,data:{type:"originSchedule"}});

          }else{

              dispatch({type:CHANGE_TIME_ERROR_TIPS_HIDE,data:{type:"originSchedule"}});

              originSchedukeOk = true;

          }

          if (newDate){

              dispatch({type:CHANGE_TIME_ERROR_TIPS_HIDE,data:{type:"targetDate"}});

              targetDateOk = true;

          }else{

              dispatch({type:CHANGE_TIME_ERROR_TIPS_SHOW,data:{type:"targetDate"}});

          }

          if (newClassHourDrop.value==='none'){

              dispatch({type:CHANGE_TIME_ERROR_TIPS_SHOW,data:{type:"targetSchedule"}});

          }else{

              dispatch({type:CHANGE_TIME_ERROR_TIPS_HIDE,data:{type:"targetSchedule"}});

              targetScheduleOk = true;

          }

          if (newClassRoomDrop.value==='none'){

              dispatch({type:CHANGE_TIME_ERROR_TIPS_SHOW,data:{type:"targetClassRoom"}});

          }else{

              dispatch({type:CHANGE_TIME_ERROR_TIPS_HIDE,data:{type:"targetClassRoom"}});

              targetClassRoomOk = true;

          }

          if (teacherOk&&originDateOk&&originSchedukeOk&&targetDateOk&&targetScheduleOk&&targetClassRoomOk&&(!errorTips)){

              let { UserID,UserType } = getState().LoginUser;

              let ScheduleID = oldClassHourDrop.value;

              let ClassDate1 = originDate;

              let ClassHourNO1 = oldClassHourList.find(item=>item.value === ScheduleID).no;

              let ClassDate2 = newDate;

              let ClassHourNO2 = newClassHourDrop.value;

              let ClassRoomID = newClassRoomDrop.value;

              dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_LOADING_SHOW});

              ApiActions.EditClassDateOne({

                  UserID,UserType,ScheduleID,ClassDate1,ClassHourNO1,ClassDate2,ClassHourNO2,ClassRoomID,dispatch

              }).then(data=>{

                 if (data===0){

                     dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_HIDE});

                     dispatch(AppAlertActions.alertSuccess({title:"调整时间成功！"}));

                     ComPageRefresh.ComPageUpdate(dispatch);

                 }

                  dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_LOADING_HIDE});

              });



          }

      }

      if (activeKey==='4'){

          let { classHourList,teacherDrop,date,classHourDrop,teacherClassRoom,classRoomDrop } = ChangeClassRoom;

          let teacherOk,dateOk,scheduleOk,targetClassRoomOk = false;

          if (teacherDrop.value==='none'){

              dispatch({type:CHANGE_CLASS_ROOM_ERROR_TIPS_SHOW,data:{type:"teacher"}});

          }else{

              dispatch({type:CHANGE_CLASS_ROOM_ERROR_TIPS_HIDE,data:{type:"teacher"}});

              teacherOk = true;

          }

          if (date){

              dispatch({type:CHANGE_CLASS_ROOM_ERROR_TIPS_HIDE,data:{type:"date"}});

              dateOk = true;

          }else{

              dispatch({type:CHANGE_CLASS_ROOM_ERROR_TIPS_SHOW,data:{type:"date"}});

          }

          if (classHourDrop.value==='none'){

              dispatch({type:CHANGE_CLASS_ROOM_ERROR_TIPS_SHOW,data:{type:"schedule"}});

          }else{

              dispatch({type:CHANGE_CLASS_ROOM_ERROR_TIPS_HIDE,data:{type:"schedule"}});

              scheduleOk = true;

          }

          if (classRoomDrop.value==='none'){

              dispatch({type:CHANGE_CLASS_ROOM_ERROR_TIPS_SHOW,data:{type:"targetClassRoom"}});

          }else{

              dispatch({type:CHANGE_CLASS_ROOM_ERROR_TIPS_HIDE,data:{type:"targetClassRoom"}});

              targetClassRoomOk = true;

          }

          if (teacherOk&&dateOk&&scheduleOk&&targetClassRoomOk){

              dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_LOADING_SHOW});

              let { SchoolID,UserType,UserID } = getState().LoginUser;

              let ClassHourNo = classHourList.find(item=>item.value === classHourDrop.value).NO;

              let Type = 4;

              let Item = `${date};${ClassHourNo}`;

              let ClassRoomID1 = teacherClassRoom.id;

              let ClassRoomID2 = classRoomDrop.value;

              ApiActions.AdjustClassRooomOfSchedule({

                  UserID,UserType,SchoolID,Type,Item,ClassRoomID1,ClassRoomID2,dispatch

              }).then(data=>{


                  if (data===0){

                      dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_HIDE});

                      dispatch(AppAlertActions.alertSuccess({title:"调整教室成功！"}));

                      ComPageRefresh.ComPageUpdate(dispatch);

                  }

                  dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_LOADING_HIDE});

              });


          }

      }

      if (activeKey==='5'){

        let { teacherDrop,date,classHoursCheckedList } = StopSchedule;

        let teacherOk,dateOk,scheduleOk = false;

        let ScheduleLength = 0;

        classHoursCheckedList.map(item=>{

            ScheduleLength = ScheduleLength + item.list.length;

        });

        if (teacherDrop.value==='none'){

            dispatch({type:STOP_SCHEDULE_ERROR_TIPS_SHOW,data:{type:"teacher"}});

        }else{

            dispatch({type:STOP_SCHEDULE_ERROR_TIPS_HIDE,data:{type:"teacher"}});

            teacherOk = true;

        }

          if (date){

              dispatch({type:STOP_SCHEDULE_ERROR_TIPS_HIDE,data:{type:"date"}});

              dateOk = true;

          }else{

              dispatch({type:STOP_SCHEDULE_ERROR_TIPS_SHOW,data:{type:"date"}});

          }

          if (ScheduleLength>0){

              dispatch({type:STOP_SCHEDULE_ERROR_TIPS_HIDE,data:{type:"schedule"}});

              scheduleOk = true;

          }else{

              dispatch({type:STOP_SCHEDULE_ERROR_TIPS_SHOW,data:{type:"schedule"}});

          }

          if (teacherOk&&dateOk&&scheduleOk){

              dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_LOADING_SHOW});

              let ScheduleList = [...classHoursCheckedList.map(item=>item.list)];

              let ScheduleIDs = ScheduleList.join(',');

              let { UserID,UserType } = getState().LoginUser;

              ApiActions.CloseTeacherSchedule({

                  UserID,UserType ,ScheduleIDs,dispatch

              }).then(data=>{

                  if (data===0){

                      dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_HIDE});

                      dispatch(AppAlertActions.alertSuccess({title:"停课成功！"}))

                      ComPageRefresh.ComPageUpdate(dispatch);

                  }

                  dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_LOADING_HIDE});

              })

          }

      }

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

    MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_CLASSROOM_CHANGE,

    MANAGER_ADJUST_BY_CLASSROOM_SHOW,

    MANAGER_ADJUST_BY_CLASSROOM_HIDE,

    MANAGER_ADJUST_BY_CLASSROOM_CLASSROOM_LIST_UPDATE,

    MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LOADING_SHOW,

    MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LOADING_HIDE,

    MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_OPEN,

    MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LIST_UPDATE,

    MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_CLOSE,

    MANAGER_ADJUST_BY_CLASSROOM_TARGET_CLASSROOM_CHANGE,

    MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LOADING_SHOW,

    MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LOADING_HIDE,

    MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_OPEN,

    MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LIST_UPDATE,

    MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_CLOSE,

    MANAGER_ADJUST_BY_CLASSROOM_LOADING_SHOW,

    MANAGER_ADJUST_BY_CLASSROOM_LOADING_HIDE,

    REPLACE_SHCEDULE_ERROR_TIPS_SHOW,

    REPLACE_SHCEDULE_ERROR_TIPS_HIDE,

    PageInit,

    OriginClassRoomSearch,

    OriginClassRoomCancelSearch,

    TargetClassRoomSearch,

    TargetClassRoomCancelSearch,

    radioChange,

    monthChecked,

    weekChecked,

    dateChecked,

    classHourDateChecked,

    classHourChecked,

    //提交弹窗

    ModalCommit

};