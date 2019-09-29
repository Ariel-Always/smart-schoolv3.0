import UpDataState from '../../actions/UpDataState';
const GetTeachingSolutionMsg = (state = { solutionData: [] }, actions) => {
    switch (actions.type) {
        case UpDataState.GET_TEACHING_SOLUTION_MSG:
            const {List,...others} = actions.data;
            return Object.assign({}, state, { solutionData: List,...others });
        default:
            return state;
    }
};
function handleData(data) {
    const {List,...others} = data;
    return data;
}
export default GetTeachingSolutionMsg;