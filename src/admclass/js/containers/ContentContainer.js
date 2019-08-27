import React,{Component} from 'react';
import GradeContent from "./GradeContent";
import ClassContent from "./ClassContent";
import StudentContent from "./StudentContent";
import {withRouter,Route,Switch} from 'react-router-dom';
import {connect} from 'react-redux';




class ContentContainer extends Component{

    render() {

        const {ComponentChange} = this.props.UIState;

        return (
                <div>

                    {/*<Switch>*/}

                        {/*<Route path="/" exact component={GradeContent}></Route>

                        <Route path="/:GradeId" exact component={ClassContent}></Route>

                        <Route path="/:GradeId/:ClassId" exact component={StudentContent}></Route>*/}

                    {
                        ComponentChange.stu?
                            <GradeContent info = {ComponentChange.stuInfo}></GradeContent>
                            :''
                    }
                    {
                        ComponentChange.grade?
                            <ClassContent info ={ ComponentChange.gradeInfo } key={ ComponentChange.gradeInfo.id }></ClassContent>
                            :''
                    }
                    {
                        ComponentChange.class?
                            <StudentContent info ={ ComponentChange.classInfo } key={ComponentChange.classInfo.id}></StudentContent>
                            :''
                    }

                    {/*</Switch>*/}

                </div>
        );
    }
}

const  mapStateToProps = (state) => {

    let {UIState} = state;

    return {
        UIState
    }

};

export default connect(mapStateToProps)(ContentContainer);