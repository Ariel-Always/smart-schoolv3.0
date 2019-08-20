import React from 'react'
import { connect } from 'react-redux';
import { DropDown, Search, Table, Button, CheckBox, CheckBoxGroup,Modal } from '../../../common/index'
import '../../../common/scss/_left_menu.scss'
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import '../../scss/Student.scss'
import EditStudentModal from './EditStudentModal'
import actions from '../actions';
class Student extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //GradeArr:[{value:0,title:'全部年级'}]
            secondDropList: [{ value: 0, title: '全部班级' }],
            DropMenuShow: false,
            selectedRowKeys: [],
            columns: [
                {
                    title: '姓名',
                    dataIndex: 'UserName',
                    sorter: (a, b) => a.name.length - b.name.length,
                    render: arr => {
                        return (
                            <div className='name-content'>
                                <CheckBox  value={arr.key} onChange={this.onCheckChange}></CheckBox>
                                <span onMouseEnter={this.onMouseEnterName} className='name-key'>{arr.key}</span>
                                <img alt={arr.UserName} className='name-img' width='47' height='47' src={arr.PhotoPath}></img>
                                <span className='name-UserName'>{arr.UserName}</span>
                            </div>
                        )
                    }

                },
                {
                    title: '学号',
                    dataIndex: 'UserID',
                    sorter: (a, b) => a.age - b.age,
                    render: UserID => {
                        return (
                            <span className='UserID'>{UserID}</span>
                        )
                    }
                },
                {
                    title: '性别',
                    dataIndex: 'Gender',
                    render: Gender => {
                        return (
                            <span className='Gender'>{Gender}</span>
                        )
                    }
                },
                {
                    title: '年级',
                    dataIndex: 'GradeName',
                    render: GradeName => {
                        return (
                            <span className='GradeName'>{GradeName}</span>
                        )
                    }
                },
                {
                    title: '班级',
                    dataIndex: 'ClassName',
                    render: ClassName => {
                        return (
                            <span className='ClassName'>{ClassName}</span>
                        )
                    }
                },
                {
                    title: '操作',
                    dataIndex: 'Handle',
                    render: () => {
                        return (
                            <div className='handle-content'>

                                <Button color='blue' type='default' onClick={this.StudentChange} className='handle-btn'>查看变记录</Button>
                                <Button color='blue' type='default' onClick={this.StudentEdit} className='handle-btn'>编辑</Button>
                            </div>
                        )
                    }
                }
            ],
            data: [{
                key: 1,
                UserName: { key: '01', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                UserID: 'S00001',
                Grader: '男',
                GradeName: '一年级',
                ClassName: '一年1班',
                Others: {}
            }],
            pagination: { total: 50 },
            loading: false,
            selectedAll: false,
            checkedList:[],
            checkAll:false,
            studentModalVisible:true,

        }
    }
    componentWillReceiveProps() {
        let Grades = this.props.DataState.GradeClassMsg.Grades ? this.props.DataState.GradeClassMsg.Grades : [];
        let len = Grades.lenght;
        console.log(Grades)
        let GradeArr = [{ value: 0, title: '全部年级' }];

        for (let i = 0; i < len; i++) {
            let Grade = { value: Grades[i].GradeID, title: Grades[i].GradeName }
            GradeArr.push(Grade)
        }

        this.setState({
            GradeArr: GradeArr
        })

    }

    StudentDropMenu = (e) => {
        const { dispatch } = this.props;

        let Classes = [{ value: 0, title: '全部班级' }];
        
        //console.log(this.refs.dropMenuSecond)
        if (e.value !== 0) {
            let ClassArr = this.props.DataState.GradeClassMsg.returnData.AllClasses[e.value];
        ClassArr.map((Class) => {
            Classes.push(Class);
        })
        //Classes.push(this.props.DataState.GradeClassMsg.returnData.AllClasses[e.value]);
        //this.refs.dropMenuSecond.state.dropList = Classes;]
        this.setState({
            secondDropList: Classes,
        })
            dispatch(actions.UpDataState.getGradeStudentPreview('/ArchivesStudent?SchoolID=schoolID&GradeID=gradeID&ClassID=ClassID&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC'));
            this.setState({
                DropMenuShow: true
            })
        } else {
            dispatch(actions.UpDataState.getGradeStudentPreview('/ArchivesStudent?SchoolID=schoolID&GradeID=gradeID&ClassID=ClassID&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC'));
            this.setState({
                DropMenuShow: false
            })
        }

    }

    StudentDropMenuSecond = (e) => {
        console.log(e);
        dispatch(actions.UpDataState.getGradeStudentPreview('/ArchivesStudent?SchoolID=schoolID&GradeID=gradeID&ClassID=ClassID&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC'));
    }

    StudentSearch = (e) => {
        console.log(e)
    }

    onSelectChange = (e) => {
        console.log(e)
        //this.setState({ selectedRowKeys });
    }

    StudentEdit = () => {
        this.setState({
            studentModalVisible:true
        })
    }

    StudentChange = () => {
        
    }

    onMouseEnterName = () => {
        
    }
    OnCheckAllChange = (e) => {
        console.log(e)
        if(e.target.checked){
            this.setState({
                checkedList:this.props.DataState.GradeStudentPreview.keyList,
                checkAll:e.target.checked
            })
        }else{
            this.setState({
                checkedList:[],
                checkAll:e.target.checked
            })
        }
    }
    onCheckBoxGroupChange = (checkedList) => {
        console.log(checkedList)
        this.setState({
            checkedList,
            checkAll:checkedList.length===this.props.DataState.GradeStudentPreview.keyList?true:false
        })
    }
    handleStudentModalOk = (e) => {
        console.log(e)
        this.setState({
            studentModalVisible:false
        })
    }
    handleStudentModalCancel = (e) => {
        console.log(e)
        this.setState({
            studentModalVisible:false
        })
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
                                ref='dropMenuFirst'
                                onChange={this.StudentDropMenu}
                                width={120}
                                height={72}

                                dropSelectd={{ value: 0, title: '全部年级' }}
                                dropList={DataState.GradeClassMsg.returnData ? DataState.GradeClassMsg.returnData.grades : [{ value: 0, title: '全部年级' }]}
                            ></DropDown>
                            <DropDown
                                ref='dropMenuSecond'
                                width={120}
                                height={72}

                                style={{ display: this.state.DropMenuShow ? 'block' : 'none' }}
                                dropSelectd={{ value: 0, title: '全部班级' }}
                                dropList={this.state.secondDropList}
                                onChange={this.StudentDropMenuSecond}
                            ></DropDown>
                            <Search placeHolder='搜索'
                                onClickSearch={this.StudentSearch}
                                height={30}
                            ></Search>
                        </div>
                        <div className='content-render'>
                            <div>
                                <CheckBoxGroup style={{width:'100%'}} value = {this.state.checkedList}   onChange={this.onCheckBoxGroupChange.bind(this)}>
                                    <Table
                                        className='table'
                                        columns={this.state.columns}
                                        pagination={this.state.pagination}
                                        loading={this.state.loading}
                                        dataSource={DataState.GradeStudentPreview.newList} >

                                        </Table>
                                </CheckBoxGroup>
                                <CheckBox onChange={this.OnCheckAllChange} checked={this.state.checkAll}>全选</CheckBox>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 模态框 */}
                <Modal
                ref='handleStudentMadal'
                bodyStyle = {{padding:0}}
                type='1'
                title='编辑学生'
                visible={this.state.studentModalVisible}
                onOk = {this.handleStudentModalOk}
                onCancel = {this.handleStudentModalCancel}
                >
                    <EditStudentModal></EditStudentModal>
                </Modal>
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