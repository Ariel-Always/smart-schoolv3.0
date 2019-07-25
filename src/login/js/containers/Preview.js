import React,{Component} from 'react';
import {Radio,RadioGroup,CheckBox,CheckBoxGroup} from "../../../common";
import '../../../common/index.scss';
class Preview extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedValue : 'PC',
            plainOptions:['iOS','Android',"windows","linux"],
            checkedList:['Android'],
            checkAll:false
        }
    }
    handleChange(e){
        console.log('change');
        this.setState({selectedValue:e});
    }
    changeAll(e) {

    }
    changeItem(e){
       this.setState({checkedList:e.checkedList,checkAll:e.checkAll});
       //e.checkedList.length===this.state.plainOptions.length?this.setState({checkAll}):
    }
    render() {
        return (
            <div className='frame_content_right_side'>
              <RadioGroup name="platform" selectedValue={this.state.selectedValue} onChange={(event)=>{this.handleChange(event)}}>
                  <Radio value="PC" disabled>PC</Radio>
                  <Radio value="APP">APP</Radio>
                  <Radio value="WAP">WAP</Radio>
              </RadioGroup>
                <CheckBox options={{name:'1',isGroup:true,checkAll:this.state.checkAll,changeItem:(event)=>this.changeItem(event),checkedList:this.state.checkedList, plainOptions:this.state.plainOptions}}>all</CheckBox>
                <CheckBoxGroup options={{name:"1",changeItem:(event)=>this.changeItem(event),checkedList:this.state.checkedList,optLength:this.state.plainOptions.length}}>
                    <CheckBox value="Android" disabled>Android</CheckBox>
                    <CheckBox value="iOS">iOS</CheckBox>
                    <CheckBox value="windows" >windows</CheckBox>
                    <CheckBox value="linux">linux</CheckBox>
                </CheckBoxGroup>
            </div>
        );
    }
}
export default Preview;