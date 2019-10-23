import ApiActions from "../ApiActions";

const MANAGER_CLASS_TOTAL_INIT = 'MANAGER_CLASS_TOTAL_INIT';


const  MANAGER_CLASS_TOTAL_GRADE_UPDATE = 'MANAGER_CLASS_TOTAL_GRADE_UPDATE';


const MANAGER_CLASS_TOTAL_WEEK_CHANGE = 'MANAGER_CLASS_TOTAL_WEEK_CHANGE';


const MANAGER_CLASS_TOTAL_SCHEDULE_UPDATE = 'MANAGER_CLASS_TOTAL_SCHEDULE_UPDATE';

const MANAGER_CLASS_TOTAL_CLASS_COUNT = 'MANAGER_CLASS_TOTAL_CLASS_COUNT';

const MANAGER_CLASS_TOTAL_WEEK_LIST_UPDATE = 'MANAGER_CLASS_TOTAL_WEEK_LIST_UPDATE';

const MANAGER_CLASS_TOTAL_LOADING_HIDE = 'MANAGER_CLASS_TOTAL_LOADING_HIDE';

const MANAGER_CLASS_TOTAL_LOADING_SHOW = 'MANAGER_CLASS_TOTAL_LOADING_SHOW';

const MANAGER_CLASS_TOTAL_PAGE_ADD = 'MANAGER_CLASS_TOTAL_PAGE_ADD';

const MANAGER_CLASS_TOTAL_GRADE_SELECT_CHANGE = 'MANAGER_CLASS_TOTAL_GRADE_SELECT_CHANGE';


const ClassTotalPageUpdate = (opt) =>{

    return (dispatch,getState) => {

        dispatch({type:MANAGER_CLASS_TOTAL_LOADING_SHOW});

        const {PeriodWeekTerm,LoginUser,Manager} = getState();
        //获取需要传递的参数
        let {SchoolID} =LoginUser;

        let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;

        let { WeekNO,GradeDropSelectd,Schedule,PageIndex} = Manager.ClassTotal;

        let GradeID = '';

        let NextPageIndex = 1;
        //判断已选中的学科是否为全部学科
        if (GradeDropSelectd.value!==0){

            GradeID = GradeDropSelectd.value;

        }
        //如果是下一页的话
        if (opt&&opt.nextPage){

            NextPageIndex = PageIndex+1;

        }

        ApiActions.GetAllScheduleOfClassByGradeIDForPage({

            PeriodID,SchoolID,WeekNO:WeekNO,PageIndex:NextPageIndex,PageSize:10,GradeID

        }).then(data => {

            if (data){

                let NextSchedule = [];

                NextSchedule =  data.ItemClass.map((item) => {

                    let classObj = {

                        id:item.ClassID,

                        name:item.ClassName,

                        active:false

                    };

                    let list = data.ItemSchedule.map((i) => {

                        if (i.ClassID === item.ClassID){

                            return {

                                type:i.ScheduleType,

                                title:i.SubjectName,

                                titleID:i.SubjectName,

                                secondTitle:i.TeacherName,

                                secondTitleID:i.TeacherID,

                                thirdTitle:i.ClassRoomName,

                                thirdTitleID:i.ClassRoomID,

                                WeekDay:i.WeekDay,

                                ClassHourNO:i.ClassHourNO

                            };

                        }else {

                            return ;

                        }

                    }).filter(i => {return i!==undefined});

                    classObj['list'] = list;

                    return classObj;

                });

                //判断操作是否是下一页操作
                if (opt&&opt.nextPage){

                    Schedule.push(...NextSchedule);

                    dispatch({type:MANAGER_CLASS_TOTAL_SCHEDULE_UPDATE,data:Schedule});

                    dispatch({type:MANAGER_CLASS_TOTAL_PAGE_ADD});

                }else{

                    dispatch({type:MANAGER_CLASS_TOTAL_SCHEDULE_UPDATE,data:NextSchedule});

                }

                dispatch({type:MANAGER_CLASS_TOTAL_CLASS_COUNT,data:data.ClassCount});

                dispatch({type:MANAGER_CLASS_TOTAL_LOADING_HIDE});

            }

        });

    }

};


export default {

    MANAGER_CLASS_TOTAL_INIT,

    MANAGER_CLASS_TOTAL_GRADE_UPDATE,

    MANAGER_CLASS_TOTAL_WEEK_CHANGE,

    MANAGER_CLASS_TOTAL_SCHEDULE_UPDATE,

    MANAGER_CLASS_TOTAL_WEEK_LIST_UPDATE,

    MANAGER_CLASS_TOTAL_LOADING_HIDE,

    MANAGER_CLASS_TOTAL_LOADING_SHOW,

    MANAGER_CLASS_TOTAL_PAGE_ADD,

    MANAGER_CLASS_TOTAL_GRADE_SELECT_CHANGE,

    MANAGER_CLASS_TOTAL_CLASS_COUNT,

    ClassTotalPageUpdate

}