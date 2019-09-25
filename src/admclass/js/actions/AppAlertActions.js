import UIState from './UpUIState';

const alertSuccess = (msg) => {

    return dispatch => {

        dispatch({

            type:UIState.SHOW_ERROR_ALERT,

            data:{

               type:"success",

               title:msg,

               hide:closeAlert(dispatch)

            }

        });

    }

};

const alertError = (msg) => {

    return dispatch => {

        dispatch({

            type:UIState.SHOW_ERROR_ALERT,

            data:{

                type:"btn-error",

                title:msg,

                hide:closeAlert(dispatch),

                close:closeAlert(dispatch),

                ok:closeAlert(dispatch)

            }

        });

    }

};

const alertWarn = (msg) => {

    return dispatch => {

        dispatch({

            type:UIState.SHOW_ERROR_ALERT,

            data:{

                type:"btn-warn",

                title:msg,

                hide:closeAlert(dispatch),

                close:closeAlert(dispatch),

                ok:closeAlert(dispatch)

            }

        });

    }

};



const closeAlert = (dispatch) => {

  return () => dispatch({type:UIState.CLOSE_ERROR_ALERT});

};

export default {

    alertSuccess,

    alertError,

    alertWarn

}