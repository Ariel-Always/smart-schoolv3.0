import UpDataState from '../../actions/UpDataState';
const StudentsCheckList = (state=[],actions) => {
    switch (actions.type) {
        case UpDataState.STUDENTS_CHECK_LIST_CHANGE:
            return [...state,...actions.list];
        default:
            return state;
    }
};
export default StudentsCheckList;