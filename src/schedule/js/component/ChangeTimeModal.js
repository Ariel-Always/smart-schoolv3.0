import React,{ Component } from 'react';

import {Loading, Modal} from "../../../common";




class ChangeTimeModal extends Component{



    getNextDay(d){
        d = new Date(d);
        d = +d + 1000*60*60*24;
        d = new Date(d);
        //return d;
        //格式化
        return d.getFullYear()+"-"+(this.SupplyZero(d.getMonth()+1))+"-"+this.SupplyZero(d.getDate());

    }


    SupplyZero(number){

        let NumberStr = number.toString();

        let Number = NumberStr;

        if (NumberStr.length<2){

            Number = `0${NumberStr}`;

        }

        return Number;

    }






    render() {

        const  { Params } = this.props;

        const {

            Show=false,ModalLoading=false,WeekNO=0,

            ItemClassHour=[],ItemWeek=[]

        } = Params;

        //获取每周的开始日期
        let StartDate = '';

        //th
        let ths = [];


        //计算时间
        if (ItemWeek.length>0){

            StartDate = ItemWeek.find(item=>item.WeekNO===WeekNO).StartDate;

            let StartTime = new Date(StartDate.replace(/-/g,'/'));

            let DateTitle = '';

            for (let i = 0; i<=6; i++){

                let WeekDayTitle = '';
                //设置title
                switch (i) {

                    case 0:

                        WeekDayTitle = '星期一';

                        break;

                    case 1:

                        WeekDayTitle = '星期二';

                        break;

                    case 2:

                        WeekDayTitle = '星期三';

                        break;

                    case 3:

                        WeekDayTitle = '星期四';

                        break;

                    case 4:

                        WeekDayTitle = '星期五';

                        break;

                    case 5:

                        WeekDayTitle = '星期六';

                        break;

                    case 6:

                        WeekDayTitle = '星期日';

                        break;

                    default:

                        WeekDayTitle = '';

                }

                if (i===0){

                    DateTitle = StartDate;

                }else{

                    StartTime = this.getNextDay(StartTime);

                    DateTitle = StartTime;

                }

                let th = <th key={i} className='week-day'>

                    <div className="week">{WeekDayTitle}</div>

                    <div className="day">{DateTitle}</div>

                </th>;

                ths.push(th);

            }

        }






        return (

            <Modal type={1}

                   title='调整时间'

                   visible={Show}

                   width={976}

                   mask={true}

                   className="component-change-time-wrapper"

                //onCancel={this.alertClose.bind(this)}

            >

                <Loading spinning={ModalLoading}>

                    <div className="modal-content-wrapper">

                        <div className="week-no-wrapper">

                                <span className="prev">&lt;上一周</span>

                                <span className="now-week">第{WeekNO}周</span>

                                <span className="next">下一周&gt;</span>

                        </div>

                        <div className="content-table">

                            <table className="component-change-time-table">

                                <thead>

                                    <tr>

                                        <th className="blank" colSpan={2}></th>

                                        {ths}

                                    </tr>

                                </thead>



                            </table>

                        </div>

                    </div>

                </Loading>

            </Modal>

        );

    }

}

export default ChangeTimeModal;