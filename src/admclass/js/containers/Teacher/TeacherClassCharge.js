import React,{Component} from 'react';

import {connect} from 'react-redux';

import CCActions from '../../actions/Teacher/ClassChargeActions';

import ClassTab from '../../component/Teacher/ClassTab';

import TeacherWrapper from './TeacherWrapper';

import StudentWrapper from './StudentWrapper';

import {Loading} from "../../../../common";

import UpUIState from "../../actions/UpUIState";

import UpDataState from "../../actions/UpDataState";



class TeacherClassCharge extends Component{

    constructor(props) {

        super(props);

        const { dispatch } = props;

        //初始化界面
        dispatch(CCActions.PageInit());

    }

    //班级变化
    ClassChange(ClassID){

        const { dispatch } = this.props;

        dispatch(CCActions.ClassChange(ClassID));

    }

    //删除教师

    delSubjectTeacher({SubjectID}){

        const { dispatch,info } = this.props;

        dispatch({type:UpUIState.SHOW_ERROR_ALERT,data:{

                type:"btn-query",

                title:"您确定要删除该学科任课教师么？",

                ok:()=>{  return dispatch(UpDataState.delSubjectTeacher({ClassID:info.id,SubjectID}));},

                cancel:()=>dispatch({type:UpUIState.CLOSE_ERROR_ALERT}),

                close:()=>dispatch({type:UpUIState.CLOSE_ERROR_ALERT})

            }});

    }

//弹出添加教师的弹窗
    addTeacherModalShow(opt){

        const {dispatch,ClassCharge} = this.props;

        switch (opt.type) {

            case 1:
                dispatch({type:UpUIState.ADD_TEACHER_MODAL_SHOW});

                break;

            case 2:

                dispatch({type:UpUIState.ADD_TEACHER_MODAL_SHOW,options:{

                        originTeacherShow:true,

                        originTeacherInfo:opt.originTeacherInfo,

                        originTeacherTitle:"原任课教师",

                        newTeacherTitle:"新任课教师",

                        modalTitle:"更改任课教师",

                        type:2,

                        SubjectID:opt.originTeacherInfo.SubjectID

                    }});

                break;

            default:

                dispatch({type:UpUIState.ADD_TEACHER_MODAL_SHOW});

        }
        //初始化所有的教师和学科的数据
        dispatch(UpDataState.getAddTeacherData({ClassID:ClassCharge.ActiveClassID,...opt}));

    }



    render(){

        const { ClassCharge } = this.props;

        const { ClassLoadingShow } = ClassCharge;

        return <div className="teacher-class-charge-wrapper">

            <ClassTab ClassChange={this.ClassChange.bind(this)} ClassList={ClassCharge.Class} ActiveID={ClassCharge.ActiveClassID}></ClassTab>

            <Loading spinning={ClassLoadingShow}>

                <TeacherWrapper delSubjectTeacher={this.delSubjectTeacher.bind(this) } addTeacherModalShow={this.addTeacherModalShow.bind(this)}></TeacherWrapper>

                <StudentWrapper></StudentWrapper>

            </Loading>

        </div>

    }

}

const mapStateToProps = (state)=>{

    const{ Teacher } = state;

    const { ClassCharge } = Teacher;

    return {

        ClassCharge

    }

};

export default connect(mapStateToProps)(TeacherClassCharge);