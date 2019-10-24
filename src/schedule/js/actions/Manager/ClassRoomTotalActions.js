import ApiActions from "../ApiActions";

const MANAGER_CLASS_ROOM_TOTAL_INIT = 'MANAGER_CLASS_ROOM_TOTAL_INIT';


const  MANAGER_CLASS_ROOM_TOTAL_ROOMTYPE_LIST_UPDATE = 'MANAGER_CLASS_ROOM_TOTAL_ROOMTYPE_LIST_UPDATE';


const MANAGER_CLASS_ROOM_TOTAL_WEEK_CHANGE = 'MANAGER_CLASS_TOTAL_ROOM_WEEK_CHANGE';

const MANAGER_CLASS_ROOM_TOTAL_SCHEDULE_UPDATE = 'MANAGER_CLASS_TOTAL_ROOM_SCHEDULE_UPDATE';

const MANAGER_CLASS_ROOM_TOTAL_WEEK_LIST_UPDATE = 'MANAGER_CLASS_TOTAL_ROOM_WEEK_LIST_UPDATE';

const MANAGER_CLASS_ROOM_TOTAL_LOADING_HIDE = 'MANAGER_CLASS_TOTAL_ROOM_LOADING_HIDE';

const MANAGER_CLASS_ROOM_TOTAL_LOADING_SHOW = 'MANAGER_CLASS_TOTAL_ROOM_LOADING_SHOW';

const MANAGER_CLASS_ROOM_TOTAL_PAGE_ADD = 'MANAGER_CLASS_ROOM_TOTAL_PAGE_ADD';

const MANAGER_CLASS_ROOM_TOTAL_ROOMTYPE_SELECT_CHANGE = 'MANAGER_CLASS_ROOM_TOTAL_ROOMTYPE_SELECT_CHANGE';

const MANAGER_CLASS_ROOM_TOTAL_CLASS_COUNT = 'MANAGER_CLASS_ROOM_TOTAL_CLASS_COUNT';

const ClassTotalPageUpdate = (opt) =>{

    return (dispatch,getState) => {

        dispatch({type:MANAGER_CLASS_ROOM_TOTAL_LOADING_SHOW});

        const {PeriodWeekTerm,LoginUser,Manager} = getState();
        //获取需要传递的参数
        let {SchoolID} =LoginUser;

        let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;

        let { WeekNO,RoomTypeDropSelectd,Schedule,PageIndex} = Manager.ClassRoomTotal;

        let RoomTypeID = '';

        let NextPageIndex = 1;
        //判断已选中的学科是否为全部学科
        if (RoomTypeDropSelectd.value!=='none'){

            RoomTypeID = RoomTypeDropSelectd.value;

        }
        //如果是下一页的话
        if (opt&&opt.nextPage){

            NextPageIndex = PageIndex+1;

        }

        ApiActions.GetAllScheduleOfClassRoomByClassRoomTypeForPage({

            PeriodID,SchoolID,WeekNO:WeekNO,PageIndex:NextPageIndex,PageSize:10,ClassRoomType:RoomTypeID,dispatch

        }).then(data => {

            if (data){

                let NextSchedule = [];

                NextSchedule =  data.ItemClassRoom.map((item) => {

                    let classRoomObj = {

                        id:item.ClassRoomID,

                        name:item.ClassRoomName,

                        active:false

                    };

                    let list = data.ItemSchedule.map((i) => {

                        if (i.ClassID === item.ClassID){

                            return {

                                type:i.ScheduleType,

                                title:i.SubjectName,

                                titleID:i.SubjectName,

                                secondTitle:i.TeacherName,

                                secondTitleID:i.TeacherID,

                                thirdTitle:(i.ClassName?i.ClassName:i.CourseClassName),

                                thirdTitleID:(i.ClassName?i.ClassID:i.CourseClassID),

                                WeekDay:i.WeekDay,

                                ClassHourNO:i.ClassHourNO

                            };

                        }else {

                            return ;

                        }

                    }).filter(i => {return i!==undefined});

                    classRoomObj['list'] = list;

                    return classRoomObj;

                });

                //判断操作是否是下一页操作
                if (opt&&opt.nextPage){

                    console.log(opt);

                    Schedule.push(...NextSchedule);

                    dispatch({type:MANAGER_CLASS_ROOM_TOTAL_SCHEDULE_UPDATE,data:Schedule});

                    dispatch({type:MANAGER_CLASS_ROOM_TOTAL_PAGE_ADD});

                }else{

                    dispatch({type:MANAGER_CLASS_ROOM_TOTAL_SCHEDULE_UPDATE,data:NextSchedule});

                }

                dispatch({type:MANAGER_CLASS_ROOM_TOTAL_CLASS_COUNT,data:data.ClassRoomCount});

                dispatch({type:MANAGER_CLASS_ROOM_TOTAL_LOADING_HIDE});

            }

        });

    }

};


export default {

    MANAGER_CLASS_ROOM_TOTAL_INIT,

    MANAGER_CLASS_ROOM_TOTAL_ROOMTYPE_LIST_UPDATE,

    MANAGER_CLASS_ROOM_TOTAL_WEEK_CHANGE,

    MANAGER_CLASS_ROOM_TOTAL_SCHEDULE_UPDATE,

    MANAGER_CLASS_ROOM_TOTAL_WEEK_LIST_UPDATE,

    MANAGER_CLASS_ROOM_TOTAL_LOADING_HIDE,

    MANAGER_CLASS_ROOM_TOTAL_LOADING_SHOW,

    MANAGER_CLASS_ROOM_TOTAL_PAGE_ADD,

    MANAGER_CLASS_ROOM_TOTAL_ROOMTYPE_SELECT_CHANGE,

    MANAGER_CLASS_ROOM_TOTAL_CLASS_COUNT,

    ClassTotalPageUpdate

}