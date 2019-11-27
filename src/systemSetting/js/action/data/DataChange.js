// import CONFIG from '../../../../common/js/config';
import ApiActions from '../data/Api';
const GET_CURRENT_SEMESTER_INFO = "GET_CURRENT_SEMESTER_INFO";//获取当前学年学期的信息
// const POST_MODIFY_SEMESTER_LIMIT = "POST_MODIFY_SEMESTER_LIMIT";//获取当前学年学期的信息
const SEMESTER_LOADING_HIDE = "SEMESTER_LOADING_HIDE";//loading界面的展示或消失
const GET_CURRENT_SCHOOL_INFO = "GET_CURRENT_SCHOOL_INFO"//获取当前学校信息
const REFRESH_SCHOOL_INFO="REFRESH_SCHOOL_INFO"//刷新当前学校信息
const CET_CURRENT_SUBSYSTEM_INFO="CET_CURRENT_SUBSYSTEM_INFO"//获取子系统详情






const getCurrentSemester = (SchoolID) => {

    return dispatch => {
        const url = `/SysMgr/Setting/GetCurrentTermInfo?SchoolID=${SchoolID}`;


        ApiActions.getMethod(url).then(json => {
            let semesterInfo = json.Data
            for (let item in semesterInfo) {
                if (item === "Term") {
                    let termNum = semesterInfo[item][semesterInfo[item].length - 1]
                    // console.log(semesterInfo[item]);
                    semesterInfo = {
                        ...semesterInfo,
                        "termNum": termNum
                    }
                }
                else if(item==="TermStartDate"){
                    semesterInfo={
                        ...semesterInfo,
                        "StartYear":new Date(semesterInfo[item]).getFullYear(),
                        "StartMonth":new Date(semesterInfo[item]).getMonth()+1,
                        "StartDay": new Date(semesterInfo[item]).getDate(),
                    }

                }
                else if(item==="TermEndDate"){
                    
                    semesterInfo={
                        ...semesterInfo,
                        "EndYear":new Date(semesterInfo[item]).getFullYear(),
                        "EndMonth":new Date(semesterInfo[item]).getMonth()+1,
                        "EndDay": new Date(semesterInfo[item]).getDate(),
                    }

                }
            }
            dispatch({
                type: GET_CURRENT_SEMESTER_INFO,
                data: semesterInfo
            })
            dispatch({
                type: SEMESTER_LOADING_HIDE
            })

        });


    }
}









const getCurrentSchoolInfo = (SchoolID) => {
    return dispatch => {
        const url =`/SysMgr/Setting/GetSchoolInfo?SchoolID=${SchoolID}`;
        ApiActions.getMethod(url).then(json => {
            let  schoolInfo = json.Data;
            // console.log(schoolInfo)
            for(let item in schoolInfo){
                if(item==="SchoolSessionType"){
                    let sessionType=parseInt(schoolInfo[item])
                    if(sessionType===5){
                        schoolInfo={
                            ...schoolInfo,
                            primaryType:"五年制小学",
                            middleType:"四年制初中",
                            primaryNum:5,
                            middleNum:4
                        }
                    }
                    else{
                        schoolInfo={
                            ...schoolInfo,
                            primaryType:"六年制小学",
                            middleType:"三年制初中",
                            primaryNum:6,
                            middleNum:3
                        }
                    }

                }
                else if(item==="SchoolType"){
                        if(schoolInfo[item]===7){
                            schoolInfo={
                                ...schoolInfo,
                                highType:"三年制高中",
                                highNum:12
                            }
                            
                        }
                }
            }

            dispatch({
                type: GET_CURRENT_SCHOOL_INFO,
                data: schoolInfo
            })
            // console.log(schoolInfo)
            dispatch({
                type: SEMESTER_LOADING_HIDE
            })
        });

    }

}



        get






export default {
    GET_CURRENT_SEMESTER_INFO,
    getCurrentSemester,
    SEMESTER_LOADING_HIDE,
    getCurrentSchoolInfo,
    GET_CURRENT_SCHOOL_INFO,
    REFRESH_SCHOOL_INFO

}