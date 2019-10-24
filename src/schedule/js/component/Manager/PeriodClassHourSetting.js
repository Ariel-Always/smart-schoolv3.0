import React,{Component} from 'react';

import {Empty} from "../../../../common";

import $ from 'jquery';

class PeriodClassHourSetting extends Component{

    componentDidMount(){

        $('.period-tab').click((e)=>{

            $(e.target).closest('.class-hour-setting-wrapper').children('.setting-content').slideToggle();

        })

    }

    render() {

        const {

            HasPeriod,

            PeriodID,

            PeriodName,

            ClassHourList

        } = this.props;

        return (

            <div className="class-hour-setting-wrapper">


                <div className="period-tab">

                    {

                        HasPeriod?

                            <div className="title">{PeriodName}</div>

                            :''

                    }

                    <a className="adjust-class-hour">批量调整上课时间</a>

                </div>

                <div className="setting-content">

                    {

                        ClassHourList.length>0?

                            <div></div>

                            :<Empty type="3" title="还没有课时，请新先添加课时"></Empty>

                    }

                </div>

            </div>

        );

    }

}

export default PeriodClassHourSetting;