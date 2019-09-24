import React,{Component} from 'react';

import { Table } from "../../../common";

import $ from 'jquery';

class DoubleSingleTable extends Component{


    componentDidMount() {

        console.log($(this.refs['table']).find('.ant-table-fixed'));

        $('#tb').find('div.ant-table-body').scroll(() => {

            let scrollTop = $('#tb').find('div.ant-table-body').scrollTop();

        });

    }

    render() {

        const {ItemClassHourCount,ItemClassHour,leftColWidth,commonColWidth,rowOneHeight,rowTowHeight,commonRowHeight,schedule} = this.props;


        /*console.log(schedule,ItemClassHour);*/

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

        //ant table
        let dataSource = [];

        let WeekCol = [];

        //将schedule转换为ant 类型的table
        schedule.map(item=>{

            dataSource.push({id:item.id,name:item.name})

        });

        console.log(schedule,dataSource);


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

            let ClassHourCol=[];




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

                //ant table




                if(dataSource.length>0){

                    dataSource.map((item,key)=>{

                        let HasClass = false;

                        let ClassObj = "";

                        schedule.map((itm,k)=>{

                            if (k===key){

                                itm.list.map((it,ky)=>{

                                    if (it.WeekDay===i&&it.ClassHourNO===j){

                                        HasClass = true;

                                        ClassObj = {

                                            secondTitle:it.secondTitle,

                                            secondTitleID:it.secondTitleID,

                                            thirdTitle:it.thirdTitle,

                                            thirdTitleID:it.thirdTitleID,

                                            title:it.title,

                                            titleID:it.titleID
                                        }

                                    }

                                })

                            }

                        });

                        if (HasClass){

                            dataSource[key][`${i}${j}`] = <div className="schedule-wrapper" style={{width:commonColWidth,height:commonRowHeight}}>

                                <div className="title" data-id={ClassObj.titleID}>{ClassObj.title}</div>

                                <div className="second-title" data-id={ClassObj.secondTitleID}>{ClassObj.secondTitle}</div>

                                <div className="second-title" data-id={ClassObj.thirdTitleID}>{ClassObj.thirdTitle}</div>

                            </div>;

                        }else{

                            dataSource[key][`${i}${j}`] = <div className="schedule-wrapper empty" style={{width:commonColWidth,height:commonRowHeight}}>--</div>

                        }

                    });




                }






                let Title = <div className="course-time-th" style={{width:commonColWidth}}>

                    <div className="course">第{ItemClassHour[j-1].ClassHourNO}节</div>

                    <div className="time">{ItemClassHour[j-1].StartTime}-{ItemClassHour[j-1].EndTime}</div>

                </div>;

                ClassHourCol.push({title:Title,width:commonColWidth,key:`${i}${j}`,height:rowTowHeight,dataIndex:`${i}${j}`});

            }



            //ant col
            WeekCol.push({key:`week${i}`,colSpan:weekColSpan,height:rowOneHeight,title:weekTitle,children:[...ClassHourCol]});

        }


        //ant columns

        let Columns = [

            {

                width:leftColWidth,

                fixed:"left",

                key:"blank",

                dataIndex:"name"

            },
            ...WeekCol

        ];

        console.log(dataSource,WeekCol,Columns);


        //类型为single-single,double-single,single-double三种




        {/*<table>

                <tbody>
                 表头
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
                    表体
                    {
                        schedule.map((item,key) => {

                            let tds = [];

                            for (let i = 1; i <= 7; i++){

                                for (let j = 1; j <= weekColSpan; j++){

                                    let hasClass = false;

                                    let tdContent = '';

                                    item.list.map((itm,k) => {

                                        if ((itm.WeekDay+1) === i&&itm.ClassHourNO === j){

                                            hasClass = true;

                                            tdContent = <td key={k} className="common-col" style={{height:commonRowHeight}}>

                                                            <div className="course-time-div" style={{height:"100%",width:commonColWidth}}>

                                                                <div className={`course-title ${itm.type === 1?'disabled':''}`} data-id={itm.titleID} title={itm.title}>{itm.title}</div>

                                                                <div className="course-abstract" data-id={itm.secondTitleID} title={itm.secondTitle}>{itm.secondTitle}</div>

                                                                <div className="course-abstract" data-id={itm.thirdTitleID} title={itm.thirdTitle}>{itm.thirdTitle}</div>

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

                                            <div className="course-teacher" style={{width:leftColWidth,height:commonRowHeight,lineHeight:`${commonRowHeight}px`}} data-id={item.id} title={item.name}>{item.name}</div>

                                        </td>

                                        {

                                            tds

                                        }

                                    </tr>;

                        })
                    }


                </tbody>

            </table>*/}

        return (

            <Table id="tb" ref="table" columns={Columns} onChange={(q1,q2,q3,q4)=>{console.log(q1,q2,q3,q4)}} bordered dataSource={dataSource} pagination={false} scroll={{x:1120,y:760}}>



            </Table>

        );

    }
}
export default DoubleSingleTable;