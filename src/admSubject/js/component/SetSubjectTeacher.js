import React from 'react';
import '../../scss/SetSubjectTeacher.scss'
import { connect } from 'react-redux'
import { Input } from 'antd'
import CONFIG from '../../../common/js/config';
import { postData, getData } from "../../../common/js/fetch";
import { CheckBox, CheckBoxGroup, Loading, DropDown } from '../../../common'
import { defaultGrades } from '../containers/config'
import actions from '../actions';

class SetSubjectTeacher extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch, DataState, UIState } = props;
        let dropSelect = [];


        let AllGrades = [];

        DataState.SetSubjectTeacherMsg.SubjectTeacherMsg.Teachers.split(',').map((teacher, index) => {
            let teacherArr = teacher.split('/');
            let Grades = teacherArr[0];
            let TeacherID = teacherArr[1];
            let TeacherName = teacherArr[2];
            AllGrades.push(Grades)
            //初始下拉选择

            if (TeacherID)
                dropSelect[index] = { value: TeacherID, title: TeacherName }
            else
                dropSelect[index] = { value: '', title: '未选择' }


        })
        //请求链接和参数
        let url = '/AdmSubjectTeacher?schoolID=' + DataState.LoginUser.SchoolID + '&subjectID=' + DataState.SetSubjectTeacherMsg.SubjectTeacherMsg.SubjectID + '&key=';
        //获取初始全部学科信息
        dispatch(actions.UpDataState.getSubjectTeacherMsg(url, 'All', AllGrades));
        this.state = {
            dropSelect: dropSelect
        }
    }
    componentWillMount() {


    }

    componentWillUpdate() {

    }
    componentWillReceiveProps(nextProps) {
        // const { dispatch,DataState, UIState } = nextProps;

        // DataState.SetSubjectTeacherMsg.SubjectTeacherMsg.Teachers.split(',').map((teacher, index) => {
        //     let teacherArr = teacher.split('/');
        //     let Grades = teacherArr[0];
        //     let TeacherID = teacherArr[1];
        //     let TeacherName = teacherArr[2];
        //     //请求链接和参数
        //     let url = '/AdmSubjectTeacher?schoolID=' + DataState.LoginUser.SchoolID + '&subjectID=' + DataState.SetSubjectTeacherMsg.SubjectTeacherMsg.SubjectID + '&key=';
        //     //获取初始全部学科信息
        //     //dispatch(actions.UpDataState.getSubjectTeacherMsg(url, Grades));
        //     //初始下拉选择
        //     let dropSelect = this.state.dropSelect;
        //     dropSelect[index] = { value: TeacherID, title: TeacherName }


        // })

    }



    //添加学科下拉菜单
    dropMenuTeacher = (index, value) => {
        const { dispatch, DataState, UIState } = this.props;
        console.log(value)
        let GlabalGrades = '';
        if (value.value === 0) {
            this.setState({
                showInput: true,
                dropSelected: value
            })
        } else {
            this.setState({
                showInput: false,
                dropSelected: value
            })
        }
        DataState.SubjectMsg.addSubjectMsg.map((child, index) => {
            if (child.value === value.value)
                GlabalGrades = child.GlabalGrades
        })
        dispatch(actions.UpDataState.handleSubjectNameModalMsg({
            SubjectName: value.title,
            SubjectID: value.value
        }))
        dispatch(actions.UpDataState.handleSubjectModalMsg(GlabalGrades))
    }

    onSubjectInputChange = (e) => {
        const { dispatch, DataState } = this.props;

        this.setState({
            SubjectInput: e.target.value,

        })
        dispatch(actions.UpDataState.handleSubjectNameModalMsg({
            SubjectName: e.target.value,
            SubjectID: ''
        }))
        dispatch(actions.UpDataState.handleSubjectModalMsg(''))
    }

    setNewTeacher = () => {

    }

    //search下拉菜单事件
    onDropClickSearch = (grades, index, value) => {
        const { dispatch, DataState } = this.props;
        let url = '/AdmSubjectTeacher?schoolID=' + DataState.LoginUser.SchoolID + '&subjectID=' + DataState.SetSubjectTeacherMsg.SubjectTeacherMsg.SubjectID + '&key=';

        console.log(grades, index, value)
        dispatch({ type: actions.UpUIState.SEARCH_LOADING_OPEN });
        dispatch(actions.UpDataState.getSubjectTeacherMsg(url, grades));
    }
    onMultipleChange = (grades, index, value) => {
        const { dispatch, DataState } = this.props;

        let url = '/AddSubject';
        let dropSelect = this.state.dropSelect;
        dropSelect[index] = { title: value.value, value: value.id }
        console.log(grades, index, value, dropSelect)
        this.setState({
            dropSelect: dropSelect
        })
        let list = [];
        for(let key in DataState.SetSubjectTeacherMsg.SubjectTeacherList){
            list.push(key)
        }
        let Teachers = dropSelect.map((child, key) => {
            let newArr = [list[key], child.value, child.title]
            return newArr.join('/')
        }).join(',');
        let SubjectTeacher = Object.assign({},DataState.SetSubjectTeacherMsg.SubjectTeacherMsg,{Teachers:Teachers}) 
        dispatch(actions.UpDataState.setSubjectTeacherMsg(SubjectTeacher));
        
    }
    render() {
        const { DataState, UIState } = this.props;
        let data = {};
        return (
            <Loading size="large" spinning={UIState.AppLoading.modalLoading}>

                <div className='SetSubjectTeacher'>
                    <div className='row clearfix'>
                        <span className='culonm-1'>学科名称：</span>
                        <span className='culonm-2'><span className='subjectName'>{DataState.SetSubjectTeacherMsg.SubjectTeacherMsg.SubjectName}</span></span>
                    </div>
                    {/* <div className='row clearfix'>
                        <span className='culonm-1'>小学教研组长：</span>
                        <div className='culonm-2 culonm-3'>{
                           <DropDown
                           ref='dropMenuSubject'
                           type='multiple'
                           style={{zIndex:2}}
                           className ={'DropMenu'}
                           onChange={this.dropMenuSubject.bind(this)}
                           width={120}
                           dropSelectd={this.state.dropSelected}
                           dropList={DataState.SubjectMsg.addSubjectMsg ? DataState.SubjectMsg.addSubjectMsg : [{ value: 0, title: '自定义',GlabalGrades:[] }]}
                       ></DropDown>
                        }</div>
                    </div> */}

                    {
                        DataState.SetSubjectTeacherMsg.SubjectTeacherMsg.Teachers.split(',').map((teacher, index) => {
                            let teacherArr = teacher.split('/');
                            let Grades = teacherArr[0];
                            let TeacherID = teacherArr[1];
                            let TeacherName = teacherArr[2];
                            let GradeName = ''
                            if (Grades === 'P1') {
                                GradeName = '小学';
                            } else if (Grades === 'P2') {
                                GradeName = '初中';
                            } else if (Grades === 'P3') {
                                GradeName = '高中';
                            }


                            return (
                                <div key={index} className='row clearfix'>
                                    <span className='culonm-1'>{GradeName}教研组长：</span>
                                    <div className='culonm-2 culonm-3'>{
                                        <DropDown
                                            ref='dropMenuSubject'
                                            type='multiple'
                                            style={{ zIndex: 5 - index }}
                                            className={'DropMenu'}
                                            onChange={this.dropMenuTeacher.bind(this, index)}
                                            width={120}
                                            mutipleOptions={{
                                                searchWidth: 300,
                                                width: 400,
                                                height: 250,
                                                range: 1,
                                                searchLoadingShow: UIState.AppLoading.searchLoading,
                                                searchPlaceholder: '请输入任课教师工号或名称进行搜索',
                                                searchList: DataState.SetSubjectTeacherMsg.SubjectTeacherList ? DataState.SetSubjectTeacherMsg.SubjectTeacherList[Grades] : [{}],
                                                dropClickSearch: this.onDropClickSearch.bind(this, Grades, index),
                                                dropMultipleChange: this.onMultipleChange.bind(this, Grades, index)
                                            }}
                                            dropSelectd={this.state.dropSelect[index]}

                                        ></DropDown>
                                    }</div>
                                </div>
                            )
                        })
                    }
                </div>
            </Loading>
        )
    }
}
const mapStateToProps = (state) => {
    let { UIState, DataState } = state;
    return {
        UIState,
        DataState
    }
};
export default connect(mapStateToProps)(SetSubjectTeacher)