import React,{Component} from 'react';

import {connect} from  'react-redux';

import {HashRouter as Router,Route,Switch,Redirect} from  'react-router-dom';

import ManagerHeaderRouter from '../../component/Manager/ManagerHeaderRouter';

import SubjectTeacher from './SubjectTeacher';

import PeriodWeekTermActions from '../../actions/Manager/PeriodWeekTermActions';




class Index extends Component{

    constructor(props) {

        super(props);

        const {dispatch} = props;

        dispatch(PeriodWeekTermActions.getPeriodWeekTerm());

    }


    render() {

        return (

            <React.Fragment>
                {/*头部的路由选项卡*/}

                <ManagerHeaderRouter ></ManagerHeaderRouter>
               {/* 泡泡型标签链接按钮*/}

                <Router>

                    <Switch>

                        <Route path="/manager/subject-teacher" component={SubjectTeacher}></Route>

                    </Switch>

                </Router>


            </React.Fragment>

        );

    }

}

const mapStateToProps = (state) => {

      const {Manager} = state;

      return {
          Manager
      }

};

export default connect(mapStateToProps)(Index);