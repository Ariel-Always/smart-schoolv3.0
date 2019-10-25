import React,{Component} from 'react';

import $ from 'jquery';

class PeriodClassHourSetting extends Component{

    componentDidMount(){



        $('.period-tab').click((e)=>{

            if($('.period-tab').hasClass('up')){

                $('.period-tab').removeClass('up');

                $('.adjust-class-hour').hide();

                $(e.target).closest('.class-hour-setting-wrapper').children('.setting-content').slideToggle();

            }else if ($('.period-tab').hasClass('down')) {

                $('.period-tab').addClass('up');

                $('.adjust-class-hour').show();

                $(e.target).closest('.class-hour-setting-wrapper').children('.setting-content').slideToggle();

            }


        })

    }

    render() {

        const {

            IsUnify,

            PeriodID,

            PeriodName,

            ClassHourList

        } = this.props;

        return (

            <div className="class-hour-setting-wrapper">


                <div className={`period-tab ${IsUnify?'':'down'}`}>

                    {

                        IsUnify?

                            ''

                            :<div className="title">{PeriodName}</div>

                    }

                    <a className="adjust-class-hour" style={IsUnify?{display:"block"}:{}}>批量调整上课时间</a>

                </div>

                <div className="setting-content" style={IsUnify?{display:"block"}:{}}>

                    <div className="morning-wrapper">

                        <div className="morning-class-hour-wrapper clearfix">

                            {

                                ClassHourList.map((item,key)=>{

                                    if(item.ClassHourType===1){

                                        return <div className="class-hour-item-wrapper">

                                            <div className="class-hour-item">

                                                <div className="class-hour-name">第{item.ClassHourNO}节</div>

                                                <div className="class-hour-time">{item.StartTime}-{item.EndTime}</div>

                                                <button className="class-hour-edit"></button>

                                                <button className="class-hour-del"></button>

                                            </div>

                                        </div>

                                    }

                                })

                            }

                            <div className="class-hour-item-wrapper add">

                                <div className="class-hour-item">

                                    <div className="row"></div>

                                    <div className="col"></div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="afternoon-wrapper">

                        <div className="afternoon-class-hour-wrapper clearfix">

                            {

                                ClassHourList.map((item,key)=>{

                                    if(item.ClassHourType===2){

                                        return <div className="class-hour-item-wrapper">

                                            <div className="class-hour-item">

                                                <div className="class-hour-name">第{item.ClassHourNO}节</div>

                                                <div className="class-hour-time">{item.StartTime}-{item.EndTime}</div>

                                                <button className="class-hour-edit"></button>

                                                <button className="class-hour-del"></button>

                                            </div>

                                        </div>

                                    }

                                })

                            }

                            <div className="class-hour-item-wrapper add">

                                <div className="class-hour-item">

                                    <div className="row"></div>

                                    <div className="col"></div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        );

    }

}

export default PeriodClassHourSetting;