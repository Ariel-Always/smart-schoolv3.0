import UpDataState from '../../actions/UpDataState';



const GradeStudentPreview = (state={},actions)=>{
    switch (actions.type) {
        case UpDataState.GET_GRADE_STUDENT_PREVIEW:
            let {Total,...list} = actions.data;

            let newList = handleData(list);
            console.log(newList)
            return {...state,Total,newList};
        default:
            return state;
    }
} ;

function handleData(data){
    
    let dataList = data.List.map((child,index) => {
        let list = {}
        list.UserName = {key:'0'+(index+1),PhotoPath:child.PhotoPath,UserName:child.UserName};
        list.UserID = child.UserID;
        list.Grader = child.Grader;
        list.key = 'table-'+(index+1);
        list.GradeName = child.GradeName;
        list.ClassName = child.ClassName;
        
        let {UserID,Grader,GradeName,ClassName,PhotoPath,UserName,...others} = child;
        list.Others = others;
        return list

    })
    return dataList;
}

export default  GradeStudentPreview;