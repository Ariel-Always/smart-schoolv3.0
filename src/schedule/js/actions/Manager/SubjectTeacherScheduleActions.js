import Method from "../Method";

const SUBJECT_TEACHER_SCHEDULE_INIT = 'SUBJECT_TEACHER_SCHEDULE_INIT';

const SUBJECT_TEACHER_SCHEDULE_UPDATE = 'SUBJECT_TEACHER_SCHEDULE_UPDATE';

const STS_SUBJECT_CHANGE = 'STS_SUBJECT_CHANGE';

const STS_NOW_WEEK_CHANGE = 'STS_NOW_WEEK_CHANGE';

const STS_PAGE_ADD = 'STS_PAGE_ADD';

const LOADING_SHOW = 'LOADING_SHOW';

const LOADING_HIDE = 'LOADING_HIDE';

//学科教师总表学科课表界面更新
const STSPageUpdate = (opt) => {

    return (dispatch,getState) => {

        dispatch({type:STSActions.LOADING_SHOW});

        const {PeriodWeekTerm,LoginUser,Manager} = getState();
        //获取需要传递的参数
        let SchoolID =LoginUser.SchoolID;

        let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;

        let {NowWeekNo,ItemSubjectSelect,schedule,pageIndex} = Manager.SubjectTeacherSchedule;

        let SubjectID = '';

        let PageIndex = 1;
        //判断已选中的学科是否为全部学科
        if (ItemSubjectSelect.value!==0){

            SubjectID = ItemSubjectSelect.value;

        }
        //如果是下一页的话
        if (opt&&opt.nextPage){

            PageIndex = pageIndex+1;

        }

        let getSTSPromise = Method.getGetData(`/scheduleSubjectTeacherSubject?PageSize=10&SubjectID=${SubjectID}&SchoolID=${SchoolID}&PeriodID=${PeriodID}&WeekNO=${NowWeekNo}&PageIndex=${PageIndex}`);

        getSTSPromise.then(json => {

            let SubjectTeacherSchedule =  json.Data.ItemTeacher.map((item) => {

                let teacherObj = {

                    TeacherID:item.TeacherID,

                    TeacherName:item.TeacherName

                };

                let courseList = json.Data.ItemSchedule.filter((i) => {

                    if (i.TeacherID === item.TeacherID){

                        return i;

                    }

                });

                teacherObj['courseList'] = courseList;

                return teacherObj;

            });
            //判断操作是否是下一页操作
            if (opt&&opt.nextPage){

                schedule.push(...SubjectTeacherSchedule);

                dispatch({type:STSActions.SUBJECT_TEACHER_SCHEDULE_UPDATE,data:schedule});

                dispatch({type:STSActions.STS_PAGE_ADD});

            }else{

                dispatch({type:STSActions.SUBJECT_TEACHER_SCHEDULE_UPDATE,data:SubjectTeacherSchedule});

            }

            dispatch({type:STSActions.LOADING_HIDE});

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

    STSPageUpdate

}