import React,{Component} from 'react';
class Statistics extends Component{
    render() {
        const {classNum,teacherNum,studentNum} = this.props;

        return (
            <div className="statistic-wrapper">
                <ul>
                    <li className="statistic-item">
                        <div className="statistic-bg statistic-green">
                            <div className="statistic-num">{classNum}</div>
                        </div>
                        <div className="statistic-title">班级数量</div>
                    </li>
                    <li className="statistic-item">
                        <div className="statistic-bg statistic-orange">
                            <div className="statistic-num">{teacherNum}</div>
                        </div>
                        <div className="statistic-title">教师人数</div>
                    </li>
                    <li className="statistic-item">
                        <div className="statistic-bg statistic-blue">
                            <div className="statistic-num">{studentNum}</div>
                        </div>
                        <div className="statistic-title">学生人数</div>
                    </li>
                </ul>

            </div>
        );
    }
}
export default Statistics;