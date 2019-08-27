import React, { memo } from 'react'
import introduceBg from '../../images/img-introduce.png';
class Introduce extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <React.Fragment>

                    <img className='img-introduce' alt='introduce-img' src={introduceBg} />
                    <div className='introduce-tips'>
                        <span className='tips-1'>您可以在本模块进行如下操作：</span>
                        <li className='tips-2'><span className='tips-3'>管理员账号管理</span><span className='tips-4'>录入、编辑普通管理员账号，并分配各个管理员的访问权限等</span></li>
                        <li className='tips-2'><span className='tips-3'>学生/教师/领导账号管理</span><span className='tips-4'>查看账号信息，并可重置账号的登录密码。</span></li>
                        

                    </div>
            </React.Fragment>
        )
    }
}

export default Introduce