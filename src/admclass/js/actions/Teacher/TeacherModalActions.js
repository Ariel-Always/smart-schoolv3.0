//教师弹窗
import AppAlertActions from '../../actions/AppAlertActions';

import ApiActions from '../../actions/ApiActions';

import CCActions from '../../actions/Teacher/ClassChargeActions';


const TEACHER_TEACHER_MODAL_SHOW = 'TEACHER_TEACHER_MODAL_SHOW';
const TEACHER_TEACHER_MODAL_HIDE = 'TEACHER_TEACHER_MODAL_HIDE';
const TEACHER_TEACHER_MODAL_LOADING_HIDE = "TEACHER_TEACHER_MODAL_LOADING_HIDE";
const TEACHER_TEACHER_MODAL_LOADING_SHOW = 'TEACHER_TEACHER_MODAL_LOADING_SHOW';
const TEACHER_TEACHER_MODAL_LIST_LOADING_HIDE = 'TEACHER_TEACHER_MODAL_LIST_LOADING_HIDE';
const TEACHER_TEACHER_MODAL_LIST_LOADING_SHOW = 'TEACHER_TEACHER_MODAL_LIST_LOADING_SHOW';
const TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_DISABLED = 'TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_DISABLED';
const TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_ABLED = 'TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_ABLED';
const TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_CHANGE = 'TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_CHANGE';
const TEACHER_TEACHER_MODAL_INPUT_CHANGE = 'TEACHER_TEACHER_MODAL_INPUT_CHANGE';
const TEACHER_TEACHER_MODAL_EMPTY_HIDE = 'TEACHER_TEACHER_MODAL_EMPTY_HIDE';
const TEACHER_TEACHER_MODAL_EMPTY_SHOW = 'TEACHER_TEACHER_MODAL_EMPTY_SHOW';
const TEACHER_TEACHER_MODAL_CLOSE_SHOW = 'TEACHER_TEACHER_MODAL_CLOSE_SHOW';
const TEACHER_TEACHER_MODAL_CLOSE_HIDE = 'TEACHER_TEACHER_MODAL_CLOSE_HIDE';



//教师的弹窗
const TEACHER_TEACHER_MODAL_UPDATA_TEACHERLIST = 'TEACHER_TEACHER_MODAL_UPDATA_TEACHERLIST';
const TEACHER_TEACHER_MODAL_UPDATA_SUBJECTS = 'TEACHER_TEACHER_MODAL_UPDATA_SUBJECTS';
const TEACHER_TEACHER_MODAL_UPDATE_NEW_TEACHER = 'TEACHER_TEACHER_MODAL_UPDATE_NEW_TEACHER';
const TEACHER_TEACHER_MODAL_UPDATE_ORIGIN_TEACHER = 'TEACHER_TEACHER_MODAL_UPDATE_ORIGIN_TEACHER';
const TEACHER_TEACHER_MODAL_ORIGIN_TEACHER_SHOW = 'TEACHER_TEACHER_MODAL_ORIGIN_TEACHER_SHOW';
const TEACHER_TEACHER_MODAL_ORIGIN_TEACHER_HIDE = 'TEACHER_TEACHER_MODAL_ORIGIN_TEACHER_HIDE';
const TEACHER_TEACHER_MODAL_NEW_TEACHER_TITLE = 'TEACHER_TEACHER_MODAL_NEW_TEACHER_TITLE';






//教师弹框获取所有的教师和学科的数据
const getTeacherData = (opts) =>{

    return (dispatch,getState) => {

        let TeacherID = '';

        const ClassID = getState().Teacher.ClassCharge.ActiveClassID;

        const {type,originTeacherInfo } = opts;

        const { SubjectID,SubjectName } = originTeacherInfo?originTeacherInfo:{};

        let { SchoolID } = getState().DataState.LoginUser;

        switch (type) {

            case 1:

                dispatch({type:TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_CHANGE,data:{value:"none",title:"请选择学科"}});

                ApiActions.GetSubject({ClassID,dispatch}).then(data=>{

                    if (data){

                        dispatch({type:TEACHER_TEACHER_MODAL_UPDATA_SUBJECTS,list:data});

                    }

                    dispatch({type:TEACHER_TEACHER_MODAL_LOADING_HIDE});

                });

                break;

            case 2:

                dispatch({type:TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_CHANGE,data:{value:SubjectID,title:SubjectName}});

                dispatch({type:TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_DISABLED});

                TeacherID = getState().Teacher.TeacherModal.originTeacherInfo.id;

                ApiActions.GetTeacherToPage({SchoolID,UserID:TeacherID,PageSize:0,SubjectIDs:SubjectID}).then(data=>{

                    if (data){

                        dispatch({type:TEACHER_TEACHER_MODAL_UPDATA_TEACHERLIST,list:data});

                    }

                    dispatch({type:TEACHER_TEACHER_MODAL_LOADING_HIDE});

                });

                break;

            default:

                return;

        }

    }

};

//教师弹窗选择的学科发生改变

const teacherModalSelectChange = (selectData) => {

    return (dispatch,getState) => {

        const {type,inputContent} = getState().Teacher.TeacherModal;

        let { SchoolID } = getState().DataState.LoginUser;

        dispatch({type:TEACHER_TEACHER_MODAL_LIST_LOADING_SHOW});

        let TeacherID = '';

        if (type ===2||type===4){ //如果type是2或者4类型的代表更新需要将已有教师ID排除

            TeacherID = getState().Teacher.TeacherModal.originTeacherInfo.id;

        }

        let SubjectID = selectData.value;


        ApiActions.GetTeacherToPage({SchoolID,UserID:TeacherID,SubjectIDs:SubjectID,Keyword:inputContent}).then(data=>{

            if (data){

                dispatch({type:TEACHER_TEACHER_MODAL_UPDATA_TEACHERLIST,list:data});

            }

            dispatch({type:TEACHER_TEACHER_MODAL_LIST_LOADING_HIDE});

        });

    }

};

//教师弹窗点击搜索按钮
const  teacherSearchBtnClick = () => {

    return (dispatch,getState) => {
        //展示loading
        dispatch({type:TEACHER_TEACHER_MODAL_LIST_LOADING_SHOW});

        dispatch({type:TEACHER_TEACHER_MODAL_CLOSE_SHOW});

        let { type,subjectsSelect,inputContent } = getState().Teacher.TeacherModal;

        let { SchoolID } = getState().DataState.LoginUser;

        let UserID = '';

        let SubjectID = '';

        if (type===2||type===4){//排除教师ID

            UserID = getState().Teacher.TeacherModal.originTeacherInfo.id;

        }

        if(subjectsSelect.value==='none'){

            dispatch(AppAlertActions.alertWarn({title:"请先选择学科！"}));

            dispatch({type:TEACHER_TEACHER_MODAL_LIST_LOADING_HIDE});

        }else{

            SubjectID = subjectsSelect.value;

            getAllTeacher({SchoolID,SubjectIDs:SubjectID,UserID,Keyword:inputContent,dispatch}).then(data=>{

                if (data){

                    dispatch({type:TEACHER_TEACHER_MODAL_UPDATA_TEACHERLIST,list:data});

                    dispatch({type:TEACHER_TEACHER_MODAL_LIST_LOADING_HIDE});

                }else{

                    dispatch({type:TEACHER_TEACHER_MODAL_LIST_LOADING_SHOW});

                }

            });

        }



    }

};

//教师弹窗点击取消搜索
const teacherSearchClose = () => {

    return (dispatch,getState) => {

        dispatch({type:TEACHER_TEACHER_MODAL_LIST_LOADING_SHOW});

        let { SchoolID } = getState().DataState.LoginUser;

        let {subjectsSelect,type} = getState().Teacher.TeacherModal;

        let UserID = '';

        let SubjectID = '';

        if (subjectsSelect.value==='none'){

            dispatch({type:TEACHER_TEACHER_MODAL_LIST_LOADING_HIDE});

            return;

        }else{

            SubjectID = subjectsSelect.value;

        }

        if (type===2||type===4){//排除教师ID

            UserID = getState().Teacher.TeacherModal.originTeacherInfo.id;

        }

        getAllTeacher({SchoolID,SubjectIDs:SubjectID,UserID}).then(data=>{

            if (data){

                dispatch({type:TEACHER_TEACHER_MODAL_UPDATA_TEACHERLIST,list:data});

            }

            dispatch({type:TEACHER_TEACHER_MODAL_LIST_LOADING_HIDE});

        });

    }

};

//更改任课教师
const updateTeacher = (classInfo) => {

    return (dispatch,getState) => {

        const newTeacherId = getState().Teacher.TeacherModal.newPickTeacher.id;

        const ClassID = classInfo.ClassID;

        let SubjectID = '';

        const type = getState().Teacher.TeacherModal.type;

        if (type===2){

            SubjectID = getState().Teacher.TeacherModal.SubjectID;

        }else{

            SubjectID = getState().Teacher.TeacherModal.subjectsSelect.value;

        }

        let tips = '';

        switch (type) {

            case 1:

                tips = '添加任课教师成功';

                break;

            case 2:

                tips = '更改任课教师成功！';

                break;

            default:

                tips = '';

        }

        setTeacher({ClassID,SubjectID,UserID:newTeacherId,dispatch}).then(data=>{

            if (data==='success'){

                dispatch(AppAlertActions.alertSuccess({title:tips}));

            }

            getTeachers({ClassID,dispatch}).then(data=>{

                if (data){

                    dispatch({type:GET_THE_CLASS_THEACHERS,data:data});

                }

            });

            dispatch({type:TEACHER_TEACHER_MODAL_HIDE});

        });

    }

};

//删除任课教师

const delSubjectTeacher = ({ClassID,SubjectID}) => {

    return (dispatch,getState) => {

        ApiActions.SetCourseClassTeacher({ClassID,SubjectID,dispatch}).then(data=>{

            if (data===0){

                dispatch({type:AppAlertActions.CLOSE_ERROR_ALERT});

                dispatch(AppAlertActions.alertSuccess({title:"删除成功！"}));

                dispatch(CCActions.TeacherUpdate());

            }


        });

    }

};



export default {

    TEACHER_TEACHER_MODAL_HIDE,
    TEACHER_TEACHER_MODAL_SHOW,
    TEACHER_TEACHER_MODAL_LOADING_SHOW,
    TEACHER_TEACHER_MODAL_LOADING_HIDE,
    TEACHER_TEACHER_MODAL_LIST_LOADING_HIDE,
    TEACHER_TEACHER_MODAL_LIST_LOADING_SHOW,
    TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_CHANGE,
    TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_DISABLED,
    TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_ABLED,
    TEACHER_TEACHER_MODAL_INPUT_CHANGE,
    TEACHER_TEACHER_MODAL_EMPTY_SHOW,
    TEACHER_TEACHER_MODAL_EMPTY_HIDE,
    TEACHER_TEACHER_MODAL_CLOSE_HIDE,
    TEACHER_TEACHER_MODAL_CLOSE_SHOW,

    TEACHER_TEACHER_MODAL_UPDATA_SUBJECTS,
    TEACHER_TEACHER_MODAL_UPDATA_TEACHERLIST,
    TEACHER_TEACHER_MODAL_UPDATE_NEW_TEACHER,
    TEACHER_TEACHER_MODAL_UPDATE_ORIGIN_TEACHER,
    TEACHER_TEACHER_MODAL_ORIGIN_TEACHER_SHOW,
    TEACHER_TEACHER_MODAL_ORIGIN_TEACHER_HIDE,
    TEACHER_TEACHER_MODAL_NEW_TEACHER_TITLE,

    getTeacherData,

    teacherModalSelectChange,

    teacherSearchBtnClick,

    teacherSearchClose,

    updateTeacher,

    delSubjectTeacher

}