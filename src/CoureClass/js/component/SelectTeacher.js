import React from 'react'
import { connect } from 'react-redux';
import actions from '../actions';
import '../../scss/SelectTeacher.scss'
import { postData, getData } from '../../../common/js/fetch'
import { Scrollbars } from 'react-custom-scrollbars'

import history from '../containers/history'
import { Input, } from 'antd'
import CONFIG from '../../../common/js/config';
import { Search, Loading } from "../../../common";


class SelectTeacher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            select: false,
            UserMsg:props.DataState.LoginUser,
            subject:props.subject
        }
    }

    componentWillReceiveProps(nextProps) {
        const { DataState, UIState } = nextProps;
        let selectTeacherID = DataState.GetCourseClassDetailsHandleClassMsg.transfer.Teacher.length!==0?DataState.GetCourseClassDetailsHandleClassMsg.transfer.Teacher.value:DataState.GetCourseClassDetailsHandleClassMsg.selectData.Teacher.value;

        this.setState({
            selectTeacherID: selectTeacherID
        })

    }

    //搜索
    onClickSearch = (value) => {
        const { DataState, UIState, dispatch } = this.props;
        console.log(value.value)
        dispatch(actions.UpDataState.getSubjectTeacherMsg('/GetTeacherInfoBySubjectAndKey?schoolID='+this.state.UserMsg.schoolID+'key='+value.value+'&subjectID='+this.state.subject))

    }
    //选择教师
    onSelectTeacherClick = (value, title) => {
        const { DataState, UIState, dispatch } = this.props;
        console.log(value, title)
        // this.setState({
        //     selectTeacherID: value
        // })
        let Teacher = {
            value: value,
            title: title
        }
        dispatch(actions.UpDataState.setSubjectTeacherTransferMsg(Teacher))
    }
    render() {
        const { DataState, UIState } = this.props;
        console.log(this.state.selectTeacherID)
        let teacherList = DataState.GetSubjectTeacherMsg.teacherList ? DataState.GetSubjectTeacherMsg.teacherList : [];
        return (
            <React.Fragment>
                <div id='SelectTeacher' className='selectTeacher-box'>
                    <div className='box-top'>
                        <Search
                            className='top-search'
                            placeholder='请输入教师名称或工号搜索'
                            width='280'
                            onClickSearch={this.onClickSearch.bind(this)}
                        ></Search>
                    </div>
                    <Scrollbars
                        style={{ width: 100 + '%', height: 437 + 'px' }}
                    >
                        <Loading spinning={UIState.AppLoading.teacherLoading}>
                            <div className='box-content'>
                                {
                                    teacherList.map((child, index) => {
                                        return (
                                            <span
                                                onClick={this.onSelectTeacherClick.bind(this, child.value, child.title)}
                                                title={child.value}
                                                key={index}
                                                className={`teacher-card ${this.state.selectTeacherID === child.value ? 'select' : ''}`}>
                                                {child.title}
                                            </span>
                                        )
                                    })
                                }
                            </div>
                        </Loading>
                    </Scrollbars>
                </div>
            </React.Fragment>
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
export default connect(mapStateToProps)(SelectTeacher);