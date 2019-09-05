import Method from '../Method';

const ADJUST_BY_TIME_SHOW = 'ADJUST_BY_TIME_SHOW';

const ADJUST_BY_TIME_HIDE = 'ADJUST_BY_TIME_HIDE';

const ADJUST_BY_TIME_LOADING_HIDE = 'ADJUST_BY_TIME_LOADING_HIDE';

const ADJUST_BY_TIME_LOADING_SHOW = 'ADJUST_BY_TIME_LOADING_SHOW';

const ADJUST_BY_TIME_INFO_UPDATE = 'ADJUST_BY_TIME_INFO_UPDATE';

//初始化弹窗信息
const InfoInit = () => {

    return (dispatch,getState) => {

        let SchoolID = getState().LoginUser;

        let Periods = getState().PeriodWeekTerm.ItemPeriod;

        let allGradesClassHour = Method.getGetData(`/allSGWTTC?SchoolID=${SchoolID}`);

        allGradesClassHour.then(json => {

            let Grades = json.Data.ItemGrade;

            let ItemClassHour = json.Data.ItemClassHour;

            let periodGrades = Periods.map(item => {

                let list = Grades.map(i => {

                    if (i.PeriodID === item.PeriodID){

                        return {

                            id:i.GradeID,

                            name:i.GradeName,

                            checked:false

                        }

                    }else{

                        return;

                    }

                }).filter(itm => itm !== undefined);

                return {

                    id:item.PeriodID,

                    name:item.PeriodName,

                    checked:false,

                    list

                }

            });

            let periodGradesPlainOpts = Periods.map(item => {

                let list = Grades.map(i => {

                    if (i.PeriodID === item.PeriodID){

                        return i.GradeID;

                    }else{

                        return;

                    }

                }).filter(itm => itm !== undefined);

                return {

                    id:item.PeriodID,

                    list

                }

            });

            let periodGradesCheckedList = Periods.map(item => {

                let list = [];

                return {

                    id:item.PeriodID,

                    checked:false,

                    list

                }

            });

            let oldClassHours = [];

            let newClassHours = [];

            let morning = {type:1,name:"上午",list:[]};

            let afternoon = {type:2,name:"下午",list:[]};

            let tonight = {type:3,name:"晚上",list:[]};

            ItemClassHour.map(item => {

                if (item.ClassHourType === 1){

                    morning['list'].push({no:item.ClassHOurNO,name:item.ClassHourName});

                }else if (item.ClassHourType === 2){

                    afternoon['list'].push({no:item.ClassHOurNO,name:item.ClassHourName});

                }else if (item.ClassHourType === 3){

                    tonight['list'].push({no:item.ClassHOurNO,name:item.ClassHourName});

                }

            });

            console.log(morning);

            if (morning.list.length > 0){

                oldClassHours.push(morning);

            }

            if (afternoon.list.length > 0){

                oldClassHours.push(afternoon);

            }

            if (tonight.list.length > 0){

                oldClassHours.push(tonight);

            }

            newClassHours = oldClassHours.map(item => item);

            dispatch({type:ADJUST_BY_TIME_INFO_UPDATE,data:{periodGrades,newClassHours,oldClassHours,periodGradesPlainOpts,periodGradesCheckedList}});

            dispatch({type:ADJUST_BY_TIME_LOADING_HIDE});

        });

    }

};

//点击选中
const periodChecked = (opts) => {

    return (dispatch,getState) => {

        const { periodGradesCheckedList,periodGradesPlainOpts } = getState().Manager.AdjustByTimeModal;

        let checkedList = [];

        if (opts.type === 'period'){

            checkedList = periodGradesCheckedList.map((item) => {

                if (item.id === opts.id){
                    //判断状态如果是已选改为未选
                    if (item.checked){

                        return{

                            id:item.id,

                            checked:false,

                            list:[]

                        }

                    }else{//如果是未选改为已选

                       let list = [];

                        periodGradesPlainOpts.map(i => {

                            if (i.id === item.id){

                                list = i.list;

                            }

                        });

                        return {

                            id:item.id,

                            checked:true,

                            list

                        }

                    }

                }else{

                    return item;

                }

            });

        }else{

             checkedList = periodGradesCheckedList.map(item => {

               if (item.id === opts.pid){

                   console.log(opts,item.list);
                    //如果已经选中，去除选中的状态
                    if (item.list.includes(opts.id)){

                        item.list.remove(opts.id);

                        return {

                            id:item.id,

                            checked:false,

                            list:item.list

                        }

                    }else{//没有选中。先选中然后判断上一层的状态

                        item.list.push(opts.id);

                        let plainOptions = [];

                        periodGradesPlainOpts.map(i => {

                           if (i.id === item.id){

                                plainOptions = i.list;

                           }

                        });

                        //判断是否是需要置为全选
                        if(item.list.length === plainOptions.length){//需要全选

                            return{

                                id:item.id,

                                checked:true,

                                list:item.list

                            }

                        }else{//不需要全选

                            return{

                                id:item.id,

                                checked:false,

                                list:item.list

                            }

                        }

                    }

               }else{

                   return item;

               }

            });

        }

        dispatch({type:ADJUST_BY_TIME_INFO_UPDATE,data:{periodGradesCheckedList:checkedList}});

    }

};

//自定义的数组去除方法
Array.prototype.indexOf = function(val) {

    for (var i = 0; i < this.length; i++) {

        if (this[i] == val) return i;

    }

    return -1;

};
//自定义的数组去除方法
Array.prototype.remove = function(val) {

    var index = this.indexOf(val);

    if (index > -1) {

        this.splice(index, 1);

    }

};


export default {

    ADJUST_BY_TIME_HIDE,

    ADJUST_BY_TIME_SHOW,

    ADJUST_BY_TIME_LOADING_HIDE,

    ADJUST_BY_TIME_LOADING_SHOW,

    ADJUST_BY_TIME_INFO_UPDATE,

    InfoInit,

    periodChecked

}