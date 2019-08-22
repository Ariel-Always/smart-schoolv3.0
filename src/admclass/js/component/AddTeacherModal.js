import React,{Component} from 'react';
import {Modal} from "../../../common";
import {DropDown,Loading,Button} from "../../../common";
import {Input} from 'antd';

class AddTeacherModal extends Component{

    render() {

        const {

            loadingShow,

            teacherList,

            subjects,

            subjectsSelect

        } = this.props;


        let subjectsList = subjects.map((item) => {

            return {value:item.SubjectID,title:item.SubjectName};

        });


        return (

            <div className="add-teacher-wrapper clearfix">

                <Loading className="add-teacher-loading" size="large" spinning={loadingShow} type="loading" tip="加载中...">

                    <div className="left-wrapper">

                        <div className="subject-select">

                            <span className="props">所教学科:</span>

                            <DropDown

                                dropSelectd={subjectsSelect}

                                dropList = {subjectsList}

                                height = {96}>

                            </DropDown>

                        </div>
                        <div className="add-teacher-search">

                            <span className="props">关键词:</span>

                            <Input type="text" className="search-input" placeholder="请输入教师姓名或工号搜索"/>

                            <Button color="blue" className="search-btn">搜索</Button>

                        </div>

                        <div className="teacher-list-wrapper">



                        </div>

                    </div>

                    <div className="right-wrapper">

                    </div>

                </Loading>

            </div>

        );
    }
}
export default AddTeacherModal;