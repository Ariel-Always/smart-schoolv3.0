import UpDataState from './UpDataState'

import PaginationActions from './PaginationActions';

const CLASS_PAGINATION_TOTAL_UPDATE = 'CLASS_PAGINATION_TOTAL_UPDATE';

const CLASS_PAGINATION_CURRENT_UPDATE = 'CLASS_PAGINATION_CURRENT_UPDATE';

const GRADE_PAGINATION_TOTAL_UPDATE = 'GRADE_PAGINATION_TOTAL_UPDATE';

const GRADE_PAGINATION_CURRENT_UPDATE = 'GRADE_PAGINATION_CURRENT_UPDATE';

//年级班级列表变化
const GradeClassPageChange = (GradeID,PageIndex) =>{

  return (dispatch,getState) => {

      let { SchoolID } = getState().DataState.LoginUser;

      let { SearchKey } = getState().DataState.TheGradePreview;

      dispatch({type:UpDataState.THE_GRADE_CLASS_LOADING_SHOW});

      UpDataState.getClassList({SchoolID,GradeID,PageIndex,PageSize:1,dispatch,Keyword:SearchKey}).then(data=>{

         if (data){

             dispatch({type:UpDataState.THE_GRADE_CLASS_LIST_UPDATE,data:data});

             dispatch({type:CLASS_PAGINATION_CURRENT_UPDATE,data:PageIndex+1});

             dispatch({type:CLASS_PAGINATION_TOTAL_UPDATE,data:data.Total});

             dispatch({type:UpDataState.THE_GRADE_CLASS_LOADING_HIDE});

         }

      });

  }

};

const SchoolClassPageChange = (PageIndex) =>{

    return (dispatch,getState) => {

        let { SchoolID } = getState().DataState.LoginUser;

        let { SearchKey } = getState().DataState.AllGradePreview;

        dispatch({type:UpDataState.ALL_GRADE_CLASS_LOADING_SHOW});

        UpDataState.getClassList({SchoolID,PageIndex,PageSize:1,dispatch,Keyword:SearchKey}).then(data=>{

            if (data){

                dispatch({type:UpDataState.ALL_GRADE_CLASS_LIST_UPDATE,data:data});

                dispatch({type:GRADE_PAGINATION_CURRENT_UPDATE,data:PageIndex+1});

                dispatch({type:GRADE_PAGINATION_TOTAL_UPDATE,data:data.Total});

                dispatch({type:UpDataState.ALL_GRADE_CLASS_LOADING_HIDE});

            }

        });

    }

};


export default {

    CLASS_PAGINATION_TOTAL_UPDATE,

    CLASS_PAGINATION_CURRENT_UPDATE,

    GRADE_PAGINATION_TOTAL_UPDATE,

    GRADE_PAGINATION_CURRENT_UPDATE,

    GradeClassPageChange,

    SchoolClassPageChange

}