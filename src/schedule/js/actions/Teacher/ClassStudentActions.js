import ApiActions from "../ApiActions";
import AppLoadingActions from "../AppLoadingActions";



//初始化

const TEACHER_CS_LOADING_HIDE = 'TEACHER_CS_LOADING_HIDE';

const TEACHER_CS_LOADING_SHOW = 'TEACHER_CS_LOADING_SHOW';

const TEACHER_CLASS_TOTAL_STUDENT_INIT = 'TEACHER_CLASS_TOTAL_STUDENT_INIT';

//获取课时

const TEACHER_CLASS_TOTAL_STUDENT_CLASSHOUR_UPDATE = 'TEACHER_CLASS_TOTAL_STUDENT_CLASSHOUR_UPDATE';

//班级名称和ID初始化
const TEACHER_CS_CLASS_INFO_UPDATE = 'TEACHER_CS_CLASS_INFO_UPDATE';




//左侧菜单

const  TEACHER_CS_SEARCH_STUDENT_RESULT_UPDATE = 'TEACHER_CS_SEARCH_STUDENT_RESULT_UPDATE';

const TEACHER_CS_SEARCH_STU_RESULT_SHOW = 'TEACHER_CS_SEARCH_STU_RESULT_SHOW';

const TEACHER_CS_SEARCH_TITLE_SHOW = 'TEACHER_CS_SEARCH_TITLE_SHOW';

const TEACHER_CS_SEARCH_LOADING_SHOW = 'TEACHER_CS_SEARCH_LOADING_SHOW';

const TEACHER_CS_SEARCH_LOADING_HIDE = 'TEACHER_CS_SEARCH_LOADING_HIDE';



//课表更新

const TEACHER_CS_SCHEDULE_CHANGE = 'TEACHER_CS_SCHEDULE_CHANGE';


//日期变化

const TEACHER_CS_WEEK_LIST_UPDATE = 'TEACHER_CS_WEEK_LIST_UPDATE';

const TEACHER_CS_WEEK_CHANGE = 'TEACHER_CS_WEEK_CHANGE';


const TEACHER_CS_LEFT_MENU_SEARCH_INPUT_CHANGE = 'TEACHER_CS_LEFT_MENU_SEARCH_INPUT_CHANGE';

const TEACHER_CS_LEFT_MENU_CANCEL_BTN_SHOW = 'TEACHER_CS_LEFT_MENU_CANCEL_BTN_SHOW';

const TEACHER_CS_LEFT_MENU_CANCEL_BTN_HIDE = 'TEACHER_CS_LEFT_MENU_CANCEL_BTN_HIDE';

//学科教师总表教师课表，教师更改
const ClassStudentUpdate = (pickInfo) => {

    return (dispatch,getState) => {

        const { LoginUser,Teacher,PeriodWeekTerm } = getState();

        let { SchoolID } = LoginUser;

        let UserID = pickInfo.catChildrenId;

        let UserType = 2;

        let {WeekNO} = Teacher.ClassStudent;

        ApiActions.GetScheduleByUserID({

            SchoolID,PeriodID:'',UserType,UserID,WeekNO,dispatch

        }).then(data => {

            if (data){

                let { ScheduleCount} = data;

                let Schedule = data.ItemSchedule.map((item) => {

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

                dispatch({type:TEACHER_CS_SCHEDULE_CHANGE,data:{ScheduleCount,Schedule,PickStudentName:pickInfo.catChildrenName,PickStudentID:pickInfo.catChildrenId}});

                dispatch({type:TEACHER_CS_LOADING_HIDE});

            }

        });

    }

};
//周次变更
const CSWeekUpdate = () => {

    return (dispatch,getState) => {

        const { Teacher,LoginUser,PeriodWeekTerm } = getState();

        const { PickStudentID,PickStudentName } = Teacher.ClassStudent;
        //当没有选择教师的时候就不请求后台接口。
        if (PickStudentID === ''){

            dispatch({type:TEACHER_CS_SCHEDULE_CHANGE,data:{Schedule:[]}});

            dispatch({type:TEACHER_CS_LOADING_HIDE});

        }else{

            let {SchoolID} = LoginUser;

            let UserID = PickStudentID;

            let UserType = 2;

            let { WeekNO } = Teacher.ClassStudent;

            ApiActions.GetScheduleByUserID({

                SchoolID,PeriodID:'',UserType,UserID,WeekNO,dispatch

            }).then(data => {

                if (data){

                    let { ScheduleCount} = data;

                    let Schedule = data.ItemSchedule.map((item) => {

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

                    dispatch({type:TEACHER_CS_SCHEDULE_CHANGE,data:{ScheduleCount,Schedule}});

                }

                dispatch({type:TEACHER_CS_LOADING_HIDE});

            });

        }

    }

};

//搜索学生
const StudentSearch = (val) => {

    return (dispatch,getState) => {

        dispatch({type:TEACHER_CS_SEARCH_LOADING_SHOW});

        dispatch({type:TEACHER_CS_LEFT_MENU_CANCEL_BTN_SHOW});

        dispatch({type:TEACHER_CS_SEARCH_STU_RESULT_SHOW});

        let { LoginUser,Teacher,PeriodWeekTerm } = getState();

        let { SchoolID } = LoginUser;

        let { ClassID } = Teacher.ClassStudent;

        let Key = val;

        ApiActions.GetSudentInfoByClassIDAndKey({

            ClassID,Key,dispatch

        }).then(data => {

           if (data){

               const result = data.map((item) => {

                  return {

                      id:item.StudentID,

                      name:item.StudentName

                  }

               });

                dispatch({type:TEACHER_CS_SEARCH_STUDENT_RESULT_UPDATE,data:result});

                dispatch({type:TEACHER_CS_SEARCH_LOADING_HIDE});

           }

        });

    };

};

//取消学生搜索

const CancelStuSearch = () => {

  return (dispatch,getState) => {

      dispatch({type:TEACHER_CS_LEFT_MENU_SEARCH_INPUT_CHANGE,data:''});

      dispatch({type:TEACHER_CS_LEFT_MENU_CANCEL_BTN_HIDE});

      dispatch({type:TEACHER_CS_SEARCH_LOADING_SHOW});

      const { ClassID } = getState().Teacher.ClassStudent;

      ApiActions.GetSudentInfoByClassIDAndKey({ClassID,Key:'',dispatch}).then(json=>{

          if (json){

              let leftMenuData = [];

              let list = json.map((i) => {

                  return {

                      id:i.StudentID,

                      name:i.StudentName

                  }

              });

              dispatch({type:TEACHER_CS_SEARCH_STUDENT_RESULT_UPDATE,data:list});

          }

          dispatch({type:TEACHER_CS_SEARCH_LOADING_HIDE});

      })



  }

};



export default {

    TEACHER_CS_LOADING_SHOW,

    TEACHER_CS_LOADING_HIDE,

    TEACHER_CS_SCHEDULE_CHANGE,

    TEACHER_CS_CLASS_INFO_UPDATE,

    TEACHER_CLASS_TOTAL_STUDENT_CLASSHOUR_UPDATE,

    TEACHER_CS_SEARCH_STUDENT_RESULT_UPDATE,

    TEACHER_CS_SEARCH_STU_RESULT_SHOW,

    TEACHER_CS_SEARCH_TITLE_SHOW,

    TEACHER_CS_WEEK_LIST_UPDATE,

    TEACHER_CS_WEEK_CHANGE,

    TEACHER_CS_SEARCH_LOADING_HIDE,

    TEACHER_CS_SEARCH_LOADING_SHOW,

    TEACHER_CLASS_TOTAL_STUDENT_INIT,

    TEACHER_CS_LEFT_MENU_SEARCH_INPUT_CHANGE,

    TEACHER_CS_LEFT_MENU_CANCEL_BTN_SHOW,

    TEACHER_CS_LEFT_MENU_CANCEL_BTN_HIDE,

    ClassStudentUpdate,

    CSWeekUpdate,

    StudentSearch,

    CancelStuSearch

}