import React,{Component} from 'react';

class SingleDoubleTable extends Component{

    getNextDay(d){
        d = new Date(d);
        d = +d + 1000*60*60*24;
        d = new Date(d);
        //return d;
        //格式化
        return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();

    }


    render() {

        const { commonHeight,topHeight,ItemClassHourCount,ItemClassHour,ItemWeek,NowWeekNo,commonWidth,leftOneWidth,leftTwoWidth,schedule } = this.props;
        //根据课程
        let courseTotal = 0;

        let ths =[];
        //查询该周的日期
        if (ItemWeek&&NowWeekNo){

            let NowWeekInfo = ItemWeek.filter((item) => {

                return item.WeekNO===NowWeekNo

            })[0];

            let StartTime = new Date(NowWeekInfo.StartDate.replace(/-/g,'/'));

            let date = StartTime;

           for (let i = 1; i <= 7; i++){

               let week = '';

               switch (i) {

                   case 1:

                       week = '星期一';

                       break;

                   case 2:

                       week = '星期二';

                       break;

                   case 3:

                       week = '星期三';

                       break;

                   case 4:

                       week = '星期四';

                       break;

                   case 5:

                       week = '星期五';

                       break;

                   case 6:

                       week = '星期六';

                       break;

                   case 7:

                       week = '星期日';

                       break;

                   default:

                       week = '星期一';

               }

               let dateTime = '';

               if (i===1){

                   dateTime = NowWeekInfo.StartDate;

               }else{

                    date = this.getNextDay(date);

                    dateTime = date;

               }

               let th = <th key={i} style={{height:topHeight}}>

                            <div className={`week week${i}`} style={{width:commonWidth}}>{week}</div>

                            <div className={`date date${i}`} style={{width:commonWidth}}>{dateTime}</div>

                        </th>;

                    ths.push(th);

           }

        }


        return (

            <table className="single-double-table">

                <thead>

                    <tr>

                    <th colSpan={2}></th>

                    {

                        ths

                    }

                </tr>

                </thead>

                <tbody>

                {

                    ItemClassHour&&ItemClassHour.map((item,key) => {

                        let firstTd = '';
                        //判断上下午，以及合并单元格



                        ItemClassHourCount.map((i) => {

                            if (key===courseTotal){

                                let noon = '';

                               switch (i.ClassHourType) {

                                   case 1:

                                       noon = "上午";

                                       break;

                                   case 2:

                                       noon = "下午";

                                       break;

                                   case 3:

                                       noon = "晚上";

                                       break;

                                   default:

                                       noon = "上午";

                                       break;

                               }

                                firstTd = <td style={{width:leftOneWidth}} className="noon"  rowSpan={i.CountType}>{noon}</td>;

                                courseTotal += i.CountType;

                               return;

                            }

                        });

                        let tds = [];

                        //将内容区域铺满（如果有课表填充课表，没有就填充--）
                        if (schedule.length>0){
                            //从周一开始判断
                            for (let i =1; i <= 7; i++){

                                let hasCourse = false;

                                schedule.map((it,ky) => {

                                    if (((it.WeekDay+1) === i)&&(it.ClassHourNO===item.ClassHourNO)){

                                        tds.push(<td key={`${i}${ky}`} className={`shedule${i}`} style={{height:commonHeight}}>

                                            <div className="scheduleDiv" style={{width:commonWidth}}>

                                                <div className={`title ${it.ScheduleType===1?'':'active'}`} title={it.title} data-id={it.titleID}>{it.title}</div>

                                                <div className="second-title" title={it.secondTitle} data-id={it.secondTitleID}>{it.secondTitle}</div>

                                                <div className="third-title" title={it.thirdTitle} data-id={it.thirdTitleID}>{it.thirdTitle}</div>

                                            </div>

                                    </td>)

                                        hasCourse = true;

                                    }else{

                                       return;

                                    }

                                });
                                //如果当天的该节课没有课程。添加空。
                                if (!hasCourse){

                                    tds.push(<td key={i} className={`shedule${i}`} style={{height:commonHeight}}>

                                        <div className="scheduleDiv empty" style={{width:commonWidth,lineHeight:`${commonHeight}px`}}>--</div>

                                    </td>)

                                }

                            }

                        }else{

                            for (let i = 1; i <= 7; i++){

                                tds.push(<td key={i} className={`shedule${i}`} style={{height:commonHeight}}>

                                            <div className="scheduleDiv empty" style={{width:commonWidth,lineHeight:`${commonHeight}px`}}>--</div>

                                        </td>)

                            }

                        }


                        return  <tr key={key}>

                                {
                                    firstTd===''?<React.Fragment></React.Fragment>:firstTd
                                }

                                <td className={`course-time course${key+1}`} style={{height:commonHeight}}>

                                    <div className="course-time-title" style={{width:leftTwoWidth}}>{item.ClassHourName}</div>

                                    <div className="course-time-time">{item.StartTime}-{item.EndTime}</div>

                                </td>

                                {

                                    tds

                                }

                               </tr>

                    })

                }

                </tbody>

            </table>

        );

    }

}

export default SingleDoubleTable;