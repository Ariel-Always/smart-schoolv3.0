import React from 'react'
import { connect } from 'react-redux';
import actions from '../actions';
import '../../scss/Class.scss'
import history from '../containers/history'
import { Table, Button, PagiNation, CheckBox, CheckBoxGroup } from "../../../common";

class Class extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            columns: [
                {
                    title: '序号',
                    align: 'left',
                    key: 'OrderNO',
                    dataIndex: 'OrderNO',
                    render: OrderNO => {
                        return (
                            <div className='CheckBox-content'>
                                <CheckBox value={OrderNO - 1} onChange={this.onTableCheckBoxChange.bind(this)}></CheckBox>
                                <span className='key-content'>{OrderNO >= 10 ? OrderNO : '0' + OrderNO}</span>
                            </div>
                        )
                    }

                },
                {
                    title: '班级名称',
                    align: 'center',
                    dataIndex: 'CourseClass',
                    key: 'CourseClass',
                    render: courseClass => {
                        return (
                            <React.Fragment>
                                <span onClick={this.onCourseClassClick.bind(this, courseClass.ClassID)} className='courseClass-name'>{courseClass.ClassName}</span>
                            </React.Fragment>
                        )
                    }
                },
                {
                    title: '任课教师',
                    align: 'center',
                    dataIndex: 'ClassMsg',
                    key: 'ClassMsg',
                    render: Class => {
                        return (
                            <React.Fragment>
                                <img className='Class-img' alt={Class.TeacherName} src={Class.TeacherImg} />
                                <span className='Class-name'>{Class.TeacherName}</span>
                                <span className='Class-id'>{'(' + Class.TeacherID + ')'}</span>
                            </React.Fragment>
                        )
                    }
                },
                {
                    title: '学生人数',
                    align: 'center',
                    dataIndex: 'StudentCount',
                    key: 'StudentCount',
                    render: StudentCount => {
                        return (
                            <span className='StudentCount'>{StudentCount}</span>

                        )
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    key: 'handle',
                    dataIndex: 'key',
                    render: (key) => {

                        return (
                            <div className='handle-content'>
                                <Button color='blue' type='default' onClick={this.onHandleClassClick.bind(this, key)} className='handle-btn'>编辑</Button>
                                <Button color='blue' type='default' onClick={this.onDeleteClassClick.bind(this, key)} className='handle-btn'>删除</Button>
                            </div>
                        )
                    }
                }
            ],
            checkList: [],
            checkAll: false
        })
    }

    //钩子函数
    componentWillReceiveProps(nextProps){
        const { DataState, UIState } = this.props;

        let options = []
        let tableSource = nextProps.DataState.GetClassAllMsg.allClass ? nextProps.DataState.GetClassAllMsg.allClass.TableData : [];
        options = tableSource.map((child,index) => {
            return index;
        })
        this.setState({
            options:options
        })
    }

    //列表复选框改变事件
    onTableCheckBoxChange = (e) => {
        console.log(e.target.value)
        const { DataState, UIState } = this.props;
        let checkList = this.state.checkList;

       
    }
    //列表班级点击事件
    onCourseClassClick = (classID) => {
        //console.log('ss' + classID)
        const { dispatch, DataState,UIState } = this.props;
        dispatch(actions.UpUIState.CourseClassDetailsModalOpen())
    }
    //列表操作编辑点击事件
    onHandleClassClick = (key) => {
        //console.log(key)

    }
    //列表操作删除点击事件
    onDeleteClassClick = (key) => {
        console.log(key)

    }
    //列表分页改变事件
    onPagiNationChange = (value) => {
        console.log(value)
        const { dispatch, DataState } = this.props;

        let route = history.location.pathname;
        let pathArr = route.split('/');
        let handleRoute = pathArr[1];
        let routeID = pathArr[2];
        let subjectID = pathArr[3];
        let classID = pathArr[4];
        dispatch(actions.UpDataState.getClassAllMsg('/CoureClass_Class?schoolID=sss&pageIndex='+value+'&pageSize=10', routeID,classID));


    }
    //列表多选
    onCheckBoxGroupChange = (value) => {
        this.setState({
            checkedList:value
        })
    }
    //列表全选
    OnCheckAllChange = (e) => {
        //console.log(e.target,this.state.options)
        const { DataState, UIState } = this.props;

        let checkList = [];
        if(e.target.checked){
            checkList=this.state.options;
        }else{
            checkList = []
        }
        this.setState({
            checkAll:e.target.checked,
            checkedList:checkList
        })
    }
    render() {
        const { DataState, UIState } = this.props;
        let tips = DataState.GetClassAllMsg.allClass && DataState.GetCoureClassAllMsg.Subjects ? DataState.GetCoureClassAllMsg.Subjects[DataState.GetClassAllMsg.allClass.subject].subjectName + '教学班>' + DataState.GetCoureClassAllMsg.Subjects[DataState.GetClassAllMsg.allClass.subject][DataState.GetClassAllMsg.allClass.Class] : '';
        return (
            <div className='Class'>
                <div className='Class-box'>
                    <div className='Class-top'>
                        <span className='top-tips'>
                            <span className='tips tip-menu'>{tips}</span>
                        </span>

                    </div>
                    <hr className='Class-hr' />
                    <div className='Class-content'>
                        <CheckBoxGroup style={{ width: '100%' }} value={this.state.checkedList} onChange={this.onCheckBoxGroupChange.bind(this)}>
                            <Table
                                className='table'
                                loading={UIState.AppLoading.TableLoading}
                                columns={this.state.columns}
                                pagination={false}
                                dataSource={DataState.GetClassAllMsg.allClass ? DataState.GetClassAllMsg.allClass.TableData : []}
                            ></Table>
                        </CheckBoxGroup>
                        <CheckBox className='checkAll-box' onChange={this.OnCheckAllChange} checked={this.state.checkAll}>
                            全选
                                    <Button onClick={this.onDeleteAllClick} className='deleteAll' color='blue'>删除</Button>
                        </CheckBox>
                       
                        <div  className='pagination-box'>
                            <PagiNation
                                showQuickJumper
                                defaultCurrent={DataState.GetClassAllMsg.allClass ? DataState.GetClassAllMsg.allClass.PageIndex : 1}
                                defaultPageSize={10}
                                total={DataState.GetClassAllMsg.allClass ? DataState.GetClassAllMsg.allClass.CourseClassCount : 0}
                                onChange={this.onPagiNationChange.bind(this)}

                            ></PagiNation>
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
export default connect(mapStateToProps)(Class);