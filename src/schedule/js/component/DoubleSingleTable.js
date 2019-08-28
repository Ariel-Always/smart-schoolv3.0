import React,{Component} from 'react';
class DoubleSingleTable extends Component{

    render() {

        const {ItemClassHourCount,ItemClassHour} = this.props;

        let weekColSpan = 0;

        if (ItemClassHourCount){
            
            for (let value of ItemClassHourCount.values()){

                weekColSpan = weekColSpan + value.CountType;

            }

        }

        let tdWeek =[];

        let tdCourse = [];

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

            tdWeek.push(<td key={i} colSpan={weekColSpan} className={`week${1}`}>{weekTitle}</td>);

            for (let j = 1 ;j <= weekColSpan; j++){

                tdCourse.push(<td  className={`col col${i*j}`}><div style={{width:128}}></div></td>)

            }

        }


        //类型为single-single,double-single,single-double三种

        return (

            <table>

                <tbody>

                   <tr>

                       <td className="col col0" rowSpan={2}></td>

                       {
                           tdWeek
                       }

                   </tr>

                    <tr>

                        <td className="col col0"></td>

                        {
                            tdCourse
                        }

                    </tr>

                </tbody>
                
            </table>

        );

    }
}
export default DoubleSingleTable;