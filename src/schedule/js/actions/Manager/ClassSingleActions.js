import ApiActions from "../ApiActions";

const MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_SHOW = 'MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_SHOW';

const MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_HIDE = 'MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_HIDE';

const MANAGER_CLASS_SINGLE_WEEK_CHANGE = 'MANAGER_CLASS_SINGLE_WEEK_CHANGE';

const MANAGER_CLASS_SINGLE_INIT = 'MANAGER_CLASS_SINGLE_INIT';

const MANAGER_CLASS_SINGLE_CLASS_LIST_UPDATE = 'MANAGER_CLASS_SINGLE_CLASS_LIST_UPDATE';

const MANAGER_CLASS_SINGLE_SCHEDULE_UPDATE = 'MANAGER_CLASS_SINGLE_SCHEDULE_UPDATE';

const MANAGER_CLASS_SINGLE_WEEK_LIST_UPDATE = 'MANAGER_CLASS_SINGLE_WEEK_LIST_UPDATE';

const MANAGER_CLASS_SINGLE_SEARCH_RESULT_SHOW = 'MANAGER_CLASS_SINGLE_SEARCH_RESULT_SHOW';

const MANAGER_CLASS_SINGLE_SEARCH_RESULT_HIDE = 'MANAGER_CLASS_SINGLE_SEARCH_RESULT_HIDE';

const MANAGER_CLASS_SINGLE_SEARCH_LOADING_SHOW = 'MANAGER_CLASS_SINGLE_SEARCH_LOADING_SHOW';

const MANAGER_CLASS_SINGLE_SEARCH_LOADING_HIDE = 'MANAGER_CLASS_SINGLE_SEARCH_LOADING_HIDE';

const MANAGER_CLASS_SINGLE_SEARCHLIST_UPDATE = 'MANAGER_CLASS_SINGLE_SEARCHLIST_UPDATE';


const ClassSingleScheduleUpdate = (pickInfo) =>{

    return (dispatch,getState) => {

        const { LoginUser,Manager,PeriodWeekTerm } = getState();

        let { SchoolID } = LoginUser;

        let ClassID = pickInfo.catChildrenId;

        let {WeekNO} = Manager.ClassSingle;

        ApiActions.GetScheduleOfClassOne({

            SchoolID,WeekNO,ClassID,dispatch

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

                data.ItemCourseClass.map(item=>{

                    let ShiftClass = {

                        ClassID:item.ClassID,

                        WeekDay:item.WeekDay,

                        ClassHourNO:item.ClassHourNO,

                        IsShift:true

                    };

                    Schedule.push(ShiftClass);

                });

                dispatch({type:MANAGER_CLASS_SINGLE_SCHEDULE_UPDATE,data:{ScheduleCount,Schedule,PickClass:pickInfo.catChildrenName,PickClassID:pickInfo.catChildrenId}});

                dispatch({type:MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_HIDE});

            }

        });

    }

};



const WeekUpdate = () => {

    return (dispatch,getState) => {

        const { Manager,LoginUser } = getState();

        const { PickClass,PickClassID,WeekNO } = Manager.ClassSingle;
        //当没有选择教师的时候就不请求后台接口。
        if (PickClass === ''){

            dispatch({type:MANAGER_CLASS_SINGLE_SCHEDULE_UPDATE,data:{Schedule:[]}});

            dispatch({type:MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_HIDE});

        }else{

            let SchoolID = LoginUser.SchoolID;

            ApiActions.GetScheduleOfClassOne({

                SchoolID,WeekNO,ClassID:PickClassID,dispatch

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

                    data.ItemCourseClass.map(item=>{

                        let ShiftClass = {

                            ClassID:item.ClassID,

                            WeekDay:item.WeekDay,

                            ClassHourNO:item.ClassHourNO,

                            IsShift:true

                        };

                        Schedule.push(ShiftClass);

                    });

                    dispatch({type:MANAGER_CLASS_SINGLE_SCHEDULE_UPDATE,data:{ScheduleCount,Schedule}});

                    dispatch({type:MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_HIDE});

                }

            });

        }

    }

};


//搜索班级
const ClassSearch = (val) => {

    return (dispatch,getState) => {

        dispatch({type:MANAGER_CLASS_SINGLE_SEARCH_RESULT_SHOW});

        dispatch({type:MANAGER_CLASS_SINGLE_SEARCHLIST_UPDATE,data:[]});

        dispatch({type:MANAGER_CLASS_SINGLE_SEARCH_LOADING_SHOW});

        let { LoginUser,Manager,PeriodWeekTerm } = getState();

        let SchoolID = LoginUser.SchoolID;

        let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;

        let SubjectID ='';

        let Key = val;

        ApiActions.GetClassByGradeIDAndKey({

            SchoolID,PeriodID,GradeID:'',Key,dispatch

        }).then(data => {

            if (data){

                const result = data.map((item) => {

                    return {

                        id:item.ClassID,

                        name:item.ClassName

                    }

                });

                dispatch({type:MANAGER_CLASS_SINGLE_SEARCHLIST_UPDATE,data:result});



                dispatch({type:MANAGER_CLASS_SINGLE_SEARCH_LOADING_HIDE});

            }

        });

    };

};


export default {

    MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_SHOW,

    MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_HIDE,

    MANAGER_CLASS_SINGLE_WEEK_CHANGE,

    MANAGER_CLASS_SINGLE_CLASS_LIST_UPDATE,

    MANAGER_CLASS_SINGLE_INIT,

    MANAGER_CLASS_SINGLE_SCHEDULE_UPDATE,

    MANAGER_CLASS_SINGLE_WEEK_LIST_UPDATE,

    MANAGER_CLASS_SINGLE_SEARCHLIST_UPDATE,

    MANAGER_CLASS_SINGLE_SEARCH_LOADING_SHOW,

    MANAGER_CLASS_SINGLE_SEARCH_LOADING_HIDE,

    MANAGER_CLASS_SINGLE_SEARCH_RESULT_SHOW,

    MANAGER_CLASS_SINGLE_SEARCH_RESULT_HIDE,

    ClassSingleScheduleUpdate,

    WeekUpdate,

    ClassSearch

}

