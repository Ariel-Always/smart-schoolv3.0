import ApiActions from "../ApiActions";

import AppLoadingActions from '../AppLoadingActions';

import AppAlertActions from '../AppAlertActions';

import MSActions from '../../actions/ModuleSettingActions';

const MANAGER_SCHEDULE_SETTING_INIT = 'MANAGER_SCHEDULE_SETTING_INIT';

const MANAGER_SCHEDULE_SETTING_SETTING_TYPE_CHANGE = 'MANAGER_SCHEDULE_SETTING_SETTING_TYPE_CHANGE';

const MANAGER_SCHEDULE_SETTING_SETTING_PERIOD_TAB_TOGGLE = 'MANAGER_SCHEDULE_SETTING_SETTING_PERIOD_TAB_TOGGLE';

const MANAGER_SCHEDULE_SETTING_ADJUST_MODAL_SHOW = 'MANAGER_SCHEDULE_SETTING_ADJUST_MODAL_SHOW';

const MANAGER_SCHEDULE_SETTING_ADJUST_MODAL_HIDE = 'MANAGER_SCHEDULE_SETTING_ADJUST_MODAL_HIDE';

const MANAGER_SCHEDULE_SETTING_MORNING_RADIO_CHANGE = 'MANAGER_SCHEDULE_SETTING_MORNING_RADIO_CHANGE';

const MANAGER_SCHEDULE_SETTING_AFTERNOON_RADIO_CHANGE = 'MANAGER_SCHEDULE_SETTING_AFTERNOON_RADIO_CHANGE';

const MANAGER_SCHEDULE_SETTING_ADJUST_AFTERNOON_INPUT_CHANGE = 'MANAGER_SCHEDULE_SETTING_ADJUST_AFTERNOON_INPUT_CHANGE';

const MANAGER_SCHEDULE_SETTING_ADJUST_MORNING_INPUT_CHANGE = 'MANAGER_SCHEDULE_SETTING_ADJUST_MORNING_INPUT_CHANGE';

const MANAGER_SCHEDULE_SETTING_SETTING_UNIFY_INIT = 'MANAGER_SCHEDULE_SETTING_SETTING_UNIFY_INIT';

const MANAGER_SCHEDULE_SETTING_SETTING_PERIOD_INIT = 'MANAGER_SCHEDULE_SETTING_SETTING_PERIOD_INIT';

const MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_SHOW = 'MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_SHOW';

const MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_HIDE = 'MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_HIDE';






const PageInit = ({SchoolID}) => {

    return (dispatch) =>{

        dispatch({type:MSActions.MODULE_SETTINGS_UPDATE,data:{

                moduleCnName:"课程表设置",

                moduleEnName:"Schedule Setting",

                timeBar:false

            }});

        ApiActions.GetAllPeriodAndClassHours({SchoolID,dispatch}).then(data=>{

            if (data){

                let SettingType = data.CreateType;

                if (SettingType === 0){

                    let ClassHourList = {Morning:[],Afternoon:[]};

                    data.ItemClassHour.map(item=>{

                       if (item.ClassHourType===1){

                           ClassHourList.Morning.push(item);

                       }else if (item.ClassHourType===2){

                           ClassHourList.Afternoon.push(item);

                       }

                    });

                    let PeriodSettingList = data.ItemPeriod.map(item=>{

                        return {

                            ...item,

                            ClassHourList:{

                                Morning:[],

                                Afternoon:[]

                            }

                        }

                    });

                    dispatch({type:MANAGER_SCHEDULE_SETTING_INIT,data:{

                            SettingType,

                            SettingByUnify:{ClassHourList},

                            SettingByPeriod:{PeriodSettingList},

                            Times:data.Times,

                            IsEnable:data.IsEnable

                        }});

                }else{

                    let PeriodSettingList = data.ItemPeriod.map(item=>{

                        let ClassHour = { Morning:[],Afternoon:[] };

                        data.ItemClassHour.map(i=>{

                            if (item.PeriodID === i.PeriodID){

                                if (i.ClassHourType === 1){

                                    ClassHour.Morning.push(i);

                                }else if (i.ClassHourType===2){

                                    ClassHour.Afternoon.push(i)

                                }

                            }

                        });

                        return {

                            PeriodID:item.PeriodID,

                            PeriodName:item.PeriodName,

                            ClassHourList:ClassHour

                        }

                    });

                    let ClassHourList = {Morning:[],Afternoon:[]};

                    dispatch({type:MANAGER_SCHEDULE_SETTING_INIT,data:{

                            SettingType,

                            SettingByPeriod:{PeriodSettingList},

                            SettingByUnify:{ClassHourList},

                            Times:data.Times,

                            IsEnable:data.IsEnable

                        }});



                }

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});


            }else{

                //window.location.href='/error.aspx';

            }

        });

    }

};


const PageUpdate = () => {

    return (dispatch,getState) => {

        const {SchoolID} = getState().LoginUser;

        ApiActions.GetAllPeriodAndClassHours({SchoolID,dispatch}).then(data=>{

            if (data){

                let SettingType = data.CreateType;

                if (SettingType === 0){

                    let ClassHourList = {Morning:[],Afternoon:[]};

                    data.ItemClassHour.map(item=>{

                        if (item.ClassHourType===1){

                            ClassHourList.Morning.push(item);

                        }else if (item.ClassHourType===2){

                            ClassHourList.Afternoon.push(item);

                        }

                    });

                    let PeriodSettingList = data.ItemPeriod.map(item=>{

                        return {

                            ...item,

                            ClassHourList:{

                                Morning:[],

                                Afternoon:[]

                            }

                        }

                    });

                    dispatch({type:MANAGER_SCHEDULE_SETTING_INIT,data:{

                            SettingType,

                            SettingByUnify:{ClassHourList},

                            SettingByPeriod:{PeriodSettingList},

                            Times:data.Times,

                            IsEnable:data.IsEnable

                        }});

                }else{

                    let PeriodSettingList = data.ItemPeriod.map(item=>{

                        let ClassHour = { Morning:[],Afternoon:[] };

                        data.ItemClassHour.map(i=>{

                            if (item.PeriodID === i.PeriodID){

                                if (i.ClassHourType === 1){

                                    ClassHour.Morning.push(i);

                                }else if (i.ClassHourType===2){

                                    ClassHour.Afternoon.push(i)

                                }

                            }

                        });

                        return {

                            PeriodID:item.PeriodID,

                            PeriodName:item.PeriodName,

                            ClassHourList:ClassHour

                        }

                    });

                    let ClassHourList = {Morning:[],Afternoon:[]};

                    dispatch({type:MANAGER_SCHEDULE_SETTING_INIT,data:{

                            SettingType,

                            SettingByPeriod:{PeriodSettingList},

                            SettingByUnify:{ClassHourList},

                            Times:data.Times,

                            IsEnable:data.IsEnable

                        }});



                }

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});


            }else{

                //window.location.href='/error.aspx';

            }

        });

    }

};



//切换调整模式
const SettingTypeSitch = ({type}) => {

    return ( dispatch,getState ) => {

        const { SettingByUnify,SettingByPeriod } = getState().Manager.ScheduleSetting;

        let { ClassHourList } = SettingByUnify;

        let {PeriodSettingList} = SettingByPeriod;

        dispatch({type:MANAGER_SCHEDULE_SETTING_SETTING_TYPE_CHANGE,data:type});

        if (type===1){

            ClassHourList = { Morning:[],Afternoon:[] };

            dispatch({type:MANAGER_SCHEDULE_SETTING_SETTING_UNIFY_INIT,data:ClassHourList});

        }else if (type===0){

            PeriodSettingList = PeriodSettingList.map(item=>{

               return {

                   ...item,

                   ClassHourList:{

                       Morning:[],

                       Afternoon:[]

                   }

               }

            });

            dispatch({type:MANAGER_SCHEDULE_SETTING_SETTING_PERIOD_INIT,data:PeriodSettingList});

        }

        dispatch({type:AppAlertActions.APP_ALERT_HIDE});

        dispatch(AppAlertActions.alertSuccess({title:"切换成功，请添加课时"}));

    }

};

//批量调整课时
const AdjustClassHour = ({IsUnify,PeriodID,ClassHourList}) => {

    return (dispatch,getState) => {

            if (ClassHourList.length===0){

                dispatch(AppAlertActions.alertWarn({title:'您还没有添加课时，请先添加课时'}));

            }else{

                if (IsUnify){

                    dispatch({type:MANAGER_SCHEDULE_SETTING_ADJUST_MODAL_SHOW,data:""});

                }else{

                    dispatch({type:MANAGER_SCHEDULE_SETTING_ADJUST_MODAL_SHOW,data:PeriodID});

                }

            }

    }

};


//调课弹窗OK

const AdjustClassHourOk = () =>{

  return (dispatch,getState)=>{

      const { SchoolID } = getState().LoginUser;

      const { PeriodID,MorningTime,MorningRadioChecked,AfternoonTime,AfternoonRadioChecked } = getState().Manager.ScheduleSetting.AdjustClassHourModal;

      if (MorningRadioChecked===''&&AfternoonRadioChecked===''){

          dispatch(AppAlertActions.alertWarn({title:"没有任何操作!"}));

      }else{

          let MorningTimes,AfternoonTimes = 0;

          if (MorningRadioChecked==='before'){

            MorningTimes = -MorningTime;


          }else{

              MorningTimes = MorningTime

          }

          if (AfternoonRadioChecked==='before'){

              AfternoonTimes = -AfternoonTime

          }else{

              AfternoonTimes = AfternoonTime

          }

          ApiActions.UpdateClassHourTimeInstall({SchoolID,PeriodID,MorningTimes,AfternoonTimes,dispatch}).then(data=>{

             if (data===0){

                 dispatch({type:MANAGER_SCHEDULE_SETTING_ADJUST_MODAL_HIDE});

                 dispatch(AppAlertActions.alertSuccess({title:"调整成功！"}));

                 dispatch(PageUpdate());

             }

          });

      }

  }

};


//添加课时弹窗

const AddClassHour = (opts) => {

    return (dispatch,getState) => {

        const { PeriodID,IsUnify,type } = opts;

        const { SettingByPeriod,SettingByUnify } = getState().Manager.ScheduleSetting;

        const { ClassHourList } = SettingByUnify;

        const { PeriodSettingList } = SettingByPeriod;

        if (IsUnify){

            if (type==='morning'){

                if (ClassHourList.Morning.length>0){

                    let StartTimeList = ClassHourList.Morning[ClassHourList.Morning.length-1].StartTime.split(':');

                    let StartHour = StartTimeList[0],StartMin = StartTimeList[1];

                    let EndTimeList = ClassHourList.Morning[ClassHourList.Morning.length-1].EndTime.split(':');

                    let EndHour = EndTimeList[0],EndMin = EndTimeList[1];

                    console.log(StartHour,StartMin,EndHour,EndMin);

                }else{

                    let StartHour = '08',StartMin = '00',EndHour = '08',EndMin = '45';

                    dispatch({type:MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_SHOW,data:{StartHour,StartMin,EndHour,EndMin}});

                }

            }else {

                dispatch({type:MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_SHOW,data:{}});

            }

        }else{

            PeriodSettingList.map(item=>{

               if (item.PeriodID === PeriodID){

                   if (item.List.length>0){

                      let LastEndTime = item.List[item.List.length-1].EndTime;


                   }else{

                       dispatch({type:MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_SHOW,data:{PeriodID}});

                   }

               }

            });

        }



    }

};





export default {

    MANAGER_SCHEDULE_SETTING_INIT,

    MANAGER_SCHEDULE_SETTING_SETTING_TYPE_CHANGE,

    MANAGER_SCHEDULE_SETTING_SETTING_PERIOD_TAB_TOGGLE,

    MANAGER_SCHEDULE_SETTING_ADJUST_MODAL_SHOW,

    MANAGER_SCHEDULE_SETTING_ADJUST_MODAL_HIDE,

    MANAGER_SCHEDULE_SETTING_AFTERNOON_RADIO_CHANGE,

    MANAGER_SCHEDULE_SETTING_MORNING_RADIO_CHANGE,

    MANAGER_SCHEDULE_SETTING_ADJUST_AFTERNOON_INPUT_CHANGE,

    MANAGER_SCHEDULE_SETTING_ADJUST_MORNING_INPUT_CHANGE,

    MANAGER_SCHEDULE_SETTING_SETTING_UNIFY_INIT,

    MANAGER_SCHEDULE_SETTING_SETTING_PERIOD_INIT,

    MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_SHOW,

    MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_HIDE,

    PageInit,

    SettingTypeSitch,

    AdjustClassHour,

    AdjustClassHourOk,

    AddClassHour

};