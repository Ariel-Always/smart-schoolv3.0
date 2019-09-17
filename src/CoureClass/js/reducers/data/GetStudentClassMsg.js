import UpDataState from '../../actions/UpDataState';
import history from '../../containers/history'

const GetStudentClassMsg = (state = {}, actions) => {
    switch (actions.type) {
        case UpDataState.GET_GRADE_CLASS_MSG:
            return Object.assign({}, state, { GradeClass :actions.data });
        default:
            return state;
    }
};

function handleData(data) {
    
    let newdata = data.map((child,index) => {
        return{
            value:child.teacherID,
            title:child.teacherName
        }
    })
    return newdata;
}
export default GetStudentClassMsg;