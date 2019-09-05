import '../../scss/Subject.scss'
import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions';
import { postData, getData } from '../../../common/js/fetch'
import CONFIG from '../../../common/js/config';
import ChangeSubject from './ChangeSubject.js'
import { Search, DropDown, Button, Table, DetailsModal, PagiNation ,Modal} from '../../../common'
class Subject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: '学科名称',
                    align: 'left',
                    key: 'SubjectName',
                    dataIndex: 'SubjectName',
                    render: arr => {
                        return (
                            <div className='SubjectName-content'>
                                <img className='SubjectName-img' alt={arr.SubjectName} src={arr.SubjectImg} width={80} height={50} />
                                <span className='SubjectName-name'>{arr.SubjectName}</span>
                            </div>
                        )
                    }

                },
                {
                    title: '开课年级',
                    align: 'left',
                    dataIndex: 'Grades',
                    key: 'Grades',
                    render: Grades => {
                        return (
                            <React.Fragment>
                                <span style={{ display: Grades.P1Grades ? 'block' : 'none' }} className='Grades P1Grades'><span className='grades-tips'>小学：</span>{Grades.P1Grades}</span>
                                <span style={{ display: Grades.P2Grades ? 'block' : 'none' }} className='Grades P2Grades'><span className='grades-tips'>初中：</span>{Grades.P2Grades}</span>
                                <span style={{ display: Grades.P3Grades ? 'block' : 'none' }} className='Grades P3Grades'><span className='grades-tips'>高中：</span>{Grades.P3Grades}</span>
                            </React.Fragment>
                        )
                    }
                },
                {
                    title: '教研组长',
                    align: 'left',
                    dataIndex: 'Teacher',
                    key: 'Teacher',
                    render: Teacher => {
                        return (
                            Teacher.map((child, index) => {
                                let GradeName = ''
                                if (child.Grade === 'P1') {
                                    GradeName = '小学';
                                } else if (child.Grade === 'P2') {
                                    GradeName = '初中';
                                } else if (child.Grade === 'P3') {
                                    GradeName = '高中';
                                }

                                return (
                                    <React.Fragment key={child.TeacherName ? child.TeacherName : '未填写'}>
                                        <span className='Teacher' title={child.TeacherName}><span className='Teacher-tips'>{GradeName + '：'}</span><span onClick={child.TeacherName ? this.onClickTeacherName.bind(this, child.TeacherID) : this.onClickTeacherNameNo} className={child.TeacherName ? 'handleName' : 'noHandle'} >{child.TeacherName ? child.TeacherName : '未填写'}</span></span><br />
                                    </React.Fragment>
                                )
                            })

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
                                <Button color='blue' type='default' onClick={this.onHandleClick.bind(this, key)} className='handle-btn'>编辑</Button>
                                <Button color='blue' type='default' onClick={this.onHandleClick} className='handle-btn'>设置教研组长</Button>
                                <Button color='blue' type='default' onClick={this.onDeleteSubjectClick.bind(this, key)} className='handle-btn'>删除</Button>

                            </div>
                        )
                    }
                }
            ],
        }
    }
    // 钩子
    componentWillMount() {

    }
    componentWillReceiveProps() {

    }


    //事件
    onHandleClick = (key) => {
        const {dispatch,DataState} = this.props;
        dispatch(actions.UpDataState.changeSubjectModalMsg(DataState.SubjectMsg.oldData.SubjectItem[key]))
        dispatch(actions.UpUIState.changeSubjectModalOpen())
    }

    onClickTeacherName = (id) => {
        const { dispatch } = this.props;
        dispatch(actions.UpDataState.getTeacherMsg('/GetUserDetail?userID=' + id));
    }
    onClickTeacherNameNo = () => {

    }
    //操作分页
    onPagiNationChange = (value) => {
        const { dispatch } = this.props;
        dispatch(actions.UpDataState.getSubjectMsg('/AdmSubject?schoolID=schoolID&periodID=periodID&pageSize=8&pageIndex=' + value));
    }

    // 关闭信息弹窗
    SubjectDetailsMsgModalCancel = () => {
        const { dispatch } = this.props;
        dispatch({ type: actions.UpUIState.SUBJECT_DETAILS_MODAL_CLOSE });
    }
    //操作下拉菜单，选择学段
    AdmDropMenu = (value) => {
        const { dispatch } = this.props;
        let periodID = null;
        if (value.value !== 0) {
            periodID = 'p' + value.value
        }
        dispatch(actions.UpDataState.getSubjectMsg('/AdmSubject?schoolID=schoolID&periodID=p' + periodID + '&pageSize=8&pageIndex=1'));
    }

    //删除
    onDeleteSubjectClick = (key) => {
        const { dispatch } = this.props;
        console.log(key)
        dispatch(actions.UpUIState.showErrorAlert({
            type: 'btn-warn',
            title: "你确定删除吗？",
            ok: this.onAlertWarnOk.bind(this,key),
            cancel: this.onAlertWarnClose.bind(this),
            close: this.onAlertWarnClose.bind(this)
        }));
    }

    //删除按钮
    onAlertWarnClose = () => {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }


    onAlertWarnOk = (key) => {
        const { dispatch ,DataState, UIState} = this.props;
        let url = '/DeleteSubject';
        let userMsg = DataState.LoginUser;
        console.log(userMsg)
        dispatch(actions.UpUIState.hideErrorAlert());
        postData(CONFIG.proxy + url, {
            schoolID: 'schoolID',
            subjectID: DataState.SubjectMsg.SubjectItem[key].SubjectName.SubjectID,
            userID: userMsg.UserID,
            userType: userMsg.UserType
        }).then(res=>{
            return res.json()}).then(json=>{
            if(json.Status === 400){
                console.log('错误码：'+json.Status)
            }else if(json.Status === 200){
                dispatch(actions.UpUIState.showErrorAlert({
                    type: 'success',
                    title: "成功",
                    onHide: this.onAlertWarnHide.bind(this)
                }));
            }
        })
        
    }

    onAlertWarnHide = () => {
        const {dispatch} = this.props;
        dispatch(actions.UpUIState.hideErrorAlert())

    }
    //编辑
    changeSubjectModalOk = () => {
        dispatch(actions.UpUIState.changeSubjectModalClose())
    }
    changeSubjectModalCancel = () => {
        dispatch(actions.UpUIState.changeSubjectModalClose())
    }
    render() {
        const { DataState, UIState } = this.props;

        return (
            <React.Fragment>
                <div className='Adm '>
                    <div className='Adm-box'>
                        <div className='Adm-top'>
                            <span className='top-tips'>
                                <span className='tips tips-location'>学科管理</span>
                            </span>
                            <Button className='top-btn' color='blue' shape='round'>+添加学科</Button>
                        </div>
                        <hr className='Adm-hr' />
                        <div className='Adm-content'>
                            <div className='content-top'>
                                <DropDown
                                    ref='dropMenuFirst'
                                    onChange={this.AdmDropMenu.bind(this)}
                                    width={120}
                                    height={96}
                                    dropSelectd={{ value: 0, title: '全部学段' }}
                                    dropList={DataState.PeriodMsg ? DataState.PeriodMsg.value : [{ value: 0, title: '全部学段' }]}
                                ></DropDown>

                            </div>
                            <div className='content-render'>
                                <Table
                                    className='table'
                                    loading={UIState.SubjectTableLoading.TableLoading}
                                    columns={this.state.columns}
                                    pagination={false}
                                    dataSource={DataState.SubjectMsg ? DataState.SubjectMsg.SubjectItem : []}
                                ></Table>
                                <PagiNation
                                    showQuickJumper
                                    defaultCurrent={DataState.SubjectMsg ? DataState.SubjectMsg.PageIndex : 1}
                                    defaultPageSize={8}

                                    total={DataState.SubjectMsg ? DataState.SubjectMsg.Total : 0}
                                    onChange={this.onPagiNationChange.bind(this)}

                                ></PagiNation>
                            </div>
                        </div>
                    </div>
                </div>
                <DetailsModal
                    ref='SubjectDetailsMsgModal'
                    visible={UIState.SubjectDetailsMsgModalShow.Show}
                    onOk={this.SubjectDetailsMsgModalOk}
                    onCancel={this.SubjectDetailsMsgModalCancel}
                    data={DataState.TeacherMsg ? DataState.TeacherMsg.data : {}}
                    type='Teacher'
                >

                </DetailsModal>
                <Modal
                    ref='handleTeacherMadal'
                    bodyStyle={{ padding: 0 }}
                    type='1'
                    title={'编辑学科'}
                    visible={UIState.ChangeSubjectModal.ModalShow}
                    onOk={this.changeSubjectModalOk}
                    onCancel={this.changeSubjectModalCancel}
                >
                    <ChangeSubject type='change'></ChangeSubject>
                </Modal>
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
export default connect(mapStateToProps)(Subject)