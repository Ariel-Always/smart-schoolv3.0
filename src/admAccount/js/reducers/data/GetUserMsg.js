import UpDataState from "../../actions/UpDataState";

function handleData(data) {
  //  console.log(data)
  if (data === null) {
    return {
      userName: "",
      userImg: "",
      Gende: "",
      userText: "",
      userID: "",
      subjectName: "",
      userGrade: "",
      userClass: "",
      userIDCard: "",
      userPhone: "",
      userMail: "",
      userAddress: ""
    };
  }
  return {
    userName: data.UserName,
    userImg: data.PhotoPath_NoCache || data.PhotoPath,
    Gende: data.Gender,
    userText: "",
    userID: data.UserID,
    subjectName: data.SubjectNames,
    userGrade: data.GradeName,
    userClass: data.ClassName,
    userIDCard: data.IDCardNo,
    userPhone: data.Telephone,
    userMail: data.Email,
    userAddress: data.HomeAddress,
    Position: data.Position,
    QQ: data.QQ,
    Weixin: data.Weixin,
    Telephone: data.Telephone,
    Weibo: data.Weibo
  };
}
const GetUserMsg = (
  state = {
    userName: "",
    userImg: "",
    Gende: "",
    userText: "",
    userID: "",
    subjectName: "",
    userGrade: "",
    userClass: "",
    userIDCard: "",
    userPhone: "",
    userMail: "",
    userAddress: "",
    Position: "",
    QQ: "",
    WeiXin: "",
    Telephone: "",
    Weibo: ""
  },
  actions
) => {
  let returnData = { grades: null };
  switch (actions.type) {
    case UpDataState.GET_USER_MSG:
      returnData = handleData(actions.data);

      return Object.assign({}, state, { ...returnData });
    default:
      return state;
  }
};

export default GetUserMsg;
