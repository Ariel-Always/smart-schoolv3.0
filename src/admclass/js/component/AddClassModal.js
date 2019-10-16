import React,{Component} from 'react';
import {DropDown} from "../../../common";
import {Input} from "antd";

class AddClassModal extends Component{

    render() {

        const {grade,addClassDropChange,
            inputDisabled,inputValue,inputChange,
            selectedValue,selectTips,selectTipsShow,
            inputTips,inputTipsShow
        } =  this.props;

        let gradeList = grade.map((item,key) => {

            return {value:item.GradeID,title:item.GradeName};

        });

        return (

           <React.Fragment>

               <div className="addclass-select-grade">

                   <span className="props">选择年级:</span>

                    <DropDown style={{zIndex:10}} width={150} dropSelectd={selectedValue} onChange={(e)=>addClassDropChange(e)} dropList={gradeList} height={120} ></DropDown>

                    <span className="error-tips" style={{display:`${selectTipsShow?'inline-block':'none'}`}}>{selectTips}</span>

               </div>

               <div className="addclass-classname-wrapper">

                    <span className="props">班级名称:</span>

                    <Input type="text" value={inputValue}
                           placeholder="请输入班级名称" onChange={(e)=>inputChange(e)}
                           disabled={inputDisabled}
                    />

                   <div className="error-tips" style={{display:`${inputTipsShow?'block':'none'}`}}>{inputTips}</div>

               </div>

           </React.Fragment>
        );
    }
}
export default AddClassModal;