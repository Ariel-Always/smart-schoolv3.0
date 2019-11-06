import ApiActions from "../ApiActions";


const TEACHER_CLASS_TOTAL_INIT = 'TEACHER_CLASS_TOTAL_INIT';


/*
//设置班级下拉菜单

const TEACHER_CLASS_TOTAL_CLASS_DROP_SHOW = 'TEACHER_CLASS_TOTAL_CLASS_DROP_SHOW';

const TEACHER_CLASS_TOTAL_CLASS_DROP_HIDE = 'TEACHER_CLASS_TOTAL_CLASS_DROP_HIDE';

//选中班级下拉菜单
const TEACHER_CLASS_TOTAL_CLASS_DROP_CHANGE = 'TEACHER_CLASS_TOTAL_CLASS_DROP_CHANGE';


//班级列表更新
const  TEACHER_CLASS_TOTAL_CLASS_DROP_LIST_UPDATE = 'TEACHER_CLASS_TOTAL_CLASS_DROP_LIST_UPDATE';
*/


//单个班级名称和ID变化
const TEACHER_CLASS_TOTAL_CLASS_UPDATE = 'TEACHER_CLASS_TOTAL_CLASS_UPDATE';

const TEACHER_CLASS_TOTAL_CLASS_CLASSHOUR_UPDATE = 'TEACHER_CLASS_TOTAL_CLASS_CLASSHOUR_UPDATE';


const TEACHER_CLASS_TOTAL_WEEK_CHANGE = 'TEACHER_CLASS_TOTAL_WEEK_CHANGE';


const TEACHER_CLASS_TOTAL_SCHEDULE_UPDATE = 'TEACHER_CLASS_TOTAL_SCHEDULE_UPDATE';

const TEACHER_CLASS_TOTAL_CLASS_COUNT = 'TEACHER_CLASS_TOTAL_CLASS_COUNT';

const TEACHER_CLASS_TOTAL_WEEK_LIST_UPDATE = 'TEACHER_CLASS_TOTAL_WEEK_LIST_UPDATE';

const TEACHER_CLASS_TOTAL_LOADING_HIDE = 'TEACHER_CLASS_TOTAL_LOADING_HIDE';

const TEACHER_CLASS_TOTAL_LOADING_SHOW = 'TEACHER_CLASS_TOTAL_LOADING_SHOW';


//走班弹窗

const TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_MODAL_SHOW = 'TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_MODAL_SHOW';

const TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_MODAL_HIDE = 'TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_MODAL_HIDE';


//数据变化
const TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_DATA_UPDATE = 'TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_DATA_UPDATE';

const TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_LOADING_HIDE = 'TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_LOADING_HIDE';

const TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_LOADING_SHOW = 'TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_LOADING_SHOW';

//分页变化

const TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_PAGE_CHANGE = 'TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_PAGE_CHANGE';





const ClassTotalPageUpdate = () =>{

    return (dispatch,getState) => {

        dispatch({type:TEACHER_CLASS_TOTAL_LOADING_SHOW});

        const {LoginUser,Teacher} = getState();
        //获取需要传递的参数
        let {SchoolID} =LoginUser;

        let { WeekNO,ClassID } = Teacher.ClassTotal;

        ApiActions.GetScheduleOfClassOne({

            SchoolID,WeekNO,ClassID,dispatch

        }).then(data => {

            if (data){

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

                dispatch({type:TEACHER_CLASS_TOTAL_SCHEDULE_UPDATE,data:Schedule});

            }

            dispatch({type:TEACHER_CLASS_TOTAL_LOADING_HIDE});

        });

    }

};


//走班课程显示弹窗

const OptionalClassInit = ({ClassHourNO,WeekDay,ClassID,WeekNO}) => {

    return dispatch => {

        dispatch({type:TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_MODAL_SHOW});

        ApiActions.GetCourseClassInfo({ClassID,ClassHourNO,WeekNO,WeekDayNO:WeekDay,dispatch}).then(data=>{

            if (data){

                let DataSource = [];

                if (data.length>0){

                    DataSource = data.map((item,key)=>{

                        return {

                            key:key,

                            ...item,

                        }

                    })

                }

                dispatch({type:TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_DATA_UPDATE,data:DataSource});

            }

            dispatch({type:TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_LOADING_HIDE});

        });

    }

};


export default {

    TEACHER_CLASS_TOTAL_INIT,

    /*TEACHER_CLASS_TOTAL_CLASS_DROP_SHOW,

    TEACHER_CLASS_TOTAL_CLASS_DROP_HIDE,

    TEACHER_CLASS_TOTAL_CLASS_DROP_CHANGE,

    TEACHER_CLASS_TOTAL_CLASS_DROP_LIST_UPDATE,*/

    TEACHER_CLASS_TOTAL_CLASS_UPDATE,

    TEACHER_CLASS_TOTAL_CLASS_CLASSHOUR_UPDATE,

    TEACHER_CLASS_TOTAL_WEEK_CHANGE,

    TEACHER_CLASS_TOTAL_SCHEDULE_UPDATE,

    TEACHER_CLASS_TOTAL_WEEK_LIST_UPDATE,

    TEACHER_CLASS_TOTAL_LOADING_HIDE,

    TEACHER_CLASS_TOTAL_LOADING_SHOW,

    TEACHER_CLASS_TOTAL_CLASS_COUNT,

    TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_MODAL_SHOW,

    TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_MODAL_HIDE,

    TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_DATA_UPDATE,

    TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_LOADING_HIDE,

    TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_LOADING_SHOW,

    TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_PAGE_CHANGE,

    ClassTotalPageUpdate,

    OptionalClassInit

}