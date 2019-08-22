import React,{Component} from 'react';
import {DropDown} from "../../../common";

class AdjustClassModal extends Component{
    render() {

        const {
            checkList,
            schoolClassList,
            gradeSelecd,
            classSelectd,
            classDisabled,
            gradeSelectChange,
            classSelectChange
        } = this.props;

        let stuList = checkList.map(item=>{return JSON.parse(item)});
        console.log(schoolClassList);
        let gradeList = schoolClassList.map((item) => {

            return {value:item.GradeID,title:item.GradeName}

        });
        gradeList.unshift({value:0,title:"请选择年级"});

        console.log(gradeList);

        return (
            <div className="adjust-class-wrapper">

                <div className="adjust-class-obj">

                    <span className="props">调班对象:</span>

                    <span className="objs">
                        {
                            stuList.map(item => {
                                return `${item.name}、`;
                            })
                        }
                        <span className="total">(共<span className="red">{stuList.length}</span>人)</span>

                    </span>

                </div>

                <div className="adjust-class-select">

                    <span className="props">目标班级:</span>

                    <DropDown dropSelectd={gradeSelecd?gradeSelecd:''}
                              dropList={gradeList} height={56} onChange={(e)=>gradeSelectChange(e)}></DropDown>

                    <DropDown dropSelectd ={classSelectd?classSelectd:''} onChange={e=>classSelectChange(e)} disabled={classDisabled}></DropDown>

                </div>

            </div>
        );
    }
}
export default AdjustClassModal;