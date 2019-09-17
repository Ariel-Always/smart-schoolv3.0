import UpDataState from '../../actions/UpDataState';
import history from '../../containers/history'

const GetCourseClassDetailsHandleClassMsg = (state = {}, actions) => {
    switch (actions.type) {
        case UpDataState.GET_COURSE_CLASS_DETAILS_HANDEL_CLASS_MSG:
            let data = handleData(actions.data)
            return Object.assign({}, state, { ...data });
        case UpDataState.SET_COURSE_CLASS_NAME:
                let courseClass = Object.assign({}, state.selectData, { CourseClass: actions.data });
            return Object.assign({}, state, { selectData: courseClass });
        case UpDataState.SET_SUBJECT_TEACHER_TRANSFER_MSG:
            let transferTeacher = Object.assign({}, state.transfer, { Teacher: actions.data });
            return Object.assign({}, state, { transfer: transferTeacher });
        case UpDataState.SET_SUBJECT_TEACHER_MSG:
            let selectData = Object.assign({}, state.selectData, { Teacher: actions.data });
            return Object.assign({}, state, { selectData: selectData });
        case UpDataState.SET_SUBJECT_TEACHER_DEFAULT_MSG:
            return Object.assign({}, state, { TeacherID: actions.data.value, TeacherName: actions.data.title });
        case UpDataState.SET_COURSE_CLASS_STUDENT_MSG:
            let selectDataStudent = Object.assign({}, state.selectData, { Student: actions.data });
            return Object.assign({}, state, { selectData: selectDataStudent });
        case UpDataState.SET_COURSE_CLASS_STUDENT_DEFAULT_MSG:
            return Object.assign({}, state, { TableSource: actions.data });
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

    return { ...data, TableSource: TableSource, transfer: { Teacher: {} }, selectData: { CourseClass:{CourseClassName:data.CourseClassName,CourseClassID:data.CourseClassID},Teacher: { value: data.TeacherID, title: data.TeacherName }, Student: TableSource } };
}
export default GetCourseClassDetailsHandleClassMsg;