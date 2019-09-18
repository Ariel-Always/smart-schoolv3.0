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

    }
    //查看记录
    onCheckLogClick = () => {
        const { DataState, UIState, dispatch } = this.props;

        //history.push('/Log/Dynamic')
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
                <span className='timeBanner_tips'>当前共有{DataState.GetCoureClassAllMsg.newData ? DataState.GetCoureClassAllMsg.newData.LastLogCount : 0}条更新记录
                <a href='http://localhost:3000/html/CoureClass#/Log/Dynamic' target='_blank' onClick={this.onCheckLogClick.bind(this)} className='tips_handle'>查看详情</a></span>
                <div className='handle-content'>
                    <Button onClick={this.onAddCourseClassClick.bind(this)} className='content content-button' height='24' type='primary' color='blue' value='添加教学班' shape='round' />
                    <Button className='content content-button' height='24' type='primary' color='blue' value='导入教学班' shape='round' />
                    <span className='divide content'>|</span>
                    <Search
                        className='content search'
                        placeholder='请输入关键字搜索...'
                        width='220'

                        onClickSearch={this.onClickSearch.bind(this)}></Search>
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
export default connect(mapStateToProps)(TimeBanner);
