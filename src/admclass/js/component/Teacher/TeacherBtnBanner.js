import React,{Component} from 'react';

import {connect} from 'react-redux';

import {Button} from "../../../../common";

class TeacherBtnBanner extends Component{

    constructor(props) {

        super(props);

        const { dispatch } = props;

    }


    render(){

        const { ClassCharge,TeacherModalShow } = this.props;

        const { StudentPower,TeacherPower } = ClassCharge;


        return  <div className="teacher-btn-wrapper">

            {

                StudentPower?

                    <React.Fragment>

                        <Button color="blue" className="import-class">导入学生</Button>

                        <Button color="blue" className="import-class">添加学生</Button>

                        <Button color="blue" className="import-teacher">学生注册审核</Button>

                    </React.Fragment>

                    :''


            }

            {

                TeacherPower?

                    <Button color="blue" className="import-teacher" onClick={e=>TeacherModalShow({type:1})}>添加任课教师</Button>

                    :''

            }


        </div>

    }

}

const mapStateToProps = (state)=>{

    const{ ClassCharge } = state.Teacher;

    return {

        ClassCharge

    }

};

export default connect(mapStateToProps)(TeacherBtnBanner);