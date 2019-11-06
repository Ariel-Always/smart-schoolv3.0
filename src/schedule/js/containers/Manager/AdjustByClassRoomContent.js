import React,{Component} from 'react';

import { connect } from 'react-redux';

import { Loading,DropDown} from "../../../../common";

import ABCRActions from "../../actions/Manager/AdjustByClassRoomActions";

import {ConfigProvider, DatePicker} from "antd";

import zhCN from "antd/es/locale/zh_CN";




class AdjustByClassRoomContent extends Component{

    constructor(props) {

        super(props);

        const { dispatch } = props;

        console.log(123);

        dispatch(ABCRActions.PageInit());

    }

    //原教室搜索
    OriginClassRoomSearch(e){

        const { dispatch } = this.props;

        dispatch(ABCRActions.OriginClassRoomSearch(e.value));

    }


    //原教室取消搜索

    OriginClassRoomCancelSearch(){

        const { dispatch } = this.props;

        dispatch(ABCRActions.OriginClassRoomCancelSearch());

    }

    //原教室变化
    OriginClassRoomChange(e){

        const { dispatch,AdjustByClassRoom } = this.props;

        const { ClassRoomList } = AdjustByClassRoom;

        let ClassRoomType = '';

        ClassRoomList.map(item=>{

            item.list.map(i=>{

                if (i.id===e.id){

                    ClassRoomType = item.name;

                }

            })

        });

        let title = <span>{e.value}<span style={{color:"#999999"}}>({ClassRoomType})</span></span>

        dispatch({type:ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_CLASSROOM_CHANGE,data:{value:e.id,title}});

    }


    //目标搜索
    TargetClassRoomSearch(e){

        const { dispatch } = this.props;

        dispatch(ABCRActions.TargetClassRoomSearch(e.value));

    }


    //目标取消搜索

    TargetClassRoomCancelSearch(){

        const { dispatch } = this.props;

        dispatch(ABCRActions.TargetClassRoomCancelSearch());

    }

    //目标变化
    TargetClassRoomChange(e){

        const { dispatch,AdjustByClassRoom } = this.props;

        const { ClassRoomList } = AdjustByClassRoom;

        let ClassRoomType = '';

        ClassRoomList.map(item=>{

            item.list.map(i=>{

                if (i.id===e.id){

                    ClassRoomType = item.name;

                }

            })

        });

        let title = <span>{e.value}<span style={{color:"#999999"}}>({ClassRoomType})</span></span>

        dispatch({type:ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_TARGET_CLASSROOM_CHANGE,data:{value:e.id,title}});

    }

    //radio变化
    radioChange(id){

        const { dispatch } = this.props;

        dispatch(ABCRActions.radioChange(id));

    }

    //月份改变
    monthChecked(id){

        const { dispatch } = this.props;

        dispatch(ABCRActions.monthChecked(id));

    }
    //选取周次
    weekChecked(id){

        const { dispatch } = this.props;

        dispatch(ABCRActions.weekChecked(id));

    }

    //日期改变的时候
    dateChecked(date,dateString){

        const { dispatch } = this.props;

        dispatch(ABCRActions.dateChecked(dateString));

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

        dispatch(ABCRActions.classHourDateChecked(dateString));

    }

    //点击课时

    classHourChecked(opts){

        const { dispatch } = this.props;

        dispatch(ABCRActions.classHourChecked(opts));

    }


    render() {

        const { AdjustByClassRoom } = this.props;

        const {

            Show,LoadingShow,ClassRoomList,OriginClassRoom,TargetClassRoom,activeRadio,

            monthsList, monthsCheckedList, weeksList, weeksCheckedList,

            dateCheckedList, classHourDate, WeekNO, WeekDay, dateLoadingShow,

            classHourList, classHourCheckedList, classHourLoadingShow,

        } = AdjustByClassRoom;

        let radios = [

            { id:"all",name:"全学期" },

            { id:"month",name:"指定月份" },

            { id:"week",name:"指定周次" },

            { id:"date",name:"指定日期" },

            { id:"classHour",name:"指定节次" },

        ];

        return (

                <Loading tip="加载中..." type="loading" spinning={false}>

                    <div className="class-room-pick-wrapper clearfix">

                        <div className="props">教室:</div>

                        <div className="class-room-wrapper">

                            <DropDown
                                width={250}
                                dropSelectd={OriginClassRoom.DropSelectd}
                                type="multiple"
                                style={{zIndex:9}}
                                mutipleOptions={{
                                    range:2,
                                    dropMultipleList:ClassRoomList,
                                    dropMultipleChange:this.OriginClassRoomChange.bind(this),
                                    dropClickSearch:this.OriginClassRoomSearch.bind(this),
                                    dropCancelSearch:this.OriginClassRoomCancelSearch.bind(this),
                                    searchList:OriginClassRoom.SearchList,
                                    searchPlaceholder:"请输入教师名称进行搜索...",
                                    searchOpen:OriginClassRoom.SearchOpen,
                                    searchLoadingShow:OriginClassRoom.SearchLoadingShow
                                }}>

                            </DropDown>

                        </div>

                        <div className="arr-wrapper"></div>

                        <div className="props">新的教室:</div>

                        <div className="target-class-room-wrapper">

                            <DropDown
                                width={250}
                                dropSelectd={TargetClassRoom.DropSelectd}
                                type="multiple"
                                style={{zIndex:9}}
                                mutipleOptions={{
                                    range:2,
                                    dropMultipleList:ClassRoomList,
                                    dropMultipleChange:this.TargetClassRoomChange.bind(this),
                                    dropClickSearch:this.TargetClassRoomSearch.bind(this),
                                    dropCancelSearch:this.TargetClassRoomCancelSearch.bind(this),
                                    searchList:TargetClassRoom.SearchList,
                                    searchPlaceholder:"请输入教师名称进行搜索...",
                                    searchOpen:TargetClassRoom.SearchOpen,
                                    searchLoadingShow:TargetClassRoom.SearchLoadingShow
                                }}>

                            </DropDown>

                        </div>

                    </div>

                    <div className="time-pick-wrapper">

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

                                    <span className="error-tips" style={{display:`${monthTips?'inline-block':'none'}`}}>{monthTipsTitle}</span>

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

                                    <span className="error-tips" style={{display:`${weekTips?'inline-block':'none'}`}}>{weekTipsTitle}</span>


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

                                    <span className="error-tips" style={{display:`${dateTips?'inline-block':'none'}`}}>{dateTipsTitle}</span>


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

                                            <Loading  className="date-loading" spinning={dateLoadingShow} opacity={false} type="loading">

                                                <span className="week-date">(第{WeekNO}周 {WeekDay})</span>

                                            </Loading>

                                            :''

                                    }

                                    <span className="error-tips" style={{display:`${classHourDateTips?'inline-block':'none'}`}}>{classHourDateTipsTitle}</span>


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

                                    <span className="error-tips" style={{display:`${classHourTips?'inline-block':'none'}`}}>{classHourTipsTitle}</span>

                                </div>

                                :''

                        }

                    </div>

                </Loading>

        );

    }

}

const mapStateToProps = (state) => {

    const { AdjustByClassRoom } = state.Manager;

    return{

        AdjustByClassRoom

    }

};

export default connect(mapStateToProps)(AdjustByClassRoomContent);