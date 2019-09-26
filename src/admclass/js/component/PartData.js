import React,{Component} from "react";

import { Empty,PagiNation } from "../../../common";

class PartData extends Component{
    render() {

        const {PartDataList,type} = this.props;


        let DataItem ='';

        if (type==='grade'){

            console.log(PartDataList);

            DataItem = (PartDataList&&PartDataList.length>0)?

                    PartDataList.map((item,key)=>{

                        return  <div key={key} className="partdata-tab-item grade">

                                    <a href="#">

                                        <div className="partdata-tab-content">

                                            <div className="partdata-tab-title">{item.GradeName}</div>

                                            <table className="partdata-tab-table">

                                                <tbody>

                                                    <tr>

                                                        <td className="col1">班级数量:</td>

                                                        <td className="col2">{item.Class}</td>

                                                    </tr>

                                                    <tr>

                                                        <td className="col1">班主任:</td>

                                                        <td className="col2">{item.Ganger}</td>

                                                    </tr>

                                                    <tr>

                                                        <td className="col1">任课教师:</td>

                                                        <td className="col2">{item.CourseTecher}</td>

                                                    </tr>

                                                    <tr>

                                                        <td className="col1">学生人数:</td>

                                                        <td className="col2">{item.Student}</td>

                                                    </tr>

                                                </tbody>

                                            </table>

                                        </div>

                                        <div className="partdata-tab-shadow"></div>

                                    </a>

                                </div>

                    })

                :<Empty type="4" title="还没有任何年级存在哦，请先导入数据"></Empty>;

        }else if (type==='class'){

            DataItem = (PartDataList&&PartDataList.length>0)?

                PartDataList.map((item,key)=>{
                    return <div key={key} className="partdata-tab-item class">
                                <a href="#">
                                    <div className="partdata-tab-content">
                                        <div className="partdata-tab-title">{item.ClassName}</div>
                                        <table className="partdata-tab-table">
                                            <tbody>
                                            <tr>
                                                <td className="col1">班主任:</td>
                                                <td className="col2">

                                                    {

                                                        item.GangerName?

                                                            item.GangerName

                                                            :<span className="unset">未设置</span>

                                                    }

                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="col1">任课教师:</td>
                                                <td className="col2">{item.CourseTecher}人</td>
                                            </tr>
                                            <tr>
                                                <td className="col1">学生:</td>
                                                <td className="col2">{item.Student}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <div className="cooperate">
                                            <div className="reset">重命名</div>
                                            <div className="line"></div>
                                            <div className="delete">删除</div>
                                        </div>
                                    </div>
                                    <div className="partdata-tab-shadow"></div>
                                </a>
                            </div>
                })

                :<Empty type="4" title="还没有班级存在哦，请先导入班级"></Empty>;;

        }

        return (
            <div className="partdata-tab-wrapper clearfix">

                {DataItem}


            </div>
        );
    }
}

export default PartData;