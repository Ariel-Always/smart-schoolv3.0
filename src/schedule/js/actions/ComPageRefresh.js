import TeacherIndexActions from "./Teacher/TeacherIndexActions";

import ManagerIndexActions from "./Manager/ManagerIndexActions";

//更新课表

import STSActions from './Manager/SubjectTeacherScheduleActions';

import STTActions from './Manager/SubjectTeacherTeacherActions';

import CTActions from './Manager/ClassTotalActions';

import CSActions from './Manager/ClassSingleActions'

import CRTActions from './Manager/ClassRoomTotalActions';

import CRSActions from './Manager/ClassRoomSingleActions';

import TPActions from './Teacher/TeacherPersonalActions';


const ComPageInit  = (PageInit) => {

    return (dispatch,getState)=>{

        let LoginUser = getState().LoginUser;

        if (Object.keys(LoginUser).length>1){

            dispatch(PageInit);

        }else{

            let WaitUserInfo = setInterval(()=>{

                let LoginUser = getState().LoginUser;

                if (Object.keys(LoginUser).length>1){

                    dispatch(PageInit);

                    clearInterval(WaitUserInfo);

                }

            },10);

        }

    }

};


/*const ComPageInit  = (dispatch, PageInit) => {

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

};*/


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


const ComPageScheduleUpdate = () => {

    return (dispatch,getState) =>{

        const Hash = location.hash;

        const { PageIndex } = getState().ScheduleDetail.Params;

        if (Hash.includes('manager/subject-teacher/subject')){

            dispatch(STSActions.ScheduleListUpdate(PageIndex));

        }else if (Hash.includes('manager/subject-teacher/teacher')){

            dispatch(STTActions.STTWeekUpdate())

        }else if (Hash.includes('manager/class/total')){

            dispatch(CTActions.ScheduleListUpdate(PageIndex));

        }else if (Hash.includes('manager/class/single')){

            dispatch(CSActions.WeekUpdate())

        }else if (Hash.includes('manager/room/total')){

            dispatch(CRTActions.ScheduleListUpdate(PageIndex));

        }else if (Hash.includes('manager/room/single')){

            dispatch(CRSActions.WeekUpdate())

        }else if (Hash.includes('teacher/mine')){

            dispatch(TPActions.TPSUpdate())

        }

    }

};


export default{

    ComPageInit,

    ComPageUpdate,

    ComPageScheduleUpdate

};
