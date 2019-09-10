import React,{Component} from 'react';

import { Loading,DropDown,Radio } from "../../../../common";

import { DatePicker,ConfigProvider } from 'antd';

import { connect } from 'react-redux';

import ABTActions from '../../actions/Manager/AdjustByTeacherActions';

import zhCN from 'antd/es/locale/zh_CN';

import moment from 'moment';

import 'moment/locale/zh-cn';

moment.locale('zh-cn');

class ReplaceSchedule extends Component{

    constructor(props) {

        super(props);

        const { dispatch } = props;

        dispatch({type:ABTActions.REPLACE_SHCEDULE_LOADING_SHOW});

        dispatch(ABTActions.replaceScheduleInit());

    }

    //教师选择
    teacherDropChange(info){

        const { dispatch } = this.props;

        dispatch(ABTActions.teacherDropChange(info));

    }
    //教师点击搜索
    teacherClickSearch(e){

        const key = e.value;

        const { dispatch } = this.props;

        dispatch(ABTActions.teacherClickSearch(key));

    }
    //教师取消搜索
    teacherSearchClose(){

        const  { dispatch } = this.props;

        dispatch(ABTActions.teacherSearchClose())

    }



    //教师选择
    replaceTeacherDropChange(info){

        const { dispatch } = this.props;

        console.log(info);

        dispatch(ABTActions.replaceTeacherDropChange(info));

    }
    //教师点击搜索
    replaceTeacherClickSearch(e){

        const key = e.value;

        const { dispatch } = this.props;

        dispatch(ABTActions.replaceTeacherClickSearch(key));

    }
    //教师取消搜索
    replaceTeacherSearchClose(){

        const  { dispatch } = this.props;

        dispatch(ABTActions.replaceTeacherSearchClose())

    }

    //点击班级

    classChecked(id){

        const { dispatch } = this.props;

        dispatch(ABTActions.classChecked(id));

    }


    //radio变化
    radioChange(id){

        const { dispatch } = this.props;

        dispatch(ABTActions.radioChange(id));

    }

    //月份改变
    monthChecked(id){

        const { dispatch } = this.props;

        dispatch(ABTActions.monthChecked(id));

    }
    //选取周次
    weekChecked(id){

        const { dispatch } = this.props;

        dispatch(ABTActions.weekChecked(id));

    }







    render() {

        const { replaceSchedule } = this.props;

        const {

            loadingShow,

            teacherOptions,

            teacherSubject,

            classList,

            replaceTeacherOptions,

            classCheckedList,

            activeRadio,

            monthsList,

            monthsCheckedList,

            weeksList,

            weeksCheckedList

        } = replaceSchedule;

    let radios = [

        { id:"all",name:"全学期" },

        { id:"month",name:"指定月份" },

        { id:"week",name:"指定周次" },

        { id:"date",name:"指定日期" },

        { id:"classHour",name:"指定节次" },

    ];

    return (

            <Loading spinning={loadingShow} opacity={false} tip="加载中...">

                <div className="replace-schedule-wrapper">

                    <div className="teacher-wrapper clearfix">

                        <div className="props">老师:</div>

                        <DropDown
                            width={160}
                            dropSelectd={teacherOptions.dropSelectd?teacherOptions.dropSelectd:{value:"none",title:"请选择任课教师"}}
                            type="multiple"
                            style={{zIndex:8}}
                            mutipleOptions={{
                                range:2,
                                dropMultipleList:teacherOptions.dropList,
                                dropMultipleChange:this.teacherDropChange.bind(this),
                                dropClickSearch:this.teacherClickSearch.bind(this),
                                dropCancelSearch:this.teacherSearchClose.bind(this),
                                searchList:teacherOptions.searchList,
                                searchPlaceholder:"请输入教师名称进行搜索...",
                                searchOpen:teacherOptions.searchOpen,
                                searchLoadingShow:teacherOptions.searchLoadingShow
                            }}
                        >

                        </DropDown>

                    </div>

                    <div className="subject-wrapper clearfix">

                        <div className="props">学科:</div>

                        {

                            teacherSubject.dropShow?

                                <DropDown width={90} dropSelectd={teacherSubject.select.dropSelectd} style={{zIndex:7}} dropList={teacherSubject.select.dropList}></DropDown>

                                :

                                <span className="subject-name">{teacherSubject.name?teacherSubject.name:"请选择老师"}</span>

                        }

                    </div>

                    <div className="class-wrapper clearfix">

                        <div className="props">代课班级:</div>

                        <div className="class-pick-wrapper clearfix">

                            {

                                classList.length>0?classList.map((item,key) => {

                                  return <div key={key} className={`class-item check-item ${classCheckedList.includes(item.id)?'active':''}`} onClick={this.classChecked.bind(this,item.id)}>

                                          {

                                              item.name

                                          }

                                         </div>

                                })

                                    :'请选择老师'

                            }

                        </div>

                    </div>

                    <div className="replace-teacher-wrapper clearfix">

                        <div className="props">代课老师:</div>

                        <DropDown
                            width={160}
                            dropSelectd={replaceTeacherOptions.dropSelectd?replaceTeacherOptions.dropSelectd:{value:"none",title:"请选择任课教师"}}
                            type="multiple"
                            style={{zIndex:5}}
                            mutipleOptions={{
                                range:2,
                                dropMultipleList:replaceTeacherOptions.dropList,
                                dropMultipleChange:this.replaceTeacherDropChange.bind(this),
                                dropClickSearch:this.replaceTeacherClickSearch.bind(this),
                                //dropCancelSearch:this.classSearchClose.bind(this),
                                searchList:replaceTeacherOptions.dropList,
                                searchPlaceholder:"请输入教师名称进行搜索...",
                                searchOpen:replaceTeacherOptions.searchOpen,
                                searchLoadingShow:replaceTeacherOptions.searchLoadingShow
                            }}>

                        </DropDown>

                    </div>

                    <div className="deadline-wrapper clearfix">

                        <div className="props">代课期限:</div>

                        <div className="radios-wrapper">

                            {

                                radios.map((item,key) => {

                                    return <span key={key} className={`radio-item ${activeRadio === item.id?'active':''}`} onClick={this.radioChange.bind(this,item.id)}>{item.name}</span>

                                })

                            }

                        </div>

                    </div>

                    {


                        activeRadio==='month'?

                            <div className="byMonth dateline-pick-wrapper clearfix">

                                {

                                    monthsList.map((item,key) => {

                                        return <div className={`month-item check-item ${monthsCheckedList.includes(item.id)?'active':''}`} onClick={this.monthChecked.bind(this,item.id)}>

                                            {

                                                item.name

                                            }

                                        </div>

                                    })

                                }

                                <div className="trangle"></div>

                            </div>

                            :''


                    }

                    {


                        activeRadio==='week'?

                            <div className="byWeek dateline-pick-wrapper clearfix">

                                {

                                    weeksList.map((item,key) => {

                                        return <div className={`week-item check-item ${weeksCheckedList.includes(item)?'active':''}`} onClick={this.weekChecked.bind(this,item)}>

                                            第{item}周

                                        </div>

                                    })

                                }

                                <div className="trangle"></div>

                            </div>

                            :''


                    }

                    {


                        activeRadio==='date'?

                            <div className="byWeek dateline-pick-wrapper clearfix">

                                <ConfigProvider locale={zhCN}>

                                    <DatePicker></DatePicker>

                                </ConfigProvider>

                                <div className="trangle"></div>

                            </div>

                            :''


                    }

                </div>

            </Loading>

        );
    }
}

const mapStateToProps = (state) => {

    const { replaceSchedule } = state.Manager.AdjustByTeacherModal;

    return{

        replaceSchedule

    }

};

export default connect(mapStateToProps)(ReplaceSchedule);