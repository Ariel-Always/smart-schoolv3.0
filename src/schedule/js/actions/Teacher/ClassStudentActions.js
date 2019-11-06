import ApiActions from "../ApiActions";



//初始化

const TEACHER_CS_LOADING_HIDE = 'TEACHER_CS_LOADING_HIDE';

const TEACHER_CS_LOADING_SHOW = 'TEACHER_CS_LOADING_SHOW';

const TEACHER_CLASS_TOTAL_STUDENT_INIT = 'TEACHER_CLASS_TOTAL_STUDENT_INIT';

//获取课时

const TEACHER_CLASS_TOTAL_STUDENT_CLASSHOUR_UPDATE = 'TEACHER_CLASS_TOTAL_STUDENT_CLASSHOUR_UPDATE';


//左侧菜单

const  TEACHER_CS_SEARCH_STUDENT_RESULT_UPDATE = 'TEACHER_CS_SEARCH_STUDENT_RESULT_UPDATE';

const TEACHER_CS_SEARCH_STU_RESULT_SHOW = 'TEACHER_CS_SEARCH_STU_RESULT_SHOW';

const TEACHER_CS_SEARCH_TITLE_SHOW = 'TEACHER_CS_SEARCH_TITLE_SHOW';

const SEARCH_LOADING_SHOW = 'SEARCH_LOADING_SHOW';

const SEARCH_LOADING_HIDE = 'SEARCH_LOADING_HIDE';

const TEACHER_LIST_UPDATE = 'TEACHER_LIST_UPDATE';

const CTT_SCHEDULE_CHANGE = 'CTT_SCHEDULE_CHANGE';


//日期变化

const TEACHER_CS_WEEK_LIST_UPDATE = 'TEACHER_CS_WEEK_LIST_UPDATE';

const TEACHER_CS_WEEK_CHANGE = 'TEACHER_CS_WEEK_CHANGE';


const TEACHER_CTT_LEFT_MENU_SEARCH_INPUT_CHANGE = 'TEACHER_CTT_LEFT_MENU_SEARCH_INPUT_CHANGE';

const TEACHER_CTT_LEFT_MENU_CANCEL_BTN_SHOW = 'TEACHER_CTT_LEFT_MENU_CANCEL_BTN_SHOW';

const TEACHER_CTT_LEFT_MENU_CANCEL_BTN_HIDE = 'TEACHER_CTT_LEFT_MENU_CANCEL_BTN_HIDE';

//学科教师总表教师课表，教师更改
const STTTeacherUpdate = (pickInfo) => {

    return (dispatch,getState) => {

        const { LoginUser,TEACHER,PeriodWeekTerm } = getState();

        let { SchoolID } = LoginUser;

        let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;

        let UserID = pickInfo.catChildrenId;

        let UserType = 1;

        let NowWeekNo = TEACHER.SubjectTeacherTeacherSchedule.NowWeekNo;

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

                dispatch({type:CTT_SCHEDULE_CHANGE,data:{ScheduleCount,schedule,pickTeacher:pickInfo.catChildrenName,pickTeacherID:pickInfo.catChildrenId}});

                dispatch({type:SCHEDULE_LOADING_HIDE});

            }

        });

    }

};
//学科教师总表教师课表，周次变更
const STTWeekUpdate = () => {

    return (dispatch,getState) => {

        const { TEACHER,LoginUser,PeriodWeekTerm } = getState();

        const { pickTeacher,pickTeacherID } = TEACHER.SubjectTeacherTeacherSchedule;
        //当没有选择教师的时候就不请求后台接口。
        if (pickTeacher === ''){

            dispatch({type:CTT_SCHEDULE_CHANGE,data:{schedule:[]}});

            dispatch({type:SCHEDULE_LOADING_HIDE});

        }else{

            let SchoolID = LoginUser.SchoolID;

            let UserID = pickTeacherID;

            let UserType = 1;

            let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;

            let NowWeekNo = TEACHER.SubjectTeacherTeacherSchedule.NowWeekNo;

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

                    dispatch({type:CTT_SCHEDULE_CHANGE,data:{ScheduleCount,schedule}});

                    dispatch({type:SCHEDULE_LOADING_HIDE});

                }

            });

        }

    }

};

//科教师总表教师课表，搜索教师
const STTTeacherSearch = (val) => {

    return (dispatch,getState) => {

        dispatch({type:SEARCH_LOADING_SHOW});

        dispatch({type:TEACHER_CTT_LEFT_MENU_CANCEL_BTN_SHOW});

        dispatch({type:SEARCH_TEACHER_RESULT_SHOW});

        let { LoginUser,TEACHER,PeriodWeekTerm } = getState();

        let SchoolID = LoginUser.SchoolID;

        let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;

        let SubjectID ='';

        let Key = val;

        ApiActions.GetTeacherBySubjectIDAndKey({

            SchoolID,PeriodID,SubjectID:'',Key,dispatch

        }).then(data => {

           if (data){

               const result = data.map((item) => {

                  return {

                      id:item.Teacher,

                      name:item.TeacherName

                  }

               });

                dispatch({type:SEARCH_TEACHER_RESULT_UPDATE,data:result});

                dispatch({type:SEARCH_LOADING_HIDE});

           }

        });

    };

};

export default {

    TEACHER_CS_LOADING_SHOW,

    TEACHER_CS_LOADING_HIDE,

    TEACHER_LIST_UPDATE,

    CTT_SCHEDULE_CHANGE,

    TEACHER_CLASS_TOTAL_STUDENT_CLASSHOUR_UPDATE,

    TEACHER_CS_SEARCH_STUDENT_RESULT_UPDATE,

    TEACHER_CS_SEARCH_STU_RESULT_SHOW,

    TEACHER_CS_SEARCH_TITLE_SHOW,

    TEACHER_CS_WEEK_LIST_UPDATE,

    TEACHER_CS_WEEK_CHANGE,

    SEARCH_LOADING_HIDE,

    SEARCH_LOADING_SHOW,

    TEACHER_CLASS_TOTAL_STUDENT_INIT,

    TEACHER_CTT_LEFT_MENU_SEARCH_INPUT_CHANGE,

    TEACHER_CTT_LEFT_MENU_CANCEL_BTN_SHOW,

    TEACHER_CTT_LEFT_MENU_CANCEL_BTN_HIDE,

    STTTeacherUpdate,

    STTWeekUpdate,

    STTTeacherSearch

}