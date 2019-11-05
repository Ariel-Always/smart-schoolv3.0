import ApiActions from "../ApiActions";

const MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_LOADING_SHOW = 'MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_LOADING_SHOW';

const MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_LOADING_HIDE = 'MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_LOADING_HIDE';

const MANAGER_CLASS_ROOM_SINGLE_WEEK_CHANGE = 'MANAGER_CLASS_ROOM_SINGLE_WEEK_CHANGE';

const MANAGER_CLASS_ROOM_SINGLE_INIT = 'MANAGER_CLASS_ROOM_SINGLE_INIT';

const MANAGER_CLASS_ROOM_SINGLE_CLASSROOM_LIST_UPDATE = 'MANAGER_CLASS_ROOM_SINGLE_CLASSROOM_LIST_UPDATE';

const MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_UPDATE = 'MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_UPDATE';

const MANAGER_CLASS_ROOM_SINGLE_WEEK_LIST_UPDATE = 'MANAGER_CLASS_ROOM_SINGLE_WEEK_LIST_UPDATE';

const MANAGER_CLASS_ROOM_SINGLE_SEARCH_RESULT_SHOW = 'MANAGER_CLASS_ROOM_SINGLE_SEARCH_RESULT_SHOW';

const MANAGER_CLASS_ROOM_SINGLE_SEARCH_RESULT_HIDE = 'MANAGER_CLASS_ROOM_SINGLE_SEARCH_RESULT_HIDE';

const MANAGER_CLASS_ROOM_SINGLE_SEARCH_LOADING_SHOW = 'MANAGER_CLASS_ROOM_SINGLE_SEARCH_LOADING_SHOW';

const MANAGER_CLASS_ROOM_SINGLE_SEARCH_LOADING_HIDE = 'MANAGER_CLASS_ROOM_SINGLE_SEARCH_LOADING_HIDE';

const MANAGER_CLASS_ROOM_SINGLE_SEARCHLIST_UPDATE = 'MANAGER_CLASS_ROOM_SINGLE_SEARCHLIST_UPDATE';

const MANAGER_CRS_LEFT_MENU_SEARCH_INPUT_CHANGE = 'MANAGER_CRS_LEFT_MENU_SEARCH_INPUT_CHANGE';

const MANAGER_CRS_LEFT_MENU_CANCEL_BTN_SHOW = 'MANAGER_CRS_LEFT_MENU_CANCEL_BTN_SHOW';

const MANAGER_CRS_LEFT_MENU_CANCEL_BTN_HIDE = 'MANAGER_CRS_LEFT_MENU_CANCEL_BTN_HIDE';



const ClassRoomSingleScheduleUpdate = (pickInfo) =>{

    return (dispatch,getState) => {

        const { LoginUser,Manager,PeriodWeekTerm } = getState();

        let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

        let ClassRoomID = pickInfo.catChildrenId;

        let {WeekNO} = Manager.ClassRoomSingle;

        ApiActions.GetScheduleOfClassRoomOne({

            PeriodID,WeekNO,ClassRoomID,dispatch

        }).then(data => {

            if (data){

                let { ScheduleCount} = data;

                let Schedule = data.ItemSchedule.map((item) => {

                    return {

                        title:item.SubjectName,

                        titleID:item.SubjectID,

                        secondTitle:item.TeacherName,

                        secondTitleID:item.TeacherID,

                        thirdTitle:item.ClassName?item.ClassName:item.CourseClassName,

                        thirdTitleID:item.ClassID?item.ClassID:item.CourseClassID,

                        WeekDay:item.WeekDay,

                        ClassHourNO:item.ClassHourNO,

                        ScheduleType:item.ScheduleType

                    }

                });

                dispatch({type:MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_UPDATE,data:{ScheduleCount,Schedule,PickClassRoom:pickInfo.catChildrenName,PickClassRoomID:pickInfo.catChildrenId}});


            }

            dispatch({type:MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_LOADING_HIDE});

        });

    }

};



const WeekUpdate = () => {

    return (dispatch,getState) => {

        const { Manager,LoginUser,PeriodWeekTerm } = getState();

        const { PickClass,PickClassRoomID,WeekNO } = Manager.ClassRoomSingle;
        //当没有选择教师的时候就不请求后台接口。
        if (PickClassRoomID === ''){

            dispatch({type:MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_UPDATE,data:{Schedule:[]}});

            dispatch({type:MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_LOADING_HIDE});

        }else{

            let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数


            ApiActions.GetScheduleOfClassRoomOne({

                PeriodID,WeekNO,ClassRoomID:PickClassRoomID,dispatch

            }).then(data => {

                if (data){

                    let { ScheduleCount} = data;

                    let Schedule = data.ItemSchedule.map((item) => {

                        return {

                            title:item.SubjectName,

                            titleID:item.SubjectID,

                            secondTitle:item.TeacherName,

                            secondTitleID:item.TeacherID,

                            thirdTitle:item.ClassRoomName,

                            thirdTitleID:item.ClassRoomID,

                            WeekDay:item.WeekDay,

                            ClassHourNO:item.ClassHourNO,

                            ScheduleType:item.ScheduleType

                        }

                    });

                    dispatch({type:MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_UPDATE,data:{ScheduleCount,Schedule}});


                }

                dispatch({type:MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_LOADING_HIDE});


            });

        }

    }

};


//搜索班级
const ClassSearch = (val) => {

    return (dispatch,getState) => {

        dispatch({type:MANAGER_CLASS_ROOM_SINGLE_SEARCH_RESULT_SHOW});

        dispatch({type:MANAGER_CLASS_ROOM_SINGLE_SEARCHLIST_UPDATE,data:[]});

        dispatch({type:MANAGER_CLASS_ROOM_SINGLE_SEARCH_LOADING_SHOW});

        dispatch({type:MANAGER_CRS_LEFT_MENU_CANCEL_BTN_SHOW});

        let { LoginUser,Manager,PeriodWeekTerm } = getState();

        let SchoolID = LoginUser.SchoolID;

        let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;

        let SubjectID ='';

        let Key = val;

        ApiActions.GetClassRoomByClassTypeAndKey({

            SchoolID,PeriodID,ClassRoomTypeID:'',Key,dispatch

        }).then(data => {

            if (data){

                const result = data.map((item) => {

                    return {

                        id:item.ClassRoomID,

                        name:item.ClassRoomName

                    }

                });

                dispatch({type:MANAGER_CLASS_ROOM_SINGLE_SEARCHLIST_UPDATE,data:result});

            }

            dispatch({type:MANAGER_CLASS_ROOM_SINGLE_SEARCH_LOADING_HIDE});


        });

    };

};


export default {

    MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_LOADING_SHOW,

    MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_LOADING_HIDE,

    MANAGER_CLASS_ROOM_SINGLE_WEEK_CHANGE,

    MANAGER_CLASS_ROOM_SINGLE_CLASSROOM_LIST_UPDATE,

    MANAGER_CLASS_ROOM_SINGLE_INIT,

    MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_UPDATE,

    MANAGER_CLASS_ROOM_SINGLE_WEEK_LIST_UPDATE,

    MANAGER_CLASS_ROOM_SINGLE_SEARCHLIST_UPDATE,

    MANAGER_CLASS_ROOM_SINGLE_SEARCH_LOADING_SHOW,

    MANAGER_CLASS_ROOM_SINGLE_SEARCH_LOADING_HIDE,

    MANAGER_CLASS_ROOM_SINGLE_SEARCH_RESULT_SHOW,

    MANAGER_CLASS_ROOM_SINGLE_SEARCH_RESULT_HIDE,

    MANAGER_CRS_LEFT_MENU_SEARCH_INPUT_CHANGE,

    MANAGER_CRS_LEFT_MENU_CANCEL_BTN_SHOW,

    MANAGER_CRS_LEFT_MENU_CANCEL_BTN_HIDE,

    ClassRoomSingleScheduleUpdate,

    WeekUpdate,

    ClassSearch

}

