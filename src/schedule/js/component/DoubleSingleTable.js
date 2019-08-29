import React,{Component} from 'react';
class DoubleSingleTable extends Component{

    render() {

        const {ItemClassHourCount,ItemClassHour,leftColWidth,commonColWidth,rowOneHeight,rowTowHeight,commonRowHeight,schedule} = this.props;


        //设置头部的td

        let weekColSpan = 0;

        if (ItemClassHourCount){
            
            for (let value of ItemClassHourCount.values()){

                weekColSpan = weekColSpan + value.CountType;

            }

        }

        let tdWeek =[];

        let tdCourse = [];

        let key = 1;

        for (let i = 1; i <= 7; i++){

            let weekTitle = '星期一';

            switch (i) {

                case 1:
                    weekTitle = '星期一';
                    break;

                case 2:
                    weekTitle = '星期二';
                    break;

                case 3:
                    weekTitle = '星期三';
                    break;

                case 4:
                    weekTitle = '星期四';
                    break;

                case 5:
                    weekTitle = '星期五';
                    break;

                case 6:
                    weekTitle = '星期六';
                    break;

                case 7:
                    weekTitle = '星期日';
                    break;

                default:
                     weekTitle = '星期一';
            }

            tdWeek.push(<td key={i} colSpan={weekColSpan} className={`week week${i}`} style={{height:rowOneHeight}}>{weekTitle}</td>);

            for (let j = 1 ;j <= weekColSpan; j++){

                tdCourse.push(<td key={key}  className={`course-time week${i} time${j} col${key}`} style={{height:rowTowHeight}}>

                                  <div className={`course-time-div colDiv${key}`} style={{width:commonColWidth,height:"100%"}}>

                                          {
                                                ItemClassHour.map((item,key) => {

                                                    if(item.ClassHourNO===j){

                                                        return <React.Fragment key={key}>

                                                                    <div className="class-hour">{item.ClassHourName}</div>

                                                                    <div className="class-hour-time">{item.StartTime}-{item.EndTime}</div>

                                                                </React.Fragment>

                                                    }

                                                })
                                          }

                                  </div>

                               </td>);

                key+=1;

            }

        }


        //类型为single-single,double-single,single-double三种

        return (

            <table>

                <tbody>
                {/* 表头*/}
                   <tr>

                       <td className="col col0" rowSpan={2}>

                           <div className="course-time-div colDiv0" style={{width:leftColWidth}}></div>

                       </td>

                       {
                           tdWeek
                       }

                   </tr>

                    <tr>

                        {
                            tdCourse
                        }

                    </tr>
                   {/* 表体*/}
                    {
                        schedule.map((item,key) => {

                            let tds = [];

                            for (let i = 1; i <= 7; i++){

                                for (let j = 1; j <= weekColSpan; j++){

                                    let hasClass = false;

                                    let tdContent = '';

                                    item.courseList.map((itm,k) => {

                                        if ((itm.WeekDay+1) === i&&itm.ClassHourNO === j){

                                            hasClass = true;

                                            tdContent = <td key={k} className="common-col" style={{height:commonRowHeight}}>

                                                            <div className="course-time-div" style={{height:"100%",width:commonColWidth}}>

                                                                <div className={`course-title ${itm.ScheduleType===1?'disabled':''}`} title={itm.ClassName!==''?itm.ClassName:itm.CourseClassName}>{itm.ClassName!==''?itm.ClassName:itm.CourseClassName}</div>

                                                                <div className="course-abstract" title={itm.SubjectName}>{itm.SubjectName}</div>

                                                                <div className="course-abstract" title={itm.ClassRoomName}>{itm.ClassRoomName}</div>

                                                            </div>

                                                        </td>

                                            return;

                                        }

                                    });

                                    if (hasClass){

                                        tds.push(tdContent);

                                    }else{

                                        tds.push(<td key={`${i}${j}`} className="common-col" style={{height:commonRowHeight}}>

                                                    <div className="course-time-div empty" style={{height:"100%",width:commonColWidth}}> -- </div>

                                                 </td>)

                                    }

                                }

                            }

                            return <tr key={key}>

                                        <td className="col0" style={{height:commonRowHeight}}>

                                            <div className="course-teacher" style={{width:leftColWidth,height:commonRowHeight,lineHeight:`${commonRowHeight}px`}} title={item.TeacherName}>{item.TeacherName}</div>

                                        </td>

                                        {

                                            tds
                                            
                                        }

                                    </tr>;

                        })
                    }


                </tbody>
                
            </table>

        );

    }
}
export default DoubleSingleTable;