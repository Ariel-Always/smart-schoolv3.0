import Method from '../Method';
/*学科、年级、教室、课时信息的actions*/

const SCGCR_INFO_INIT = 'SCGCR_INFO_INIT';


//从接口获取信息
const getSCGCData = () => {

    return (dispatch,getState) => {

        let {PeriodWeekTerm} = getState();
        //如果前面获取的周次、学段信息已获得
        if (PeriodWeekTerm&&PeriodWeekTerm.ItemPeriod){



        }else{//如果前面获取的周次、学段信息没获得，等待获得。

          let  PeriodWeekTermInterVal =  setInterval(()=>{

                const {PeriodWeekTerm} = getState();

               if (PeriodWeekTerm&&PeriodWeekTerm.ItemPeriod){

                    clearInterval(PeriodWeekTermInterVal);

                    //异步获取到周次、学段信息等

                   let SchoolID ='';//需要的参数后期加入

                   let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

                    let getSCGCPromise = Method.getGetData(`/scheduleSubjectGrade?SchoolID=${SchoolID}&PeriodID=${PeriodID}`);

                    getSCGCPromise.then(json => {

                        json.Data['NowWeekNo'] = PeriodWeekTerm.NowWeekNo;

                        dispatch({type:SCGCR_INFO_INIT,data:json.Data});

                    });

               }

            },50)

        }

    }

};



export default {

    getSCGCData,

    SCGCR_INFO_INIT

}