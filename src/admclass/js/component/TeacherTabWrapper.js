import React,{Component} from 'react';
class TeacherTabWrapper extends Component{
    render() {

        const {Teachers} = this.props;
        console.log(Teachers);
        return (

            <div className="admclass-teacher-wrapper clearfix">

                <div className="admclass-teacher-ganger">

                </div>

                {
                    Teachers.List&&Teachers.List.map((item,key) => {
                       return <div className="admclass-teacher-item">

                               </div>
                    })
                }

            </div>
        );
    }
}
export default TeacherTabWrapper;