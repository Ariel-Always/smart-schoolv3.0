import UpDataState from '../../actions/UpDataState';
import history from '../../containers/history'


const GetCourseClassRecordMsg = (state = {}, actions) => {
    switch (actions.type) {
        case UpDataState.GET_COURSE_CLASS_RECORD_MSG:
            
            let data = handleData(actions.data,actions.subject,actions.Class)
            return Object.assign({}, state, {tableSource:data} );
        default:
            return state;
    }
};

function handleData(data) {
    let newData = data.map((child,index) => {
        let {Flag,OperateParams,CourseClassIDs,...Data} = child
        let params = OperateParams.split('-');
        let OperateContent = '';
        params.map((param,key) => {
            if(key%2){
                
                OperateContent += `<span className='key-params'>${param}</span>`
                
            }else{
                OperateContent += param
            }
        })
        return {...Data,OperateParams:{OperateParams:params,Flag:Flag,CourseClassIDs:CourseClassIDs}}
    })
    return newData
}
export default GetCourseClassRecordMsg;