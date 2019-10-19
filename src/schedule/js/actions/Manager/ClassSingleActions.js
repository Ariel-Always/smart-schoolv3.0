import ApiActions from "../ApiActions";

const MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_SHOW = 'MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_SHOW';

const MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_HIDE = 'MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_HIDE';

const MANAGER_CLASS_SINGLE_WEEK_CHANGE = 'MANAGER_CLASS_SINGLE_WEEK_CHANGE';

const MANAGER_CLASS_SINGLE_INIT = 'MANAGER_CLASS_SINGLE_INIT';

const MANAGER_CLASS_SINGLE_CLASS_LIST_UPDATE = 'MANAGER_CLASS_SINGLE_CLASS_LIST_UPDATE';

const ClassSingleScheduleUpdate = (pickInfo) =>{

    return (dispatch,getState) => {

        const { LoginUser,Manager,PeriodWeekTerm } = getState();

        let { SchoolID } = LoginUser;

        let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;

        let ClassID = pickInfo.catChildrenId;

        let UserType = 1;

        let NowWeekNo = Manager.ClassSingle.WeekNO;

        ApiActions.GetScheduleByUserID({

            SchoolID,PeriodID,UserType,UserID,WeekNO:NowWeekNo,dispatch

        }).then(data => {

            if (data){

                let { ScheduleCount} = data;

                let schedule = data.ItemSchedule.map((item) => {

                    return {

                        title:item.SubjectName,

                        titleID:item.SubjectID,

                        secondTitle:(item.ClassName===''?item.CourseClassName:item.ClassName),

                        secondTitleID:(item.ClassName===''?item.CourseClassID:item.ClassID),

                        thirdTitle:item.ClassRoomName,

                        thirdTitleID:item.ClassRoomID,

                        WeekDay:item.WeekDay,

                        ClassHourNO:item.ClassHourNO,

                        ScheduleType:item.ScheduleType

                    }


                });

                dispatch({type:STT_SCHEDULE_CHANGE,data:{ScheduleCount,schedule,pickTeacher:pickInfo.catChildrenName,pickTeacherID:pickInfo.catChildrenId}});

                dispatch({type:SCHEDULE_LOADING_HIDE});

            }

        });

    }

};



export default {

    MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_SHOW,

    MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_HIDE,

    MANAGER_CLASS_SINGLE_WEEK_CHANGE,

    MANAGER_CLASS_SINGLE_CLASS_LIST_UPDATE,

    MANAGER_CLASS_SINGLE_INIT,

    ClassSingleScheduleUpdate

}

