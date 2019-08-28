import React,{Component} from 'react';

import {DropDown} from "../../../common";

class TermPick extends Component{
    render() {

        const {ItemTermName,ItemWeek,NowWeek} = this.props;

        let prevDisabled = '';

        let nextDisabled = '';

        if (ItemWeek.length>0){

           switch (NowWeek.value) {

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

                <button className={`prev ${prevDisabled}`}>&lt;&nbsp;上一周</button>

                <div className="term-title">

                    {ItemTermName?ItemTermName:''}第<DropDown dropSelectd={NowWeek} dropList={ItemWeek} width={68} height={108}></DropDown>周

                </div>

                <button className={`next ${nextDisabled}`}>下一周&nbsp;&gt;</button>

            </div>

        );
    }
}
export default TermPick;