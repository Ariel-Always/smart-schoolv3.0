import React from 'react'
import { connect } from 'react-redux';
import '../../scss/EditStudentModal.scss'
import { Input, Radio, RadioGroup, DropDown } from '../../../common/index'

class EditStudentModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Gende: '',
            UserName: '',
            UserKey: props.userKey

        }
    }

    onEditStudentNameChange = (e) => {
        console.log(e)

    }
    onGendeChange = (e) => {
        console.log(e)
    }
    render() {
        const { UIState, DataState } = this.props;
        console.log(DataState.GradeStudentPreview.newList ? DataState.GradeStudentPreview.newList[this.state.UserKey].UserName.UserName : '')
        return (
            <div className='EditStudentModal'>
                <div className='Left'></div>
                <div className='Right'>
                    <div className="row">
                        <span className='culonm-1'>
                            学号：
                        </span>
                        <div className='culonm-2'>
                            <span className='UserID-text'>{DataState.GradeStudentPreview.newList ? DataState.GradeStudentPreview.newList[this.state.UserKey].UserID : ''}</span>
                        </div>
                    </div>
                    <div className="row">
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>姓名：
                        </span>
                        <div className='culonm-2'>
                            <Input className='UserName-input'
                                value={DataState.GradeStudentPreview.newList ? DataState.GradeStudentPreview.newList[this.state.UserKey].UserName.UserName : ''}
                                type='text'
                                name='EditStudentName'
                                onChange={this.onEditStudentNameChange} />
                        </div>
                    </div>
                    <div className="row">
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>性别：
                        </span>
                        <div className='culonm-2'>
                            {/* <RadioGroup name='GendeSelect'
                            value = {DataState.GradeStudentPreview.newList?DataState.GradeStudentPreview.newList[this.state.UserKey].Gender:''}
                            onChange = {this.onGendeChange}
                            className='Gende-Radio'
                            >
                                <Radio value='男'>男</Radio>
                                <Radio value='女'>女</Radio>
                                <Radio value='保密'>保密</Radio>
                            </RadioGroup> */}
                            <DropDown

                                dropSelectd={{
                                    value: 0,
                                    title: '保密'
                                }}
                                dropList={[
                                    {
                                        value: 0,
                                        title: '保密'
                                    },
                                    {
                                        value: 1,
                                        title: '男'
                                    },
                                    {
                                        value: 2,
                                        title: '女'
                                    }
                                ]}
                                width={120}
                                height={72}
                            >

                            </DropDown>
                        </div>
                    </div>
                    <div className="row">
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>年级：
                        </span>
                        <div className='culonm-2'>
                            
                            <DropDown

                                dropSelectd={{
                                    value: 0,
                                    title: '一年级'
                                }}
                                dropList={[
                                    {
                                        value: 0,
                                        title: '一年级'
                                    },
                                    {
                                        value: 1,
                                        title: '二年级'
                                    },
                                    {
                                        value: 2,
                                        title: '三年级'
                                    }
                                ]}
                                width={200}
                                height={72}
                            >

                            </DropDown>
                        </div>
                    </div>
                    <div className="row">
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>班级：
                        </span>
                        <div className='culonm-2'>
                            
                            <DropDown

                                dropSelectd={{
                                    value: 0,
                                    title: '1班'
                                }}
                                dropList={[
                                    {
                                        value: 0,
                                        title: '1班'
                                    },
                                    {
                                        value: 1,
                                        title: '2班'
                                    },
                                    {
                                        value: 2,
                                        title: '3班'
                                    }
                                ]}
                                width={200}
                                height={72}
                            >

                            </DropDown>
                        </div>
                    </div>
                    <div className="row">
                        <span className='culonm-1'>
                            身份证号码：
                        </span>
                        <div className='culonm-2'>
                            <Input
                            className='input'
                            value={''}
                            type='text'
                            name='EditStudentIDCard'
                            onChange={this.onEditStudentIDCardChange}
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
                            value={''}
                            type='text'
                            name='EditStudentPhone'
                            onChange={this.onEditStudentPhoneChange}
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
                            value={''}
                            type='text'
                            name='EditStudentMail'
                            onChange={this.onEditStudentMailChange}
                            ></Input>
                        </div>
                    </div>
                    <div className="row">
                        <span className='culonm-1'>
                            家庭住址：
                        </span>
                        <div className='culonm-2'>
                            <Input
                            className='inputarea'
                            
                            type='textarea'
                            rows='2'
                            cols='30'
                            name='EditStudentAddress'
                            onChange={this.onEditStudentAddressChange}
                            ></Input>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    let { UIState, DataState } = state;
    return {
        UIState,
        DataState
    }
};
export default connect(mapStateToProps)(EditStudentModal);