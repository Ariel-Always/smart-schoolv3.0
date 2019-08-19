import UpDataState from '../../actions/UpDataState';
const TheStudentList = (state={},actions) => {
    switch (actions.type) {
        case UpDataState.GET_THE_CLASS_STUDENTS:
            return {...state,...actions.data};
        default:
            return state;
    }
};
export default TheStudentList;