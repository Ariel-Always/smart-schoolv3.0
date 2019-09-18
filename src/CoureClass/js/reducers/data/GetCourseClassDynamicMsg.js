import UpDataState from '../../actions/UpDataState';
import history from '../../containers/history'


const GetCourseClassDynamicMsg = (state = {}, actions) => {
    switch (actions.type) {
        case UpDataState.GET_COURSE_CLASS_DYNAMIC_MSG:
            
            let data = handleData(actions.data,actions.subject,actions.Class)
            return Object.assign({}, state, {tableSource:data} );
        default:
            return state;
    }
};

function handleData(data) {
    let newData = data.map((child,index) => {
        let {Flag,OperateParams,...Data} = child
        return {...Data,OperateParams:{OperateParams:OperateParams,Flag:Flag}}
    })
    return newData
}
export default GetCourseClassDynamicMsg;