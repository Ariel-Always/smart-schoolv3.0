import UpUIState from '../../actions/UpUIState';
const AdjustClassModal = (state={show:false,
    gradeDropSelectd:{value:0,title:"请选择年级"},
    classDropSelectd:{value:0,title:"请选择班级"},
    classDisabled:true
},actions) => {
    switch (actions.type) {
        case UpUIState.ADJUST_CLASS_MODAL_SHOW:
            return {...state,show:true,
                gradeDropSelectd:{value:0,title:"请选择年级"},
                classDropSelectd:{value:0,title:"请选择班级"},
                classDisabled:true
            };
        case UpUIState.ADJUST_CLASS_MODAL_HIDE:
            return {...state,show:false};
        default:
            return state;
    }
}
export default AdjustClassModal;