import React,{Component} from 'react';

class TeacherTabWrapper extends Component{
    render() {

        const {Teachers} = this.props;

        return (

            <div className="admclass-teacher-wrapper clearfix">

                <div className="admclass-teacher-ganger">

                    <div className="admclass-teacher-photo" style={{backgroundImage:`url(${Teachers.Ganger&&Teachers.Ganger.PhotoPath})`}}></div>

                    <div className="admclass-teacher-info">

                        <div className="admclass-teacher-tab">

                            <div className="admclass-teacher-name" title={Teachers.Ganger&&Teachers.Ganger.UserName}>{Teachers.Ganger&&Teachers.Ganger.UserName}</div>
                            
                        </div>

                        <div className="admclass-teacher-id" title={Teachers.Ganger&&Teachers.Ganger.UserID}>{Teachers.Ganger&&Teachers.Ganger.UserID}</div>

                    </div>

                    <div className="cooperate ganger">

                        <div className="reset">更改班主任</div>

                    </div>

                </div>

                {
                    Teachers.List&&Teachers.List.map((item,key) => {

                        let projects = '';
                        switch (item.SubjectName) {
                            case '语文':
                            case '物理':
                                projects = 'physics';
                                break;
                            case '英语':
                            case '生物':
                                projects = 'english';
                                break;
                            case '数学':
                            case '政治':
                                projects = 'math';
                                break;
                            case '历史':
                            case '地理':
                                projects = 'history';
                                break
                            default:
                                projects = 'other';
                        }

                       return <div key={key} className="admclass-teacher-item">

                                   <div className="admclass-teacher-photo" style={{backgroundImage:`url(${item.PhotoPath})`}}></div>

                                   <div className="admclass-teacher-info">

                                       <div className="admclass-teacher-tab">

                                           <div className="admclass-teacher-name" title={item.UserName}>{item.UserName}</div>
                                           
                                           <div className={`admclass-teacher-project ${projects}`}>{item.SubjectName}</div>
                                       
                                       </div>

                                       <div className="admclass-teacher-id" title={item.UserID}>{item.UserID}</div>

                                   </div>

                                   <div className="cooperate">

                                       <div className="reset">更改</div>

                                       <div className="line"></div>

                                       <div className="delete">删除</div>

                                   </div>

                               </div>

                    })

                }

            </div>
        );
    }
}
export default TeacherTabWrapper;