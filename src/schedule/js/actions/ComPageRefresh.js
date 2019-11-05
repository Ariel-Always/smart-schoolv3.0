import ApiActions from "./ApiActions";

import PeriodWeekTermActions from "./PeriodWeekTermActions";

import LoginUserActions from "./LoginUserActions";

import TeacherIndexActions from "./Teacher/TeacherIndexActions";

import ManagerIndexActions from "./Manager/ManagerIndexActions";





const ComPageInit  = (dispatch, PageInit) => {

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


const ComPageUpdate = (dispatch) =>{

    let hash = window.location.hash.split('?')[0];

    if (hash.includes('#/teacher/subject-teacher/subject')){

        dispatch(TeacherIndexActions.STSPageInit());

    }

    if (hash.includes('#/teacher/subject-teacher/teacher')){

        dispatch(TeacherIndexActions.STTPageInit());

    }

    if (hash.includes('#/teacher/mine')){

        dispatch(TeacherIndexActions.TeacherPersonalInit());

    }

    if (hash.includes('#/manager/subject-teacher/subject')){

        dispatch(ManagerIndexActions.STSPageInit());

    }


    if (hash.includes('#/manager/subject-teacher/teacher')){

        dispatch(ManagerIndexActions.STTPageInit());

    }

    if (hash.includes('#/manager/class/total')){

        dispatch(ManagerIndexActions.ClassTotalInit());

    }

    if (hash.includes('#/manager/class/single')){

        dispatch(ManagerIndexActions.ClassSingleInit());

    }

    if (hash.includes('#/manager/room/total')){

        dispatch(ManagerIndexActions.ClassRoomTotalInit());

    }

    if (hash.includes('#/manager/room/single')){

        dispatch(ManagerIndexActions.ClassRoomSingleInit());

    }


};


export default{

    ComPageInit,

    ComPageUpdate

};
