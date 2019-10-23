import UpDataState from '../../actions/UpDataState';
import history from '../../containers/history'

const GetCoureClassAllMsg = (state = {Subject:'',Grade:''}, actions) => {
    switch (actions.type) {
        case UpDataState.GET_COURE_CLASS_ALL_MSG:
            let data = handleData(actions.data, actions.func)
            return Object.assign({}, state, { ...data });
        case UpDataState.SET_COURE_CLASS_ALL_MSG:
            // console.log(state)
            let setData = setNewData(state.MenuParams, actions.data, actions.subjectID)
            return Object.assign({}, state, { MenuParams: setData,Grade:actions.subjectID?actions.data:'',Subject:actions.subjectID?actions.subjectID:actions.data==='all'?'': actions.data});
        default:
            return state;
    }
};
function setNewData(MenuParams, key, subjectID) {
    const { MenuBox, children } = MenuParams;
    let params = [];
    // console.log(children, key, subjectID)
    //去active和selected为false
    params = children instanceof Array && children.map((child, index) => {
        let myChild = [];
        const { children, ...Params } = child;
        if (Params.key === key) {
            Params.active = true;
            Params.selected = false;
        } else {
            Params.active = false;
            Params.selected = false;

        }
        if (children)
            myChild = children.map((value) => {
                if (value.key === key) {
                    value.active = true;
                    value.selected = true;
                    if (subjectID === Params.key) {
                        Params.active = false;
                        Params.selected = true;
                    }
                } else {
                    value.active = false;
                    value.selected = false;
                }
                return value

            })
        if (child.type === 'All') {
            return { ...Params };
        }
        return { children: myChild, ...Params };

    })
    return {
        children: params, MenuBox: MenuBox
    }

}
function handleData(data, func) {
    let oldData = data;
    let route = history.location.pathname;
    let pathArr = route.split('/');
    let handleRoute = pathArr[1];
    let routeID = pathArr[2];
    let subjectID = pathArr[3];
    let classID = pathArr[4];
    let AllActive = false;
    let AllSelect = false;
    let Subject = '';
    let Grade = ''
    //学科ID：{name：学科名，年级ID：年级名}
    let Subjects = {};

    if (route === '/' || handleRoute === 'All') {
        AllActive = true;
        AllSelect = true;
    }else if(handleRoute!=='Search'){
        Subject = routeID;
    } 
    if(classID){
        Grade = classID
    }
    const { ItemSubject, ...newData } = data;
    //处理为左侧菜单数组
    let children = [{
        key: 'all',
        title: '教学班级信息总览',
        type: 'All',
        icon: 'menu10',
        active: AllActive,
        selected: AllSelect,
        onTitleClick: () => { func('all', 'All') }
    }];
    let newItem = ItemSubject instanceof Array && ItemSubject.map((child, index) => {
        let ID = child.GradeIDs.split(',');
        let name = child.GradesNames.split(',');
        let Grades = {};
        let menu = {
            key: child.SubjectID,
            type: 'Subject',
            title: child.SubjectName + '教学班',
            icon: 'menu20',
            onTitleClick: () => { func(child.SubjectID, 'Subject') }
        };
        Subjects[child.SubjectID] = {subjectName:child.SubjectName};
        if (handleRoute === 'Subject' && subjectID === 'all' && child.SubjectID === routeID ){
            //menu['selected'] = true;
            menu['active'] = true;
        }
        let childMenu = [];
        ID.map((id, key) => {
            Grades[id] = name[key];
            Subjects[child.SubjectID][id] = name[key];
            if(handleRoute === 'Subject' && subjectID === 'Class'&& child.SubjectID === routeID && classID ===id){
                childMenu.push({
                    key: id,
                    title: name[key],
                    type: 'Class',
                    selected:true,
                    active:true,
                    onTitleClick: () => { func(id, "Class", child.SubjectID) }
                }) 
                menu['selected'] = true;
            }else 
            childMenu.push({
                key: id,
                title: name[key],
                type: 'Class',
                onTitleClick: () => { func(id, "Class", child.SubjectID) }
            })
        })
        menu['children'] = childMenu
        children.push(menu)
        const { GradeIDs, GradesNames, ...item } = child;
        return { ...item, Grades: Grades };
    })

    let MenuParams = {
        MenuBox: {
            display: true,
            width: 240,
            MenuBoxTopPic: 'pic3'
        },
        children: children,
        initParams: ''
    };

    return {Subjects:Subjects, newData: { ...newData, ItemSubject: newItem }, oldData: oldData, MenuParams: MenuParams ,Subject:Subject,Grade:Grade};
}
export default GetCoureClassAllMsg;