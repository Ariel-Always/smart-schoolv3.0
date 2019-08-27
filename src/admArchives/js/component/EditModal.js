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
            Gende: '',
            UserName: '',
            UserKey: props.userKey,
            type: props.type,
            UserIDTipsVisible: false,
            UserIDTipsTitle: '由1-24位字母与数字组成',
            UserNameTipsVisible: false,
            UserNameTipsTitle: '姓名由1-20位的汉字、字母、数字、下划线、空格组成（首尾不允许空格）',
            GradeTipsVisible: false,
            GradeTipsTitle: '请选择年级',
            TitleTipsVisible: false,
            TitleTipsTitle: '请选择职称',
            ClassTipsVisible: false,
            ClassTipsTitle: '请选择班级',
        }
    }
    componentWillMount() {
        const { DataState } = this.props;
        console.log(this.state.UserKey)
        if (this.state.type === 'student') {
            this.setState({
                defaultUserName: this.state.UserKey === 'add' ? '' : DataState.GradeStudentPreview.newList ? DataState.GradeStudentPreview.newList[this.state.UserKey].UserName.UserName : '',
                GendeChange: this.state.UserKey === 'add' ? {
                    value: 0,
                    title: '请选择性别'
                } : {
                        value: 3,
                        title: '保密'
                    },
                GradeChange: this.state.UserKey === 'add' ? {
                    value: 0,
                    title: '请选择年级'
                } : {
                        value: 1,
                        title: '一年级'
                    },
                ClassChange: this.state.UserKey === 'add' ? {
                    value: 0,
                    title: '请选择班级'
                } : {
                        value: 1,
                        title: '1班'
                    },
                UserIDChange: '',
                IDCardChange: '',
                PhoneChange: '',
                MailChange: '',
                AddressChange: ''
            })
        } else if (this.state.type === 'teacher') {
            this.setState({
                defaultUserName: this.state.UserKey === 'add' ? '' : DataState.SubjectTeacherPreview.newList ? DataState.SubjectTeacherPreview.newList[this.state.UserKey].UserName.UserName : '',
                GendeChange: this.state.UserKey === 'add' ? {
                    value: 0,
                    title: '请选择性别'
                } : {
                        value: 3,
                        title: '保密'
                    },
                TitleChange: this.state.UserKey === 'add' ? {
                    value: 0,
                    title: '请选择职称'
                } : {
                        value: 1,
                        title: '一级教师'
                    },
                checkedList: this.state.UserKey === 'add' ? [] : ['数学', '外语', '物理'],
                plainOptions: ['语文', '数学', '外语', '物理', '化学', '生物', '历史', '思想政治', '地理', '音乐', '美术', '信息技术'],
                SubjectChange: '',
                UserIDChange: '',
                IDCardChange: '',
                PhoneChange: '',
                MailChange: '',
                AddressChange: ''
            })
        } else {
            this.setState({
                defaultUserName: DataState.GradeStudentPreview.newList ? DataState.GradeStudentPreview.newList[this.state.UserKey].UserName.UserName : '',
                GendeChange: {
                    value: 1,
                    title: '男'
                },
                GradeChange: {
                    value: 2,
                    title: '二年级'
                },
                ClassChange: {
                    value: 2,
                    title: '2班'
                },
                UserIDChange: '',
                IDCardChange: '',
                PhoneChange: '',
                MailChange: '',
                AddressChange: ''
            })
        }

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
    onEditGendeChange = (e) => {
        console.log(e)
        this.setState({
            GendeChange: e
        })
    }
    onEditGradeChange = (e) => {
        console.log(e)
        this.setState({
            GradeChange: e
        })
    }
    onEditClassChange = (e) => {
        console.log(e)
        this.setState({
            ClassChange: e
        })
    }
    onEditIDCardChange = (e) => {
        console.log(e.target.value)
        this.setState({
            IDCardChange: e.target.value
        })
    }
    onEditPhoneChange = (e) => {
        console.log(e.target.value)
        this.setState({
            PhoneChange: e.target.value
        })
    }
    onEditMailChange = (e) => {
        console.log(e.target.value)
        this.setState({
            MailChange: e.target.value
        })
    }
    onEditAddressChange = (e) => {
        console.log(e.target.value)
        this.setState({
            AddressChange: e.target.value
        })
    }
    changeCheckBox = (checkedList) => {
        console.log(checkedList)
        this.setState({
            checkedList: checkedList
        })
    }
    render() {
        const { UIState, DataState } = this.props;

        return (
            <div className='EditModal'>
                <div className='Left'></div>
                <div className='Right'>
                    <div className="row clearfix" style={{ marginTop: this.state.type === 'student' || !this.state.type ? 18 + 'px' : 5 + 'px' }}>
                        <span className='culonm-1'>
                            {this.state.type === 'student' ? '学号：' : this.state.type === 'teacher' ? '工号：' : '学号：'}
                        </span>
                        <div className='culonm-2'>
                            <span style={{ display: this.state.UserKey !== 'add' ? 'block' : 'none' }} className='UserID-text'>{this.state.UserKey !== 'add' ? DataState.GradeStudentPreview.newList ? DataState.GradeStudentPreview.newList[this.state.UserKey].UserID : '' : ''}</span>
                            <Tips getPopupContainer={() => document.getElementById('123')} visible={this.state.UserIDTipsVisible} title={(this.state.type === 'student' ? '学号' : this.state.type === 'teacher' ? '工号' : '学号') + this.state.UserIDTipsTitle} >
                                <Input maxLength={24} id="123" style={{ display: this.state.UserKey === 'add' ? 'block' : 'none' }} className='UserName-input'
                                    type='text'
                                    name='EditID'
                                    value={this.state.UserIDChange}
                                    onChange={this.onEditIDChange} />
                            </Tips>
                        </div>
                    </div>
                    <div className="row clearfix">
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>姓名：
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
                                dropSelectd={this.state.GendeChange}
                                dropList={[
                                    {
                                        value: 1,
                                        title: '男'
                                    },
                                    {
                                        value: 2,
                                        title: '女'
                                    }, {
                                        value: 3,
                                        title: '保密'
                                    }
                                ]}
                                width={120}
                                height={72}
                                onChange={this.onEditGendeChange}
                            >

                            </DropDown>
                        </div>
                    </div>
                    <div className="row clearfix" style={{ display: this.state.type === 'student' || !this.state.type ? 'block' : 'none' }}>
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>年级：
                        </span>
                        <div className='culonm-2'>
                            
                                <DropDown
                                    style={{ zIndex: 2 }}
                                    dropSelectd={this.state.GradeChange}
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
                                    onChange={this.onEditGradeChange}
                                >

                                </DropDown>
                            
                        </div>
                    </div>
                    <div className="row clearfix" style={{ display: this.state.type === 'teacher' ? 'block' : 'none' }}>
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>职称：
                        </span>
                        <div className='culonm-2'>
                            

                                <DropDown
                                    style={{ zIndex: 2 }}
                                    dropSelectd={this.state.UserKey !== 'add' ? this.state.TitleChange : {
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
                                    onChange={this.onEditTitleChange}
                                >

                                </DropDown>
                            
                        </div>
                    </div>
                    <div className="row clearfix" style={{ display: this.state.type !== 'teacher' ? 'block' : 'none' }}>
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>班级：
                        </span>
                        <div className='culonm-2'>
                                <DropDown
                                    style={{ zIndex: 1 }}
                                    dropSelectd={this.state.ClassChange}
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
                                    onChange={this.onEditClassChange}
                                >
                                </DropDown>
                        </div>
                    </div>
                    <div className="row clearfix row-subject" style={{ display: this.state.type === 'teacher' ? 'block' : 'none' }}>
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>所教学科：
                        </span>
                        <div className='culonm-2'>
                            <CheckBoxGroup onChange={this.changeCheckBox} className={'checkedBoxGroupMap'} value={this.state.checkedList}>
                                <MapPlainOptions plainOptions={this.state.plainOptions}></MapPlainOptions>
                            </CheckBoxGroup>
                        </div>
                    </div>
                    <div className="row clearfix">
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
                    <div className="row clearfix">
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
                    <div className="row clearfix">
                        <span className='culonm-1'>
                            电子邮箱：
                        </span>
                        <div className='culonm-2'>
                            <Input
                                className='input'
                                type='text'
                                name='EditMail'
                                value={this.state.MailChange}
                                onChange={this.onEditMailChange}
                            ></Input>
                        </div>
                    </div>
                    <div className="row clearfix">
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