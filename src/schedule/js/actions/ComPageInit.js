import ApiActions from "./ApiActions";

import PeriodWeekTermActions from "./PeriodWeekTermActions";

import LoginUserActions from "./LoginUserActions";

const ComPageInit  = (dispatch,PageInit) => {

    if (sessionStorage.getItem('UserInfo')){

        let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

        let { SchoolID,UserID,UserType } = UserInfo;

        ApiActions.GetTermAndPeriodAndWeekNOInfo({SchoolID,UserID,UserType,dispatch}).then(data => {

            if (data){

                dispatch({type:PeriodWeekTermActions.UPDATE_PERIOD_TERM_WEEK,data:data});

                dispatch({type:LoginUserActions.UPDATE_LOGIN_USER,data:UserInfo});

                dispatch(PageInit);

            }

        });

    }else{

        let WaitUserInfo = setInterval(()=>{

            if (sessionStorage.getItem('UserInfo')){

                let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

                let { SchoolID,UserID,UserType } = UserInfo;

                ApiActions.GetTermAndPeriodAndWeekNOInfo({SchoolID,UserID,UserType,dispatch}).then(data => {

                    if (data){

                        dispatch({type:PeriodWeekTermActions.UPDATE_PERIOD_TERM_WEEK,data:data});

                        dispatch({type:LoginUserActions.UPDATE_LOGIN_USER,data:UserInfo});

                        dispatch(PageInit);

                    }

                });


                clearInterval(WaitUserInfo);

            }

        },20);

    }

};

export default ComPageInit;