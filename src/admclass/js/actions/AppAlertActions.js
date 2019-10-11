import UIState from './UpUIState';

const alertSuccess = ({title,hide}) => {

    return dispatch => {

        dispatch({

            type:UIState.SHOW_ERROR_ALERT,

            data:{

               type:"success",

                title:title,

                hide:(hide?hide():closeAlert(dispatch))

            }

        });

    }

};

const alertError = ({title,cancel,close,ok}) => {

    return dispatch => {

        dispatch({

            type:UIState.SHOW_ERROR_ALERT,

            data:{

                type:"btn-error",

                title:title,

                cancel:(cancel?cancel():closeAlert(dispatch)),

                close:(close?close():closeAlert(dispatch)),

                ok:(ok?ok():closeAlert(dispatch))

            }

        });

    }

};

const alertWarn = ({title,cancel,ok,close}) => {

    return dispatch => {

        dispatch({

            type:UIState.SHOW_ERROR_ALERT,

            data:{

                type:"btn-warn",

                title:title,

                cancel:(cancel?cancel():closeAlert(dispatch)),

                close:(close?close():closeAlert(dispatch)),

                ok:(ok?ok():closeAlert(dispatch))

            }

        });

    }

};

const alertTips = ({title,cancel,ok,close}) => {

    return dispatch => {

        dispatch({

            type:UIState.SHOW_ERROR_ALERT,

            data:{

                type:"btn-tips",

                title:title,

                cancel:(cancel?cancel():closeAlert(dispatch)),

                close:(close?close():closeAlert(dispatch)),

                ok:(ok?ok():closeAlert(dispatch))

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

    alertWarn,

    alertTips

}