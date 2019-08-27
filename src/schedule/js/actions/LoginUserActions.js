import CONFIG from "../../../common/js/config";

import ModuleSettingActions from "./ModuleSettingActions";

const UPDATE_LOGIN_USER = 'UPDATE_LOGIN_USER';


//获取登录信息
const getUserInfo = () => {

    return ( dispatch,getState ) => {

        fetch(`${CONFIG.proxy}/Login?method=GetUserInfo`).then(res => res.json()).then(json => {

            switch (json.UserType) {

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

            dispatch({type:UPDATE_LOGIN_USER,data:json.data.result});



        });

    }

};



export default {

    getUserInfo,

    UPDATE_LOGIN_USER

}