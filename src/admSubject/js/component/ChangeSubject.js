import React from 'react';
import '../../scss/ChangeSubject.scss'

class ChangeSubject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type : this.props.type,
            GlobalGradeIDs:'',
            SubjectName:''
        }
    }
    componentWillMount(){
        const { DataState, UIState } = this.props;
        console.log(this.state.type)
        if(this.state.type==='change')
        this.setState({
            GlobalGradeIDs:DataState.ChangeSubjectMsg.GlobalGradeIDs,
            SubjectName:DataState.ChangeSubjectMsg.SubjectName
        })
    }
    componentWillReceiveProps(){
        
    }
    render() {
        const { DataState, UIState } = this.props;
        let data = {};
        return (
            
                <div className='chageSubject'>
                    <div className='row clearfix'>
                        <span className='Left'>学科名称：</span>
                        <span className='Right'>{this.state.SubjectName}</span>
                    </div>
                    <div className='row clearfix'>
                        <span className='Left'>开课年级：</span>
                        <span className='Right'>{this.state.GlobalGradeIDs}</span>
                    </div>
                </div>
            
        )
    }
}

export default ChangeSubject