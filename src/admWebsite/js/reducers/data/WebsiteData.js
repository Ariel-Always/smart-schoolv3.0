import UpDataState from "../../actions/UpDataState";
import GetMenuData from "./GetMenuData";
import Public from "../../../../common/js/public";
const WebsiteData = (
  state = {
    WebName: "",
    WebAddress: "",
    SubjectName: [],
    SubjectID: [],
    Subject: {},
    WebType: {},
    PeriodID: [],
    PeriodName: [],
    WebsiteId: ""
  },
  actions
) => {
  let Data = {};
  switch (actions.type) {
    case UpDataState.SET_WEBSITE_DATA:
      return Object.assign({}, state, { ...actions.data });
    case UpDataState.SET_INIT_WEBSITE_DATA:
      Data = handleInitData(actions.data);
      return Object.assign({}, state, { ...Data });
    default:
      return state;
  }
};

function handleInitData(initData, state) {
  let data = {};
  for (let key in state) {
    let isExist = false;
    for (let index in initData) {
      if (index === key) {
        data[key] = initData[index];
        isExist = true;
      }
    }
    if (!isExist) {
      if (key === "PeriodID" && key === "PeriodName") {
        data[key] = [];
      } else if (key === "WebType") {
        data[key] = GetMenuData.TypeList.slice(1, 2)[0];
      } else if (key === "Subject") {
        data[key] = GetMenuData.SubjectList.slice(1, 2)[0];
      } else {
        data[key] = "";
      }
    }
  }
  return data;
}

export default WebsiteData;
