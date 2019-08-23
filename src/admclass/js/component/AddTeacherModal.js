import React,{Component} from 'react';
import {Modal} from "../../../common";
import {DropDown,Loading,Button} from "../../../common";
import {Input} from 'antd';
import ScrollBar from 'react-custom-scrollbars';

class AddTeacherModal extends Component{

    render() {

        const {

            loadingShow,

            teacherList,

            subjects,

            subjectsSelect,

            itemClick,

            closeShow,

            newPickTeacher,

            originTeacherShow,

            originTeacherInfo,

            newTeacherTitle

        } = this.props;


        let subjectsList = subjects.map((item) => {

            return {value:item.SubjectID,title:item.SubjectName};

        });


        return (

            <div className="add-teacher-wrapper clearfix">

                <Loading className="add-teacher-loading" opacity={false} type="loading" size="large" spinning={loadingShow}  tip="加载中...">

                    <div className="left-wrapper">

                        <div className="subject-select">

                            <span className="props">所教学科:</span>

                            <DropDown

                                dropSelectd={subjectsSelect}

                                dropList = {subjectsList}

                                height = {96}

                                style={{zIndex:5}}>

                            </DropDown>

                        </div>
                        <div className="add-teacher-search">

                            <span className="props">关键词:</span>

                            <Input type="text" className="search-input" placeholder="请输入教师姓名或工号搜索"/>

                            <input type="button" className="search-close" style={{display:`${closeShow?'block':'none'}`}}/>

                            <Button color="blue" className="search-btn">搜索</Button>

                        </div>

                        <div className="teacher-list-wrapper">

                            <ScrollBar style={{width:712,height:360,marginLeft:12}} autoHide autoHideTimeout={2000}>

                            {

                                teacherList.List&&teacherList.List.map((item,key) => {

                                    return <div key={key} className="teacher-list-item" onClick={()=>{itemClick({id:item.UserID,photo:item.PhotoPath,name:item.UserName})}}>

                                                <div className="teacher-photo" style={{backgroundImage:`url(${item.PhotoPath})`}}></div>

                                                <div className="teacher-name" title={item.UserName}>{item.UserName}</div>

                                                <div className="teacher-id" title={`[${item.UserID}]`}>[<span className="id-body">{item.UserID}</span>]</div>

                                            </div>

                                })

                            }

                            </ScrollBar>

                        </div>

                    </div>

                    <div className="right-wrapper">

                        {

                            originTeacherShow?

                                <div className="origin-teacher-wrapper">

                                    <div className="orgin-teacher-title">原任课教师</div>

                                    <div className="origin-teacher-photo" style={{backgroundImage:`url(${originTeacherInfo.photo})`}}></div>

                                    <div className="origin-teacher-name" title={originTeacherInfo.name}>{originTeacherInfo.name}</div>

                                    <div className="origin-teacher-id" title={`[${originTeacherInfo.id}]`}>[<span className="id-body">{originTeacherInfo.id}</span>]</div>

                                </div>

                                :''

                        }

                        <div className="present-teacher-wrapper">

                            <div className={`present-teacher-title ${originTeacherShow?'':'no-origin'}`}>{newTeacherTitle}</div>

                            <div className="present-teacher-photo" style={{backgroundImage:`url(${newPickTeacher.photo})`}}></div>

                            <div className={`present-teacher-name ${newPickTeacher.id?'':'no-picked'}`} title={newPickTeacher.name?newPickTeacher.name:'未选择'} >{newPickTeacher.name?newPickTeacher.name:'未选择'}</div>

                            {
                                //如果没有选中教师的情况下：
                                newPickTeacher.id?

                                    <div className="present-teacher-id" title={`[${newPickTeacher.id?newPickTeacher.id:''}]`}>[<span className="id-body">{newPickTeacher.id?newPickTeacher.id:''}</span>]</div>

                                    :''
                            }

                        </div>

                    </div>

                </Loading>



            </div>

        );
    }
}
export default AddTeacherModal;