import React,{Component} from 'react';

import { Loading,DropDown,Radio } from "../../../../common";

import { DatePicker,ConfigProvider,RangePicker } from 'antd';

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

    //日期改变的时候
    dateChecked(date,dateString){

        const { dispatch } = this.props;

        dispatch(ABTActions.dateChecked(dateString));

    }
    //dateRanger改变date日历的显示方式
    dateRander(current,today){

        const { replaceSchedule } = this.props;

        const { dateCheckedList } = replaceSchedule;

        let currentDate = moment(current).format('L').replace(/\//g,'-');

        if (dateCheckedList.includes(currentDate)){

            return <div className="ant-calendar-date" style={{background:'#1890ff',color:"#ffffff"}}>{current.date()}</div>

        }else{

            return <div className="ant-calendar-date">{current.date()}</div>

        }

    }
    //课时列表的点击选择
    classHourDateChecked(date,dateString){

        const { dispatch } = this.props;

        dispatch(ABTActions.classHourDateChecked(dateString));

    }

    //点击课时

    classHourChecked(opts){

        const { dispatch } = this.props;

        dispatch(ABTActions.classHourChecked(opts));

    }









    render() {

        const { replaceSchedule,teacherList } = this.props;

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

            weeksCheckedList,

            dateCheckedList,

            classHourDate,

            WeekNO,

            WeekDay,

            dateLoadingShow,

            classHourList,

            classHourCheckedList,

            classHourLoadingShow

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
                                dropMultipleList:teacherList,
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
                                dropMultipleList:teacherList,
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

                                        return <div key={key} className={`month-item check-item ${monthsCheckedList.includes(item.id)?'active':''}`} onClick={this.monthChecked.bind(this,item.id)}>

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

                                        return <div key={key} className={`week-item check-item ${weeksCheckedList.includes(item)?'active':''}`} onClick={this.weekChecked.bind(this,item)}>

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

                            <div className="byDate dateline-pick-wrapper clearfix">

                                    <ConfigProvider locale={zhCN}>

                                        <DatePicker showToday={false} dateRender={this.dateRander.bind(this)} onChange={this.dateChecked.bind(this)} style={{width:626}}></DatePicker>

                                    </ConfigProvider>

                                <div className="date-wrapper" title={dateCheckedList.length>0?dateCheckedList.join(','):'请选择日期'}>{dateCheckedList.length>0?dateCheckedList.join(','):'请选择日期'}</div>

                                <div className="trangle"></div>

                            </div>

                            :''

                    }

                    {

                        activeRadio==='classHour'?

                            <div className="byClassHour dateline-pick-wrapper clearfix">

                                <span className="title">时间:</span>

                                <ConfigProvider locale={zhCN}>

                                    <DatePicker showToday={false} value={classHourDate?moment(classHourDate,'YYYY-MM-DD'):null} onChange={this.classHourDateChecked.bind(this)}></DatePicker>

                                </ConfigProvider>

                                {

                                    classHourDate?

                                        <Loading className="date-loading" spinning={dateLoadingShow} opacity={false} type="loading">

                                                <span className="week-date">(第{WeekNO}周 {WeekDay})</span>

                                        </Loading>

                                        :''

                                }

                                <Loading opacity={false} className="class-hour-loading" type="loading"  spinning={classHourLoadingShow}>

                                    <div className="title">节次:</div>

                                    <div className="classHour-wrapper">

                                        {

                                            classHourList.map((item,key) => {

                                                let noonChecked = false;

                                                let itemList = [];

                                                classHourCheckedList.map(itm => {

                                                    if (itm.id === item.id){

                                                        itemList = itm.list;

                                                        if (itm.checked){

                                                            noonChecked = true;

                                                            return;

                                                        }

                                                    }

                                                });

                                                return <div key={key} className="class-hour-item-wrapper clearfix">

                                                                <div className="noon">

                                                                    <div className={`class-hour-item check-item ${noonChecked?'active':''}`} onClick={this.classHourChecked.bind(this,{type:'noon',id:item.id})}>

                                                                        {item.name}

                                                                    </div>

                                                                </div>

                                                                {

                                                                    item.list.map((i,k)=> {

                                                                        return <div key={k} className={`class-hour-item check-item ${itemList.includes(i)?'active':''}`} onClick={this.classHourChecked.bind(this,{type:'item',pid:item.id,id:i})}>第{i}节</div>

                                                                    })

                                                                }

                                                        </div>

                                            })

                                        }

                                    </div>

                                </Loading>

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

    const { replaceSchedule,teacherList } = state.Manager.AdjustByTeacherModal;

    return{

        replaceSchedule,

        teacherList

    }

};

export default connect(mapStateToProps)(ReplaceSchedule);