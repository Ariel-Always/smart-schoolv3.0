import UpDataState from '../../actions/UpDataState';
import English from '../../../images/English.png';
import Biology from '../../../images/Biology.png';
import Chemistry from '../../../images/Chemistry.png';
import Geography from '../../../images/Geography.png';
import History from '../../../images/History.png';
import Physics from '../../../images/Physics.png';
import Politics from '../../../images/Politics.png';
import Maths from '../../../images/Math.png';
import Chinese from '../../../images/Chinese.png';
import Others from '../../../images/Others.png';


const SubjectMsg = (state = '', actions) => {
    switch (actions.type) {
        case UpDataState.GET_SUBJECT_MSG:
            let { SubjectItem, ...data } = actions.data;
            let oldData = actions.data;
            let newData = handleData(SubjectItem)

            return Object.assign({}, state, { ...data, SubjectItem: newData, oldData: oldData });
        case UpDataState.GET_SUBJECT_MODAL_MSG:
           let addSubjectMsg = handleAddSubjectMsg(actions.data.ItemSubject)

            return Object.assign({}, state, { addSubjectMsg:addSubjectMsg});
        default:
            return state;
    }
};
function handleAddSubjectMsg(data){
    let initData = [{ value: 0, title: '自定义',GlabalGrades:'' }]
    let endData = data.map((child,index) => {
        let value = child.SubjectID;
        let title = child.SubjectName;

        //let GlabalGrades = handleAllGrades(child.GlabalGrades);
        return {
            value:value ,
            title:title ,
            GlabalGrades:child.GlabalGrades ,
        }
    })
    let newData = initData.concat(endData)
    return newData;
}
function handleAllGrades(grade) {
    let endGrade = '';
    let gradeArr1 = grade.split(',');
    if (!gradeArr1.length)
        return '';
    let gradeArr2 = gradeArr1.map((child, index) => {
        return child.split('-')[0];
    })
    return gradeArr2
}
function handleData(data) {

    let newData = data.map((child, index) => {
        let SubjectName = handleSubjectName(child)
        // {
        //     SubjectID:child.SubjectID,
        //     SubjectName:child.SubjectName,
        //     SubjectImg:SubjectImg 
        // }; 
        let Grades = {
            P1Grades: handleGrade(child.P1Grades),
            P2Grades: handleGrade(child.P2Grades),
            P3Grades: handleGrade(child.P3Grades)
        }
        let Teacher = handleTeacher(child.Teachers)
        let key = index;
        return {
            SubjectName: SubjectName,
            Grades: Grades,
            Teacher: Teacher,
            key: key
        }
    })
    return newData
}

function handleSubjectName(Subject) {
    let SubjectLogo = Others;
    if (Subject.IsDefault) {
        if (Subject.SubjectID === 'ENGLISH')
            SubjectLogo = English;
        else if (Subject.SubjectID === 'MATHS')
            SubjectLogo = Maths;
        else if (Subject.SubjectID === 'CHINESE')
            SubjectLogo = Chinese;
        else if (Subject.SubjectID === 'GEOGRAPHY')
            SubjectLogo = Geography;
        else if (Subject.SubjectID === 'HISTORY')
            SubjectLogo = History;
        else if (Subject.SubjectID === 'POLITICS')
            SubjectLogo = Politics;
        else if (Subject.SubjectID === 'PHYSICS')
            SubjectLogo = Physics;
        else if (Subject.SubjectID === 'CHEMISTRY')
            SubjectLogo = Chemistry;
        else if (Subject.SubjectID === 'BIOLOGY')
            SubjectLogo = Biology;
    }
    return {
        SubjectImg: SubjectLogo,
        SubjectName: Subject.SubjectName,
        SubjectID: Subject.SubjectID
    }
}
function handleTeacher(teacher) {
    let teacherArr = teacher.split(',');
    let allTeacherArr = teacherArr.map((child, index) => {
        let childArr = child.split('/');
        let Grade = '';
        let TeacherID = '';
        let TeacherName = '';
        if (childArr.length !== 0) {
            Grade = childArr[0];
            TeacherID = childArr[1];
            TeacherName = childArr[2];
        }
        return {
            Grade: Grade,
            TeacherID: TeacherID,
            TeacherName: TeacherName
        }
    })
    return allTeacherArr;
}
function handleGrade(grade) {
    if (grade === '')
        return '';
    let GradeArr = grade.split(',');
    let sort = [];
    let Grades = [];
    let returnGrade = '';
    let isSeries = true;
    GradeArr.map((child, index) => {
        let childArr = child.split('-');
        sort.push(childArr[0].slice(1));
        Grades.push(childArr[1])
    })
    sort.map((child, index) => {
        if (sort.length === 1 || (index !== sort.length - 1 && Number(child) !== sort[index + 1] - 1))

            isSeries = false;
    })

    if (isSeries && Grades.length !== 0) {
        returnGrade = Grades[0] + '~' + Grades[Grades.length - 1];
    } else if (!isSeries && Grades.length !== 0) {
        Grades.map((child, index) => {
            if (index !== Grades.length - 1)
                returnGrade += child + ',';
            else
                returnGrade += child;
        })
    }
    return returnGrade;
}
export default SubjectMsg;