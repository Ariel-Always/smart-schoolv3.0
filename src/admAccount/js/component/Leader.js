import React from 'react'
import { connect } from 'react-redux';
import { Alert,DetailsModal, DropDown, PagiNation, Search, Table, Button, CheckBox, CheckBoxGroup, Modal } from '../../../common/index'
//import '../../../common/scss/_left_menu.scss'
import { Link, } from 'react-router-dom';
import '../../scss/Leader.scss'
import { Tooltip,  Input } from 'antd'
import TipsContact from './TipsContact'
import history from '../containers/history'
//import EditModal from './EditModal'
//import IconLocation from '../../images/icon-location.png'
import actions from '../actions';
//import LeaderChangeRecord from './LeaderChangeRecord'
class Leader extends React.Component {
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
                    align: 'left',
                    render: key => {
                        return (
                            <div className='registerTime-content'>
                                <CheckBox value={key} onChange={this.onCheckChange}></CheckBox>
                                <span className='key-content'>{key + 1 >= 10 ? key + 1 : '0' + (key + 1)}</span>
                            </div>
                        )
                    }
                },
                {
                    title: '姓名',
                    align: 'center',
                    key: 'Name',
                    dataIndex: 'Name',
                    sorter: true,
                    render: arr => {
                        return (
                            <div className='name-content'>
                                <span className='name-UserName' onClick={this.onUserNameClick.bind(this, arr.key)}>{arr.Name}</span><br />
                                <span className='name-UserID'>{'(' + arr.UserID + ')'}</span>
                            </div>
                        )
                    }

                },
                {
                    title: '用户名',
                    align: 'right',
                    dataIndex: 'UserName',
                    key: 'UserName',
                    sorter: true,
                    render: UserName => {
                        return (
                            <span className='UserName'>{UserName}</span>
                        )
                    }
                },
                {
                    title: '个性签名',
                    align: 'center',
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

            LeaderAccountData: [{
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
            }, {
                key: 1,
                Name: {
                    Name: '黄尚',
                    UserID: '201700121245',
                    key: 1
                },
                UserName: 'ZXSTU_001',
                Sign: '人生重要的不是所站的位置，而是所朝的方向',
                Gender: '男',
                UserImg: {
                    PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg',
                    PhotoPath_NOcache: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg'
                },
                UserContact: {
                    QQ: '1519406168',
                    WeiXin: 'asd1519406168',
                    Telephone: '15626248624',
                    weibo: '15626248624'
                },
                handle: {
                    key: 1
                }
            }, {
                key: 2,
                Name: {
                    Name: '李丽丽',
                    UserID: '201700121245',
                    key: 2
                },
                UserName: 'ZXSTU_001',
                Sign: '人生重要的不是所站的位置，而是所朝的方向',
                Gender: '男',
                UserImg: {
                    PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg',
                    PhotoPath_NOcache: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg'
                },
                UserContact: {
                    QQ: '1519406168',
                    WeiXin: 'asd1519406168',
                    Telephone: '15626248624',
                    weibo: '15626248624'
                },
                handle: {
                    key: 2
                }
            }, {
                key: 3,
                Name: {
                    Name: '蓝线',
                    UserID: '201700121245',
                    key: 3
                },
                UserName: 'ZXSTU_001',
                Sign: '人生重要的不是所站的位置，而是所朝的方向',
                Gender: '男',
                UserImg: {
                    PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg',
                    PhotoPath_NOcache: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg'
                },
                UserContact: {
                    QQ: '1519406168',
                    WeiXin: 'asd1519406168',
                    Telephone: '15626248624',
                    weibo: '15626248624'
                },
                handle: {
                    key: 3
                }
            }, {
                key: 4,
                Name: {
                    Name: '张心仪',
                    UserID: '201700121245',
                    key: 4
                },
                UserName: 'ZXSTU_001',
                Sign: '人生重要的不是所站的位置，而是所朝的方向',
                Gender: '男',
                UserImg: {
                    PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg',
                    PhotoPath_NOcache: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg'
                },
                UserContact: {
                    QQ: '1519406168',
                    WeiXin: 'asd1519406168',
                    Telephone: '15626248624',
                    weibo: '15626248624'
                },
                handle: {
                    key: 4
                }
            }, {
                key: 5,
                Name: {
                    Name: '张心仪',
                    UserID: '201700121245',
                    key: 5
                },
                UserName: 'ZXSTU_001',
                Sign: '人生重要的不是所站的位置，而是所朝的方向',
                Gender: '男',
                UserImg: {
                    PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg',
                    PhotoPath_NOcache: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg'
                },
                UserContact: {
                    QQ: '1519406168',
                    WeiXin: '',
                    Telephone: '15626248624',
                    weibo: '15626248624'
                },
                handle: {
                    key: 5
                }
            }, {
                key: 6,
                Name: {
                    Name: '张心仪',
                    UserID: '201700121245',
                    key: 6
                },
                UserName: 'ZXSTU_001',
                Sign: '人生重要的不是所站的位置，而是所朝的方向',
                Gender: '男',
                UserImg: {
                    PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg',
                    PhotoPath_NOcache: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg'
                },
                UserContact: {
                    QQ: '1519406168',
                    WeiXin: 'asd1519406168',
                    Telephone: '15626248624',
                    weibo: ''
                },
                handle: {
                    key: 6
                }
            }, {
                key: 7,
                Name: {
                    Name: '张心仪',
                    UserID: '201700121245',
                    key: 7
                },
                UserName: 'ZXSTU_001',
                Sign: '人生重要的不是所站的位置，而是所朝的方向',
                Gender: '男',
                UserImg: {
                    PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg',
                    PhotoPath_NOcache: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg'
                },
                UserContact: {
                    QQ: '',
                    WeiXin: '',
                    Telephone: '',
                    weibo: ''
                },
                handle: {
                    key: 7
                }
            }, {
                key: 8,
                Name: {
                    Name: '张心仪',
                    UserID: '201700121245',
                    key: 8
                },
                UserName: 'ZXSTU_001',
                Sign: '人生重要的不是所站的位置，而是所朝的方向',
                Gender: '男',
                UserImg: {
                    PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg',
                    PhotoPath_NOcache: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg'
                },
                UserContact: {
                    QQ: '1519406168',
                    WeiXin: 'asd1519406168',
                    Telephone: '15626248624',
                    weibo: '15626248624'
                },
                handle: {
                    key: 8
                }
            }, {
                key: 9,
                Name: {
                    Name: '张心仪',
                    UserID: '201700121245',
                    key: 9
                },
                UserName: 'ZXSTU_001',
                Sign: '人生重要的不是所站的位置，而是所朝的方向',
                Gender: '男',
                UserImg: {
                    PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg',
                    PhotoPath_NOcache: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg'
                },
                UserContact: {
                    QQ: '1519406168',
                    WeiXin: 'asd1519406168',
                    Telephone: '15626248624',
                    weibo: '15626248624'
                },
                handle: {
                    key: 9
                }
            }],
            pagination: { total: 50 },
            loading: false,
            selectedAll: false,
            checkedList: [],
            checkAll: false,
            LeaderModalVisible: false,
            userKey: 0,
            LeaderChangeKey: 0,
            ChangePwdMadalVisible: false,
            alertShow: false,
            alertTitle: '提示信息',
            alertQueryShow: false,
            alertQueryTitle: '查询提示~',
            LeaderDetailsMsgModalVisible: false,
            addLeaderModalVisible: false,
            defaultPwd:888888,
            onClickKey:0,
            userMsgKey:0,
            keyList:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],


        }
    }
    componentWillMount(){
        const {dispatch} = this.props;
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
    

    

   

   
    onSelectChange = (e) => {
        console.log(e)
        //this.setState({ selectedRowKeys });
    }

    onUserContactClick = (UserContact) => {
        console.log(UserContact)
        // this.setState({
        //     LeaderChangeMadalVisible: true,
        //     LeaderChangeKey: key
        // })
    }
    // onChangePwdClick = (e, key) => {
    //     console.log(e, key)
    //     this.setState({
    //         LeaderChangeMadalVisible: true,
    //         LeaderChangeKey: key
    //     })
    // }

    onMouseEnterName = () => {

    }
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
    onCheckBoxGroupChange = (checkedList) => {
        console.log(checkedList)
        this.setState({
            checkedList,
            checkAll: checkedList === this.state.keyList ? true : false
        })
    }
    handleLeaderModalOk = (e) => {
        console.log(e)
        this.setState({
            LeaderModalVisible: false
        })
    }
    handleLeaderModalCancel = (e) => {
        console.log(e)
        this.setState({
            LeaderModalVisible: false
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
                ok: this.onAlertQueryOk.bind(this,888888),
                cancel: this.onAlertQueryClose.bind(this),
                close: this.onAlertQueryClose.bind(this)
            }));
        }
    }
    onChangePwdClick = (key) => {
        const { dispatch,DataState } = this.props;
        let data = this.state.LeaderAccountData;
        let pwd = 888888;
        this.setState({
            ChangePwdMadalVisible:true,
            onClickKey:key
         })
      


    }
    onPwdchangeOk = (pwd) => {
        console.log(pwd);
        this.setState({
            ChangePwdMadalVisible:false,
            defaultPwd:888888
         })
    }
    onPwdchangeClose = () => {
         this.setState({
            ChangePwdMadalVisible:false,
            defaultPwd:888888
         })
    }
    onPwdchange = (e) => {
        const {dispatch} = this.props;
        console.log(e.target.value)
        this.setState({
            defaultPwd:e.target.value
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
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
        console.log(pwd);
        this.setState({
            checkedList: [],
            checkAll: false
        })
    }
    onPagiNationChange = (e) => {
        console.log(e)
    }
    onUserNameClick = (key) => {
        this.setState({
            LeaderDetailsMsgModalVisible: true,
            userMsgKey:key
        })
    }
    LeaderDetailsMsgModalOk = () => {
        this.setState({
            LeaderDetailsMsgModalVisible: false,

        })
    }
    LeaderDetailsMsgModalCancel = () => {
        this.setState({
            LeaderDetailsMsgModalVisible: false,

        })
    }
    onAddLeader = (e, ) => {
        console.log(e)
        this.setState({
            addLeaderModalVisible: true,
            userKey: 'add'
        })
    }
    handleAddLeaderModalOk = (e) => {
        console.log(e)
        this.setState({
            addLeaderModalVisible: false
        })
    }
    handleAddLeaderModalCancel = (e) => {
        console.log(e)
        this.setState({
            addLeaderModalVisible: false
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
            <div className='Leader'>
                <div className='Leader-box'>
                    <div className='Leader-top'>
                        <span className='top-tips'>
                            <span className='tips menu35 '>领导账号管理</span>
                        </span>
                        {/* <div className='top-nav'>
                            <Link className='link'  to='/GraduteArchives' replace>查看毕业生档案</Link>
                            <span className='divide'>|</span>
                            <Link className='link' target='_blank' to='/RegisterExamine' replace>学生注册审核</Link>
                            <span className='divide'>|</span>
                            <span className='link' style={{cursor:'pointer'}}  onClick={this.onAddLeader}>添加学生</span>
                            <span className='divide'>|</span>
                            <Link className='link' to='/ImportLeader' replace>导入学生</Link>
                        </div> */}
                    </div>
                    <hr className='Leader-hr' />
                    <div className='Leader-content'>
                        
                        <div className='content-render'>
                            <div>
                                <CheckBoxGroup style={{ width: '100%' }} value={this.state.checkedList} onChange={this.onCheckBoxGroupChange.bind(this)}>
                                    <Table
                                        className='table'
                                        columns={this.state.columns}
                                        pagination={false}
                                        loading={UIState.AppLoading.TableLoading}                                        
                                        dataSource={this.state.LeaderAccountData} >

                                    </Table>
                                </CheckBoxGroup>
                                <CheckBox className='checkAll-box' onChange={this.OnCheckAllChange} checked={this.state.checkAll}>
                                    全选
                                    <Button onClick={this.onChangePwdAllClick} className='changePwdAll'  color='blue'>批量重置密码</Button>
                                </CheckBox>
                                <div className='pagination-box'>
                                    <PagiNation
                                        showQuickJumper
                                        total={this.state.pagination.total}
                                        onChange={this.onPagiNationChange}
                                    ></PagiNation>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 模态框 */}
                {/* <Modal
                    ref='handleLeaderMadal'
                    bodyStyle={{ padding: 0 }}
                    type='1'
                    title='编辑学生'
                    visible={this.state.LeaderModalVisible}
                    onOk={this.handleLeaderModalOk}
                    onCancel={this.handleLeaderModalCancel}
                    
                >
                    <EditModal userKey={this.state.userKey}></EditModal>
                </Modal> */}
                {/* <Modal
                    ref='LeaderChangeMadal'
                    bodyStyle={{ padding: 0 }}
                    type='2'
                    width={650}
                    visible={this.state.LeaderChangeMadalVisible}
                    onOk={this.LeaderChangeMadalOk}
                    onCancel={this.LeaderChangeMadalCancel}
                >
                    <div className='modal-LeaderChange'>
                        <div className='content-top'>
                            <img src={IconLocation} width='30' height='40' alt='icon-location' />
                            <span className='top-text'>毛峰的档案变更记录</span>
                        </div>
                        <div className='content'>
                            <LeaderChangeRecord data={''}></LeaderChangeRecord>
                        </div>
                    </div>
                </Modal>
                <Modal
                    ref='handleLeaderMadal'
                    bodyStyle={{ padding: 0 }}
                    type='1'
                    title={'添加学生'}
                    visible={this.state.addLeaderModalVisible}
                    onOk={this.handleAddLeaderModalOk}
                    onCancel={this.handleAddLeaderModalCancel}
                >
                    <EditModal type='Leader' userKey={this.state.userKey}></EditModal>
                </Modal> */}
                <DetailsModal
                    ref='LeaderDetailsMsgModal'
                    visible={this.state.LeaderDetailsMsgModalVisible}
                    onOk={this.LeaderDetailsMsgModalOk}
                    onCancel={this.LeaderDetailsMsgModalCancel}
                    data={data}
                    type='Leader'
                >
                    <div className='modal-top'>

                    </div>
                    <div className='modal-content'></div>
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
                    abstract={<div className='alert-pwd'><span className='alert-pwd-tips'>新密码：</span><Input size='small' onChange={this.onPwdchange.bind(this)} style={{width:120+'px'}} value={this.state.defaultPwd}></Input></div>}
                    title={<p className='alert-Title'>确定重置<span className='alert-Title-name'>{this.state.LeaderAccountData[this.state.onClickKey].Name.Name}</span><span className='alert-Title-id'>({this.state.LeaderAccountData[this.state.onClickKey].Name.UserID})</span> 的密码？</p>}
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
export default connect(mapStateToProps)(Leader)