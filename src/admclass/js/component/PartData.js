import React,{Component} from "react";

class PartData extends Component{
    render() {
        const {PartDataList} = this.props;

        return (
            <div className="partdata-tab-wrapper">
                {
                    PartDataList?
                    PartDataList.map((item,key)=>{
                        return <div key={key} className="partdata-tab-item">
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
                    :''
                }
            </div>
        );
    }
}

export default PartData;