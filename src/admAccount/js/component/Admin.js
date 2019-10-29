import React from 'react'
import { connect } from 'react-redux';
import { Alert, DetailsModal, DropDown, PagiNation, Search, Table, Button, CheckBox, CheckBoxGroup, Modal } from '../../../common/index'
//import '../../../common/scss/_left_menu.scss'
import { Link, } from 'react-router-dom';
import '../../scss/Admin.scss'
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from '../../../common/js/config';
import { Tooltip, Input, Modal as AntdModal } from 'antd'
import TipsContact from './TipsContact'
import TipsPower from './TipsPower'
import md5 from 'md5'
import history from '../containers/history'
import EditModal from './EditModal'
//import IconLocation from '../../images/icon-location.png'
import actions from '../actions';
//import AdminChangeRecord from './AdminChangeRecord'
class Admin extends React.Component {
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
                    width: 130,
                    key: 'UserName',
                    dataIndex: 'UserName',
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
                    align: 'center',
                    dataIndex: 'ShortName',
                    key: 'ShortName',
                    sorter: true,
                    render: ShortName => {
                        return (
                            <span className='UserName'>{ShortName?ShortName:'--'}</span>
                        )
                    }
                },
                {
                    title: '访问权限',
                    width: 120,
                    align: 'center',
                    dataIndex: 'Power',
                    key: 'Power',
                    render: Power => {
                        return (
                            <Tooltip placement='topLeft' width={540} trigger='click' arrowPointAtCenter={true} title={<TipsPower data={Power}></TipsPower>}>
                                <span className='Power' >查看</span>
                            </Tooltip>
                        )
                    }
                },
                {
                    title: '联系方式',
                    width: 120,
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
                    align: 'center',
                    width: 300,
                    key: 'handle',
                    dataIndex: 'key',
                    render: (key) => {

                        return (
                            <div className='handle-content'>
                                <Button color='blue' type='default' onClick={this.onChangePwdClick.bind(this, key)} className='handle-btn'>重置密码</Button>
                                <Button color='blue' type='default' onClick={this.onHandleClick.bind(this, key)} className='handle-btn'>编辑</Button>

                            </div>
                        )
                    }
                }
            ],
            data: [{
                key: 1,
                UserName: { key: '01', PhotoPath: '', UserName: '祝泽森' },
                UserID: 'S00001',
                Grader: '男',
                GradeName: '一年级',
                ClassName: '一年1班',
                Others: {}
            }],

            pagination: 1,
            loading: false,
            selectedAll: false,
            checkedList: [],
            checkAll: false,
            AdminModalVisible: false,
            userKey: 'change',
            AdminChangeKey: 0,
            ChangePwdMadalVisible: false,
            alertShow: false,
            alertTitle: '提示信息',
            alertQueryShow: false,
            alertQueryTitle: '查询提示~',
            AdminDetailsMsgModalVisible: false,
            addAdminModalVisible: false,
            defaultPwd: 888888,
            onClickKey: 0,
            userMsgKey: 0,
            keyList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            destroyOnCloce: true,
            changeAdminModalVisible: false,
            keyword: '',
            CancelBtnShow: 'n',
            searchValue: '',
            userMsg:props.DataState.LoginUser


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


    // 搜索
    AdminSearch = (e) => {
        const { dispatch } = this.props;
        
        if (e.value === '') {
            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-warn',
                title: "关键词不能为空",
                ok: this.onAlertWarnOk.bind(this),
                cancel: this.onAlertWarnClose.bind(this),
                close: this.onAlertWarnClose.bind(this)
            }));
        } else {

            dispatch(actions.UpDataState.getAdminPreview('/GetAdminToPage?SchoolID='+this.state.userMsg.SchoolID+'&PageIndex=0&PageSize=10&keyword=' + e.value));
            this.setState({
                checkedList: [],
                checkAll: false,
                keyword: e.value,
                CancelBtnShow: 'y'
            })
        }
    }
    onChangeSearch = (e) => {
        this.setState({
            searchValue: e.target.value
        })
    }


    onUserContactClick = (UserContact) => {
        console.log(UserContact)
        // this.setState({
        //     AdminChangeMadalVisible: true,
        //     AdminChangeKey: key
        // })
    }
    // onChangePwdClick = (e, key) => {
    //     console.log(e, key)
    //     this.setState({
    //         AdminChangeMadalVisible: true,
    //         AdminChangeKey: key
    //     })
    // }

    OnCheckAllChange = (e) => {
        console.log(e)
        if (e.target.checked) {
            this.setState({
                checkedList: this.state.keyList,
                checkAll: e.target.checked
            })
        } else {
            this.setState({
                checkedList: [],
                checkAll: e.target.checked
            })
        }
    }
    // 全选
    onCheckBoxGroupChange = (checkedList) => {
        console.log(checkedList)
        this.setState({
            checkedList,
            checkAll: checkedList.length === this.state.keyList.length ? true : false
        })
    }
    handleAdminModalOk = (e) => {
        console.log(e)
        this.setState({
            AdminModalVisible: false
        })
    }
    handleAdminModalCancel = (e) => {
        console.log(e)
        this.setState({
            AdminModalVisible: false
        })
    }

    // ChangePwdMadalOk = (e) => {
    //     console.log(e)
    //     this.setState({
    //         ChangePwdMadalVisible: false
    //     })
    // }

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
                ok: this.onAlertDeleteOk.bind(this),
                cancel: this.onAlertQueryClose.bind(this),
                close: this.onAlertQueryClose.bind(this)
            }));
        }
    }
    onChangePwdClick = (key) => {
        const { dispatch, DataState } = this.props;
        let data = this.state.AdminAccountData;
        let pwd = 888888;
        this.setState({
            ChangePwdMadalVisible: true,
            onClickKey: key
        })



    }
    onHandleClick = (key) => {
        //console.log(this.state.AdminAccountData[key])
        this.setState({
            AdminChangeKey: key,
            changeAdminModalVisible: true,
            userKey: 'change'
        })
    }
    onAddAdmin = (e, ) => {
        console.log(e)
        this.setState({
            addAdminModalVisible: true,
            userKey: 'add'
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
    // 
    onAlertQueryOk = (pwd) => {
        const { dispatch, DataState } = this.props;
        let url = '/DeleteAdmin';

        dispatch(actions.UpUIState.hideErrorAlert());
        console.log(pwd);
        this.setState({
            checkedList: [],
            checkAll: false
        })
    }
    // 删除
    onAlertDeleteOk = () => {
        const { dispatch, DataState } = this.props;
        let url = '/DeleteAdmin';
        let UserIDs = this.state.checkedList.map(child => {
            return DataState.AdminPreview.newList[child].UserName.UserID
        })
        postData(CONFIG.UserAccountProxy + url,
            {
                UserIDs: UserIDs.join()
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
                    dispatch(actions.UpUIState.hideErrorAlert());
                    this.setState({
                        checkedList: [],
                        checkAll: false
                    })
                    if (this.state.searchValue !== '')
                        dispatch(actions.UpDataState.getAdminPreview('/GetAdminToPage?SchoolID='+this.state.userMsg.SchoolID+'&PageIndex=' + (this.state.pagination - 1) +'&PageSize=10&Keyword=' + this.state.keyword));
                    else
                        dispatch(actions.UpDataState.getAdminPreview('/GetAdminToPage?SchoolID='+this.state.userMsg.SchoolID+'&PageIndex=' + (this.state.pagination - 1) +'&PageSize=10'));
                }

            });

    }
    // 分页
    onPagiNationChange = (value) => {
        const { dispatch } = this.props;
        this.setState({
            pagination: value
        })


        let keyword = ''


        if (this.state.keyword !== '') {
            keyword = '&keyword=' + this.state.keyword
        }
        dispatch(actions.UpDataState.getAdminPreview('/GetAdminToPage?SchoolID='+this.state.userMsg.SchoolID+'&PageIndex=' + (--value) + '&PageSize=10' + keyword));
    }


    onUserNameClick = (UserID) => {
        const { dispatch } = this.props;

        dispatch(actions.UpDataState.getUserMsg('/GetUserDetail?userid=' + UserID))

        this.setState({
            AdminDetailsMsgModalVisible: true,
        })
    }
    AdminDetailsMsgModalOk = () => {
        this.setState({
            AdminDetailsMsgModalVisible: false,

        })
    }
    AdminDetailsMsgModalCancel = () => {
        this.setState({
            AdminDetailsMsgModalVisible: false,

        })
    }

    handleAddAdminModalOk = (e) => {
        const { dispatch, UIState, DataState } = this.props;


        if (!DataState.AdminPreview.TrasferData.isChange) {
            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-warn',
                title: "你没有修改",
                ok: this.onAlertWarnOk.bind(this),
                cancel: this.onAlertWarnClose.bind(this),
                close: this.onAlertWarnClose.bind(this)
            }));
            return;
        }
        if (UIState.TipsVisible.UserIDTipsVisible || !DataState.AdminPreview.TrasferData.UserID) {
            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-warn',
                title: "工号有错误",
                ok: this.onAlertWarnOk.bind(this),
                cancel: this.onAlertWarnClose.bind(this),
                close: this.onAlertWarnClose.bind(this)
            }));
            return;
        }
        if (UIState.TipsVisible.UserNameTipsVisible || !DataState.AdminPreview.TrasferData.UserName) {
            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-warn',
                title: "姓名有错误",
                ok: this.onAlertWarnOk.bind(this),
                cancel: this.onAlertWarnClose.bind(this),
                close: this.onAlertWarnClose.bind(this)
            }));
            return;
        }
        let url = '/AddAdmin';
        // let ModulesID = []
        // DataState.AdminPreview.TrasferData.ModuleIDs.map((child) => {
        //     console.log(child.length)
        //     if (child.length !== 0)
        //         ModulesID.push(child.join())
        // })
        postData(CONFIG.UserAccountProxy + url,
            {
                userID: DataState.AdminPreview.TrasferData.UserID,
                UserName: DataState.AdminPreview.TrasferData.UserName,
                ModuleIDs: DataState.AdminPreview.TrasferData.ModuleIDs,
                PhotoPath: '',
                Pwd: DataState.AdminPreview.TrasferData.Pwd
            },
            2).then(res => {
                if (res.StatusCode === '401') {
                    console.log('错误码：' + res.StatusCode)
                }
                return res.json()
            }).then(json => {
                if (json.StatusCode !== 200) {
                    dispatch(actions.UpUIState.showErrorAlert({
                        type: 'btn-error',
                        title: json.Msg,
                        ok: this.onAlertWarnOk.bind(this),
                        cancel: this.onAlertWarnClose.bind(this),
                        close: this.onAlertWarnClose.bind(this)
                    }));
                } else if (json.StatusCode === 200) {
                    this.setState({
                        addAdminModalVisible: false
                    })
                    dispatch(actions.UpDataState.setAdminPreview({
                        isChange: false,
                        UserID: '',
                        UserName: '',
                        ModuleIDs: '',
                        PhotoPath: '',
                        Pwd: '0'
                    }))
                    dispatch(actions.UpDataState.getAdminPreview('/GetAdminToPage?SchoolID='+this.state.userMsg.SchoolID+'&PageIndex=0&PageSize=10'));
                    dispatch(actions.UpUIState.AllTipsVisibleClose())
                }

            });


    }
    handleAddAdminModalCancel = (e) => {
        const { dispatch, DataState } = this.props;
        dispatch(actions.UpDataState.setAdminPreview({
            isChange: false,
            UserID: '',
            UserName: '',
            ModuleIDs: '',
            PhotoPath: '',
            Pwd: '0'
        }))
        this.setState({
            addAdminModalVisible: false
        })
        dispatch(actions.UpUIState.AllTipsVisibleClose())

    }
    handleChangeAdminModalOk = (e) => {
        const { dispatch, UIState, DataState } = this.props;


        if (!DataState.AdminPreview.TrasferData.isChange) {
            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-warn',
                title: "你没有修改",
                ok: this.onAlertWarnOk.bind(this),
                cancel: this.onAlertWarnClose.bind(this),
                close: this.onAlertWarnClose.bind(this)
            }));
            return;
        }
        if (UIState.TipsVisible.UserIDTipsVisible) {
            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-warn',
                title: "工号有错误",
                ok: this.onAlertWarnOk.bind(this),
                cancel: this.onAlertWarnClose.bind(this),
                close: this.onAlertWarnClose.bind(this)
            }));
            return;
        }
        if (UIState.TipsVisible.UserNameTipsVisible) {
            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-warn',
                title: "姓名有错误",
                ok: this.onAlertWarnOk.bind(this),
                cancel: this.onAlertWarnClose.bind(this),
                close: this.onAlertWarnClose.bind(this)
            }));
            return;
        }
        let url = '/EditAdmin';
        // let ModulesID = []
        // DataState.AdminPreview.TrasferData.ModuleIDs.map((child) => {
        //     console.log(child.length)
        //     if (child.length !== 0)
        //         ModulesID.push(child.join())
        // })
        postData(CONFIG.UserAccountProxy + url,
            {
                userID: DataState.AdminPreview.TrasferData.UserID,
                UserName: DataState.AdminPreview.TrasferData.UserName,
                ModuleIDs: DataState.AdminPreview.TrasferData.ModuleIDs,
                PhotoPath: '',
                Pwd: md5(DataState.AdminPreview.TrasferData.Pwd)
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
                        changeAdminModalVisible: false
                    })
                    dispatch(actions.UpDataState.setAdminPreview({
                        isChange: false,
                        UserID: '',
                        UserName: '',
                        ModuleIDs: '',
                        PhotoPath: '',
                        Pwd: '0'
                    }))
                    dispatch(actions.UpDataState.getAdminPreview('/GetAdminToPage?SchoolID='+this.state.userMsg.SchoolID+'&PageIndex=0&PageSize=10'));
                    dispatch(actions.UpUIState.AllTipsVisibleClose())

                }

            });


    }
    handleChangeAdminModalCancel = (e) => {
        const { dispatch, DataState } = this.props;
        dispatch(actions.UpDataState.setAdminPreview({
            isChange: false,
            UserID: '',
            UserName: '',
            ModuleIDs: '',
            PhotoPath: '',
            Pwd: '0'
        }))
        this.setState({
            changeAdminModalVisible: false
        })
        dispatch(actions.UpUIState.AllTipsVisibleClose())

    }
    //修改密码
    onPwdchangeOk = () => {
        const { dispatch, DataState } = this.props;
        let pwd = this.state.defaultPwd
        if (pwd === '') {
            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-warn',
                title: "密码不能为空",
                ok: this.onAlertWarnOk.bind(this),
                cancel: this.onAlertWarnClose.bind(this),
                close: this.onAlertWarnClose.bind(this)
            }));
            return;
        }
        console.log(this.state.onClickKey)
        let url = '/ResetPwd'
        postData(CONFIG.UserAccountProxy + url,
            {
                userID: DataState.AdminPreview.newList[this.state.onClickKey].UserName.UserID,
                userType: 0,
                newPwd: md5(pwd)
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
                    if (this.state.searchValue !== '')
                        dispatch(actions.UpDataState.getAdminPreview('/GetAdminToPage?SchoolID='+this.state.userMsg.SchoolID+'&PageIndex=' + (this.state.pagination - 1) +'&PageSize=10&Keyword=' + this.state.keyword));
                    else
                        dispatch(actions.UpDataState.getAdminPreview('/GetAdminToPage?SchoolID='+this.state.userMsg.SchoolID+'&PageIndex=' + (this.state.pagination - 1) +'&PageSize=10'));

                }

            });

    }
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


    // onPowerClick = (Power) => {
    //     console.log(Power)
    // }

    //table改变，进行排序操作
    onTableChange = (a, b, sorter) => {
        const { DataState, dispatch } = this.props;
        let keyword = ''


        if (this.state.keyword !== '') {
            keyword = '&keyword=' + this.state.keyword
        }
        // console.log(sorter)
        if (sorter && (sorter.columnKey === 'UserName' || sorter.columnKey === 'ShortName')) {
            let sortType = sorter.order === "descend" ? '&SortType=DESC' : sorter.order === "ascend" ? '&SortType=ASC' : '';
            dispatch(actions.UpDataState.getAdminPreview('/GetAdminToPage?SchoolID='+this.state.userMsg.SchoolID+'&PageSize=10&sortFiled=' + sorter.columnKey + sortType + '&PageIndex=' + (this.state.pagination - 1) + keyword));

        }else if(sorter){
            dispatch(actions.UpDataState.getAdminPreview('/GetAdminToPage?SchoolID=' + this.state.userMsg.SchoolID  + '&PageSize=10'  + '&PageIndex=' + (this.state.pagination - 1) + keyword));

        }
    }
    // 取消搜索
    onCancelSearch = (e) => {
        const { dispatch } = this.props

        this.setState({
            CancelBtnShow: 'n',
            keyword: ''
        })
        dispatch(actions.UpDataState.getAdminPreview('/GetAdminToPage?SchoolID='+this.state.userMsg.SchoolID+'&PageIndex=' + (this.state.pagination - 1) +'&PageSize=10'));
        
    }
    render() {
        const { UIState, DataState } = this.props;
        const data = {
            userName: '康欣',
            userImg: '',
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
            <div className='Admin'>
                <div className='Admin-box'>
                    <div className='Admin-top'>
                        <span className='top-tips'>
                            <span className='tips menu33 '>管理员账号管理</span>
                        </span>
                        <div className='top-nav'>

                            {/* <span className='divide'>|</span> */}
                            <span className='link' style={{ cursor: 'pointer' }} onClick={this.onAddAdmin}>添加管理员</span>

                        </div>
                    </div>
                    <hr className='Admin-hr' />
                    <div className='Admin-content'>
                        <div className='content-top'>
                            <Search placeHolder='请输入关键字搜索...'
                                onClickSearch={this.AdminSearch}
                                height={30}
                                onCancelSearch={this.onCancelSearch}
                                Value={this.state.searchValue}
                                onChange={this.onChangeSearch.bind(this)}
                                CancelBtnShow={this.state.CancelBtnShow}
                            ></Search>
                        </div>
                        <div className='content-render'>
                            <div>
                                <CheckBoxGroup style={{ width: '100%' }} value={this.state.checkedList} onChange={this.onCheckBoxGroupChange.bind(this)}>
                                    <Table
                                        className='table'
                                        onChange={this.onTableChange.bind(this)}
                                        columns={this.state.columns}
                                        pagination={false}
                                        loading={UIState.AppLoading.TableLoading}
                                        dataSource={DataState.AdminPreview.newList} >

                                    </Table>
                                </CheckBoxGroup>
                                {DataState.AdminPreview.Total?(<CheckBox className='checkAll-box' onChange={this.OnCheckAllChange} checked={this.state.checkAll}>
                                    全选
                                    <Button onClick={this.onDeleteAllClick} className='deleteAll' color='red'>删除</Button>
                                </CheckBox>):''}
                                <div className='pagination-box'>
                                    <PagiNation
                                        showQuickJumper
                                        hideOnSinglepage={true}
                                        current={this.state.pagination}
                                        total={DataState.AdminPreview.Total}
                                        onChange={this.onPagiNationChange}
                                    ></PagiNation>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 模态框 */}
                {/* <Modal
                    ref='handleAdminMadal'
                    bodyStyle={{ padding: 0 }}
                    type='1'
                    title='编辑学生'
                    visible={this.state.AdminModalVisible}
                    onOk={this.handleAdminModalOk}
                    onCancel={this.handleAdminModalCancel}
                    
                >
                    <EditModal userKey={this.state.userKey}></EditModal>
                </Modal> */}
                {/* <Modal
                    ref='AdminChangeMadal'
                    bodyStyle={{ padding: 0 }}
                    type='2'
                    width={650}
                    visible={this.state.AdminChangeMadalVisible}
                    onOk={this.AdminChangeMadalOk}
                    onCancel={this.AdminChangeMadalCancel}
                >
                    <div className='modal-AdminChange'>
                        <div className='content-top'>
                            <img src={IconLocation} width='30' height='40' alt='icon-location' />
                            <span className='top-text'>毛峰的档案变更记录</span>
                        </div>
                        <div className='content'>
                            <AdminChangeRecord data={''}></AdminChangeRecord>
                        </div>
                    </div>
                </Modal> */}
                <Modal
                    ref='handleAdminMadal'
                    bodyStyle={{ padding: 0 }}
                    type='1'
                    title={'添加管理员'}
                    visible={this.state.addAdminModalVisible}
                    onOk={this.handleAddAdminModalOk}
                    onCancel={this.handleAddAdminModalCancel}

                >
                    {this.state.addAdminModalVisible ? (<EditModal type='Admin' userKey={this.state.userKey} data={DataState.AdminPreview.newList[this.state.AdminChangeKey]} PowerList={DataState.AdminPreview.PowerList}></EditModal>) : ''}
                </Modal>
                <Modal
                    ref='handleAdminMadal'
                    bodyStyle={{ padding: 0 }}
                    type='1'
                    title={'编辑管理员'}
                    visible={this.state.changeAdminModalVisible}
                    onOk={this.handleChangeAdminModalOk}
                    onCancel={this.handleChangeAdminModalCancel}

                >
                    {this.state.changeAdminModalVisible ? (<EditModal type='Admin' userKey={this.state.userKey} data={DataState.AdminPreview.newList[this.state.AdminChangeKey]} PowerList={DataState.AdminPreview.PowerList}></EditModal>) : ''}
                </Modal>
                <DetailsModal
                    ref='AdminDetailsMsgModal'
                    visible={this.state.AdminDetailsMsgModalVisible}
                    onOk={this.AdminDetailsMsgModalOk}
                    onCancel={this.AdminDetailsMsgModalCancel}
                    data={DataState.GetUserMsg}
                    type='Admin'
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
                    title={this.state.ChangePwdMadalVisible ? (<p className='alert-Title'>确定重置<span className='alert-Title-name'>{DataState.AdminPreview.newList[this.state.onClickKey].UserName.Name}</span><span className='alert-Title-id'>({DataState.AdminPreview.newList[this.state.onClickKey].UserName.UserID})</span> 的密码？</p>) : ''}
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
export default connect(mapStateToProps)(Admin)