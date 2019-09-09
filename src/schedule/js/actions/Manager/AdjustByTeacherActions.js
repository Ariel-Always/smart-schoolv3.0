import Method from '../Method';

import Mock from 'mockjs';

const ADJUST_BY_TEACHER_SHOW = 'ADJUST_BY_TEACHER_SHOW';

const ADJUST_BY_TEACHER_HIDE = 'ADJUST_BY_TEACHER_HIDE';

const REPLACE_SHCEDULE_LOADING_SHOW = 'REPLACE_SHCEDULE_LOADING_SHOW';

const REPLACE_SHCEDULE_LOADING_HIDE = 'REPLACE_SHCEDULE_LOADING_HIDE';

const REPLACE_SHCEDULE_TEACHER_LIST_UPDATE = 'REPLACE_SHCEDULE_TEACHER_LIST_UPDATE';



//找人代课初始化
const replaceScheduleInit = () => {

    return ( dispatch,getState ) => {

        dispatch({type:REPLACE_SHCEDULE_LOADING_HIDE});

        let getAllGradePromise = Method.getGetData('/scheduleSubjectGrade');

        let getTeacherPromise = Method.getGetData('/scheduleSubjectTeacherTeacher');

        //Promise([getAllGradePromise,getTeacherPromise]).then(res => {

           let res = [{
               "Status": 200,
               "Msg": "success",
               "Data": {
                   "ItemClassHourCount": [{
                       "ClassHourType": 1,
                       "CountType": 4
                   }, {
                       "ClassHourType": 2,
                       "CountType": 4
                   }],
                   "ItemClassHour": [{
                       "OrderNO": 1,
                       "ClassHourNO": 1,
                       "ClassHourType": 1,
                       "StartTime": "08:30",
                       "EndTime": "09:10",
                       "ClassHourName": "第一节"
                   },
                       {
                           "OrderNO": 2,
                           "ClassHourNO": 2,
                           "ClassHourType": 1,
                           "StartTime": "09:20",
                           "EndTime": "10:00",
                           "ClassHourName": "第二节"
                       },
                       {
                           "OrderNO": 3,
                           "ClassHourNO": 3,
                           "ClassHourType": 1,
                           "StartTime": "10:20",
                           "EndTime": "11:00",
                           "ClassHourName": "第三节"
                       },
                       {
                           "OrderNO": 4,
                           "ClassHourNO": 4,
                           "ClassHourType": 1,
                           "StartTime": "11:10",
                           "EndTime": "11:50",
                           "ClassHourName": "第四节"
                       },
                       {
                           "OrderNO": 5,
                           "ClassHourNO": 5,
                           "ClassHourType": 2,
                           "StartTime": "14:00",
                           "EndTime": "14:40",
                           "ClassHourName": "第五节"
                       },
                       {
                           "OrderNO": 6,
                           "ClassHourNO": 6,
                           "ClassHourType": 2,
                           "StartTime": "14:50",
                           "EndTime": "15:30",
                           "ClassHourName": "第六节"
                       },
                       {
                           "OrderNO": 7,
                           "ClassHourNO": 7,
                           "ClassHourType": 2,
                           "StartTime": "15:40",
                           "EndTime": "16:20",
                           "ClassHourName": "第七节"
                       },
                       {
                           "OrderNO": 8,
                           "ClassHourNO": 8,
                           "ClassHourType": 2,
                           "StartTime": "16:30",
                           "EndTime": "17:10",
                           "ClassHourName": "第八节"
                       }

                   ],
                   "ItemGrade": [{
                       "GradeID": "jkkj4554",
                       "GradeName": "一年级"
                   },
                       {
                           "GradeID": "jkkj4555",
                           "GradeName": "二年级"
                       },
                       {
                           "GradeID": "jkkj4556",
                           "GradeName": "三年级"
                       },
                       {
                           "GradeID": "jkkj4557",
                           "GradeName": "四年级"
                       },
                       {
                           "GradeID": "jkkj4558",
                           "GradeName": "五年级"
                       }
                   ],

                   "ItemClassRoomType": [{
                       "ClassRoomTypeID": "f455fa",
                       "ClassRoomName": "多媒体电教室"
                   },
                       {
                           "ClassRoomTypeID": "f455fb",
                           "ClassRoomName": "多媒体语音教室"
                       },
                       {
                           "ClassRoomTypeID": "f455fc",
                           "ClassRoomName": "云网络教室"
                       }, {
                           "ClassRoomTypeID": "f455fd",
                           "ClassRoomName": "普通PC电脑室"
                       }
                   ],
                   "ItemSubject": [{
                       "SubjectID": "jkhjh41",
                       "SubjectName": "英语"
                   },
                       {
                           "SubjectID": "jkhjh42",
                           "SubjectName": "数学"
                       },
                       {
                           "SubjectID": "jkhjh43",
                           "SubjectName": "语文"
                       },
                       {
                           "SubjectID": "jkhjh44",
                           "SubjectName": "政治"
                       },
                       {
                           "SubjectID": "jkhjh45",
                           "SubjectName": "历史"
                       },
                       {
                           "SubjectID": "jkhjh46",
                           "SubjectName": "地理"
                       },
                       {
                           "SubjectID": "jkhjh47",
                           "SubjectName": "物理"
                       }

                   ]
               }
           },{
               "Status": 200,
               "Msg": "success",
               "Data": [{
                   "SubjectID": "jkhjh41",
                   "Teacher": "T0001",
                   "TeacherName": Mock.Random.cname()
               },
                   {
                       "SubjectID": "jkhjh41",
                       "Teacher": "T0002",
                       "TeacherName": Mock.Random.cname()
                   },
                   {
                       "SubjectID": "jkhjh41",
                       "Teacher": "T0003",
                       "TeacherName": Mock.Random.cname()
                   },
                   {
                       "SubjectID": "jkhjh41",
                       "Teacher": "T0004",
                       "TeacherName": Mock.Random.cname()
                   },
                   {
                       "SubjectID": "jkhjh41",
                       "Teacher": "T0005",
                       "TeacherName": Mock.Random.cname()
                   },
                   {
                       "SubjectID": "jkhjh42",
                       "Teacher": "T0006",
                       "TeacherName": Mock.Random.cname()
                   },

                   {
                       "SubjectID": "jkhjh42",
                       "Teacher": "T0007",
                       "TeacherName": Mock.Random.cname()
                   },
                   {
                       "SubjectID": "jkhjh42",
                       "Teacher": "T0008",
                       "TeacherName": Mock.Random.cname()
                   },
                   {
                       "SubjectID": "jkhjh46",
                       "Teacher": "T0009",
                       "TeacherName": Mock.Random.cname()
                   },
                   {
                       "SubjectID": "jkhjh46",
                       "Teacher": "T00010",
                       "TeacherName": Mock.Random.cname()
                   },
                   {
                       "SubjectID": "jkhjh46",
                       "Teacher": "T00011",
                       "TeacherName": Mock.Random.cname()
                   },
                   {
                       "SubjectID": "jkhjh46",
                       "Teacher": "T00012",
                       "TeacherName": Mock.Random.cname()
                   }

               ]
           }];

           let teacherList = res[0].Data.ItemSubject.map(item => {

              let list =  res[1].Data.map(i => {

                 if (i.SubjectID === item.SubjectID){

                        return{

                            name:i.TeacherName,

                            id:i.Teacher

                        }

                 }else{

                     return;

                 }

              }).filter(itm => itm!==undefined);

              return {

                  id:item.SubjectID,

                  name:item.SubjectName,

                  list

              }

           });

           console.log(teacherList);

           dispatch({type:REPLACE_SHCEDULE_TEACHER_LIST_UPDATE,data:teacherList});

        //});

    };

};

//教师选择

const teacherDropChange = () => {


    return ( dispatch,getState ) => {



    }

};



export default {

    ADJUST_BY_TEACHER_SHOW,

    ADJUST_BY_TEACHER_HIDE,

    REPLACE_SHCEDULE_LOADING_HIDE,

    REPLACE_SHCEDULE_LOADING_SHOW,

    REPLACE_SHCEDULE_TEACHER_LIST_UPDATE,

    replaceScheduleInit,

    teacherDropChange

};