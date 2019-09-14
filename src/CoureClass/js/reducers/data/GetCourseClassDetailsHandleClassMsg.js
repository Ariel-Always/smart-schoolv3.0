import UpDataState from '../../actions/UpDataState';
import history from '../../containers/history'

const GetCourseClassDetailsHandleClassMsg = (state = {}, actions) => {
    switch (actions.type) {
        case UpDataState.GET_COURSE_CLASS_DETAILS_HANDEL_CLASS_MSG:
            let data = handleData(actions.data)
            return Object.assign({}, state, { ...data });

        default:
            return state;
    }
};

function handleData(data) {
    const { Item, ...otherData } = data;
    let TableSource = Item.map((child, index) => {
        return {
            OrderNO: child.OrderNO,
            StudentName: {
                StudentName: child.StudentName,
                StudentImg: child.StudentProfilePictureURL
            },
            StudentID: child.StudentID,
            Gender: child.Gender,
            Class: {
                Class: child.ClassName,
                Grade: otherData.GradeName
            }, 
            key: child.OrderNO - 1
        }
    })
    return { ...data, TableSource: TableSource };
}
export default GetCourseClassDetailsHandleClassMsg;