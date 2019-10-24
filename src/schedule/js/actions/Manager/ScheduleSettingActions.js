import ApiActions from "../ApiActions";

import AppLoadingActions from '../AppLoadingActions';

import AppAlertActions from '../AppAlertActions';

import MSActions from '../../actions/ModuleSettingActions';

const MANAGER_SCHEDULE_SETTING_INIT = 'MANAGER_SCHEDULE_SETTING_INIT';

const MANAGER_SCHEDULE_SETTING_SETTING_TYPE_CHANGE = 'MANAGER_SCHEDULE_SETTING_SETTING_TYPE_CHANGE';


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

                let MultiplePeriod = false;

                switch (parseInt(data.SchoolType)) {

                    case 3: case 5: case 6: case 7:

                        MultiplePeriod = true;

                        break;

                    default:

                        MultiplePeriod = false;



                }

                if (SettingType === 0){

                    let ClassHourList = data.ItemClassHour;

                    let PeriodSettingList = data.ItemPeriod.map(item=>{

                        return {

                            ...item,

                            list:[]

                        }

                    });

                    dispatch({type:MANAGER_SCHEDULE_SETTING_INIT,data:{

                            MultiplePeriod, SettingType,

                            SettingByUnify:{ClassHourList},

                            SettingByPeriod:{PeriodSettingList}

                        }});

                }else{

                    let PeriodSettingList = data.ItemPeriod.map(item=>{

                        let list = [];

                        data.ItemClassHour.map(i=>{

                            if (item.PeriodID === i.PeriodID){

                                list.push(i);

                            }

                        });

                        return {

                            PeriodID:item.PeriodID,

                            PeriodName:item.PeriodName

                        }

                    });

                    dispatch({type:MANAGER_SCHEDULE_SETTING_INIT,data:{

                            MultiplePeriod, SettingType,

                            SettingByPeriod:{PeriodSettingList}

                        }});

                }

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});


            }else{

                //window.location.href='/error.aspx';

            }

        });

    }

};

const SettingTypeSitch = ({type}) => {

    return ( dispatch,getState ) => {

        dispatch({type:MANAGER_SCHEDULE_SETTING_SETTING_TYPE_CHANGE,data:type});

        dispatch({type:AppAlertActions.APP_ALERT_HIDE});

        dispatch(AppAlertActions.alertSuccess({title:"切换成功，请添加课时"}));

    }

};

export default {

    MANAGER_SCHEDULE_SETTING_INIT,

    MANAGER_SCHEDULE_SETTING_SETTING_TYPE_CHANGE,

    PageInit,

    SettingTypeSitch

};