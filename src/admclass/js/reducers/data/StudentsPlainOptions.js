import UpDataState from '../../actions/UpDataState';
const StudentsPlainOptions = (state={plainOptions:[]},actions) => {
    switch (actions.type) {
        case UpDataState.INIT_STUDEUNT_PLAIN_OPTIONS:
            return {...state,plainOptions:[...actions.list]};
        default:
            return state;
    }
};
export default StudentsPlainOptions;