import moduleName from '../../scss/Subject.scss'
import React from 'react';
import { connect } from 'react-redux';
import { Search, DropDown, Button, Table } from '../../../common'
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
                                    <span className='Teacher' title={Teacher}><span className='Teacher-tips'>{GradeName + '：'}</span><span style={{color: child.TeacherName?'#00b6fa':'#999999'}}>{child.TeacherName?child.TeacherName:'未填写'}</span></span>
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
                                <Button color='blue' type='default' onClick={this.onHandleClick} className='handle-btn'>删除</Button>

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
    onHandleClick = () => {

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
                                    onChange={this.AdmDropMenu}
                                    width={120}
                                    height={96}
                                    dropSelectd={{ value: 0, title: '全部学段' }}
                                    dropList={DataState.PeriodMsg ? DataState.PeriodMsg.value : [{ value: 0, title: '全部学段' }]}
                                ></DropDown>

                            </div>
                            <div className='content-render'>
                                <Table
                                    columns={this.state.columns}
                                    dataSource={DataState.SubjectMsg ? DataState.SubjectMsg.SubjectItem : []}
                                ></Table>
                            </div>
                        </div>
                    </div>
                </div>
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