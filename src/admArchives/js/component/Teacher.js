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
                    dataIndex: 'UserImgs',
                    render: arr => {
                        return (
                            <div className='name-content'>        
                                <img alt={arr.UserName} onClick={this.onUserNameClick.bind(this,arr.key)} className='name-img' width='47' height='47' src={arr.UserImg}></img>
                            </div>
                        )
                    }

                },
                {
                    title: '姓名',
                    align:'left',
                    key: 'UserName',
                    dataIndex: 'UserName',
                    sorter: true,
                    render: arr => {
                        return (
                            <div className='name-content'>
                                <span className='name-UserName' onClick={this.onUserNameClick.bind(this,arr.key)}>{arr.UserName}</span>
                            </div>
                        )
                    }

                },
                {
                    title: '工号',
                    align:'center',
                    dataIndex: 'UserID',
                    key: 'UserID',
                    sorter: true,
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
                    title: '所在学科',
                    align:'center',
                    key: 'SubjectNames',
                    dataIndex: 'SubjectNames',
                    render: arr => {
                        return (
                            <span className='SubjectName'>{arr.showTwo}</span>
                        )
                    }
                },
                {
                    title: '职称',
                    align:'center',
                    key: 'Titles',
                    dataIndex: 'Titles',
                    render: Titles => {
                        return (
                            <span className='Title'>{Titles.TitleName}</span>
                        )
                    }
                },
                {
                    title: '操作',
                    align:'center',
                    key: 'handleMsg',
                    dataIndex: 'handleMsg',
                    render: (handleMsg) => {

                        return (
                            <div className='handle-content'>
                                <Button color='blue' type='default' onClick={this.TeacherChange.bind(this, handleMsg)} className='handle-btn'>查看变记录</Button>
                                <Button color='blue' type='default' onClick={this.TeacherEdit.bind(this, handleMsg)} className='handle-btn'>编辑</Button>
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
            TeacherDetailsMsgModalVisible:false,
            addTeacherModalVisible:false

        }
    }
    componentWillReceiveProps() {
        // let Grades = this.props.DataState.GradeClassMsg.Grades ? this.props.DataState.GradeClassMsg.Grades : [];
        // let len = Grades.lenght;
        // console.log(Grades)
        // let GradeArr = [{ value: 0, title: '全部年级' }];

        // for (let i = 0; i < len; i++) {
        //     let Grade = { value: Grades[i].GradeID, title: Grades[i].GradeName }
        //     GradeArr.push(Grade)
        // }

        // this.setState({
        //     GradeArr: GradeArr
        // })

    }
    componentWillMount(){
        
       
    }

    TeacherDropMenu = (e) => {
        const { dispatch } = this.props;

        

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

    TeacherChange = (e, handleMsg) => {
        console.log(e, handleMsg.key)
        this.setState({
            TeacherChangeMadalVisible: true,
            TeacherChangeKey: handleMsg.key
        })
    }

    onMouseEnterName = () => {

    }
    OnCheckAllChange = (e) => {
        console.log(e)
        if (e.target.checked) {
            this.setState({
                checkedList: this.props.DataState.SubjectTeacherPreview.keyList,
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
            checkAll: checkedList === this.props.DataState.SubjectTeacherPreview.keyList ? true : false
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
    handleAddTeacherModalOk = (e) => {
        console.log(e)
        this.setState({
            addTeacherModalVisible: false
        })
    }
    handleAddTeacherModalCancel = (e) => {
        console.log(e)
        this.setState({
            addTeacherModalVisible: false
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
    onUserNameClick = (key) => {
        console.log(key)
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
    onAddTeacher = (e, ) => {
        console.log(e)
        this.setState({
            addTeacherModalVisible: true,
            userKey: 'add'
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
                            
                            <span className='link' style={{cursor:'pointer'}}  onClick={this.onAddTeacher}>添加教师</span>
                            <span className='divide'>|</span>
                            <Link className='link' to='/ImportTeacher' replace>导入教师</Link>
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

                                dropSelectd={DataState.SubjectTeacherMsg.returnData ? DataState.SubjectTeacherMsg.returnData.SubjectList[0] : { value: 'all', title: '全部教师' }}
                                dropList={DataState.SubjectTeacherMsg.returnData ? DataState.SubjectTeacherMsg.returnData.SubjectList : [{ value: 'all', title: '全部教师' }]}
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
                                        loading={{delay:500,spinning:DataState.SubjectTeacherPreview?DataState.SubjectTeacherPreview.loading:true}}
                                        dataSource={DataState.SubjectTeacherPreview.newList} >

                                    </Table>
                                </CheckBoxGroup>
                                <CheckBox className='checkAll-box' onChange={this.OnCheckAllChange} checked={this.state.checkAll}>
                                    全选
                                    <Button onClick={this.onDeleteAllClick} className='deleteAll' color='blue'>删除</Button>
                                </CheckBox>
                                <div className='pagination-box'>
                                    <PagiNation 
                                    showQuickJumper  
                                    total={DataState.SubjectTeacherPreview.Total} 
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
                    title={'编辑教师'}
                    visible={this.state.TeacherModalVisible}
                    onOk={this.handleTeacherModalOk}
                    onCancel={this.handleTeacherModalCancel}
                >
                    <EditModal type='teacher' userKey={this.state.userKey}></EditModal>
                </Modal>
                <Modal
                    ref='handleTeacherMadal'
                    bodyStyle={{ padding: 0 }}
                    type='1'
                    title={'添加教师'}
                    visible={this.state.addTeacherModalVisible}
                    onOk={this.handleAddTeacherModalOk}
                    onCancel={this.handleAddTeacherModalCancel}
                >
                    <EditModal type='teacher' userKey={this.state.userKey}></EditModal>
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
