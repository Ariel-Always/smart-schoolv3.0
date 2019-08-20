import React from 'react'
import { connect } from 'react-redux';
import '../../scss/EditStudentModal.scss'
import { Input} from '../../../common/index'

class EditStudentModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    onEditStudentNameChange = (e) => {
        console.log(e)
    }
    render(){
        return (
            <div className='EditStudentModal'>
                <div className='Left'></div>
                <div className='Right'>
                    <div className="row">
                        <span className='culonm-1'>
                            学号：
                        </span>
                        <div className='culonm-2'>
                            <span className='UserID-text'>201112301144</span>
                            </div>
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>姓名：
                        </span>
                        <div className='culonm-2'>
                            <Input className='UserName-input' 
                            value={'张三'}
                            type='text'
                            name='EditStudentName'
                            onChange={this.onEditStudentNameChange} />
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default EditStudentModal;