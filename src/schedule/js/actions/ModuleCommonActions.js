import ModuleSettingActions from './ModuleSettingActions';

import PeriodWeekTermActions from './PeriodWeekTermActions';

import ApiActions from './ApiActions';

import LoginUserActions from "./LoginUserActions";

const MANAGER_INTELLENCT_URL_UPDATE = 'MANAGER_INTELLENCT_URL_UPDATE';

const getCommonInfo = () => {

    return dispatch  => {
        //获取登录信息

            let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

            let {SchoolID,UserID,UserType} = UserInfo;

            if (parseInt(UserType)===0){

                //获取智能排课的URL

                ApiActions.GetSingleSubsystemServer(dispatch).then(data=>{

                    if (data){

                        dispatch({type:MANAGER_INTELLENCT_URL_UPDATE,data:data.WebSvrAddr});

                    }

                })

            }

            switch (UserType) {

                case 0:

                    dispatch({type:ModuleSettingActions.UPDATE_MANAGER_MODULE_SETTING});

                    break;

                case 1:

                    dispatch({type:ModuleSettingActions.UPDATE_TEACHER_MODULE_SETTING});

                    break;

                case 2:

                    dispatch({type:ModuleSettingActions.UPDATE_STUDENT_MODULE_SETTING});

                    break;

                default:

                    dispatch({type:ModuleSettingActions.UPDATE_MANAGER_MODULE_SETTING});

            }

            //如果是导入界面
            const Hash = location.hash;

            if (Hash.includes('Import')||Hash.includes('adjustlog')||Hash.includes('scheduleSetting')){

                dispatch({type:LoginUserActions.UPDATE_LOGIN_USER,data:UserInfo});

            }else{

                //获取学段等等的信息

                ApiActions.GetTermAndPeriodAndWeekNOInfo({SchoolID,UserID,UserType,dispatch}).then(data => {

                    if (data){

                        if ( UserType === 1 ){

                            if ( data.ItemPeriod.length  <= 1 ){

                                dispatch({type:ModuleSettingActions.TIME_BARNER_HIDE});

                            }else{

                                dispatch({type:ModuleSettingActions.TIME_BARNER_SHOW});

                            }

                        }

                        const {ItemPeriod,DefaultPeriod} = data;

                        if (DefaultPeriod){

                            let key = ItemPeriod.findIndex(item=>item.PeriodID===DefaultPeriod);

                            dispatch({type:PeriodWeekTermActions.PERIOD_VALUE_CHANGE,key:key});

                        }

                        dispatch({type:PeriodWeekTermActions.UPDATE_PERIOD_TERM_WEEK,data:data});

                        dispatch({type:LoginUserActions.UPDATE_LOGIN_USER,data:UserInfo});

                    }

                });


            }


    }

};





export default {

    getCommonInfo,

    MANAGER_INTELLENCT_URL_UPDATE

}