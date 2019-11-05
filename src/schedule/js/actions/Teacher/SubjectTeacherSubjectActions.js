import Method from "../Method";

import ApiActions from '../ApiActions';

const SUBJECT_TEACHER_SCHEDULE_INIT = 'SUBJECT_TEACHER_SCHEDULE_INIT';

const SUBJECT_TEACHER_SCHEDULE_UPDATE = 'SUBJECT_TEACHER_SCHEDULE_UPDATE';

const TEACHER_SUBJECT_TEACHER_SUBJECT_TEACHER_COUNT = 'TEACHER_SUBJECT_TEACHER_SUBJECT_TEACHER_COUNT';

const STS_SUBJECT_CHANGE = 'STS_SUBJECT_CHANGE';

const STS_NOW_WEEK_CHANGE = 'STS_NOW_WEEK_CHANGE';

const STS_PAGE_ADD = 'STS_PAGE_ADD';

const LOADING_SHOW = 'LOADING_SHOW';

const LOADING_HIDE = 'LOADING_HIDE';

const TEACHER_STS_SUBJECT_DROP_SHOW = 'TEACHER_STS_SUBJECT_DROP_SHOW';

const TEACHER_STS_SUBJECT_DROP_HIDE = 'TEACHER_STS_SUBJECT_DROP_HIDE';

const TEACHER_STS_SUBJECT_DROP_CHANGE = 'TEACHER_STS_SUBJECT_DROP_CHANGE';

const TEACHER_STS_SUBJECT_DROP_LIST_CHANGE = 'TEACHER_STS_SUBJECT_DROP_LIST_CHANGE';

const TEACHER_STS_SUBJECT_TITLE_CHANGE = 'TEACHER_STS_SUBJECT_TITLE_CHANGE';


//学科教师总表学科课表界面更新
const STSPageUpdate = (opt) => {

    return (dispatch,getState) => {

        dispatch({type:LOADING_SHOW});

        const {PeriodWeekTerm,LoginUser,Teacher} = getState();
        //获取需要传递的参数
        let {SchoolID} =LoginUser;

        let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;

        let {NowWeekNo,SubjectSelectd,SubjectTitleID,schedule,pageIndex,SubjectDropShow} = Teacher.SubjectTeacherSubjectSchedule;

        let SubjectID = '';

        let PageIndex = 1;
        //判断已选中的学科是否为全部学科
        if (SubjectDropShow){

            SubjectID = SubjectSelectd.value;

        }else{

            SubjectID = SubjectTitleID;

        }
        //如果是下一页的话
        if (opt&&opt.nextPage){

            PageIndex = pageIndex+1;

        }

        ApiActions.GetAllScheduleOfTeachersBySubjectIDForPage({

            SubjectID,PeriodID,SchoolID,WeekNO:NowWeekNo,PageIndex,PageSize:10,dispatch

        }).then(data => {

            if (data){

                let SubjectTeacherSchedule =  data.ItemTeacher.map((item) => {

                    let teacherObj = {

                        id:item.TeacherID,

                        name:item.TeacherName

                    };

                    let list = data.ItemSchedule.map((i) => {

                        if (i.TeacherID === item.TeacherID){

                            return {

                                type:i.ScheduleType,

                                title:(i.ClassName!==''?i.ClassName:i.CourseClassName),

                                titleID:(i.ClassName!==''?i.ClassID:i.CourseClassID),

                                secondTitle:i.SubjectName,

                                secondTitleID:i.SubjectID,

                                thirdTitle:i.ClassRoomName,

                                thirdTitleID:i.ClassRoomID,

                                WeekDay:i.WeekDay,

                                ClassHourNO:i.ClassHourNO

                            };

                        }else {

                            return ;

                        }

                    }).filter(i => {return i!==undefined});

                    teacherObj['list'] = list;

                    return teacherObj;

                });
                //判断操作是否是下一页操作
                if (opt&&opt.nextPage){

                    schedule.push(...SubjectTeacherSchedule);

                    dispatch({type:SUBJECT_TEACHER_SCHEDULE_UPDATE,data:schedule});

                    dispatch({type:STS_PAGE_ADD});

                }else{

                    dispatch({type:SUBJECT_TEACHER_SCHEDULE_UPDATE,data:SubjectTeacherSchedule});

                }

                dispatch({type:TEACHER_SUBJECT_TEACHER_SUBJECT_TEACHER_COUNT,data:data.TeacherCount});

            }


            dispatch({type:LOADING_HIDE});

        });

    }

};

export default {

    SUBJECT_TEACHER_SCHEDULE_INIT,

    STS_SUBJECT_CHANGE,

    STS_NOW_WEEK_CHANGE,

    SUBJECT_TEACHER_SCHEDULE_UPDATE,

    STS_PAGE_ADD,

    LOADING_SHOW,

    LOADING_HIDE,

    TEACHER_SUBJECT_TEACHER_SUBJECT_TEACHER_COUNT,

    TEACHER_STS_SUBJECT_DROP_SHOW,

    TEACHER_STS_SUBJECT_DROP_HIDE,

    TEACHER_STS_SUBJECT_DROP_CHANGE,

    TEACHER_STS_SUBJECT_DROP_LIST_CHANGE,

    TEACHER_STS_SUBJECT_TITLE_CHANGE,

STSPageUpdate

}