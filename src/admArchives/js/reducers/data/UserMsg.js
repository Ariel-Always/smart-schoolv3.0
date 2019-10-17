import UpDataState from '../../actions/UpDataState';



const UserMsg = (state = {}, actions) => {
    switch (actions.type) {
        case UpDataState.GET_TEACHER_MSG:
            
            let newData = handleData(actions.data)
            
            return Object.assign({},state,{ ...newData });
        default:
            return state;
    }
};
function handleData(data){
    // console.log(data)
    return {
        userName:data.UserName,
        userImg:data.PhotoPath,
        Gende:data.Gender,
        userText:data.Sign,
        userID:data.UserID,
        userGrade:data.GradeName,
        userClass:data.ClassName,
        userIDCard:data.IDCardNo,
        userPhone:data.Telephone,
        userMail:data.Email,
        userAddress:data.HomeAddress,
        titleName:data.TitleName,
        subjectName:data.SubjectNames,
        source:data.Source,
        position:data.Position,
        sign:data.Sign,
        userType:data.UserType
    }
}
export default UserMsg;