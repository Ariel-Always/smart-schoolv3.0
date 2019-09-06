import UpDataState from '../../actions/UpDataState';




const SetSubjectTeacherMsg = (state = '', actions) => {
    switch (actions.type) {
        case UpDataState.SET_SUBJECT_TEACHER_MSG:
                let SubjectTeacherList = {};
            if(actions.data.grades === 'P1')
            SubjectTeacherList = Object.assign({},state.SubjectTeacherList,{P1:handleData(actions.data.Teacher.data.TeacherInfoItem)})
            else if(actions.data.grades === 'P2')
            SubjectTeacherList = Object.assign({},state.SubjectTeacherList,{P2:handleData(actions.data.Teacher.data.TeacherInfoItem)})
            else if(actions.data.grades === 'P3')
            SubjectTeacherList = Object.assign({},state.SubjectTeacherList,{P3:handleData(actions.data.Teacher.data.TeacherInfoItem)})
            
            return Object.assign({}, state,{ SubjectTeacherList: SubjectTeacherList});
        case UpDataState.GET_SUBJECT_TEACHER_MSG:
            return Object.assign({}, state,{ SubjectTeacherMsg: actions.data });
        default:
            return state;
    }
};
function handleData(data){
    return data.map((child,index)=> {
        return {
            id:child.teacherID,
            name:child.teacherName
        }
    })

}
export default SetSubjectTeacherMsg;