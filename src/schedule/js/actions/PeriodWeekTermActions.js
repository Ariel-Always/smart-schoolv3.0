import Method from './Method';
//学段，学期，周actions
const UPDATE_PERIOD_TERM_WEEK = 'UPDATE_PERIOD_TERM_WEEK';

const PERIOD_VALUE_CHANGE = 'PERIOD_CHANGE';

/*const getPeriodWeekTerm = () => {

    return dispatch => {



        let getPeriodPromise = Method.getGetData('/schedulePeriod');

        getPeriodPromise.then(json => {

            dispatch({type:UPDATE_PERIOD_TERM_WEEK,data:json.Data});

        });

    }

};*/

export default {

    UPDATE_PERIOD_TERM_WEEK,

    PERIOD_VALUE_CHANGE,

  /*  getPeriodWeekTerm*/

};

