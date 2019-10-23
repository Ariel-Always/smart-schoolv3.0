import React from 'react'
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Search } from '../../../common'
import '../../scss/TimeBanner.scss'
import actions from '../actions';
import history from '../containers/history'

class TimeBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            CancelBtnShow: 'n',
            searchValue: '',
            userMsg: props.DataState.LoginUser

        }
    }

    onAddCourseClassClick = () => {
        const { dispatch, DataState } = this.props;

        dispatch(actions.UpDataState.setCourseClassName([]))
        dispatch(actions.UpDataState.setCourseClassStudentMsg([]))
        dispatch(actions.UpDataState.setSubjectTeacherMsg([]))
        dispatch(actions.UpDataState.setClassStudentTransferMsg([]))
        dispatch(actions.UpDataState.setSubjectTeacherTransferMsg([]))
        dispatch(actions.UpUIState.AddCourseClassModalOpen())

    }
    //搜索
    onClickSearch = (value) => {
        const { DataState, UIState, dispatch } = this.props;

        history.push('/Search/' + value.value)
        let SubjectID = DataState.GetCoureClassAllMsg.Subject;
        let GradeID = DataState.GetCoureClassAllMsg.Grade;
        
        this.setState({
            CancelBtnShow: 'y',
            keyword: value.value
        })
        // dispatch(actions.UpDataState.getClassAllMsg('/GetGradeCouseclassDetailForPage?schoolID=' + this.state.userMsg.SchoolID + '&key=' + value.value + '&pageIndex=1&pageSize=10&subjectID=' + SubjectID + '&gradeID=' + GradeID));
    }
    //查看记录
    onCheckLogClick = () => {
        const { DataState, UIState, dispatch } = this.props;

        //history.push('/Log/Dynamic')
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
        let SubjectID = DataState.GetCoureClassAllMsg.Subject;
        let GradeID = DataState.GetCoureClassAllMsg.Grade;
        this.setState({
            CancelBtnShow: 'n',
            keyword: ''
        })

        dispatch(actions.UpDataState.getClassAllMsg('/GetGradeCouseclassDetailForPage?schoolID=' + this.state.userMsg.SchoolID + '&key=&pageIndex=1&pageSize=10&subjectID=' + SubjectID + '&gradeID=' + GradeID));


    }
    render() {
        const { UIState, DataState } = this.props;
        let route = history.location.pathname;
        let pathArr = route.split('/');
        let handleRoute = pathArr[1];
        let routeID = pathArr[2];
        let subjectID = pathArr[3];
        let classID = pathArr[4];
        let searchValue = ''
        if (handleRoute === 'Search') {
            searchValue = routeID
        }
        return (
            <React.Fragment>
                <Router>
                    {handleRoute !== 'Teacher' ? (
                        <div>
                            <span className='timeBanner_tips'>当前共有<span style={{ color: '#333', fontSize: 16 + 'px' }}>{DataState.GetCoureClassAllMsg.newData ? DataState.GetCoureClassAllMsg.newData.LastLogCount : 0}条更新记录</span>
                                <Link
                                    to='/Log/Dynamic'
                                    target='_blank'
                                    rel='tips_handle'
                                    onClick={this.onCheckLogClick.bind(this)}
                                    className='tips_handle'
                                >查看详情
                        </Link>
                            </span>
                            <div className='handle-content'>
                                <Button onClick={this.onAddCourseClassClick.bind(this)} className='content content-button' height='24' type='primary' color='blue' value='添加教学班' shape='round' />
                                <Link to={'/ImportFile'} target='_blank'><Button className='content content-button' height='24' type='primary' color='blue' value='导入教学班' shape='round' /></Link>

                                <span className='divide content'>|</span>
                                <Search
                                    className='content search'
                                    placeholder='请输入关键字搜索...'
                                    width='220'
                                    Value={this.state.searchValue}
                                    onChange={this.onChangeSearch.bind(this)}
                                    onCancelSearch={this.onCancelSearch}
                                    CancelBtnShow={this.state.CancelBtnShow}
                                    onClickSearch={this.onClickSearch.bind(this)}>

                                </Search>
                            </div>
                        </div>
                    ) : (
                            <div className='handle-content'>
                                <Button onClick={this.onAddCourseClassClick.bind(this)} className='content content-button' height='24' type='primary' color='blue' value='添加教学班' shape='round' />
                                <Link to={'/ImportFile'} target='_blank'><Button className='content content-button' height='24' type='primary' color='blue' value='导入教学班' shape='round' /></Link>
                            </div>
                        )}
                </Router>
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
export default connect(mapStateToProps)(TimeBanner);
