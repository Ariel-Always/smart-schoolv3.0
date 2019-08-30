import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import '../../scss/EditModal.scss'
import { Input } from 'antd'
import { Radio, RadioGroup, DropDown, CheckBox, CheckBoxGroup, Tips } from '../../../common/index'


class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultUserName: '',
            UserIDChange: '',
            UserKey: props.userKey,
            type: props.type,
            UserIDTipsVisible: false,
            UserIDTipsTitle: '由1-24位字母与数字组成',
            UserNameTipsVisible: false,
            UserNameTipsTitle: '姓名由1-20位的汉字、字母、数字、下划线、空格组成（首尾不允许空格）',
            data: props.data,
            PowerList: props.PowerList,
            checkAll: [],
            indeterminate: [],
            checkedList: [],
            checkedListArr:[],
            plainOptionsArr:[]
        }
    }
    componentWillMount() {
        const { DataState } = this.props;
        console.log(this.state.UserKey)

        if (this.state.UserKey === 'change') {
            this.setState({
                UserIDChange: this.state.data.Name.UserID,
                defaultUserName: this.state.data.Name.Name
            })
        }
        // const PowerList = this.state.PowerList.map((power, index) => {
        //     let checkAll = this.state.checkAll;
        //     let indeterminate = this.state.indeterminate;
        //     let plainOptions = [];
        //     let plainOptionsArr = this.state.plainOptionsArr;
        //     let checkedList = [];
        //     let checkedListArr = this.state.checkedListArr;
        //     this.state.PowerList[index].PowerChild.map((child, index) => {
        //         plainOptions[index] = child.value;
                
        //     })
            
        //     plainOptionsArr[index] = plainOptions;
        //     console.log(plainOptionsArr,index)
        //     indeterminate[index] = true;
        //     checkAll[index] = this.state.data.Power.Powers[index].PowerChild.length !== 0 ? true : false

        //     this.state.data.Power.Powers[index].PowerChild.map((child, key) => {
        //         checkedList[key] = child.value;
        //     })
        //     checkedListArr[index] = checkedList;
        //     this.setState({
        //         checkAll: checkAll,
        //         indeterminate: indeterminate,
        //         checkedListArr: checkedListArr,
        //         plainOptionsArr:plainOptionsArr
        //     })
        //     return (
        //         <div key={this.state.PowerList[index].value}>
        //             <CheckBox
        //                 indeterminate={this.state.indeterminate[index]}
        //                 onChange={this.onCheckAllChange.bind(this, index)}
        //                 checked={this.state.checkAll[index]}
        //             >
        //                 {power.PowerName}
        //                 <span className='checkTips'>[已选择<span style={{ color: 'red' }}>{this.state.data.Power.Powers[index].PowerChild.length}</span>项]</span>
        //             </CheckBox>
        //             <CheckBoxGroup
                        
        //                 value={this.state.checkedListArr[index]}
        //                 onChange={this.onCheckChange.bind(this,index)}
        //             >
        //                 {this.state.PowerList[index].PowerChild.map((child, index) => {
                            
        //                     return(
        //                         <CheckBox 
        //                         value={child.value}
        //                         key = {child.value}
        //                         >{child.PowerChildName}</CheckBox>
        //                     )
        //                 })}
        //             </CheckBoxGroup>
        //         </div>
        //     )
        // })

        // this.setState({
        //     PowerList: PowerList
        // })
    }
    onEditIDChange = (e) => {

        this.setState({
            UserIDChange: e.target.value
        })
        //用户ID（工号/学号）检测  
        //长度是1~30位，只能由字母与数字组成。
        let Test = /^([a-zA-Z0-9]{1,24})$/.test(e.target.value)
        if (!Test) {
            this.setState({
                UserIDTipsVisible: true
            })
        } else {
            this.setState({
                UserIDTipsVisible: false
            })
        }


    }
    onEditNameChange = (e) => {
        console.log(e.target.value)
        //用户姓名检测
        //用户姓名由1-20位的汉字、字母、数字、下划线组成。
        let value = e.target.value;
        let Test = /^[a-zA-Z0-9_\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_\u4e00-\u9fa5]$|^[a-zA-Z0-9_\u4e00-\u9fa5]{1,50}$/.test(value)

        this.setState({
            defaultUserName: e.target.value
        })

        if (!Test) {
            this.setState({
                UserNameTipsVisible: true
            })
        } else {
            this.setState({
                UserNameTipsVisible: false
            })
        }
    }


    // 新
    onCheckAllChange = (index,e) => {
        console.log(e,index);
        let checkedListArr = this.state.checkedListArr;
        let indeterminate = this.state.indeterminate;
        let checkAll = this.state.checkAll;
        checkedListArr[index] = e.target.checked ? this.state.plainOptionsArr[index] : [];
        indeterminate[index] = false;
        checkAll[index] = e.target.checked
        this.setState({
            checkedListArr: checkedListArr,
            indeterminate: indeterminate,
            checkAll: checkAll,
          });
    }
    onCheckChange = (index,value,e) => {
        console.log(index,value,this.state.plainOptionsArr[index],this.state.checkedListArr)
        let checkedListArr = this.state.checkedListArr;
        let indeterminate = this.state.indeterminate;
        let checkAll = this.state.checkAll;
        checkedListArr[index] = value;
        indeterminate[index] = this.state.plainOptionsArr[index].length===value.length||value===[]?false:true;
        checkAll[index] = this.state.plainOptionsArr[index].length===value.length
        this.setState({
            checkedListArr: checkedListArr,
            indeterminate: indeterminate,
            checkAll: checkAll,
          });
    }



    render() {
        const { UIState, DataState } = this.props;

        return (
            <div className='EditModal_Admin'>
                <div className='Left'></div>
                <div className='Right'>
                    <div className="row clearfix" style={{ marginTop: 18 + 'px' }}>
                        <span className='culonm-1'>
                            {'工号：'}
                        </span>
                        <div className='culonm-2'>

                            <Tips className='tips-edit' getPopupContainer={() => document.getElementById('123')} visible={this.state.UserIDTipsVisible} title={'工号' + this.state.UserIDTipsTitle} >
                                <Input maxLength={24} id="123" style={{ display: 'block' }} className='UserName-input'
                                    type='text'
                                    name='EditID'
                                    value={this.state.UserIDChange}
                                    onChange={this.onEditIDChange} />
                            </Tips>
                        </div>
                    </div>
                    <div className="row clearfix">
                        <span className='culonm-1'>
                            账号名称：
                        </span>
                        <div className='culonm-2'>
                            <Tips visible={this.state.UserNameTipsVisible} title={this.state.UserNameTipsTitle} >
                                <Input className='UserName-input'
                                    maxLength={20}
                                    type='text'
                                    name='EditName'
                                    value={this.state.defaultUserName}
                                    onChange={this.onEditNameChange} />
                            </Tips>
                        </div>
                    </div>
                    <div className="row clearfix">
                        <span className='culonm-1'>
                            权限分配：
                        </span>
                        <div className='culonm-2 culonm-3'>
                            {this.state.PowerList.map((power, index) => {
            let checkAll = this.state.checkAll;
            let indeterminate = this.state.indeterminate;
            let plainOptions = [];
            let plainOptionsArr = this.state.plainOptionsArr;
            let checkedList = [];
            let checkedListArr = this.state.checkedListArr;
            console.log(power)
            power.PowerChild.map((child, index) => {
                plainOptions[index] = child.value;
                
            })
            
            plainOptionsArr[index] = plainOptions;
            console.log(plainOptionsArr,index)
            indeterminate[index] = true;
            checkAll[index] = this.state.data.Power.Powers[index].PowerChild.length !== 0 ? true : false

            this.state.data.Power.Powers[index].PowerChild.map((child, key) => {
                checkedList[key] = child.value;
            })
            checkedListArr[index] = checkedList;
            this.setState({
                checkAll: checkAll,
                indeterminate: indeterminate,
                checkedListArr: checkedListArr,
                plainOptionsArr:plainOptionsArr
            })
            return (
                <div key={this.state.PowerList[index].value}>
                    <CheckBox
                        indeterminate={this.state.indeterminate[index]}
                        onChange={this.onCheckAllChange.bind(this, index)}
                        checked={this.state.checkAll[index]}
                    >
                        {power.PowerName}
                        <span className='checkTips'>[已选择<span style={{ color: 'red' }}>{this.state.data.Power.Powers[index].PowerChild.length}</span>项]</span>
                    </CheckBox>
                    <CheckBoxGroup
                        
                        value={this.state.checkedListArr[index]}
                        onChange={this.onCheckChange.bind(this,index)}
                    >
                        {this.state.PowerList[index].PowerChild.map((child, index) => {
                            console.log(child.PowerChildName)
                            return(
                                <CheckBox 
                                value={child.value}
                                key = {child.value}
                                >{child.PowerChildName}</CheckBox>
                            )
                        })}
                    </CheckBoxGroup>
                </div>
            )
        })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class MapPlainOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount() {
        let map = this.props.plainOptions.map((opt, index) => {
            return (
                <CheckBox className={'checkedBoxMap'} key={index} value={opt}>{opt}</CheckBox>
            )
        })
        console.log(map)
        this.setState({
            map: map
        })
    }
    render() {
        return (
            <div>{this.state.map}</div>
        );
    }

}
MapPlainOptions.defaultProps = {
    plainOptions: []
}
const mapStateToProps = (state) => {
    let { UIState, DataState } = state;
    return {
        UIState,
        DataState
    }
};
export default connect(mapStateToProps)(EditModal);