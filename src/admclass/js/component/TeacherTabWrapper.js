import React,{Component} from 'react';

import HeaderImg from '../../images/teacher-head-img.png';

class TeacherTabWrapper extends Component{
    render() {

        const {Teachers} = this.props;
        console.log(Teachers);
        return (

            <div className="admclass-teacher-wrapper clearfix">

                <div className="admclass-teacher-ganger">

                    <div className="admclass-teacher-photo" style={{backgroundImage:`url(${HeaderImg})`}}></div>

                    <div className="admclass-teacher-info">

                        <div className="admclass-teacher-name">{Teachers.Ganger&&Teachers.Ganger.UserName}</div>

                        <div className="admclass-teacher-id">{Teachers.Ganger&&Teachers.Ganger.UserID}</div>

                    </div>

                </div>

                {
                    Teachers.List&&Teachers.List.map((item,key) => {

                       return <div className="admclass-teacher-item">

                                   <div className="admclass-teacher-photo" style={{backgroundImage:`url(${HeaderImg})`}}></div>

                                   <div className="admclass-teacher-info">

                                       <div className="admclass-teacher-name">{Teachers.Ganger&&Teachers.Ganger.UserName}</div>

                                       <div className="admclass-teacher-id">{Teachers.Ganger&&Teachers.Ganger.UserID}</div>

                                   </div>

                               </div>

                    })

                }

            </div>
        );
    }
}
export default TeacherTabWrapper;