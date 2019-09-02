import UpDataState from '../../actions/UpDataState';

function handleData(data) {
    let SubjectList = data.SubjectList; 
    let len = SubjectList.length;
    let newSubject = [];
    
    for(let i = 0; i < len; i++){
        let Subject = {value:SubjectList[i].SubjectID,title:SubjectList[i].SubjectName};
        
        
        newSubject.push(Subject)
    }
    
    return {SubjectList:newSubject}
}
const SubjectTeacherMsg = (state={},actions)=>{
    let returnData = {grades:null};
    switch (actions.type) {
        case UpDataState.GET_SUBJECT_TEACHER_MSG:
            returnData = handleData(actions.data);
            
            return {...state,returnData};
        default:
            return state;
    }
} ;


export default  SubjectTeacherMsg;