import UpDataState from '../../actions/UpDataState';



const GetSignUpLog = (state = { DidData: {}, newStatus: 0, WillData: {} }, actions) => {
    switch (actions.type) {
        case UpDataState.GET_WILL_SIGN_UP_LOG_MSG:
            let WillData = handleData(actions.data);
            return Object.assign({}, state, { WillData: WillData });
        case UpDataState.GET_DID_SIGN_UP_LOG_MSG:
            let DidData = handleData(actions.data);
            return Object.assign({}, state, { DidData: DidData });
        case UpDataState.SET_SIGN_UP_LOG_STATUS_MSG:
            return Object.assign({}, state, { newStatus: actions.data });
        default:
            return state;
    }
};

function handleData(data) {
    const { Total, List } = data;
    
    let returnData = List.map((child, index) => {
        return {
            key: index,
            OrderNo: index + 1,
            SignUpTime: child.SignUpTime,
            UserName: {
                key: index,
                PhotoPath: child.PhotoPath_NoCache||child.PhotoPath,
                UserName: child.UserName,
                UserID:child.UserID
            },
            UserID: child.UserID,
            Gender: child.Gender,
            Grade: { GradeName: child.GradeName, GradeID: child.GradeID },
            Class: { ClassName: child.ClassName, ClassID: child.ClassID },
            Status: {
                Status: child.Status,
                StatusTxt: child.StatusTxt
            },
            UserMsg: {
                logID:child.LogID,
                userName: child.UserName,
                userImg: child.PhotoPath_NoCache||child.PhotoPath,
                Gende:  child.Gender,
                userID: child.UserID,
                userGrade: child.GradeName,
                userClass: child.ClassName,
                userIDCard: child.IDCardNo,
                userPhone: child.Telephone,
                userMail: child.Email,
                userAddress: child.HomeAddress,
                userRegisterTime: child.SignUpTime,
                userRegisterIP: child.SignUpIP
            },
            Data: child
        }
    })

    return {Total:Total, returnData: returnData};
}

function getStatus(oldData, newData) {
    // console.log(oldData, newData)

    return newData.StatusCount - oldData.StatusCount;
}

export default GetSignUpLog;