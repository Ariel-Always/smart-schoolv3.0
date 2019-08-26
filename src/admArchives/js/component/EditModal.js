import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import '../../scss/EditModal.scss'
import { Input } from 'antd'
import { Radio, RadioGroup, DropDown,CheckBox,CheckBoxGroup } from '../../../common/index'

class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Gende: '',
            UserName: '',
            UserKey: props.userKey,
            type:props.type
            

        }
    }
    componentWillMount(){
        const {  DataState } = this.props;
        console.log("dsd")
        if(this.state.type === 'student'){
            this.setState({
                defaultUserName:DataState.GradeStudentPreview.newList ? DataState.GradeStudentPreview.newList[this.state.UserKey].UserName.UserName : '',
                GendeChange:{
                    value: 0,
                    title: '请选择性别'
                },
                GradeChange:{
                    value: 0,
                    title: '请选择年级'
                },
                ClassChange:{
                    value: 0,
                    title: '请选择班级'
                },
                UserIDChange:'',
                IDCardChange:'',
                PhoneChange:'',
                MailChange:'',
                AddressChange:''
            })
        }else if(this.state.type === 'teacher'){
            this.setState({
                defaultUserName:DataState.GradeStudentPreview.newList ? DataState.GradeStudentPreview.newList[this.state.UserKey].UserName.UserName : '',
                GendeChange:{
                    value: 0,
                    title: '请选择性别'
                },
                TitleChange:{
                    value: 0,
                    title: '请选择职称'
                },
                checkedList:[],
                plainOptions:['语文','数学','外语','物理','化学','生物','历史','思想政治','地理','音乐','美术','信息技术'],
                SubjectChange:[],
                UserIDChange:'',
                IDCardChange:'',
                PhoneChange:'',
                MailChange:'',
                AddressChange:''
            })
        }else{
            this.setState({
                defaultUserName:DataState.GradeStudentPreview.newList ? DataState.GradeStudentPreview.newList[this.state.UserKey].UserName.UserName : '',
                GendeChange:{
                    value: 1,
                    title: '男'
                },
                GradeChange:{
                    value: 2,
                    title: '二年级'
                },
                ClassChange:{
                    value: 2,
                    title: '2班'
                },
                UserIDChange:'',
                IDCardChange:'',
                PhoneChange:'',
                MailChange:'',
                AddressChange:''
            })
        }
        
    }
    onEditNameChange = (e) => {
        console.log(e.target.value)
        this.setState({
            UserIDChange:e.target.value
        })

    }
    onEditNameChange = (e) => {
        console.log(e.target.value)
        this.setState({
            defaultUserName:e.target.value
        })

    }
    onEditGendeChange = (e) => {
        console.log(e)
        this.setState({
            GendeChange:e
        })
    }
    onEditGradeChange = (e) => {
        console.log(e)
        this.setState({
           GradeChange:e
        })
    }
    onEditClassChange = (e) => {
        console.log(e)
        this.setState({
            ClassChange:e
        })
    }
    onEditIDCardChange = (e) => {
        console.log(e.target.value)
        this.setState({
            IDCardChange:e.target.value
        })
    }
    onEditPhoneChange = (e) => {
        console.log(e.target.value)
        this.setState({
            PhoneChange:e.target.value
        })
    }
    onEditMailChange = (e) => {
        console.log(e.target.value)
        this.setState({
            MailChange:e.target.value
        })
    }
    onEditAddressChange = (e) => {
        console.log(e.target.value)
        this.setState({
            AddressChange:e.target.value
        })
    }
     
    render() {
        const { UIState, DataState } = this.props;
        
        return (
            <div className='EditModal'>
                <div className='Left'></div>
                <div className='Right'>
                    <div className="row">
                        <span className='culonm-1'>
                            {this.state.type==='student'?'学号：':this.state.type==='teacher'?'工号：':'学号：'}
                        </span>
                        <div className='culonm-2'>
                            <span style={{display:this.state.UserKey !== 'add'?'block':'none'}} className='UserID-text'>{DataState.GradeStudentPreview.newList ? DataState.GradeStudentPreview.newList[this.state.UserKey].UserID : ''}</span>
                            <Input style={{display:this.state.UserKey === 'add'?'block':'none'}} className='UserName-input'
                                type='text'
                                name='EditID'
                                value={this.state.UserIDChange}
                                onChange={this.onEditIDChange} />
                        </div>
                    </div>
                    <div className="row">
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>姓名：
                        </span>
                        <div className='culonm-2'>
                            <Input className='UserName-input'

                                type='text'
                                name='EditName'
                                value={this.state.defaultUserName}
                                onChange={this.onEditNameChange} />
                        </div>
                    </div>
                    <div className="row">
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>性别：
                        </span>
                        <div className='culonm-2'>
                            {/* <RadioGroup name='GendeSelect'
                            value = {DataState.GradePreview.newList?DataState.GradePreview.newList[this.state.UserKey].Gender:''}
                            onChange = {this.onGendeChange}
                            className='Gende-Radio'
                            >
                                <Radio value='男'>男</Radio>
                                <Radio value='女'>女</Radio>
                                <Radio value='保密'>保密</Radio>
                            </RadioGroup> */}
                            <DropDown
                                style={{ zIndex: 3 }}
                                dropSelectd={this.state.UserKey !== 'add'?this.state.GendeChange:{
                                    value: 0,
                                    title: '请选择性别'
                                }}
                                dropList={[
                                    
                                    {
                                        value: 1,
                                        title: '男'
                                    },
                                    {
                                        value: 2,
                                        title: '女'
                                    },{
                                        value: 3,
                                        title: '保密'
                                    }
                                ]}
                                width={120}
                                height={72}
                                onChange = {this.onEditGendeChange}
                            >
                                
                            </DropDown>
                        </div>
                    </div>
                    <div className="row" style={{display:this.state.type==='student'||!this.state.type?'block':'none'}}>
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>年级：
                        </span>
                        <div className='culonm-2'>

                            <DropDown
                                style={{ zIndex: 2 }}
                                dropSelectd={this.state.UserKey !== 'add'?this.state.GradeChange:{
                                    value: 0,
                                    title: '请选择年级'
                                }}
                                dropList={[
                                    {
                                        value: 1,
                                        title: '一年级'
                                    },
                                    {
                                        value: 2,
                                        title: '二年级'
                                    },
                                    {
                                        value: 3,
                                        title: '三年级'
                                    }
                                ]}
                                width={200}
                                height={72}
                                onChange = {this.onEditGradeChange}
                            >

                            </DropDown>
                        </div>
                    </div>
                    <div className="row" style={{display:this.state.type==='teacher'?'block':'none'}}>
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>职称：
                        </span>
                        <div className='culonm-2'>

                            <DropDown
                                style={{ zIndex: 2 }}
                                dropSelectd={this.state.UserKey !== 'add'?this.state.TitleChange:{
                                    value: 0,
                                    title: '请选择职称'
                                }}
                                dropList={[
                                    
                                    {
                                        value: 1,
                                        title: '一级教师'
                                    },
                                    {
                                        value: 2,
                                        title: '二级教师'
                                    }
                                ]}
                                width={200}
                                height={72}
                                onChange = {this.onEditTitleChange}
                            >

                            </DropDown>
                        </div>
                    </div>
                    <div className="row" style={{display:this.state.type!=='teacher'?'block':'none'}}>
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>班级：
                        </span>
                        <div className='culonm-2'>

                            <DropDown
                                style={{ zIndex: 1 }}
                                dropSelectd={this.state.UserKey !== 'add'?this.state.ClassChange:{
                                    value: 0,
                                    title: '请选择班级'
                                }}
                                dropList={[
                                    {
                                        value: 1,
                                        title: '1班'
                                    },
                                    {
                                        value: 2,
                                        title: '2班'
                                    }
                                ]}
                                width={200}
                                height={72}
                                onChange = {this.onEditClassChange}
                            >

                            </DropDown>
                        </div>
                    </div>
                    <div className="row" style={{display:this.state.type==='teacher'?'block':'none'}}>
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>所教学科：
                        </span>
                        <div className='culonm-2'>
                            <CheckBoxGroup className={'checkedBoxGroupMap'} value={this.state.UserKey === 'add'?this.state.checkedList:[]}>
                                <MapPlainOptions plainOptions={this.state.plainOptions}></MapPlainOptions>
                            </CheckBoxGroup>
                        </div>
                    </div>
                    <div className="row">
                        <span className='culonm-1'>
                            身份证号码：
                        </span>
                        <div className='culonm-2'>
                            <Input
                                className='input'
                                value={this.state.IDCardChange}
                                type='text'
                                name='EditIDCard'
                                onChange={this.onEditIDCardChange}
                            ></Input>
                        </div>
                    </div>
                    <div className="row">
                        <span className='culonm-1'>
                            联系电话：
                        </span>
                        <div className='culonm-2'>
                            <Input
                                className='input'
                                value={this.state.PhoneChange}
                                type='text'
                                name='EditPhone'
                                onChange={this.onEditPhoneChange}
                            ></Input>
                        </div>
                    </div>
                    <div className="row">
                        <span className='culonm-1'>
                            电子邮箱：
                        </span>
                        <div className='culonm-2'>
                            <Input
                                className='input'
                                type='text'
                                name='EditMail'
                                value = {this.state.MailChange}
                                onChange={this.onEditMailChange}
                            ></Input>
                        </div>
                    </div>
                    <div className="row">
                        <span className='culonm-1'>
                            家庭住址：
                        </span>
                        <div className='culonm-2'>
                            <Input.TextArea
                                className='inputarea'
                                rows='2'
                                cols='30'
                                name='EditAddress'
                                value={this.state.AddressChange}
                                onChange={this.onEditAddressChange}
                            ></Input.TextArea>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class MapPlainOptions extends React.Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentWillMount(){
        let map = this.props.plainOptions.map((opt,index) => {
            return (
                <CheckBox className={'checkedBoxMap'} key={index} value={opt}>{opt}</CheckBox>
            )
        })
        console.log(map)
        this.setState({
            map:map
        })
    }
   render(){
    return (
        <div>{this.state.map}</div>
    );
   }
    
}
const mapStateToProps = (state) => {
    let { UIState, DataState } = state;
    return {
        UIState,
        DataState
    }
};
export default connect(mapStateToProps)(EditModal);