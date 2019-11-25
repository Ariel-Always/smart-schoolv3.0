import Method from "./Method";


//教师获取个人PC桌面

const GetTeacherDeskTop = async ({UserID,SubjectID,dispatch})=>{

  const res = await Method.getGetData(`/SubjectInfoMgr/DeskTop/Teacher/GetDeskTop?UserID=${UserID}&SubjectID=${SubjectID}`,2);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        //window.location.href='/error.aspx';

        alert(res.Msg);

    }


};

export default {

    GetTeacherDeskTop

}