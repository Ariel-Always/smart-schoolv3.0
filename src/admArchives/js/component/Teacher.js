import React from 'react'
import { connect } from 'react-redux';
import { DetailsModal,DropDown, PagiNation, Search, Table, Button, CheckBox, CheckBoxGroup, Modal } from '../../../common/index'
//import '../../../common/scss/_left_menu.scss'
import {  Link, } from 'react-router-dom';


import history from '../containers/history'
import EditModal from './EditModal'
import IconLocation from '../../images/icon-location.png'
import actions from '../actions';
import TeacherChangeRecord from './TeacherChangeRecord'
import '../../scss/Teacher.scss'
class Teacher extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            //GradeArr:[{value:0,title:'全部年级'}]
            secondDropList: [{ value: 0, title: '全部班级' }],
            DropMenuShow: false,
            selectedRowKeys: [],
            columns: [
                {
                    title: '',
                    dataIndex: 'key',
                    key: 'key',
                    align:'left',
                    render: key => {
                        return (
                            <div className='registerTime-content'>
                                <CheckBox value={key} onChange={this.onCheckChange}></CheckBox>
                                <span className='key-content'>{key+1 >= 10 ? key+1 : '0' + (key+1)}</span>
                            </div>
                        )
                    }
                }, 
                {
                    title: '',
                    align:'right',
                    key: 'UserImg',
                    width: 60,
                    dataIndex: 'UserName',
                    render: arr => {
                        return (
                            <div className='name-content'>        
                                <img alt={arr.UserName} onClick={this.onUserNameClick} className='name-img' width='47' height='47' src={arr.PhotoPath}></img>
                            </div>
                        )
                    }

                },
                {
                    title: '姓名',
                    align:'left',
                    key: 'UserName',
                    dataIndex: 'UserName',
                    sorter: (a, b) => a.name.length - b.name.length,
                    render: arr => {
                        return (
                            <div className='name-content'>
                                <span className='name-UserName' onClick={this.onUserNameClick}>{arr.UserName}</span>
                            </div>
                        )
                    }

                },
                {
                    title: '学号',
                    align:'center',
                    dataIndex: 'UserID',
                    key: 'UserID',
                    sorter: (a, b) => a.age - b.age,
                    render: UserID => {
                        return (
                            <span className='UserID'>{UserID}</span>
                        )
                    }
                },
                {
                    title: '性别',
                    align:'center',
                    dataIndex: 'Gender',
                    key: 'Gender',
                    render: Gender => {
                        return (
                            <span className='Gender'>{Gender}</span>
                        )
                    }
                },
                {
                    title: '年级',
                    align:'center',
                    key: 'GradeName',
                    dataIndex: 'GradeName',
                    render: GradeName => {
                        return (
                            <span className='GradeName'>{GradeName}</span>
                        )
                    }
                },
                {
                    title: '班级',
                    align:'center',
                    key: 'ClassName',
                    dataIndex: 'ClassName',
                    render: ClassName => {
                        return (
                            <span className='ClassName'>{ClassName}</span>
                        )
                    }
                },
                {
                    title: '操作',
                    align:'center',
                    key: 'handle',
                    dataIndex: 'key',
                    render: (key) => {

                        return (
                            <div className='handle-content'>
                                <Button color='blue' type='default' onClick={this.TeacherChange.bind(this, key)} className='handle-btn'>查看变记录</Button>
                                <Button color='blue' type='default' onClick={this.TeacherEdit.bind(this, key)} className='handle-btn'>编辑</Button>
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
            checkedList: [],
            checkAll: false,
            TeacherModalVisible: false,
            userKey: 0,
            TeacherChangeKey: 0,
            TeacherChangeMadalVisible: false,
            alertShow: false,
            alertTitle: '提示信息',
            alertQueryShow: false,
            alertQueryTitle: '查询提示~',
            TeacherDetailsMsgModalVisible:false

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
    componentWillMount(){
        
       
    }

    TeacherDropMenu = (e) => {
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
            dispatch(actions.UpDataState.getSubjectTeacherPreview('/ArchivesTeacher?SchoolID=schoolID&GradeID=gradeID&ClassID=ClassID&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC'));
            this.setState({
                DropMenuShow: true
            })
        } else {
            dispatch(actions.UpDataState.getSubjectTeacherPreview('/ArchivesTeacher?SchoolID=schoolID&GradeID=gradeID&ClassID=ClassID&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC'));
            this.setState({
                DropMenuShow: false
            })
        }

    }

    TeacherDropMenuSecond = (e) => {
        console.log(e);
        dispatch(actions.UpDataState.getSubjectTeacherPreview('/ArchivesTeacher?SchoolID=schoolID&GradeID=gradeID&ClassID=ClassID&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC'));
    }

    TeacherSearch = (e) => {
        console.log(e)
    }

    onSelectChange = (e) => {
        console.log(e)
        //this.setState({ selectedRowKeys });
    }

    TeacherEdit = (e, key) => {
        console.log(e, key)
        this.setState({
            TeacherModalVisible: true,
            userKey: e
        })
    }

    TeacherChange = (e, key) => {
        console.log(e, key)
        this.setState({
            TeacherChangeMadalVisible: true,
            TeacherChangeKey: key
        })
    }

    onMouseEnterName = () => {

    }
    OnCheckAllChange = (e) => {
        console.log(e)
        if (e.target.checked) {
            this.setState({
                checkedList: this.props.DataState.GradeTeacherPreview.keyList,
                checkAll: e.target.checked
            })
        } else {
            this.setState({
                checkedList: [],
                checkAll: e.target.checked
            })
        }
    }
    onCheckBoxGroupChange = (checkedList) => {
        console.log(checkedList)
        this.setState({
            checkedList,
            checkAll: checkedList === this.props.DataState.GradeTeacherPreview.keyList ? true : false
        })
    }
    handleTeacherModalOk = (e) => {
        console.log(e)
        this.setState({
            TeacherModalVisible: false
        })
    }
    handleTeacherModalCancel = (e) => {
        console.log(e)
        this.setState({
            TeacherModalVisible: false
        })
    }
    TeacherChangeMadalOk = (e) => {
        console.log(e)
        this.setState({
            TeacherChangeMadalVisible: false
        })
    }
    TeacherChangeMadalCancel = (e) => {
        console.log(e)
        this.setState({
            TeacherChangeMadalVisible: false
        })
    }

    onDeleteAllClick = () => {
        const { dispatch } = this.props;
        console.log(this.state.checkedList)
        if (this.state.checkedList.length === 0) {

            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-warn',
                title: "你还没有选择哦~",
                ok: this.onAlertWarnOk.bind(this),
                cancel: this.onAlertWarnClose.bind(this),
                close: this.onAlertWarnClose.bind(this)
            }));

        } else {

            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-query',
                title: "确定删除？",
                ok: this.onAlertQueryOk.bind(this),
                cancel: this.onAlertQueryClose.bind(this),
                close: this.onAlertQueryClose.bind(this)
            }));
        }
    }
    onAlertWarnClose = () => {
        const {dispatch} = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    onAlertWarnOk = () => {
        const {dispatch} = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    onAlertQueryClose = () => {
        const {dispatch} = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    onAlertQueryOk = () => {
        const {dispatch} = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    onPagiNationChange = (e) => {
        console.log(e)
    }
    onUserNameClick = () => {
        this.setState({
            TeacherDetailsMsgModalVisible: true,
            
        })
    }
    TeacherDetailsMsgModalOk = () => {
        this.setState({
            TeacherDetailsMsgModalVisible: false,
            
        })
    }
    TeacherDetailsMsgModalCancel = () => {
        this.setState({
            TeacherDetailsMsgModalVisible: false,
            
        })
    }
    render() {
        const { UIState, DataState } = this.props;
        const data = {
            userName:'康欣',
            userImg:'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg',
            Gende:'男',
            userText:'学如逆水行舟，不进则退',
            userID:'20170025444',
            userGrade:'一年级',
            userClass:'1班',
            userIDCard:'',
            userPhone:'15626248624',
            userMail:'1519406168@qq.com',
            userAddress:'蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团'
        };
        return (
            <div className='Teacher'>
                <div className='Teacher-box'>
                    <div className='Teacher-top'>
                        <span className='top-tips'>
                            <span className='tips menu39 '>用户档案总览</span>
                        </span>
                        <div className='top-nav'>
                            <Link className='link'  to='/GraduteArchives' replace>查看毕业生档案</Link>
                            <span className='divide'>|</span>
                            <Link className='link' target='_blank' to='/RegisterExamine' replace>学生注册审核</Link>
                            <span className='divide'>|</span>
                            <Link className='link' to='/AddTeacher' replace>添加学生</Link>
                            <span className='divide'>|</span>
                            <Link className='link' to='/ImportTeacher' replace>导入学生</Link>
                        </div>
                    </div>
                    <hr className='Teacher-hr' />
                    <div className='Teacher-content'>
                        <div className='content-top'>
                            <DropDown
                                ref='dropMenuFirst'
                                onChange={this.TeacherDropMenu}
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
                                onChange={this.TeacherDropMenuSecond}
                            ></DropDown>
                            <Search placeHolder='搜索'
                                onClickSearch={this.TeacherSearch}
                                height={30}
                            ></Search>
                        </div>
                        <div className='content-render'>
                            <div>
                                <CheckBoxGroup style={{ width: '100%' }} value={this.state.checkedList} onChange={this.onCheckBoxGroupChange.bind(this)}>
                                    <Table
                                        className='table'
                                        columns={this.state.columns}
                                        pagination={false}
                                        loading={this.state.loading}
                                        dataSource={DataState.GradeTeacherPreview.newList} >

                                    </Table>
                                </CheckBoxGroup>
                                <CheckBox className='checkAll-box' onChange={this.OnCheckAllChange} checked={this.state.checkAll}>
                                    全选
                                    <Button onClick={this.onDeleteAllClick} className='deleteAll' color='blue'>删除</Button>
                                </CheckBox>
                                <div className='pagination-box'>
                                    <PagiNation 
                                    showQuickJumper  
                                    total={DataState.GradeTeacherPreview.Total} 
                                    onChange={this.onPagiNationChange}
                                    ></PagiNation>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 模态框 */}
                <Modal
                    ref='handleTeacherMadal'
                    bodyStyle={{ padding: 0 }}
                    type='1'
                    title='编辑学生'
                    visible={this.state.TeacherModalVisible}
                    onOk={this.handleTeacherModalOk}
                    onCancel={this.handleTeacherModalCancel}
                >
                    <EditModal userKey={this.state.userKey}></EditModal>
                </Modal>
                <Modal
                    ref='TeacherChangeMadal'
                    bodyStyle={{ padding: 0 }}
                    type='2'
                    width={650}
                    visible={this.state.TeacherChangeMadalVisible}
                    onOk={this.TeacherChangeMadalOk}
                    onCancel={this.TeacherChangeMadalCancel}
                >
                    <div className='modal-TeacherChange'>
                        <div className='content-top'>
                            <img src={IconLocation} width='30' height='40' alt='icon-location' />
                            <span className='top-text'>毛峰的档案变更记录</span>
                        </div>
                        <div className='content'>
                            <TeacherChangeRecord data={''}></TeacherChangeRecord>
                        </div>
                    </div>
                </Modal>
                <DetailsModal
                    ref='TeacherDetailsMsgModal'
                    visible={this.state.TeacherDetailsMsgModalVisible}
                    onOk={this.TeacherDetailsMsgModalOk}
                    onCancel={this.TeacherDetailsMsgModalCancel}
                    data={data}
                    type='Teacher'
                >
                    <div className='modal-top'>

                    </div>
                    <div className='modal-content'></div>
                </DetailsModal>
                {/* 提示框 */}

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
export default connect(mapStateToProps)(Teacher)
