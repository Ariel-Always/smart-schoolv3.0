import { postData, getData } from "../../../common/js/fetch";
import UpUIState from './UpUIState';
import CONFIG from '../../../common/js/config';
import 'whatwg-fetch';
import actions from './index'
import Mock from 'mockjs'




//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = 'GET_LOGIN_USER_INFO';
//获取教学班总览信息
const GET_COURE_CLASS_ALL_MSG = 'GET_COURE_CLASS_ALL_MSG';
//设置教学班菜单
const SET_COURE_CLASS_ALL_MSG = 'SET_COURE_CLASS_ALL_MSG'



//操作的执行
//获取登录用户信息
const getLoginUser = (url) => {
    return (dispatch) => {
        let data = {
            "UserID": Mock.Random.guid(),
            "UserName": "王先之",
            "Gender": Mock.Random.pick(['男', '女', '保密']),
            "UserType": 0,
            "UserClass": Mock.Random.pick([1, 2]),
            "PhotoPath": "http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg",
            "ShortName": "王先之",
            "Sign": "我要我的滋味！",
            "SchoolID": Mock.Random.natural(),
            "SchoolName": "广州蓝鸽中学"
        }
        dispatch({ type: GET_LOGIN_USER_INFO, data: data });

        // getData(CONFIG.proxy + url).then(res => res.json()).then(json => {
        //     dispatch({ type: GET_LOGIN_USER_INFO, data: json.data.result });
        // });
    }
};
//获取学校学段信息
const getCoureClassAllMsg = (url,func) => {


    return (dispatch) => {
        let data =
        {
            "CourseClassCount": 3,
            "TeacherCount": 12,
            "SubjectCount": 1,
            "LastLogCount": 10,
            "ItemSubject": [{
                "SubjectID": "ENGLISH",
                "SubjectName": "英语",
                "CourseClassCount": 11,
                "TeacherCount": 8,
                "StudentCount": 440,
                "GradeIDs": "Class1,Class2,Class3,Class4,Class5,Class6,Class7,Class8,Class9,Class10,Class11,Class12",
                "GradesNames": "一年级,二年级,三年级,四年级,五年级,六年级,七年级,八年级,九年级,高一,高二,高三"
            },
            {
                "SubjectID": "CHINESE",
                "SubjectName": "语文",
                "CourseClassCount": 11,
                "TeacherCount": 8,
                "StudentCount": 440,
                "GradeIDs": "Class1,Class2,Class3,Class4,Class5,Class6,Class7,Class8,Class9,Class10,Class11,Class12",
                "GradesNames": "一年级,二年级,三年级,四年级,五年级,六年级,七年级,八年级,九年级,高一,高二,高三"
            },
            {
                "SubjectID": "MATHS",
                "SubjectName": "数学",
                "CourseClassCount": 11,
                "TeacherCount": 8,
                "StudentCount": 440,
                "GradeIDs": "Class1,Class2,Class3,Class4,Class5,Class6,Class7,Class8,Class9,Class10,Class11,Class12",
                "GradesNames": "一年级,二年级,三年级,四年级,五年级,六年级,七年级,八年级,九年级,高一,高二,高三"
            },
            {
                "SubjectID": "GEOGRAPHY",
                "SubjectName": "地理",
                "CourseClassCount": 11,
                "TeacherCount": 8,
                "StudentCount": 440,
                "GradeIDs": "Class1,Class2,Class3,Class4,Class5,Class6,Class7,Class8,Class9,Class10,Class11,Class12",
                "GradesNames": "一年级,二年级,三年级,四年级,五年级,六年级,七年级,八年级,九年级,高一,高二,高三"
            },
            {
                "SubjectID": "HISTORY",
                "SubjectName": "历史",
                "CourseClassCount": 11,
                "TeacherCount": 8,
                "StudentCount": 440,
                "GradeIDs": "Class1,Class2,Class3,Class4,Class5,Class6,Class7,Class8,Class9,Class10,Class11,Class12",
                "GradesNames": "一年级,二年级,三年级,四年级,五年级,六年级,七年级,八年级,九年级,高一,高二,高三"
            },
            {
                "SubjectID": "POLITICS",
                "SubjectName": "政治",
                "CourseClassCount": 11,
                "TeacherCount": 8,
                "StudentCount": 440,
                "GradeIDs": "Class1,Class2,Class3,Class4,Class5,Class6,Class7,Class8,Class9,Class10,Class11,Class12",
                "GradesNames": "一年级,二年级,三年级,四年级,五年级,六年级,七年级,八年级,九年级,高一,高二,高三"
            },
            {
                "SubjectID": "PHYSICS",
                "SubjectName": "物理",
                "CourseClassCount": 11,
                "TeacherCount": 8,
                "StudentCount": 440,
                "GradeIDs": "Class1,Class2,Class3,Class4,Class5,Class6,Class7,Class8,Class9,Class10,Class11,Class12",
                "GradesNames": "一年级,二年级,三年级,四年级,五年级,六年级,七年级,八年级,九年级,高一,高二,高三"
            },
            {
                "SubjectID": "BIOLOGY",
                "SubjectName": "生物",
                "CourseClassCount": 11,
                "TeacherCount": 8,
                "StudentCount": 440,
                "GradeIDs": "Class1,Class2,Class3,Class4,Class5,Class6,Class7,Class8,Class9,Class10,Class11,Class12",
                "GradesNames": "一年级,二年级,三年级,四年级,五年级,六年级,七年级,八年级,九年级,高一,高二,高三"
            },
            {
                "SubjectID": "CHEMISTRY",
                "SubjectName": "化学",
                "CourseClassCount": 11,
                "TeacherCount": 8,
                "StudentCount": 440,
                "GradeIDs": "Class1,Class2,Class3,Class4,Class5,Class6,Class7,Class8,Class9,Class10,Class11,Class12",
                "GradesNames": "一年级,二年级,三年级,四年级,五年级,六年级,七年级,八年级,九年级,高一,高二,高三"
            }
            ]
        }
        dispatch({ type: GET_COURE_CLASS_ALL_MSG, data: data,func:func });

        // getData(CONFIG.proxy + url).then(res => {

        //     return res.json()
        // }).then(json => {
        //     if (json.Status === 400) {
        //         console.log('错误码：' + json.Status)
        //     } else if (json.Status === 200) {
        //         dispatch({ type: GET_COURE_CLASS_ALL_MSG, data: json.Data });
        //     }
        // });
    }
}


//设置教学班菜单
const setCoureClassAllMsg = (data,subjectID = null) => {
    return {
        type: SET_COURE_CLASS_ALL_MSG,
        data: data,
        subjectID:subjectID
    }
};

// //设置教研组长
// const getSubjectTeacherMsg = (url,grades,allGrades = []) => {
//     return (dispatch) => {
//         getData(CONFIG.proxy + url).then(res => {
//         dispatch({ type: actions.UpUIState.SEARCH_LOADING_CLOSE });

//             return res.json()
//         }).then(json => {
//             if (json.Status === 400) {
//                 console.log('错误码：' + json.Status)
//             } else if (json.Status === 200) {
//                 console.log(json.Data)
//                 if(grades==='All'){
//                     allGrades.map((child,index) => {
//                         dispatch({ type: SET_SUBJECT_TEACHER_MSG, data: {Teacher:json.Data,grades:child} });
//                     })
//                 }else
//                 dispatch({ type: SET_SUBJECT_TEACHER_MSG, data: {Teacher:json.Data,grades:grades} });

//             }
//         });
//     }
// }

export default {
    getLoginUser,
    GET_LOGIN_USER_INFO,
    getCoureClassAllMsg,
    GET_COURE_CLASS_ALL_MSG,
    SET_COURE_CLASS_ALL_MSG,
    setCoureClassAllMsg

}