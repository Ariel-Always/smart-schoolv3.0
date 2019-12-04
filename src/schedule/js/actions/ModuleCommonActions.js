import ModuleSettingActions from './ModuleSettingActions';

import PeriodWeekTermActions from './PeriodWeekTermActions';

import ApiActions from './ApiActions';

import LoginUserActions from "./LoginUserActions";


const getCommonInfo = () => {

    return dispatch  => {
        //获取登录信息

            let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

            let {SchoolID,UserID,UserType} = UserInfo;

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

};





export default {

    getCommonInfo

}