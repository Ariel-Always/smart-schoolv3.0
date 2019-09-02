import React from 'react'
import { connect } from 'react-redux';
import { Alert, DetailsModal, DropDown, PagiNation, Search, Table, Button, CheckBox, CheckBoxGroup, Modal } from '../../../common/index'
//import '../../../common/scss/_left_menu.scss'
import { Link, } from 'react-router-dom';
import '../../scss/Admin.scss'
import { Tooltip, Input,Modal as AntdModal } from 'antd'
import TipsContact from './TipsContact'
import TipsPower from './TipsPower'
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
                    align: 'center',
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
                    title: '访问权限',
                    align: 'center',
                    dataIndex: 'Power',
                    key: 'Power',
                    render: Power => {
                        return (
                            <Tooltip placement='topLeft' width={540} trigger='click' arrowPointAtCenter={true} title={<TipsPower data={Power}></TipsPower>}>
                                <span className='Power' onClick={this.onPowerClick.bind(this, Power)}>查看</span>
                            </Tooltip>
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
                                <Button color='blue' type='default' onClick={this.onHandleClick.bind(this, key)} className='handle-btn'>编辑</Button>

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
            PowerList:[
                {
                    PowerName:'子系统管理',
                    value:'0',
                    PowerChild:[{
                        value:'0-0',
                        PowerChildName:'群文件夹管理'
                    },{
                        value:'0-1',
                        PowerChildName:'成绩总评管理'
                    },{
                        value:'0-2',
                        PowerChildName:'大数据认知评估管理'
                    },{
                        value:'0-3',
                        PowerChildName:'学科测试管理'
                    },]
                },{
                    PowerName:'信息发布',
                    value:'1',
                    PowerChild:[{
                        value:'1-0',
                        PowerChildName:'发布新闻资讯'
                    },{
                        value:'1-1',
                        PowerChildName:'发布通知'
                    },{
                        value:'1-2',
                        PowerChildName:'发布问卷调查'
                    }]
                },{
                    PowerName:'平台管理',
                    value:'2',
                    PowerChild:[{
                        value:'2-0',
                        PowerChildName:'用户档案管理'
                    },{
                        value:'2-1',
                        PowerChildName:'行政班管理'
                    },{
                        value:'2-2',
                        PowerChildName:'用户账号管理'
                    },{
                        value:'2-3',
                        PowerChildName:'学科管理'
                    },{
                        value:'2-4',
                        PowerChildName:'教学班管理'
                    },{
                        value:'2-5',
                        PowerChildName:'课程安排管理'
                    },{
                        value:'2-6',
                        PowerChildName:'系统管理'
                    },{
                        value:'2-7',
                        PowerChildName:'在线用户管理'
                    },{
                        value:'2-8',
                        PowerChildName:'网络访问统计'
                    },]
                },{
                    PowerName:'资源建设',
                    value:'3',
                    PowerChild:[{
                        value:'3-0',
                        PowerChildName:'网站资源管理'
                    },{
                        value:'3-1',
                        PowerChildName:'应用管理'
                    },{
                        value:'3-2',
                        PowerChildName:'资源库管理'
                    }]
                }
            ],
            AdminAccountData: [{
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
                }, Power: {
                    key: 0,
                    
                    Powers:[{
                        PowerName:'子系统管理',
                        value:'0',
                        PowerChild:[{
                            value:'0-0',
                            PowerChildName:'群文件夹管理'
                        },{
                            value:'0-1',
                            PowerChildName:'成绩总评管理'
                        },{
                            value:'0-2',
                            PowerChildName:'大数据认知评估管理'
                        },{
                            value:'0-3',
                            PowerChildName:'学科测试管理'
                        },]
                    },{
                        PowerName:'信息发布',
                        value:'1',
                        PowerChild:[{
                            value:'1-0',
                            PowerChildName:'发布新闻资讯'
                        },{
                            value:'1-1',
                            PowerChildName:'发布通知'
                        },{
                            value:'1-2',
                            PowerChildName:'发布问卷调查'
                        }]
                    },{
                        PowerName:'平台管理',
                        value:'2',
                        PowerChild:[{
                            value:'2-0',
                            PowerChildName:'用户档案管理'
                        },{
                            value:'2-1',
                            PowerChildName:'行政班管理'
                        },{
                            value:'2-2',
                            PowerChildName:'用户账号管理'
                        },{
                            value:'2-3',
                            PowerChildName:'学科管理'
                        },{
                            value:'2-4',
                            PowerChildName:'教学班管理'
                        },{
                            value:'2-5',
                            PowerChildName:'课程安排管理'
                        },{
                            value:'2-6',
                            PowerChildName:'系统管理'
                        },{
                            value:'2-7',
                            PowerChildName:'在线用户管理'
                        },{
                            value:'2-8',
                            PowerChildName:'网络访问统计'
                        },]
                    },{
                        PowerName:'资源建设',
                        value:'3',
                        PowerChild:[{
                            value:'3-0',
                            PowerChildName:'网站资源管理'
                        },{
                            value:'3-1',
                            PowerChildName:'应用管理'
                        },{
                            value:'3-2',
                            PowerChildName:'资源库管理'
                        }]
                    },]
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
                }, Power: {
                    key: 1,
                    Powers:[{
                        PowerName:'子系统管理',
                        value:'0',
                        PowerChild:[{
                            value:'0-0',
                            PowerChildName:'群文件夹管理'
                        },{
                            value:'0-1',
                            PowerChildName:'成绩总评管理'
                        },{
                            value:'0-2',
                            PowerChildName:'大数据认知评估管理'
                        },{
                            value:'0-3',
                            PowerChildName:'学科测试管理'
                        },]
                    },{
                        PowerName:'信息发布',
                        value:'1',
                        PowerChild:[{
                            value:'1-0',
                            PowerChildName:'发布新闻资讯'
                        },{
                            value:'1-1',
                            PowerChildName:'发布通知'
                        },{
                            value:'1-2',
                            PowerChildName:'发布问卷调查'
                        }]
                    },{
                        PowerName:'平台管理',
                        value:'2',
                        PowerChild:[{
                            value:'2-0',
                            PowerChildName:'用户档案管理'
                        },{
                            value:'2-1',
                            PowerChildName:'行政班管理'
                        },{
                            value:'2-2',
                            PowerChildName:'用户账号管理'
                        },{
                            value:'2-3',
                            PowerChildName:'学科管理'
                        },{
                            value:'2-4',
                            PowerChildName:'教学班管理'
                        },{
                            value:'2-5',
                            PowerChildName:'课程安排管理'
                        },{
                            value:'2-8',
                            PowerChildName:'网络访问统计'
                        },]
                    },{
                        PowerName:'资源建设',
                        value:'3',
                        PowerChild:[{
                            value:'3-0',
                            PowerChildName:'网站资源管理'
                        },{
                            value:'3-2',
                            PowerChildName:'资源库管理'
                        }]
                    },]
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
                }, Power: {
                    key: 2,
                    Powers:[{
                        PowerName:'子系统管理',
                        value:'0',
                        PowerChild:[{
                            value:'0-0',
                            PowerChildName:'群文件夹管理'
                        },{
                            value:'0-1',
                            PowerChildName:'成绩总评管理'
                        },{
                            value:'0-2',
                            PowerChildName:'大数据认知评估管理'
                        },{
                            value:'0-3',
                            PowerChildName:'学科测试管理'
                        },]
                    },{
                        PowerName:'信息发布',
                        value:'1',
                        PowerChild:[{
                            value:'1-0',
                            PowerChildName:'发布新闻资讯'
                        },{
                            value:'1-1',
                            PowerChildName:'发布通知'
                        },{
                            value:'1-2',
                            PowerChildName:'发布问卷调查'
                        }]
                    },{
                        PowerName:'平台管理',
                        value:'2',
                        PowerChild:[{
                            value:'2-4',
                            PowerChildName:'教学班管理'
                        },{
                            value:'2-5',
                            PowerChildName:'课程安排管理'
                        },{
                            value:'2-6',
                            PowerChildName:'系统管理'
                        },{
                            value:'2-7',
                            PowerChildName:'在线用户管理'
                        },{
                            value:'2-8',
                            PowerChildName:'网络访问统计'
                        },]
                    },{
                        PowerName:'资源建设',
                        value:'3',
                        PowerChild:[{
                            value:'3-0',
                            PowerChildName:'网站资源管理'
                        },{
                            value:'3-1',
                            PowerChildName:'应用管理'
                        },{
                            value:'3-2',
                            PowerChildName:'资源库管理'
                        }]
                    },]
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
                }, Power: {
                    key: 3,
                    Powers:[{
                        PowerName:'子系统管理',
                        value:'0',
                        PowerChild:[{
                            value:'0-0',
                            PowerChildName:'群文件夹管理'
                        },{
                            value:'0-1',
                            PowerChildName:'成绩总评管理'
                        },{
                            value:'0-2',
                            PowerChildName:'大数据认知评估管理'
                        },{
                            value:'0-3',
                            PowerChildName:'学科测试管理'
                        },]
                    },{
                        PowerName:'信息发布',
                        value:'1',
                        PowerChild:[{
                            value:'1-0',
                            PowerChildName:'发布新闻资讯'
                        },{
                            value:'1-1',
                            PowerChildName:'发布通知'
                        },{
                            value:'1-2',
                            PowerChildName:'发布问卷调查'
                        }]
                    },{
                        PowerName:'平台管理',
                        value:'2',
                        PowerChild:[{
                            value:'2-0',
                            PowerChildName:'用户档案管理'
                        },{
                            value:'2-1',
                            PowerChildName:'行政班管理'
                        },{
                            value:'2-2',
                            PowerChildName:'用户账号管理'
                        },{
                            value:'2-3',
                            PowerChildName:'学科管理'
                        },{
                            value:'2-4',
                            PowerChildName:'教学班管理'
                        },{
                            value:'2-5',
                            PowerChildName:'课程安排管理'
                        },{
                            value:'2-6',
                            PowerChildName:'系统管理'
                        },{
                            value:'2-7',
                            PowerChildName:'在线用户管理'
                        },{
                            value:'2-8',
                            PowerChildName:'网络访问统计'
                        },]
                    },{
                        PowerName:'资源建设',
                        value:'3',
                        PowerChild:[{
                            value:'3-0',
                            PowerChildName:'网站资源管理'
                        },{
                            value:'3-1',
                            PowerChildName:'应用管理'
                        },{
                            value:'3-2',
                            PowerChildName:'资源库管理'
                        }]
                    },]
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
                }, Power: {
                    key: 4,
                    Powers:[{
                        PowerName:'子系统管理',
                        value:'0',
                        PowerChild:[{
                            value:'0-0',
                            PowerChildName:'群文件夹管理'
                        },{
                            value:'0-1',
                            PowerChildName:'成绩总评管理'
                        },{
                            value:'0-2',
                            PowerChildName:'大数据认知评估管理'
                        },{
                            value:'0-3',
                            PowerChildName:'学科测试管理'
                        },]
                    },{
                        PowerName:'信息发布',
                        value:'1',
                        PowerChild:[{
                            value:'1-0',
                            PowerChildName:'发布新闻资讯'
                        },{
                            value:'1-1',
                            PowerChildName:'发布通知'
                        },{
                            value:'1-2',
                            PowerChildName:'发布问卷调查'
                        }]
                    },{
                        PowerName:'平台管理',
                        value:'2',
                        PowerChild:[{
                            value:'2-0',
                            PowerChildName:'用户档案管理'
                        },{
                            value:'2-1',
                            PowerChildName:'行政班管理'
                        },{
                            value:'2-2',
                            PowerChildName:'用户账号管理'
                        },{
                            value:'2-3',
                            PowerChildName:'学科管理'
                        },{
                            value:'2-4',
                            PowerChildName:'教学班管理'
                        },{
                            value:'2-5',
                            PowerChildName:'课程安排管理'
                        },{
                            value:'2-6',
                            PowerChildName:'系统管理'
                        },{
                            value:'2-7',
                            PowerChildName:'在线用户管理'
                        },{
                            value:'2-8',
                            PowerChildName:'网络访问统计'
                        },]
                    },{
                        PowerName:'资源建设',
                        value:'3',
                        PowerChild:[{
                            value:'3-0',
                            PowerChildName:'网站资源管理'
                        },{
                            value:'3-1',
                            PowerChildName:'应用管理'
                        },{
                            value:'3-2',
                            PowerChildName:'资源库管理'
                        }]
                    },]
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
                }, Power: {
                    key: 5,
                    Powers:[{
                        PowerName:'子系统管理',
                        value:'0',
                        PowerChild:[{
                            value:'0-0',
                            PowerChildName:'群文件夹管理'
                        },{
                            value:'0-1',
                            PowerChildName:'成绩总评管理'
                        },{
                            value:'0-2',
                            PowerChildName:'大数据认知评估管理'
                        },{
                            value:'0-3',
                            PowerChildName:'学科测试管理'
                        },]
                    },{
                        PowerName:'信息发布',
                        value:'1',
                        PowerChild:[{
                            value:'1-0',
                            PowerChildName:'发布新闻资讯'
                        },{
                            value:'1-1',
                            PowerChildName:'发布通知'
                        },{
                            value:'1-2',
                            PowerChildName:'发布问卷调查'
                        }]
                    },{
                        PowerName:'平台管理',
                        value:'2',
                        PowerChild:[{
                            value:'2-0',
                            PowerChildName:'用户档案管理'
                        },{
                            value:'2-1',
                            PowerChildName:'行政班管理'
                        },{
                            value:'2-2',
                            PowerChildName:'用户账号管理'
                        },{
                            value:'2-3',
                            PowerChildName:'学科管理'
                        },{
                            value:'2-4',
                            PowerChildName:'教学班管理'
                        },{
                            value:'2-5',
                            PowerChildName:'课程安排管理'
                        },{
                            value:'2-6',
                            PowerChildName:'系统管理'
                        },{
                            value:'2-7',
                            PowerChildName:'在线用户管理'
                        },{
                            value:'2-8',
                            PowerChildName:'网络访问统计'
                        },]
                    },{
                        PowerName:'资源建设',
                        value:'3',
                        PowerChild:[{
                            value:'3-0',
                            PowerChildName:'网站资源管理'
                        },{
                            value:'3-1',
                            PowerChildName:'应用管理'
                        },{
                            value:'3-2',
                            PowerChildName:'资源库管理'
                        }]
                    },]
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
                }, Power: {
                    key: 6,
                    Powers:[{
                        PowerName:'子系统管理',
                        value:'0',
                        PowerChild:[{
                            value:'0-0',
                            PowerChildName:'群文件夹管理'
                        },{
                            value:'0-1',
                            PowerChildName:'成绩总评管理'
                        },{
                            value:'0-2',
                            PowerChildName:'大数据认知评估管理'
                        },{
                            value:'0-3',
                            PowerChildName:'学科测试管理'
                        },]
                    },{
                        PowerName:'信息发布',
                        value:'1',
                        PowerChild:[{
                            value:'1-0',
                            PowerChildName:'发布新闻资讯'
                        },{
                            value:'1-1',
                            PowerChildName:'发布通知'
                        },{
                            value:'1-2',
                            PowerChildName:'发布问卷调查'
                        }]
                    },{
                        PowerName:'平台管理',
                        value:'2',
                        PowerChild:[{
                            value:'2-0',
                            PowerChildName:'用户档案管理'
                        },{
                            value:'2-1',
                            PowerChildName:'行政班管理'
                        },{
                            value:'2-2',
                            PowerChildName:'用户账号管理'
                        },{
                            value:'2-3',
                            PowerChildName:'学科管理'
                        },{
                            value:'2-4',
                            PowerChildName:'教学班管理'
                        },{
                            value:'2-5',
                            PowerChildName:'课程安排管理'
                        },{
                            value:'2-6',
                            PowerChildName:'系统管理'
                        },{
                            value:'2-7',
                            PowerChildName:'在线用户管理'
                        },{
                            value:'2-8',
                            PowerChildName:'网络访问统计'
                        },]
                    },{
                        PowerName:'资源建设',
                        value:'3',
                        PowerChild:[{
                            value:'3-0',
                            PowerChildName:'网站资源管理'
                        },{
                            value:'3-1',
                            PowerChildName:'应用管理'
                        },{
                            value:'3-2',
                            PowerChildName:'资源库管理'
                        }]
                    },]
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
                }, Power: {
                    key: 7,
                    Powers:[{
                        PowerName:'子系统管理',
                        value:'0',
                        PowerChild:[{
                            value:'0-0',
                            PowerChildName:'群文件夹管理'
                        },{
                            value:'0-1',
                            PowerChildName:'成绩总评管理'
                        },{
                            value:'0-2',
                            PowerChildName:'大数据认知评估管理'
                        },{
                            value:'0-3',
                            PowerChildName:'学科测试管理'
                        },]
                    },{
                        PowerName:'信息发布',
                        value:'1',
                        PowerChild:[{
                            value:'1-0',
                            PowerChildName:'发布新闻资讯'
                        },{
                            value:'1-1',
                            PowerChildName:'发布通知'
                        },{
                            value:'1-2',
                            PowerChildName:'发布问卷调查'
                        }]
                    },{
                        PowerName:'平台管理',
                        value:'2',
                        PowerChild:[{
                            value:'2-0',
                            PowerChildName:'用户档案管理'
                        },{
                            value:'2-1',
                            PowerChildName:'行政班管理'
                        },{
                            value:'2-2',
                            PowerChildName:'用户账号管理'
                        },{
                            value:'2-3',
                            PowerChildName:'学科管理'
                        },{
                            value:'2-4',
                            PowerChildName:'教学班管理'
                        },{
                            value:'2-5',
                            PowerChildName:'课程安排管理'
                        },{
                            value:'2-6',
                            PowerChildName:'系统管理'
                        },{
                            value:'2-7',
                            PowerChildName:'在线用户管理'
                        },{
                            value:'2-8',
                            PowerChildName:'网络访问统计'
                        },]
                    },{
                        PowerName:'资源建设',
                        value:'3',
                        PowerChild:[{
                            value:'3-0',
                            PowerChildName:'网站资源管理'
                        },{
                            value:'3-1',
                            PowerChildName:'应用管理'
                        },{
                            value:'3-2',
                            PowerChildName:'资源库管理'
                        }]
                    },]
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
                }, Power: {
                    key: 8,
                    Powers:[{
                        PowerName:'子系统管理',
                        value:'0',
                        PowerChild:[{
                            value:'0-0',
                            PowerChildName:'群文件夹管理'
                        },{
                            value:'0-1',
                            PowerChildName:'成绩总评管理'
                        },{
                            value:'0-2',
                            PowerChildName:'大数据认知评估管理'
                        },{
                            value:'0-3',
                            PowerChildName:'学科测试管理'
                        },]
                    },{
                        PowerName:'信息发布',
                        value:'1',
                        PowerChild:[{
                            value:'1-0',
                            PowerChildName:'发布新闻资讯'
                        },{
                            value:'1-1',
                            PowerChildName:'发布通知'
                        },{
                            value:'1-2',
                            PowerChildName:'发布问卷调查'
                        }]
                    },{
                        PowerName:'平台管理',
                        value:'2',
                        PowerChild:[{
                            value:'2-0',
                            PowerChildName:'用户档案管理'
                        },{
                            value:'2-1',
                            PowerChildName:'行政班管理'
                        },{
                            value:'2-2',
                            PowerChildName:'用户账号管理'
                        },{
                            value:'2-3',
                            PowerChildName:'学科管理'
                        },{
                            value:'2-4',
                            PowerChildName:'教学班管理'
                        },{
                            value:'2-5',
                            PowerChildName:'课程安排管理'
                        },{
                            value:'2-6',
                            PowerChildName:'系统管理'
                        },{
                            value:'2-7',
                            PowerChildName:'在线用户管理'
                        },{
                            value:'2-8',
                            PowerChildName:'网络访问统计'
                        },]
                    },{
                        PowerName:'资源建设',
                        value:'3',
                        PowerChild:[{
                            value:'3-0',
                            PowerChildName:'网站资源管理'
                        },{
                            value:'3-1',
                            PowerChildName:'应用管理'
                        },{
                            value:'3-2',
                            PowerChildName:'资源库管理'
                        }]
                    },]
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
                }, Power: {
                    key: 9,
                    Powers:[{
                        PowerName:'子系统管理',
                        value:'0',
                        PowerChild:[{
                            value:'0-0',
                            PowerChildName:'群文件夹管理'
                        },{
                            value:'0-1',
                            PowerChildName:'成绩总评管理'
                        },{
                            value:'0-2',
                            PowerChildName:'大数据认知评估管理'
                        },{
                            value:'0-3',
                            PowerChildName:'学科测试管理'
                        },]
                    },{
                        PowerName:'信息发布',
                        value:'1',
                        PowerChild:[{
                            value:'1-0',
                            PowerChildName:'发布新闻资讯'
                        },{
                            value:'1-1',
                            PowerChildName:'发布通知'
                        },{
                            value:'1-2',
                            PowerChildName:'发布问卷调查'
                        }]
                    },{
                        PowerName:'平台管理',
                        value:'2',
                        PowerChild:[{
                            value:'2-0',
                            PowerChildName:'用户档案管理'
                        },{
                            value:'2-1',
                            PowerChildName:'行政班管理'
                        },{
                            value:'2-2',
                            PowerChildName:'用户账号管理'
                        },{
                            value:'2-3',
                            PowerChildName:'学科管理'
                        },{
                            value:'2-4',
                            PowerChildName:'教学班管理'
                        },{
                            value:'2-5',
                            PowerChildName:'课程安排管理'
                        },{
                            value:'2-6',
                            PowerChildName:'系统管理'
                        },{
                            value:'2-7',
                            PowerChildName:'在线用户管理'
                        },{
                            value:'2-8',
                            PowerChildName:'网络访问统计'
                        },]
                    },{
                        PowerName:'资源建设',
                        value:'3',
                        PowerChild:[{
                            value:'3-0',
                            PowerChildName:'网站资源管理'
                        },{
                            value:'3-1',
                            PowerChildName:'应用管理'
                        },{
                            value:'3-2',
                            PowerChildName:'资源库管理'
                        }]
                    },]
                }
            }],
            pagination: { total: 50 },
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
            destroyOnCloce:true,
            changeAdminModalVisible:false


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


    AdminDropMenu = (e) => {
        const { dispatch } = this.props;
        dispatch(actions.UpDataState.getSubjectAdminPreview('/ArchivesAdmin?SchoolID=schoolID&GradeID=gradeID&ClassID=ClassID&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC'));
    }



    AdminSearch = (e) => {
        console.log(e)
    }

    onSelectChange = (e) => {
        console.log(e)
        //this.setState({ selectedRowKeys });
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
                ok: this.onAlertQueryOk.bind(this, 888888),
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
        console.log(this.state.AdminAccountData[key])
        this.setState({
            AdminChangeKey:key,
            changeAdminModalVisible:true,
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
            AdminDetailsMsgModalVisible: true,
            userMsgKey: key
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
        console.log(e)
        this.setState({
            addAdminModalVisible: false
        })
       
    }
    handleAddAdminModalCancel = (e) => {
        console.log(e)
        this.setState({
            addAdminModalVisible: false
        })
        
    }
    handleChangeAdminModalOk = (e) => {
        console.log(e)
        this.setState({
            changeAdminModalVisible: false
        })
        
    }
    handleChangeAdminModalCancel = (e) => {
        console.log(e)
        this.setState({
            changeAdminModalVisible: false
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


    onPowerClick = (Power) => {
        console.log(Power)
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
            <div className='Admin'>
                <div className='Admin-box'>
                    <div className='Admin-top'>
                        <span className='top-tips'>
                            <span className='tips menu33 '>管理员账号管理</span>
                        </span>
                        <div className='top-nav'>

                            <span className='divide'>|</span>
                            <span className='link' style={{ cursor: 'pointer' }} onClick={this.onAddAdmin}>添加管理员</span>

                        </div>
                    </div>
                    <hr className='Admin-hr' />
                    <div className='Admin-content'>
                        <div className='content-top'>
                            <Search placeHolder='请输入关键字搜索...'
                                onClickSearch={this.AdminSearch}
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
                                        dataSource={this.state.AdminAccountData} >

                                    </Table>
                                </CheckBoxGroup>
                                <CheckBox className='checkAll-box' onChange={this.OnCheckAllChange} checked={this.state.checkAll}>
                                    全选
                                    <Button onClick={this.onDeleteAllClick} className='deleteAll' color='red'>删除</Button>
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
                    title={this.state.userKey==='add'?'添加学生':'编辑学生'}
                    visible={this.state.addAdminModalVisible}
                    onOk={this.handleAddAdminModalOk}
                    onCancel={this.handleAddAdminModalCancel}
                    
                >
                    <EditModal type='Admin' userKey={this.state.userKey} data = {this.state.AdminAccountData[this.state.AdminChangeKey]} PowerList = {this.state.PowerList}></EditModal>
                </Modal>
                <Modal
                    ref='handleAdminMadal'
                    bodyStyle={{ padding: 0 }}
                    type='1'
                    title={this.state.userKey==='add'?'添加学生':'编辑学生'}
                    visible={this.state.changeAdminModalVisible}
                    onOk={this.handleChangeAdminModalOk}
                    onCancel={this.handleChangeAdminModalCancel}
                    
                >
                    <EditModal type='Admin' userKey={this.state.userKey} data = {this.state.AdminAccountData[this.state.AdminChangeKey]} PowerList = {this.state.PowerList}></EditModal>
                </Modal>
                <DetailsModal
                    ref='AdminDetailsMsgModal'
                    visible={this.state.AdminDetailsMsgModalVisible}
                    onOk={this.AdminDetailsMsgModalOk}
                    onCancel={this.AdminDetailsMsgModalCancel}
                    data={data}
                    type='Admin'
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
                    abstract={<div className='alert-pwd'><span className='alert-pwd-tips'>新密码：</span><Input size='small' onChange={this.onPwdchange.bind(this)} style={{ width: 120 + 'px' }} value={this.state.defaultPwd}></Input></div>}
                    title={<p className='alert-Title'>确定重置<span className='alert-Title-name'>{this.state.AdminAccountData[this.state.onClickKey].Name.Name}</span><span className='alert-Title-id'>({this.state.AdminAccountData[this.state.onClickKey].Name.UserID})</span> 的密码？</p>}
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