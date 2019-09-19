import UpDataState from '../../actions/UpDataState';



const GetUserPowerMsg = (state = '', actions) => {
    switch (actions.type) {
        case UpDataState.GET_USER_POWER_MSG:

            let newData = handleData(actions.data)

            return Object.assign({}, state, { data: actions.data, Power: newData });
        default:
            return state;
    }
};
function handleData(data) {
    console.log(data)
    let newData = {}
    data.map((child, index) => {
        if (!newData[child.Category]) {
            newData[child.Category] = [];
            newData[child.Category].push(child)
        }
        else {
            newData[child.Category].push(child)
        }
    })
    return newData
}
export default GetUserPowerMsg;