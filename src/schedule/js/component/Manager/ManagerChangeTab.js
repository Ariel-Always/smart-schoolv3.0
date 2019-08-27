import React,{Component} from 'react';

import {HashRouter as Router,NavLink} from 'react-router-dom';

class Modal extends Component{
    render() {
        return (
            <div className="schedule-change-tab">

                <NavLink className="schedule-change-tab-item" activeClassName="active" exact to="/manager/subject-teacher/subject">学科总课表</NavLink>

                <NavLink className="schedule-change-tab-item" exact to="/manager/subject-teacher/classroom">教室课表</NavLink>

            </div>
        );
    }
}
export default Modal;