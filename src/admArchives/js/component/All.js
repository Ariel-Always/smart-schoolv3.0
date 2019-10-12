import React from 'react'
import { connect } from 'react-redux';
import '../../scss/All.scss'
import PropTypes from 'prop-types';
import '../../../common/scss/_left_menu.scss'
import history from '../containers/history'
import echarts from 'echarts';
import actions from '../actions';

class All extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UIState: props.UIState,
            DataState: props.DataState,
            refresh: true,
            userMsg:props.DataState.LoginUser

        }

    }
    componentDidMount() {

    }
    componentWillUpdate() {

    }
    componentWillReceiveProps(nextProps) {
        const { DataState, UIState,dispatch } = nextProps;
        let userMsg = DataState.LoginUser;
        let userData = DataState.AllUserPreview;
        if (JSON.stringify(userData) !== '{}')
            if (userData && this.state.refresh) {
                this.setState({
                    refresh: false
                })
                // 基于准备好的dom，初始化echarts实例
                let Chart_user = echarts.init(document.getElementById('all-user-content'));
                // 绘制图表
                Chart_user.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    color: ['#7c7cfc', '#ffa800', '#90b915', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
                    legend: {
                        orient: 'vertical',
                        tooltip: {
                            show: true
                        },
                        left: 408,
                        top: 115,
                        itemWidth: 18,
                        itemHeight: 12,
                        data: [
                            // '学生人数',
                            // '教师人数',
                            // '领导人数'
                            // {
                            //     name: '学生人数',
                            //     textStyle: {
                            //         color: '#666666'
                            //     },

                            // },
                            // {
                            //     name: '教师人数',
                            //     textStyle: {
                            //         color: '#666666'
                            //     },
                            //     },
                            // {
                            //     name: '领导人数',
                            //     textStyle: {
                            //         color: '#666666'
                            //     },
                            // }
                        ]

                    },
                    // pie:{
                    //     center: ['40%', '50%'],
                    // },
                    series: [
                        {
                            name: '用户档案总览',
                            type: 'pie',
                            radius: ['20%', '66%'],
                            avoidLabelOverlap: false,
                            center: ['276', '50%'],
                            label: {
                                normal: {
                                    show: false,
                                    position: 'left'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '16',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                { value: userData.Student, name: '学生人数' },
                                { value: userData.Teacher, name: '教师人数' },
                                // { value: userData.Leader, name: '领导人数' },

                            ]
                        }
                    ]
                });

                // 基于准备好的dom，初始化echarts实例
                let Chart_student = echarts.init(document.getElementById('all-student-content'));
                // 绘制图表
                Chart_student.setOption({
                    color: '#7c7cfc',
                    title: {

                    },
                    xAxis: {
                        type: 'category',
                        data: userData.GradeNames,
                        name: '年级'
                    },
                    yAxis: {
                        type: 'value',
                        name: '学生人数(单位:人数)'
                    },
                    series: [{
                        data: userData.GradeStudent,
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: { color: '#333333' }

                            }
                        },
                        formatter: function (params) {
                            console.log(params)
                        }
                    }],
                    barMinHeight: 0,          // 最小高度改为0
                    // barWidth: null,        // 默认自适应
                    barGap: '30%',            // 柱间距离，默认为柱形宽度的30%，可设固定值
                    barCategoryGap: '50%',   // 类目间柱形距离，默认为类目间距的20%，可设固定值
                    itemStyle: {
                        normal: {
                            // color: '各异',

                            barBorderColor: '#7c7cfc',       // 柱条边线
                            barBorderRadius: 5,           // 柱条边线圆角，单位px，默认为0
                            barBorderWidth: 1,            // 柱条边线线宽，单位px，默认为1
                            label: {
                                show: false
                                // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
                                //           'inside'|'left'|'right'|'top'|'bottom'
                                // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                            }
                        },
                        emphasis: {
                            // color: '各异',
                            barBorderColor: 'rgba(0,0,0,0)',   // 柱条边线
                            barBorderRadius: 5,                // 柱条边线圆角，单位px，默认为0
                            barBorderWidth: 1,                 // 柱条边线线宽，单位px，默认为1
                            label: {
                                show: false
                                // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
                                //           'inside'|'left'|'right'|'top'|'bottom'
                                // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                            }
                        }
                    }
                });

                Chart_student.on('click', function (params) {
                    let grade = DataState.AllUserPreview.NewGrades[params.name];
                    history.push('/UserArchives/Student/'+grade.GradeID)
                    dispatch(actions.UpDataState.getGradeStudentPreview('/GetStudentToPage?SchoolID='+userMsg.SchoolID+'&GradeID='+grade.GradeID +'&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC',{value:grade.GradeID,title:grade.GradeName}));

                   
                })
                // 基于准备好的dom，初始化echarts实例
                let Chart_teacher = echarts.init(document.getElementById('all-teacher-content'));
                // 绘制图表
                Chart_teacher.setOption({
                    color: '#ffa800',
                    title: {

                    },
                    xAxis: {
                        type: 'category',
                        data: userData.SubjectNames,
                        name: '学科'
                    },
                    yAxis: {
                        type: 'value',
                        name: '教师人数(单位:人数)'
                    },
                    series: [{
                        data: userData.SubjectTeacher,
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: { color: '#333333' }

                            }
                        }
                    }],
                    barMinHeight: 0,          // 最小高度改为0
                    // barWidth: null,        // 默认自适应
                    barGap: '30%',            // 柱间距离，默认为柱形宽度的30%，可设固定值
                    barCategoryGap: '50%',   // 类目间柱形距离，默认为类目间距的20%，可设固定值
                    itemStyle: {
                        normal: {
                            // color: '各异',

                            barBorderColor: '#ffa800',       // 柱条边线
                            barBorderRadius: 5,           // 柱条边线圆角，单位px，默认为0
                            barBorderWidth: 1,            // 柱条边线线宽，单位px，默认为1
                            label: {
                                show: false
                                // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
                                //           'inside'|'left'|'right'|'top'|'bottom'
                                // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                            }
                        },
                        emphasis: {
                            // color: '各异',
                            barBorderColor: 'rgba(0,0,0,0)',   // 柱条边线
                            barBorderRadius: 5,                // 柱条边线圆角，单位px，默认为0
                            barBorderWidth: 1,                 // 柱条边线线宽，单位px，默认为1
                            label: {
                                show: false
                                // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
                                //           'inside'|'left'|'right'|'top'|'bottom'
                                // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                            }
                        }
                    }
                });
                Chart_teacher.on('click', function (params) {
                    let subject = DataState.AllUserPreview.NewSubjects[params.name];
                    history.push('/UserArchives/Teacher/'+subject.SubjectID)
                    dispatch(actions.UpDataState.getSubjectTeacherPreview('/GetTeacherToPage?SchoolID='+userMsg.SchoolID+'&SubjectIDs='+subject.SubjectID +'&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC',{value:subject.SubjectID,title:subject.SubjectName}));
                   
                })
            }
    }


    render() {
        const { UIState, DataState } = this.props;
        console.log(DataState)
        return (
            <div className='All'>
                <div className='All-box All-user'>
                    <p className='All-tips'>
                        <span className='tips menu10 '>用户档案总览</span>
                    </p>
                    <hr className='All-hr' />
                    <div className='All-content user-content'>
                        <div id='all-user-content'></div>
                        <div className='echarts-tips'>
                            <p className='tips-1'>{'总人数：' + DataState.AllUserPreview.Total}</p>
                            <p className='tips-2'><span className='tips-icon-1'></span>{'学生人数：' + DataState.AllUserPreview.Student}</p>
                            <p className='tips-2'><span className='tips-icon-2'></span>{'教师人数：' + DataState.AllUserPreview.Teacher}</p>
                            {/* <p className='tips-2'><span className='tips-icon-3'></span>{'领导人数：'+ DataState.AllUserPreview.Leader}</p> */}
                        </div>
                    </div>
                </div>
                <div className='All-box All-student'>
                    <p className='All-tips'>
                        <span className='tips menu10 '>各年级学生人数</span>
                    </p>
                    <hr className='All-hr' />
                    <div id='all-student-content' className='All-content student-content'>

                    </div>
                </div>
                <div className='All-box All-teacher'>
                    <p className='All-tips'>
                        <span className='tips menu10 '>各学科教师人数</span>
                    </p>
                    <hr className='All-hr' />
                    <div id='all-teacher-content' className='All-content teacher-content'>

                    </div>
                </div>
            </div>
        )
    }
}

All.propTypes = {
    res: PropTypes.object
}

const mapStateToProps = (state) => {
    let { UIState, DataState } = state;
    return {
        UIState,
        DataState
    }
};
export default connect(mapStateToProps)(All)