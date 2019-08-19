import React from 'react'
import { connect } from 'react-redux';
import {DropDown} from '../../../common/index'
import '../../../common/scss/_left_menu.scss'
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import '../../scss/Student.scss'
class Student extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //GradeArr:[{value:0,title:'全部年级'}]
            secondDropList:[{value:0,title:'全部班级'}]
        }
    }
    componentWillReceiveProps(){
        let Grades = this.props.DataState.GradeClassMsg.Grades?this.props.DataState.GradeClassMsg.Grades:[];
        let len = Grades.lenght;
        console.log(Grades)
        let GradeArr = [{value:0,title:'全部年级'}];

        for(let i = 0; i < len; i++){
            let Grade = {value:Grades[i].GradeID,title:Grades[i].GradeName}
            GradeArr.push(Grade)
        }

        this.setState({
            GradeArr:GradeArr
        })

    }

    StudentDropMenu = (e) => {
        
        let Classes = [{value:0,title:'全部班级'}];
        let ClassArr = this.props.DataState.GradeClassMsg.returnData.AllClasses[e.value];
        ClassArr.map((Class)=> {
            Classes.push(Class);
        })
        //Classes.push(this.props.DataState.GradeClassMsg.returnData.AllClasses[e.value]);
        //this.refs.dropMenuSecond.state.dropList = Classes;]
        this.setState({
            secondDropList:Classes
        })
        //console.log(this.refs.dropMenuSecond)

    }

    StudentDropMenuSecond = (e) =>{
        console.log(e)
    }

    render() {
        const { UIState, DataState } = this.props;
        return (
            <div className='Student'>
                <div className='Student-box'>
                    <div className='Student-top'>
                        <span className='top-tips'>
                            <span className='tips menu39 '>用户档案总览</span>
                        </span>
                        <div className='top-nav'>
                            <Link className='link' to='/GraduteArchives' replace>查看毕业生档案</Link>
                            <span className='divide'>|</span>
                            <Link className='link' to='/RegisterExamine' replace>学生注册审核</Link>
                            <span className='divide'>|</span>
                            <Link className='link' to='/AddStudent' replace>添加学生</Link>
                            <span className='divide'>|</span>
                            <Link className='link' to='/ImportStudent' replace>导入学生</Link>
                        </div>
                    </div>
                    <hr className='Student-hr' />
                    <div className='Student-content'>
                        <div className='content-top'>
                            <DropDown 
                            ref = 'dropMenuFirst'
                            onChange = {this.StudentDropMenu}
                            width={120}
                            height={72}
                            dropSelectd = {{value:0,title:'全部年级'}}
                            dropList = {DataState.GradeClassMsg.returnData?DataState.GradeClassMsg.returnData.grades:[{value:0,title:'全部年级'}]}
                            ></DropDown>
                            <DropDown 
                            ref = 'dropMenuSecond'
                            width={120}
                            height={72}
                            dropSelectd = {{value:0,title:'全部班级'}}
                            dropList = {this.state.secondDropList}
                            onChange = {this.StudentDropMenuSecond}
                            ></DropDown>
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
export default connect(mapStateToProps)(Student)