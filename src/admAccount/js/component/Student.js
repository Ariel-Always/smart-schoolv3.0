import React from 'react'
import CONFIG from '../../../common/js/config';
import { connect } from 'react-redux';
import { Alert, DetailsModal, DropDown, PagiNation, Search, Table, Button, CheckBox, CheckBoxGroup, Modal } from '../../../common/index'
//import '../../../common/scss/_left_menu.scss'
import { Link, } from 'react-router-dom';
import '../../scss/Student.scss'
import { postData, getData } from "../../../common/js/fetch";
import { Tooltip, Input } from 'antd'
import TipsContact from './TipsContact'
import history from '../containers/history'
//import EditModal from './EditModal'
//import IconLocation from '../../images/icon-location.png'
import actions from '../actions';
//import StudentChangeRecord from './StudentChangeRecord'
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
                    title: '',
                    dataIndex: 'handle',
                    width: 70,
                    key: 'key',
                    align: 'left',
                    render: handle => {
                        return (
                            <div className='registerTime-content'>
                                <CheckBox value={handle.key} onChange={this.onCheckChange}></CheckBox>
                                <span className='key-content'>{handle.OrderNo + 1 >= 10 ? handle.OrderNo + 1 : '0' + (handle.OrderNo + 1)}</span>
                            </div>
                        )
                    }
                },
                {
                    title: '姓名',
                    align: 'center',
                    key: 'UserName',
                    width: 130,
                    dataIndex: 'UserName',
                    sorter: true,
                    render: arr => {
                        return (
                            <div className='name-content'>
                                <span className='name-UserName' onClick={this.onUserNameClick.bind(this, arr.UserID)}>{arr.Name}</span><br />
                                <span className='name-UserID'>{'(' + arr.UserID + ')'}</span>
                            </div>
                        )
                    }

                },
                {
                    title: '用户名',
                    align: 'right',
                    width: 120,
                    dataIndex: 'ShortName',
                    key: 'ShortName',
                    sorter: true,
                    render: ShortName => {
                        return (
                            <span className='UserName'>{ShortName}</span>
                        )
                    }
                },
                {
                    title: '个性签名',
                    align: 'center',
                    width: 300,
                    dataIndex: 'Sign',
                    key: 'Sign',
                    render: Sign => {
                        return (
                            <span className='Sign' title={Sign}>{Sign}</span>
                        )
                    }
                },
                {
                    title: '联系方式',
                    align: 'center',
                    width: 120,
                    key: 'UserContact',
                    dataIndex: 'UserContact',
                    render: UserContact => {
                        return (
                            <Tooltip placement='topLeft' trigger='click' arrowPointAtCenter={true} title={<TipsContact data={UserContact}></TipsContact>}>
                                <span className='UserContact' onClick={this.onUserContactClick.bind(this, UserContact)}>查看</span>
                            </Tooltip>
                        )
                    }
                },
                {
                    title: '操作',
                    width: 120,
                    align: 'center',
                    key: 'handle',
                    dataIndex: 'key',
                    render: (key) => {

                        return (
                            <div className='handle-content'>
                                <Button color='blue' type='default' onClick={this.onChangePwdClick.bind(this, key)} className='handle-btn'>重置密码</Button>

                            </div>
                        )
                    }
                }
            ],
            pagination: 1,
            loading: false,
            selectedAll: false,
            checkedList: [],
            checkAll: false,
            studentModalVisible: false,
            userKey: 0,
            StudentChangeKey: 0,
            ChangePwdMadalVisible: false,
            alertShow: false,
            alertTitle: '提示信息',
            alertQueryShow: false,
            alertQueryTitle: '查询提示~',
            StudentDetailsMsgModalVisible: false,
            addStudentModalVisible: false,
            defaultPwd: 888888,
            onClickKey: 0,
            userMsgKey: 0,
            keyword: '',
            CancelBtnShow: 'n',
            firstSelect: { value: 0, title: '全部年级' },
            secondSelect: { value: 0, title: '全部班级' },
            data: [{
                key: 1,
                UserName: { key: '01', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                UserID: 'S00001',
                Grader: '男',
                GradeName: '一年级',
                ClassName: '一年1班',
                Others: {}
            }],

            StudentAccountData: [{
                key: 0,
                Name: {
                    Name: '张心仪',
                    UserID: '201700121245',
                    key: 0
                },
                UserName: 'ZXSTU_001',
                Sign: '人生重要的不是所站的位置，而是所朝的方向`````````````````11111111111',
                Gender: '男',
                UserImg: {
                    PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg',
                    PhotoPath_NOcache: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg'
                }
            }],

        }
    }
    componentWillMount() {
        const { dispatch } = this.props;
        let pwd = 888888;

        dispatch(actions.UpDataState.getChangeInputValue(pwd));
    }
    componentWillReceiveProps() {
        let Grades = this.props.DataState.GradeClassMsg.Grades ? this.props.DataState.GradeClassMsg.Grades : [];
        let len = Grades.lenght;
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
        const { dispatch, DataState } = this.props;

        let Classes = [{ value: 0, title: '全部班级' }];

        //console.log(this.refs.dropMenuSecond)
        if (e.value !== 0) {
            let ClassArr = DataState.GradeClassMsg.returnData.AllClasses[e.value];
            ClassArr.map((Class) => {
                Classes.push(Class);
            })
            //Classes.push(this.props.DataState.GradeClassMsg.returnData.AllClasses[e.value]);
            //this.refs.dropMenuSecond.state.dropList = Classes;]
            this.setState({
                secondDropList: Classes,
            })
            dispatch(actions.UpDataState.getGradeStudentPreview('/GetStudentToPage?SchoolID=school1&PageIndex=0&PageSize=10&gradeID=' + e.value));
            this.setState({
                DropMenuShow: true,
                firstSelect: e,
                searchValue: '',
                pagination: 1,
                CancelBtnShow: 'n'
            })
        } else {
            dispatch(actions.UpDataState.getGradeStudentPreview('/GetStudentToPage?SchoolID=school1&PageIndex=0&PageSize=10'));
            this.setState({
                DropMenuShow: false,
                secondSelect: { value: 0, title: '全部班级' },
                searchValue: '',
                pagination: 1,
                CancelBtnShow: 'n'
            })
        }

    }

    StudentDropMenuSecond = (e) => {
        const { dispatch, DataState } = this.props;
        this.setState({
            secondSelect: e,
            searchValue: '',
            pagination: 1,
            CancelBtnShow: 'n'
        })
        if (e.value !== 0)
            dispatch(actions.UpDataState.getGradeStudentPreview('/GetStudentToPage?SchoolID=school1&PageIndex=0&PageSize=10&gradeID=' + this.state.firstSelect.value + '&classID=' + e.value));
        else
            dispatch(actions.UpDataState.getGradeStudentPreview('/GetStudentToPage?SchoolID=school1&PageIndex=0&PageSize=10&gradeID=' + this.state.firstSelect.value));
    }
    //搜索
    StudentSearch = (e) => {
        const { dispatch } = this.props;
        this.setState({
            keyword: e.value,
            CancelBtnShow: 'y'
        })
        if (e.value === '') {
            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-warn',
                title: "关键词不能为空",
                ok: this.onAlertWarnOk.bind(this),
                cancel: this.onAlertWarnClose.bind(this),
                close: this.onAlertWarnClose.bind(this)
            }));
        } else {
            dispatch(actions.UpDataState.getGradeStudentPreview('/GetStudentToPage?SchoolID=school1&PageIndex=0&PageSize=10&keyword=' + e.value + '&gradeID=' + this.state.firstSelect.value + '&classID=' + this.state.secondSelect.value));
        }
    }

    //搜索change
    onChangeSearch = (e) => {
        this.setState({
            searchValue: e.target.value
        })
    }

    onSelectChange = (e) => {

        //this.setState({ selectedRowKeys });
    }

    onUserContactClick = (UserContact) => {

        // this.setState({
        //     StudentChangeMadalVisible: true,
        //     StudentChangeKey: key
        // })
    }
    // onChangePwdClick = (e, key) => {
    //     console.log(e, key)
    //     this.setState({
    //         StudentChangeMadalVisible: true,
    //         StudentChangeKey: key
    //     })
    // }

    onMouseEnterName = () => {

    }
    OnCheckAllChange = (e) => {
        const { DataState, dispatch } = this.props;
        if (e.target.checked) {
            this.setState({
                checkedList: DataState.GradeStudentPreview.keyList,
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
        const { DataState, dispatch } = this.props;
        this.setState({
            checkedList,
            checkAll: checkedList === DataState.GradeStudentPreview.keyList ? true : false
        })
    }
    handleStudentModalOk = (e) => {
        this.setState({
            studentModalVisible: false
        })
    }
    handleStudentModalCancel = (e) => {
        this.setState({
            studentModalVisible: false
        })
    }
    ChangePwdMadalOk = (e) => {
        this.setState({
            ChangePwdMadalVisible: false
        })
    }
    ChangePwdMadalOk = (e) => {
        this.setState({
            ChangePwdMadalVisible: false
        })
    }

    onChangePwdAllClick = () => {
        const { dispatch } = this.props;
        if (this.state.checkedList.length === 0) {

            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-warn',
                title: "你还没有选择哦~",
                ok: this.onAlertWarnOk.bind(this),
                cancel: this.onAlertWarnClose.bind(this),
                close: this.onAlertWarnClose.bind(this)
            }));
            return;
        } else {

            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-query',
                title: "确定批量重置密码？",
                ok: this.onAlertQueryOk.bind(this, 888888),
                cancel: this.onAlertQueryClose.bind(this),
                close: this.onAlertQueryClose.bind(this)
            }));
        }
    }
    //table点击重置密码
    onChangePwdClick = (key) => {
        const { dispatch, DataState } = this.props;
        let data = this.state.StudentAccountData;
        let pwd = 888888;
        console.log(key)
        this.setState({
            ChangePwdMadalVisible: true,
            onClickKey: key
        })
    }
    // 重置密码ok
    onPwdchangeOk = (pwd) => {
        const { dispatch, DataState } = this.props;
        let url = '/ResetPwd';
        let UserMsg = DataState.LoginUser;
        if (this.state.defaultPwd === '') {
            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-query',
                title: "密码不能为空",
                ok: this.onAlertQueryClose.bind(this),
                cancel: this.onAlertQueryClose.bind(this),
                close: this.onAlertQueryClose.bind(this)
            }));
            return;
        } else {
            postData(CONFIG.UserAccountProxy + url,
                {
                    userID: DataState.GradeStudentPreview.newList[this.state.onClickKey].Others.UserID,
                    userType: 2,
                    newPwd: this.state.defaultPwd
                },
                2).then(res => {
                    if (res.Status === '401') {
                        console.log('错误码：' + res.Status)
                    }
                    return res.json()
                }).then(json => {
                    if (json.Status === 400) {
                        console.log(json.Status)
                    } else if (json.Status === 200) {
                        this.setState({
                            ChangePwdMadalVisible: false,
                            defaultPwd: 888888
                        })
                    }

                });
        }

    }
    // 重置密码close
    onPwdchangeClose = () => {
        this.setState({
            ChangePwdMadalVisible: false,
            defaultPwd: 888888
        })
    }
    onPwdchange = (e) => {
        const { dispatch } = this.props;
        this.setState({
            defaultPwd: e.target.value
        })
    }
    onAlertWarnClose = () => {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    onAlertWarnOk = () => {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    onAlertQueryClose = () => {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    onAlertQueryOk = (pwd) => {
        let url = '/ResetPwd';
        const { dispatch, DataState } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
        let userIDs = this.state.checkedList.map((child, index) => {
            return DataState.GradeStudentPreview.newList[child].Others.UserID
        })
        postData(CONFIG.UserAccountProxy + url,
            {
                userID: userIDs.join(),
                userType: 2,
                newPwd: this.state.defaultPwd
            },
            2).then(res => {
                if (res.Status === '401') {
                    console.log('错误码：' + res.Status)
                }
                return res.json()
            }).then(json => {
                if (json.Status === 400) {
                    console.log(json.Status)
                } else if (json.Status === 200) {
                    this.setState({
                        checkedList: [],
                        checkAll: false
                    })
                }

            });

    }
    //分页
    onPagiNationChange = (value) => {
        const { dispatch } = this.props;
        this.setState({
            pagination: value
        })
        let firstSelect = '';
        let secondSelect = '';
        let keyword = ''
        if (this.state.firstSelect.value !== 0) {
            firstSelect = '&gradeID=' + this.state.firstSelect.value
        }
        if (this.state.secondSelect.value !== 0) {
            secondSelect = '&classID=' + this.state.secondSelect.value
        }
        if (this.state.keyword !== '') {
            keyword = '&keyword=' + this.state.keyword
        }

        dispatch(actions.UpDataState.getGradeStudentPreview('/GetStudentToPage?SchoolID=school1&PageIndex=' + (--value) + '&PageSize=10' + keyword + firstSelect + secondSelect));

    }

    //table改变，进行排序操作
    onTableChange = (a, b, sorter) => {
        const { DataState, dispatch } = this.props;
        let firstSelect = '';
        let secondSelect = '';
        let keyword = ''
        if (this.state.firstSelect.value !== 0) {
            firstSelect = '&gradeID=' + this.state.firstSelect.value
        }
        if (this.state.secondSelect.value !== 0) {
            secondSelect = '&classID=' + this.state.secondSelect.value
        }
        if (this.state.keyword !== '') {
            keyword = '&keyword=' + this.state.keyword
        }
        console.log(sorter)
        if (sorter && (sorter.columnKey === 'UserName' || sorter.columnKey === 'ShortName')) {
            let sortType = sorter.order === "descend" ? 'SortType=DESC' : sorter.order === "ascend" ? 'SortType=ASC' : '';
            dispatch(actions.UpDataState.getGradeStudentPreview('/GetStudentToPage?SchoolID=school1&sortFiled=' + sorter.columnKey + '&PageIndex=0&PageSize=10&' + sortType + '&PageIndex=' + (this.state.pagination - 1) + '&PageSize=10' + keyword + firstSelect + secondSelect));
        }
    }
    onUserNameClick = (UserID) => {
        const { dispatch } = this.props;
        dispatch(actions.UpDataState.getUserMsg('/GetUserDetail?userid=' + UserID))

        this.setState({
            StudentDetailsMsgModalVisible: true,

        })
    }
    StudentDetailsMsgModalOk = () => {
        this.setState({
            StudentDetailsMsgModalVisible: false,

        })
    }
    StudentDetailsMsgModalCancel = () => {
        this.setState({
            StudentDetailsMsgModalVisible: false,

        })
    }
    onAddStudent = (e, ) => {
        this.setState({
            addStudentModalVisible: true,
            userKey: 'add'
        })
    }
    handleAddStudentModalOk = (e) => {
        this.setState({
            addStudentModalVisible: false
        })
    }
    handleAddStudentModalCancel = (e) => {
        this.setState({
            addStudentModalVisible: false
        })
    }
    render() {
        const { UIState, DataState } = this.props;
        const data = {
            userName: '康欣',
            userImg: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg',
            Gende: '男',
            userText: '学如逆水行舟，不进则退',
            userID: '20170025444',
            userGrade: '一年级',
            userClass: '1班',
            userIDCard: '',
            userPhone: '15626248624',
            userMail: '1519406168@qq.com',
            userAddress: '蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团'
        };
        return (
            <div className='Student'>
                <div className='Student-box'>
                    <div className='Student-top'>
                        <span className='top-tips'>
                            <span className='tips menu39 '>学生账号管理</span>
                        </span>
                        {/* <div className='top-nav'>
                            <Link className='link'  to='/GraduteArchives' replace>查看毕业生档案</Link>
                            <span className='divide'>|</span>
                            <Link className='link' target='_blank' to='/RegisterExamine' replace>学生注册审核</Link>
                            <span className='divide'>|</span>
                            <span className='link' style={{cursor:'pointer'}}  onClick={this.onAddStudent}>添加学生</span>
                            <span className='divide'>|</span>
                            <Link className='link' to='/ImportStudent' replace>导入学生</Link>
                        </div> */}
                    </div>
                    <hr className='Student-hr' />
                    <div className='Student-content'>
                        <div className='content-top'>
                            <DropDown
                                ref='dropMenuFirst'
                                onChange={this.StudentDropMenu}
                                width={120}
                                height={72}

                                dropSelectd={this.state.firstSelect}
                                dropList={DataState.GradeClassMsg.returnData ? DataState.GradeClassMsg.returnData.grades : [{ value: 0, title: '全部年级' }]}
                            ></DropDown>
                            <DropDown
                                ref='dropMenuSecond'
                                width={120}
                                height={72}

                                style={{ display: this.state.DropMenuShow ? 'block' : 'none' }}
                                dropSelectd={this.state.secondSelect}
                                dropList={this.state.secondDropList}
                                onChange={this.StudentDropMenuSecond}
                            ></DropDown>
                            <Search placeHolder='请输入关键字搜索...'
                                onClickSearch={this.StudentSearch}
                                Value={this.state.searchValue}
                                onChange={this.onChangeSearch.bind(this)}
                                CancelBtnShow={this.state.CancelBtnShow}
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
                                        onChange={this.onTableChange.bind(this)}
                                        dataSource={DataState.GradeStudentPreview.newList} >

                                    </Table>
                                </CheckBoxGroup>
                                <CheckBox style={{display:DataState.GradeStudentPreview.Total===0?'none':'inline-block'}} className='checkAll-box' onChange={this.OnCheckAllChange} checked={this.state.checkAll}>
                                    全选
                                    <Button onClick={this.onChangePwdAllClick} className='changePwdAll' color='blue'>批量重置密码</Button>
                                </CheckBox>
                                <div className='pagination-box'>
                                    <PagiNation
                                        showQuickJumper
                                        current={this.state.pagination}
                                        hideOnSinglepage={true}
                                        total={DataState.GradeStudentPreview.Total}
                                        onChange={this.onPagiNationChange}
                                    ></PagiNation>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 模态框 */}
                {/* <Modal
                    ref='handleStudentMadal'
                    bodyStyle={{ padding: 0 }}
                    type='1'
                    title='编辑学生'
                    visible={this.state.studentModalVisible}
                    onOk={this.handleStudentModalOk}
                    onCancel={this.handleStudentModalCancel}
                    
                >
                    <EditModal userKey={this.state.userKey}></EditModal>
                </Modal> */}
                {/* <Modal
                    ref='StudentChangeMadal'
                    bodyStyle={{ padding: 0 }}
                    type='2'
                    width={650}
                    visible={this.state.StudentChangeMadalVisible}
                    onOk={this.StudentChangeMadalOk}
                    onCancel={this.StudentChangeMadalCancel}
                >
                    <div className='modal-studentChange'>
                        <div className='content-top'>
                            <img src={IconLocation} width='30' height='40' alt='icon-location' />
                            <span className='top-text'>毛峰的档案变更记录</span>
                        </div>
                        <div className='content'>
                            <StudentChangeRecord data={''}></StudentChangeRecord>
                        </div>
                    </div>
                </Modal>
                <Modal
                    ref='handleTeacherMadal'
                    bodyStyle={{ padding: 0 }}
                    type='1'
                    title={'添加学生'}
                    visible={this.state.addStudentModalVisible}
                    onOk={this.handleAddStudentModalOk}
                    onCancel={this.handleAddStudentModalCancel}
                >
                    <EditModal type='student' userKey={this.state.userKey}></EditModal>
                </Modal> */}
                <DetailsModal
                    ref='StudentDetailsMsgModal'
                    visible={this.state.StudentDetailsMsgModalVisible}
                    onOk={this.StudentDetailsMsgModalOk}
                    onCancel={this.StudentDetailsMsgModalCancel}
                    data={DataState.GetUserMsg}
                    type='student'
                >

                </DetailsModal>
                {/* <AntdModal
                    ref='changePwdMadal'
                    
                    footer={null}
                    title='重置密码'
                    visible={this.state.ChangePwdMadalVisible}
                    onOk={this.ChangePwdMadalOk}
                    onCancel={this.ChangePwdMadalCancel}
                >
                    <div>

                    </div>
                </AntdModal> */}
                {/* 提示框 */}
                <Alert show={this.state.ChangePwdMadalVisible}
                    type={'btn-query'}
                    abstract={<div className='alert-pwd'><span className='alert-pwd-tips'>新密码：</span><Input size='small' onChange={this.onPwdchange.bind(this)} style={{ width: 120 + 'px' }} value={this.state.defaultPwd}></Input></div>}
                    title={this.state.ChangePwdMadalVisible ? (<p className='alert-Title'>确定重置<span className='alert-Title-name'>{DataState.GradeStudentPreview.newList[this.state.onClickKey].UserName.Name}</span><span className='alert-Title-id'>({DataState.GradeStudentPreview.newList[this.state.onClickKey].UserName.UserID})</span> 的密码？</p>) : ''}
                    onOk={this.onPwdchangeOk.bind(this)}
                    onCancel={this.onPwdchangeClose}
                    onClose={this.onPwdchangeClose}
                ></Alert>
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