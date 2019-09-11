import React from 'react'
import { connect } from 'react-redux';
import actions from '../actions';
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import '../../scss/All.scss'
import ShowCard from './ShowCard'
import history from '../containers/history'

class Subject extends React.Component{
    constructor(props){
        super(props);
        this.state=({

        })
    }
    ShowCardBox = () => {
        const {DataState,UIState} = this.props;
        let route = history.location.pathname;
        let pathArr = route.split('/');
        let handleRoute = pathArr[1];
        let routeID = pathArr[2];
        let item = DataState.GetSubjectAllMsg.hasOwnProperty(routeID)?DataState.GetSubjectAllMsg[routeID].Item:[];
        let showCardBox = item.map((child,index) => {
            return (
                <ShowCard type='class' params = {child} key={index}></ShowCard>
            )
        })

        return showCardBox;
    }
    render(){
        const {DataState,UIState} = this.props;
        let route = history.location.pathname;
        let pathArr = route.split('/');
        let handleRoute = pathArr[1];
        let routeID = pathArr[2];
        return (
            <div className='All'>
            <div className='All-box'>
                <div className='All-top'>
                    <span className='top-tips'>
                        <span className='tips menu10'>教学班级总览</span>
                    </span>

                </div>
                <hr className='All-hr' />
                <div className='All-content'>
                    <div className='content-All-box'>
                        <div className='all All-coureClass'>
                            <span className='all-num coureClass-num'>{DataState.GetSubjectAllMsg.hasOwnProperty(routeID)?DataState.GetSubjectAllMsg[routeID].CourseClassCount:''}</span>
                            <span className='all-tips'>教学班数量</span>
                        </div>
                        <div className='all All-teacher'>
                            <span className='all-num teacher-num'>{DataState.GetSubjectAllMsg.hasOwnProperty(routeID)?DataState.GetSubjectAllMsg[routeID].TeacherCount:''}</span>
                            <span className='all-tips'>任课教师数量</span>
                        </div>
                        <div className='all All-subject'>
                            <span className='all-num teacher-num'>{DataState.GetSubjectAllMsg.hasOwnProperty(routeID)?DataState.GetSubjectAllMsg[routeID].SubjectCount:''}</span>
                            <span className='all-tips'>走班学科数量</span>
                        </div>
                    </div>
                    <div className='content-subject-box'>
                        {this.ShowCardBox()}
                    </div>
                </div>
            </div>
        </div>
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
export default connect(mapStateToProps)(Subject);