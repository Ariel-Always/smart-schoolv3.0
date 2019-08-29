import React,{Component} from 'react';

import {DropDown} from "../../../common";

class TermPick extends Component{
    render() {

        const {ItemTermName,ItemWeek,NowWeekNo,weekPickEvent,weekNextEvent,weekPrevEvent} = this.props;

        let prevDisabled = '';

        let nextDisabled = '';

        if (ItemWeek.length>0){

           switch (NowWeekNo) {

               case ItemWeek[0].value:

                   prevDisabled = 'disabled';

                   nextDisabled = '';

                   break;

               case ItemWeek[ItemWeek.length-1].value:

                   prevDisabled = '';

                   nextDisabled = 'disabled';

                   break;

               default:

                   prevDisabled = '';

                   nextDisabled = '';

           }

        }


        return (

            <div className="term-pick-wrapper clearfix">

                <button className={`prev ${prevDisabled}`}  onClick={prevDisabled?()=>{}:()=>{weekPrevEvent()}}>&lt;&nbsp;上一周</button>

                <div className="term-title">

                    {ItemTermName?ItemTermName:''}第<DropDown dropSelectd={{title:NowWeekNo,value:NowWeekNo}} onChange={(e)=>{weekPickEvent(e)}} dropList={ItemWeek} width={68} height={108} style={{zIndex:10}}></DropDown>周

                </div>

                <button className={`next ${nextDisabled}`} onClick={nextDisabled?()=>{}:()=>{weekNextEvent()}}>下一周&nbsp;&gt;</button>

            </div>

        );
    }
}
export default TermPick;