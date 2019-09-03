import React,{Component} from 'react';

import { Button } from "../../../../common";

class TopButtons extends Component{

    render() {

        return (

            <div className="teacher-top-btns clearfix">

                <Button color="blue" className="teacher-btn adjust-schedule">调整课表</Button>

                <Button color="blue" className="teacher-btn import-schedule">导入课表</Button>

                <Button color="blue" className="teacher-btn add-temporary-class">添加临时课程</Button>

            </div>

        );

    }

}

export default TopButtons;