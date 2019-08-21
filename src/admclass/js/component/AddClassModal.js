import React,{Component} from 'react';
import {DropDown} from "../../../common";
import {Input} from "antd";

class AddClassModal extends Component{

    constructor(props) {
        super(props);
        this.state={
            inputValue:''
        }
    }


    inputChange(e){
        console.log(e.target.value);

       this.setState({inputValue:e.target.value});

    }

    render() {

        const {grade,addClassDropChange} =  this.props;

        let gradeList = grade.map((item,key) => {

            return {value:item.GradeID,title:item.GradeName};

        });

        gradeList.unshift({title:"请选择年级",value:0});

        return (

           <React.Fragment>

               <div className="addclass-select-grade">

                   <span className="props">选择年级:</span>

                    <DropDown  dropSelectd={{title:"请选择年级",value:0}} onChange={(e)=>addClassDropChange(e)} dropList={gradeList} height={72} ></DropDown>

               </div>

               <div className="addclass-classname-wrapper">

                    <div className="props">班级名称:</div>

                   <div>
                       <Input type="text" value={this.state.inputValue} placeholder="请输入班级名称" onChange={this.inputChange.bind(this)}/>
                   </div>

               </div>

           </React.Fragment>
        );
    }
}
export default AddClassModal;