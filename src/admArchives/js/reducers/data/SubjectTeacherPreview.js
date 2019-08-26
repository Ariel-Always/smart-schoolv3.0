import UpDataState from '../../actions/UpDataState';

const SubjectTeacherPreview = (state={},actions)=>{
    switch (actions.type) {
        case UpDataState.GET_SCHOOL_LEADER_PREVIEW:
            let {Total,...list} = actions.data;

            let {newList,keyList }= handleData(list);
            console.log(newList,keyList)
            return {...state,Total,newList,keyList,loading:false};
        default:
            return state;
    }
} ;
function handleData(data){
    let keyList = [];
    let newList = data.List.map((child,index) => {
        let list = {}
        list.UserName = {key:index,UserName:child.UserName};
        list.UserID = child.UserID;
        list.UserImgs = {key:index,UserName:child.UserName,UserImg:child.PhotoPath,UserImg_Nocache:child.PhotoPath_Nocache};
        list.Gender = child.Gender;
        list.key = index;
        keyList.push(list.key);
        
        let NewSubject = handleSubject(child.SubjectNames,child.SubjectIDS);
        list.SubjectNames = NewSubject;
        list.Titles = {TitleID:child.TitleID,TitleName:child.TitleName};
        
        //let {UserID,Grader,GradeName,ClassName,PhotoPath,UserName,...others} = child;
        list.handleMsg = {...child,key:index,...NewSubject};
        return list

    })
    return {newList,keyList,Total:data.Total};
}
function handleSubject(name = '',id = ''){
    let nameArr = name.split(',');
    let idArr = id.split(',');
    let showTwo = nameArr[0] + '，' + nameArr[1];
    let newSubjects = [];
    nameArr.map((name,index) => {
        newSubjects[idArr[index]] = name;
    })
    
    
    return {showTwo:showTwo,newSubjects:newSubjects}
}

export default  SubjectTeacherPreview;