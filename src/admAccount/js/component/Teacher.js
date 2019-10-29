import React from 'react'
import { connect } from 'react-redux';
import { Alert, DetailsModal, DropDown, PagiNation, Search, Table, Button, CheckBox, CheckBoxGroup, Modal } from '../../../common/index'
//import '../../../common/scss/_left_menu.scss'
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from '../../../common/js/config';
import { Link, } from 'react-router-dom';
import '../../scss/Teacher.scss'
import md5 from 'md5'
import { Tooltip, Input } from 'antd'
import TipsContact from './TipsContact'
import history from '../containers/history'
//import EditModal from './EditModal'
//import IconLocation from '../../images/icon-location.png'
import actions from '../actions';
//import TeacherChangeRecord from './TeacherChangeRecord'
class Teacher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //GradeArr:[{value:0,title:'全部年级'}]

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
                    dataIndex: 'UserName',
                    width: 130,
                    sorter: true,
                    render: arr => {
                        return (
                            <div className='name-content'>
                                <span className='name-UserName' onClick={this.onUserNameClick.bind(this, arr.UserID)}>{arr.Name}</span><br />
                                <span className='name-UserID'>(<span className='UserID-content'>{ arr.UserID }</span>)</span>
                            </div>
                        )
                    }

                },
                {
                    title: '用户名',
                    width: 120,
                    align: 'right',
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
                    width: 120,
                    title: '联系方式',
                    align: 'center',
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
            data: [{
                key: 1,
                UserName: { key: '01', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                UserID: 'S00001',
                Grader: '男',
                GradeName: '一年级',
                ClassName: '一年1班',
                Others: {}
            }],

            TeacherAccountData: [{
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
                },
                UserContact: {
                    QQ: '1519406168',
                    WeiXin: 'asd1519406168',
                    Telephone: '15626248624',
                    Weibo: '15626248624'
                },
                handle: {
                    key: 0
                }

            }],
            pagination: 1,
            loading: false,
            selectedAll: false,
            checkedList: [],
            checkAll: false,
            TeacherModalVisible: false,
            userKey: 0,
            TeacherChangeKey: 0,
            ChangePwdMadalVisible: false,
            alertShow: false,
            alertTitle: '提示信息',
            alertQueryShow: false,
            alertQueryTitle: '查询提示~',
            TeacherDetailsMsgModalVisible: false,
            addTeacherModalVisible: false,
            defaultPwd: 888888,
            onClickKey: 0,
            userMsgKey: 0,
            keyList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            SubjectSelect: { value: 0, title: '全部学科' },
            keyword: '',
            CancelBtnShow: 'n',
            searchValue:'',
            userMsg: props.DataState.LoginUser
        }
    }
    componentWillMount() {
        const { dispatch } = this.props;
        let pwd = 888888;

        dispatch(actions.UpDataState.getChangeInputValue(pwd));
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

    //下拉
    TeacherDropMenu = (e) => {
        const { dispatch } = this.props;
        this.setState({
            SubjectSelect: e,
            searchValue: '',
            pagination: 1,
            CancelBtnShow: 'n'
        })
        dispatch(actions.UpDataState.getSubjectTeacherPreview('/GetTeacherToPage?SchoolID=' + this.state.userMsg.SchoolID + '&PageIndex=0&PageSize=10&SubjectIDs=' + e.value));

    }



    TeacherSearch = (e) => {
        const { dispatch } = this.props;
        this.setState({
            keyword: e.value,
            CancelBtnShow: 'y',
            pagination: 1
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
            dispatch(actions.UpDataState.getSubjectTeacherPreview('/GetTeacherToPage?SchoolID=' + this.state.userMsg.SchoolID + '&PageIndex=0&PageSize=10&keyword=' + e.value + '&SubjectIDs=' + this.state.SubjectSelect.value));

        }
    }
    //搜索change
    onChangeSearch = (e) => {
        this.setState({
            searchValue: e.target.value
        })
    }
    // 取消搜索
    onCancelSearch = (e) => {
        const { dispatch } = this.props

        this.setState({
            CancelBtnShow: 'n',
            keyword: ''
        })
        dispatch(actions.UpDataState.getSubjectTeacherPreview('/GetTeacherToPage?SchoolID=' + this.state.userMsg.SchoolID + '&PageIndex=' + (this.state.pagination - 1) + '&PageSize=10' + '&SubjectIDs=' + this.state.SubjectSelect.value));


    }
    onSelectChange = (e) => {
        console.log(e)
        //this.setState({ selectedRowKeys });
    }

    onUserContactClick = (UserContact) => {
        console.log(UserContact)
        // this.setState({
        //     TeacherChangeMadalVisible: true,
        //     TeacherChangeKey: key
        // })
    }
    // onChangePwdClick = (e, key) => {
    //     console.log(e, key)
    //     this.setState({
    //         TeacherChangeMadalVisible: true,
    //         TeacherChangeKey: key
    //     })
    // }

    onMouseEnterName = () => {

    }
    OnCheckAllChange = (e) => {
        const { DataState, dispatch } = this.props
        console.log(e)
        if (e.target.checked) {
            this.setState({
                checkedList: DataState.SubjectTeacherPreview.keyList,
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
        const { DataState, dispatch } = this.props
        this.setState({
            checkedList,
            checkAll: checkedList === DataState.SubjectTeacherPreview.keyList ? true : false
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
    ChangePwdMadalOk = (e) => {
        console.log(e)
        this.setState({
            ChangePwdMadalVisible: false
        })
    }
    ChangePwdMadalOk = (e) => {
        console.log(e)
        this.setState({
            ChangePwdMadalVisible: false
        })
    }

    onChangePwdAllClick = () => {
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
                title: "确定批量重置密码？",
                ok: this.onAlertQueryOk.bind(this, 888888),
                cancel: this.onAlertQueryClose.bind(this),
                close: this.onAlertQueryClose.bind(this)
            }));
        }
    }
    onChangePwdClick = (key) => {
        const { dispatch, DataState } = this.props;
        let data = this.state.TeacherAccountData;
        let pwd = 888888;
        this.setState({
            ChangePwdMadalVisible: true,
            onClickKey: key
        })



    }
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
                    userID: DataState.SubjectTeacherPreview.newList[this.state.onClickKey].Others.UserID,
                    userType: 1,
                    newPwd: md5(this.state.defaultPwd)
                },
                2).then(res => {
                    if (res.StatusCode === '401') {
                        console.log('错误码：' + res.StatusCode)
                    }
                    return res.json()
                }).then(json => {
                    if (json.StatusCode === 400) {
                        console.log(json.StatusCode)
                    } else if (json.StatusCode === 200) {
                        this.setState({
                            ChangePwdMadalVisible: false,
                            defaultPwd: 888888
                        })
                        dispatch(actions.UpDataState.getSubjectTeacherPreview('/GetTeacherToPage?SchoolID=' + this.state.userMsg.SchoolID + '&PageIndex=' + (this.state.pagination - 1) + '&PageSize=10&keyword=' + this.state.keyword + '&SubjectIDs=' + this.state.SubjectSelect.value));

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
        console.log(e.target.value)
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
    //确认重置
    onAlertQueryOk = (pwd) => {
        let url = '/ResetPwd';
        const { dispatch, DataState } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
        let userIDs = this.state.checkedList.map((child, index) => {
            return DataState.SubjectTeacherPreview.newList[child].Others.UserID
        })
        postData(CONFIG.UserAccountProxy + url,
            {
                userID: userIDs.join(),
                userType: 2,
                newPwd: md5(this.state.defaultPwd)
            },
            2).then(res => {
                if (res.StatusCode === '401') {
                    console.log('错误码：' + res.StatusCode)
                }
                return res.json()
            }).then(json => {
                if (json.StatusCode === 400) {
                    console.log(json.StatusCode)
                } else if (json.StatusCode === 200) {
                    this.setState({
                        checkedList: [],
                        checkAll: false
                    })
                    dispatch(actions.UpDataState.getSubjectTeacherPreview('/GetTeacherToPage?SchoolID=' + this.state.userMsg.SchoolID + '&PageIndex=' + (this.state.pagination - 1) + '&PageSize=10&keyword=' + this.state.keyword + '&SubjectIDs=' + this.state.SubjectSelect.value));

                }

            });

    }
    //分页
    onPagiNationChange = (value) => {
        const { dispatch } = this.props;
        this.setState({
            pagination: value
        })

        let SubjectIDs = '';
        let keyword = ''

        if (this.state.SubjectSelect.value !== 0) {
            SubjectIDs = '&SubjectIDs=' + this.state.SubjectSelect.value
        }
        if (this.state.keyword !== '') {
            keyword = '&keyword=' + this.state.keyword
        }
        dispatch(actions.UpDataState.getSubjectTeacherPreview('/GetTeacherToPage?SchoolID=' + this.state.userMsg.SchoolID + '&PageIndex=' + (--value) + '&PageSize=10' + keyword + SubjectIDs));

    }
    onUserNameClick = (UserID) => {
        const { dispatch } = this.props;
        dispatch(actions.UpDataState.getUserMsg('/GetUserDetail?userid=' + UserID))
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
    //table改变，进行排序操作
    onTableChange = (a, b, sorter) => {
        const { DataState, dispatch } = this.props;
        let SubjectSelect = '';
        let keyword = ''

        if (this.state.SubjectSelect.value !== 0) {
            SubjectSelect = '&SubjectIDs=' + this.state.SubjectSelect.value
        }
        if (this.state.keyword !== '') {
            keyword = '&keyword=' + this.state.keyword
        }
        console.log(sorter)
        if (sorter && (sorter.columnKey === 'UserName' || sorter.columnKey === 'ShortName')) {
            let sortType = sorter.order === "descend" ? 'SortType=DESC' : sorter.order === "ascend" ? 'SortType=ASC' : '';
            dispatch(actions.UpDataState.getSubjectTeacherPreview('/GetTeacherToPage?SchoolID=' + this.state.userMsg.SchoolID + '&sortFiled=' + sorter.columnKey + 'PageSize=10&' + sortType + '&PageIndex=' + (this.state.pagination - 1) + keyword + SubjectSelect));

        }
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
            <div className='Teacher'>
                <div className='Teacher-box'>
                    <div className='Teacher-top'>
                        <span className='top-tips'>
                            <span className='tips menu33 '>教师账号管理</span>
                        </span>
                        {/* <div className='top-nav'>
                            <Link className='link'  to='/GraduteArchives' replace>查看毕业生档案</Link>
                            <span className='divide'>|</span>
                            <Link className='link' target='_blank' to='/RegisterExamine' replace>学生注册审核</Link>
                            <span className='divide'>|</span>
                            <span className='link' style={{cursor:'pointer'}}  onClick={this.onAddTeacher}>添加学生</span>
                            <span className='divide'>|</span>
                            <Link className='link' to='/ImportTeacher' replace>导入学生</Link>
                        </div> */}
                    </div>
                    <hr className='Teacher-hr' />
                    <div className='Teacher-content'>
                        <div className='content-top'>
                            <DropDown
                                ref='dropMenuFirst'
                                onChange={this.TeacherDropMenu}
                                width={120}
                                height={72}

                                dropSelectd={this.state.SubjectSelect}
                                dropList={DataState.SubjectTeacherMsg.returnData ? DataState.SubjectTeacherMsg.returnData.SubjectList : [{ value: 0, title: '全部年级' }]}
                            ></DropDown>

                            <Search placeHolder='请输入关键字搜索...'
                                onClickSearch={this.TeacherSearch}
                                Value={this.state.searchValue}
                                onChange={this.onChangeSearch.bind(this)}
                                onCancelSearch={this.onCancelSearch}
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
                                        loading={UIState.AppLoading.TableLoading}
                                        onChange={this.onTableChange.bind(this)}
                                        dataSource={DataState.SubjectTeacherPreview.newList} >

                                    </Table>
                                </CheckBoxGroup>
                                <CheckBox style={{ display: DataState.SubjectTeacherPreview.Total === 0 ? 'none' : 'inline-block' }} className='checkAll-box' onChange={this.OnCheckAllChange} checked={this.state.checkAll}>
                                    全选
                                    <Button onClick={this.onChangePwdAllClick} className='changePwdAll' color='blue'>批量重置密码</Button>
                                </CheckBox>
                                <div className='pagination-box'>
                                    <PagiNation
                                        showQuickJumper
                                        hideOnSinglepage={true}
                                        current={this.state.pagination}
                                        total={DataState.SubjectTeacherPreview.Total}
                                        onChange={this.onPagiNationChange}
                                    ></PagiNation>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 模态框 */}
                {/* <Modal
                    ref='handleTeacherMadal'
                    bodyStyle={{ padding: 0 }}
                    type='1'
                    title='编辑学生'
                    visible={this.state.TeacherModalVisible}
                    onOk={this.handleTeacherModalOk}
                    onCancel={this.handleTeacherModalCancel}
                    
                >
                    <EditModal userKey={this.state.userKey}></EditModal>
                </Modal> */}
                {/* <Modal
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
                <Modal
                    ref='handleTeacherMadal'
                    bodyStyle={{ padding: 0 }}
                    type='1'
                    title={'添加学生'}
                    visible={this.state.addTeacherModalVisible}
                    onOk={this.handleAddTeacherModalOk}
                    onCancel={this.handleAddTeacherModalCancel}
                >
                    <EditModal type='Teacher' userKey={this.state.userKey}></EditModal>
                </Modal> */}
                <DetailsModal
                    ref='TeacherDetailsMsgModal'
                    visible={this.state.TeacherDetailsMsgModalVisible}
                    onOk={this.TeacherDetailsMsgModalOk}
                    onCancel={this.TeacherDetailsMsgModalCancel}
                    data={DataState.GetUserMsg}
                    type='Teacher'
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
                    title={this.state.ChangePwdMadalVisible ? (<p className='alert-Title'>确定重置<span className='alert-Title-name'>{DataState.SubjectTeacherPreview.newList[this.state.onClickKey].UserName.Name}</span><span className='alert-Title-id'>({DataState.SubjectTeacherPreview.newList[this.state.onClickKey].UserName.UserID})</span> 的密码？</p>) : ''}
                    onOk={this.onPwdchangeOk}
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
export default connect(mapStateToProps)(Teacher)