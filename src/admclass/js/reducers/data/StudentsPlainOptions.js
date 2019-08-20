import UpDataState from '../../actions/UpDataState';
const StudentsPlainOptions = (state=[],actions) => {
    switch (actions.type) {
        case UpDataState.INIT_STUDEUNT_PLAIN_OPTIONS:
            return [...state,...actions.list];
        default:
            return state;
    }
};
export default StudentsPlainOptions;