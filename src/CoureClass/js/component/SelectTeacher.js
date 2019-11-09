import React from 'react'
import { connect } from 'react-redux';
import actions from '../actions';
import '../../scss/SelectTeacher.scss'
import { postData, getData } from '../../../common/js/fetch'
import { Scrollbars } from 'react-custom-scrollbars'

import history from '../containers/history'
import { Input, } from 'antd'
import CONFIG from '../../../common/js/config';
import { Search, Loading,Empty } from "../../../common";


class SelectTeacher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            select: false,
            UserMsg:props.DataState.LoginUser,
            subject:props.subject,
            CancelBtnShow: 'n',
            keyword: '',
            searchValue:''
        }
    }

    componentWillReceiveProps(nextProps) {
        const { DataState, UIState } = nextProps;
        let selectTeacherID = Object.keys(DataState.GetCourseClassDetailsHandleClassMsg.transfer.Teacher).length!==0?DataState.GetCourseClassDetailsHandleClassMsg.transfer.Teacher.value:DataState.GetCourseClassDetailsHandleClassMsg.selectData.Teacher.value;

        this.setState({
            selectTeacherID: selectTeacherID
        })

    }

    //搜索
    onClickSearch = (value) => {
        const { DataState, UIState, dispatch } = this.props;
        // console.log(value.value)
        if(value.value===''){
            dispatch(
                actions.UpUIState.showErrorAlert({
                  type: "btn-error",
                  title: "关键字不能为空",
                  ok: this.onAppAlertOK.bind(this),
                  cancel: this.onAppAlertCancel.bind(this),
                  close: this.onAppAlertClose.bind(this)
                })
              );
        }else{
            this.setState({
                CancelBtnShow: 'y',
                keyword: value.value,
                
            })
            dispatch(actions.UpDataState.getSubjectTeacherMsg('/GetTeacherInfoBySubjectAndKey?schoolID='+this.state.UserMsg.SchoolID+'&key='+value.value+'&subjectID='+this.state.subject))
        }
        

    }
    onAppAlertOK() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
        //window.location.href = "/html/login"
      }
      onAppAlertCancel() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
      }
      onAppAlertClose() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
      }
    //选择教师
    onSelectTeacherClick = (value, title) => {
        const { DataState, UIState, dispatch } = this.props;
      // console.log(value, title)
        // this.setState({
        //     selectTeacherID: value
        // })
        let Teacher = {
            value: value,
            title: title
        }
        dispatch(actions.UpDataState.setSubjectTeacherTransferMsg(Teacher))
    }
    //搜索change
    onChangeSearch = (e) => {
        this.setState({
            searchValue: e.target.value
        })
    }
    // 取消搜索
    onCancelSearch = (e) => {
        const { dispatch, DataState } = this.props
        let Subject = DataState.GetCourseClassDetailsHandleClassMsg.selectData?DataState.GetCourseClassDetailsHandleClassMsg.selectData.Subject?DataState.GetCourseClassDetailsHandleClassMsg.selectData.Subject:{}:{}
        this.setState({
            CancelBtnShow: 'n',
            keyword: '',
            searchValue: '',
            // selectClassTab: '',
            // leftShow: true,
        })
        // console.log(Subject.value)
        dispatch(actions.UpDataState.getSubjectTeacherMsg('/GetTeacherInfoBySubjectAndKey?key=&schoolID=' + this.state.UserMsg.SchoolID + '&subjectID=' + (Subject.value||DataState.GetCourseClassDetailsHandleClassMsg.SubjectID)))
        
    }
    render() {
        const { DataState, UIState } = this.props;
        // console.log(this.state.selectTeacherID)
        let teacherList = DataState.GetSubjectTeacherMsg.teacherList ? DataState.GetSubjectTeacherMsg.teacherList : [];
        return (
            <React.Fragment>
                <div id='SelectTeacher' className='selectTeacher-box'>
                    <div className='box-top'>
                        <Search
                            className='top-search'
                            placeholder='请输入教师名称或工号搜索'
                            width='280'
                            Value={this.state.searchValue}
                            onChange={this.onChangeSearch.bind(this)}
                            onCancelSearch={this.onCancelSearch}
                            CancelBtnShow={this.state.CancelBtnShow}
                            onClickSearch={this.onClickSearch.bind(this)}
                        ></Search>
                    </div>
                    <Scrollbars
                        style={{ width: 100 + '%', height: 437 + 'px' }}
                    >
                        <Loading spinning={UIState.AppLoading.teacherLoading}>
                            <div className='box-content'>
                                {
                                    (teacherList instanceof Array && teacherList.length>0)?teacherList.map((child, index) => {
                                        return (
                                            <span
                                                onClick={this.onSelectTeacherClick.bind(this, child.value, child.title)}
                                                title={child.value}
                                                key={index}
                                                className={`teacher-card ${this.state.selectTeacherID === child.value ? 'select' : ''}`}>
                                                {child.title}
                                            </span>
                                        )
                                    }):<Empty type='4' title='该学科暂无教师' style={{ marginTop: '218.5px', transform: 'translateY(-50%)' }}></Empty>
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