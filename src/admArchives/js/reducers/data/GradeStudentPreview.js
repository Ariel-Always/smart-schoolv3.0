import UpDataState from '../../actions/UpDataState';



const GradeStudentPreview = (state={},actions)=>{
    switch (actions.type) {
        case UpDataState.GET_GRADE_STUDENT_PREVIEW:
            let {Total,...list} = actions.data;

            let List= handleData(list,actions.pageIndex,actions.pageSize);
            //console.log(actions.GradeID||{value:List.newList[0].child.GradeID,title:List.newList[0].child.GradeName})
            return Object.assign({}, state,{Total,...List,GradeID:actions.GradeID||{value:List.newList[0].child.GradeID,title:List.newList[0].child.GradeName},ClassID:actions.ClassID||{value:List.newList[0].child.ClassID,title:List.newList[0].child.ClassName}});
        default:
            return state;
    }
} ;

function handleData(data,pageIndex,pageSize){
    let keyList = [];
    let pensonalList = [];
    let newList = data.List.map((child,index) => {
        let list = {}
        list.UserName = {key:index,PhotoPath:child.PhotoPath,UserName:child.UserName};
        list.UserID = child.UserID;
        list.Gender = child.Gender;
        list.key = index;
        keyList.push(list.key);
        list.GradeName = child.GradeName;
        list.ClassName = child.ClassName;
        list.OrderNo = { key: index, OrderNo: index + pageIndex * pageSize };
        let {UserID,Grader,GradeName,ClassName,PhotoPath,UserName,...others} = child;
        list.Others = child;
        let person = {
            userName:child.UserName,
            userImg:child.PhotoPath,
            Gende:child.Gender,
            userText:'',
            userID:child.UserID,
            userGrade:child.GradeName,
            userClass:child.ClassName,
            userIDCard:child.IDCardNo,
            userPhone:child.Telephone,
            userMail:child.Email,
            userAddress:child.HomeAddress
        }
        pensonalList.push(person)
        return {...list,child}

    })
    
    return {newList,keyList,pensonalList};
}

export default  GradeStudentPreview;