import SCGCRActions from  '../../actions/Manager/SCGCRActions';
//学科，课时、年级、教室reducer
const SubjectCourseGradeClassRoom = (state={

    ItemSubjectSelect:{value:0,title:"全部学科"},

    ItemWeekPicked:{value:0,title:0}

},actions) => {

    switch (actions.type) {

        case SCGCRActions.SCGCR_INFO_INIT:

            return {...state,...actions.data,ItemWeekPicked:{value:actions.data.NowWeekNo,title:actions.data.NowWeekNo}};

        default:
            return state;

    }

};

export default SubjectCourseGradeClassRoom;