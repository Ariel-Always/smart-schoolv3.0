import ModuleSettingActions from './ModuleSettingActions';

import LoginUserActions from './LoginUserActions';

import PeriodWeekTermActions from './PeriodWeekTermActions';

import Method from "./Method";

const getCommonInfo = () => {

    return ( dispatch,getState ) => {
        //获取登录信息
        Method.getGetData(`/Login?method=GetUserInfo`).then(json => {

            switch (json.data.result.UserType) {

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

            dispatch({type:LoginUserActions.UPDATE_LOGIN_USER,data:json.data.result});

            let {LoginUser} = getState();

            let SchoolID = LoginUser.SchoolID;

            let UserID = LoginUser.UserID;

            let UserType = LoginUser.UserType;

            //获取学段等等的信息
            let getPeriodPromise = Method.getGetData(`/schedulePeriod?SchoolID=${SchoolID}&UserID=${UserID}&UserType=${UserType}`);

            getPeriodPromise.then(json => {

                if ( UserType === 1 ){

                    if ( json.Data.ItemPeriod.length  <= 1 ){

                        dispatch({type:ModuleSettingActions.TIME_BARNER_HIDE});

                    }else{

                        dispatch({type:ModuleSettingActions.TIME_BARNER_SHOW});

                    }

                }

                dispatch({type:PeriodWeekTermActions.UPDATE_PERIOD_TERM_WEEK,data:json.Data});

            });

        });

    }

};

export default {

    getCommonInfo

}