import React,{Component} from 'react';

import {HashRouter as Router, NavLink} from "react-router-dom";

class ManagerHeaderRouter extends Component{
    render() {

        const {LinkInfo} =this.props;

        return (

            <div className="schedule-router-tab clearfix">

                  <NavLink  className="schedule-router-tab-item" activeClassName="active" to="/manager/subject-teacher" >

                      <span className="router-title subject">学科教师课表</span>

                  </NavLink>

                  <NavLink  className="schedule-router-tab-item" activeClassName="active" to="/manager/class" >

                      <span className="router-title class">班级课表</span>

                  </NavLink>

                  <NavLink  className="schedule-router-tab-item" activeClassName="active" to="/manager/classroom" >

                       <span className="router-title classroom">教室课表</span>

                  </NavLink>

            </div>

        );
    }
}
export default ManagerHeaderRouter;