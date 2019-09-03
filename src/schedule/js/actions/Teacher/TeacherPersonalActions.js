import Method from "../Method";

const TP_NOW_WEEK_CHANGE = 'TP_NOW_WEEK_CHANGE';

const TEACHER_PERSONAL_SCHEDULE_INIT = 'TEACHER_PERSONAL_SCHEDULE_INIT';

const TP_SCHEDULE_LOADING_HIDE = 'TP_SCHEDULE_LOADING_HIDE';

const TP_SCHEDULE_CHANGE = 'TP_SCHEDULE_CHANGE';

const TP_SCHEDULE_LOADING_SHOW = 'TP_SCHEDULE_LOADING_SHOW';

const TPSUpdate = () => {

    return (dispatch,getState) => {

        dispatch({type:TP_SCHEDULE_LOADING_SHOW});

        const { LoginUser,Teacher } = getState();

        let SchoolID = LoginUser.SchoolID;

        let UserID = LoginUser.UserID;

        let UserType = LoginUser.UserType;

        let NowWeekNo = Teacher.PersonalSchedule.NowWeekNo;

        let teacherSchedulePromise = Method.getGetData(`/scheduleSubjectTeacherTeacherSchedule?UserID=${UserID}&UserType=${UserType}&SchoolID=${SchoolID}&NowWeekNo=${NowWeekNo}`);

        teacherSchedulePromise.then(json => {

            if (json.Status === 200){

                let schedule = json.Data.ItemSchedule.map((item) => {

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

                dispatch({type:TP_SCHEDULE_CHANGE,data:schedule});

                dispatch({type:TP_SCHEDULE_LOADING_HIDE});

            }else {

                alert(json.Msg);

            }

        });

    }

};

export default {

    TP_NOW_WEEK_CHANGE,

    TEACHER_PERSONAL_SCHEDULE_INIT,

    TP_SCHEDULE_LOADING_HIDE,

    TP_SCHEDULE_CHANGE,

    TP_SCHEDULE_LOADING_SHOW,

    TPSUpdate

}