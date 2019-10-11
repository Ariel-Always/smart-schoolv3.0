import React from 'react'
import { connect } from 'react-redux';
import actions from '../actions';
import '../../scss/CourseClassDetails.scss'
import history from '../containers/history'
import { Table, Button,DetailsModal } from "../../../common";

class CourseClassDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            columns: [
                {
                    title: '序号',
                    align: 'center',
                    key: 'OrderNO',
                    width: 100,
                    dataIndex: 'OrderNO',
                    render: OrderNO => {
                        return (
                            <span className='key-content'>{OrderNO >= 10 ? OrderNO : '0' + OrderNO}</span>
                        )
                    }

                },
                {
                    title: '姓名',
                    align: 'center',
                    width: 122,
                    dataIndex: 'StudentName',
                    key: 'StudentName',
                    render: StudentName => {
                        return (
                            <span className='StudentName-name'>{StudentName.StudentName}</span>
                        )
                    }
                },
                {
                    title: '学号',
                    width: 122,
                    align: 'center',
                    dataIndex: 'StudentID',
                    key: 'StudentID',
                    render: StudentID => {
                        return (
                            <span className='StudentID'>{'[' + StudentID + ']'}</span>
                        )
                    }
                },
                {
                    title: '性别',
                    width: 122,
                    align: 'center',
                    dataIndex: 'Gender',
                    key: 'Gender',
                    render: Gender => {
                        return (
                            <span className='Gender'>{Gender}</span>
                        )
                    }
                },
                {
                    title: '所属行政班',
                    width: 229,
                    align: 'center',
                    key: 'Class',
                    dataIndex: 'Class',
                    render: (Class) => {
                        return (
                            <span className='Class'>{Class.Grade + '>' + Class.Class}</span>
                        )
                    }
                }
            ],
            UserMsg:props.DataState.LoginUser
        });
    }

    //点击头部任课教师
    onTeacherNameClick = (id) => {
        const { dispatch } = this.props;
        dispatch(actions.UpDataState.getTeacherMsg('/GetUserDetail?userID='+this.state.UserMsg.UserID));

    }
    //关闭教师详情弹窗
    TeacherMsgModalCancel = () => {
        const { dispatch } = this.props;
        dispatch({ type: actions.UpUIState.SUBJECT_DETAILS_MODAL_CLOSE });

    }

    render() {
        const { DataState ,UIState} = this.props;
        let GetCourseClassDetailsMsg = DataState.GetCourseClassDetailsMsg;
        console.log(GetCourseClassDetailsMsg)
        return (
            <React.Fragment>
                <div className='CourseClassDetails'>
                    <div className='details-tips'>
                        <span className='tips-content className'>{GetCourseClassDetailsMsg ? GetCourseClassDetailsMsg.CourseClassName : ''}</span>
                        <span className='tips-content classTeacher'><span className='tips'>任课教师：</span><span onClick={this.onTeacherNameClick.bind(this,GetCourseClassDetailsMsg.TeacherID)}>{GetCourseClassDetailsMsg ? GetCourseClassDetailsMsg.TeacherName + '[' + GetCourseClassDetailsMsg.TeacherID + ']' : ''}</span></span>
                        <span className='tips-content subject'><span className='tips'>学科：</span>{GetCourseClassDetailsMsg ? GetCourseClassDetailsMsg.SubjectName : ''}</span>
                        <span className='tips-content grade'><span className='tips'>年级：</span>{GetCourseClassDetailsMsg ? GetCourseClassDetailsMsg.GradeName : ''}</span>
                        <span className='tips-content studentCount'><span className='tips'>学生人数：</span>{GetCourseClassDetailsMsg ? GetCourseClassDetailsMsg.StudentCount : ''}</span>
                    </div>
                    <Table
                        scroll={{ y: 390 }}
                        className='table'
                        columns={this.state.columns}
                        pagination={false}
                        dataSource={GetCourseClassDetailsMsg ? GetCourseClassDetailsMsg.TableSource : []}>

                    </Table>
                </div>
                <DetailsModal
                    ref='SubjectDetailsMsgModal'
                    visible={UIState.SubjectDetailsMsgModalShow.Show}
                    onCancel={this.TeacherMsgModalCancel}
                    data={DataState.TeacherMsg ? DataState.TeacherMsg.data : {}}
                    type='teacher'
                >

                </DetailsModal>
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
export default connect(mapStateToProps)(CourseClassDetails);