import UserInfo from '../actions/UserInfo';
const LoginUserInfo = (state = {isLogin:false,username:"",image:""},actions)=>{
    switch (actions.type) {
        case UserInfo.GET_USER_INFO:
            return {isLogin:true,...actions.userInfo};
        default:
            return state;
    }
};
export default LoginUserInfo;