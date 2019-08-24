import UpDataState from '../../actions/UpDataState';

const SubjectTeacherPreview = (state={},actions)=>{
    switch (actions.type) {
        case UpDataState.GET_SCHOOL_LEADER_PREVIEW:
            let {Total,...list} = actions.data;

            let {newList,keyList }= handleData(list);
            console.log(newList,keyList)
            return {...state,Total,newList,keyList};
        default:
            return state;
    }
} ;
function handleData(data){
    let keyList = [];
    let newList = data.List.map((child,index) => {
        let list = {}
        list.UserName = {key:index,PhotoPath:child.PhotoPath,UserName:child.UserName};
        list.UserID = child.UserID;
        list.Gender = child.Gender;
        list.key = index;
        keyList.push(list.key);
        list.GradeName = child.GradeName;
        list.ClassName = child.ClassName;
        
        let {UserID,Grader,GradeName,ClassName,PhotoPath,UserName,...others} = child;
        list.Others = others;
        return list

    })
    return {newList,keyList};
}

export default  SubjectTeacherPreview;