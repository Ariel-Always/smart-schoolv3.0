import React,{Component} from 'react';
import {Button} from "../../../common";
class Banner extends Component{
    render() {
        return (
               <React.Fragment>
                    <Button size="small" color="blue" className="import-admteacher"  shape="round">导入班主任班长</Button>
                    <Button size="small" color="blue"  className="import-teacher"   shape="round">导入任课教师</Button>
                    <Button size="small" color="blue"  className="import-class"   shape="round">导入班级</Button>
                    <Button size="small" color="blue" className="add-class"  shape="round">添加班级</Button>
               </React.Fragment>
        );
    }
}
export default Banner;