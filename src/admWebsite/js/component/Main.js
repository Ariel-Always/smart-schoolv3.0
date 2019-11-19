import React, { Component } from "react";
import {
  Loading,
  Empty,
  DropDown,
  CheckBox,
  CheckBoxGroup,
  PagiNation
} from "../../../common";
import { connect } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import history from "../containers/history";
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";
import actions from "../actions";
import "../../scss/Main.scss";


class Main extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      UserMsg: props.DataState.LoginUser,
      PeriodSelect: { value: 0, title: "全部" },
      SubjectSelect: { value: 0, title: "全部" },
      TypeSelect: { value: 0, title: "全部" },
      selfSelect: false,
      checkList: [],
      checkAll: false,
      plainOption: [0, 1, 2, 3, 4, 5, 6, 7],
      pagination: 1,
      pageParam: "&pageSize=8&currentIndex=1",
      PeriodParam: "",
      SubjectParam: "",
      TypeParam: "",
      SelfParam: "",
      ImgType: [true, true, true, true, true, true, true, true]
    };
  }
  componentWillMount() {}
  // 学段选择
  PeriodDropMenu = e => {
    const { dispatch, DataState } = this.props;
    let PeriodParam = "&Period=" + e.value;
    let Url =
      "/SubjectResMgr/WebSiteMgr/GetWebsiteInfoList?TypeID=1&pageSize=8&currentIndex=1" +
      PeriodParam +
      this.state.SubjectParam +
      this.state.SelfParam +
      this.state.TypeParam;

    dispatch(actions.UpDataState.getWebsiteResourceData(Url));

    this.setState({
      checkList: [],
      checkAll: false,
      pagination: 1,
      PeriodSelect: e,
      pageParam: "&pageSize=8&currentIndex=1",
      PeriodParam: PeriodParam,
      ImgType: [true, true, true, true, true, true, true, true]
    });
  };
  // 学科选择
  SubjectDropMenu = e => {
    const { dispatch, DataState } = this.props;

    let SubjectParam = "&SubjectID=" + e.value;
    let Url =
      "/SubjectResMgr/WebSiteMgr/GetWebsiteInfoList?TypeID=1&pageSize=8&currentIndex=1" +
      SubjectParam +
      this.state.PeriodParam +
      this.state.SelfParam +
      this.state.TypeParam;

    dispatch(actions.UpDataState.getWebsiteResourceData(Url));
    this.setState({
      checkList: [],
      checkAll: false,
      pagination: 1,
      SubjectSelect: e,
      pageParam: "&pageSize=8&currentIndex=1",
      SubjectParam: SubjectParam,
      ImgType: [true, true, true, true, true, true, true, true]
    });
  };
  // 分类选择
  TypeDropMenu = e => {
    const { dispatch, DataState } = this.props;

    let TypeParam = "&SubTypeID=" + e.value;
    let Url =
      "/SubjectResMgr/WebSiteMgr/GetWebsiteInfoList?TypeID=1&pageSize=8&currentIndex=1" +
      TypeParam +
      this.state.SubjectParam +
      this.state.SelfParam +
      this.state.PeriodParam;

    dispatch(actions.UpDataState.getWebsiteResourceData(Url));
    this.setState({
      checkList: [],
      checkAll: false,
      pagination: 1,
      TypeSelect: e,
      pageParam: "&pageSize=8&currentIndex=1",
      TypeParam: TypeParam,
      ImgType: [true, true, true, true, true, true, true, true]
    });
  };
  // 只显示本学校
  onSelfCheckChange = e => {
    const { dispatch, DataState } = this.props;

    let SelfParam = "&isFromOurSchool=" + e.target.checked;
    let Url =
      "/SubjectResMgr/WebSiteMgr/GetWebsiteInfoList?TypeID=1&pageSize=8&currentIndex=1" +
      SelfParam +
      this.state.SubjectParam +
      this.state.TypeParam +
      this.state.PeriodParam;

    dispatch(actions.UpDataState.getWebsiteResourceData(Url));
    this.setState({
      checkList: [],
      checkAll: false,
      pagination: 1,
      selfSelect: e.target.checked,
      pageParam: "&pageSize=8&currentIndex=1",
      SelfParam: SelfParam,
      ImgType: [true, true, true, true, true, true, true, true]
    });
  };
  // 添加网站
  onAddWebsiteClick = e => {
    const { dispatch, DataState } = this.props;
    dispatch({ type: actions.UpUIState.ADD_MODAL_OPEN });
  };
  // 多选change
  onCheckBoxGroupChange = e => {
    this.setState({
      checkList: e,
      checkAll: e.length === this.state.plainOption.length ? true : false
    });
  };

  // 全选
  onCheckAllChange = e => {
    this.setState({
      checkAll: e.target.checked,
      checkList: e.target.checked ? this.state.plainOption : []
    });
  };
  // 分页
  onPagiNationChange = page => {
    const { dispatch, DataState } = this.props;

    let pageParam = "&pageSize=8&currentIndex=" + page;
    let Url =
      "/SubjectResMgr/WebSiteMgr/GetWebsiteInfoList?TypeID=1" +
      pageParam +
      this.state.SelfParam +
      this.state.SubjectParam +
      this.state.TypeParam +
      this.state.PeriodParam;

    dispatch(actions.UpDataState.getWebsiteResourceData(Url));
    this.setState({
      checkList: [],
      checkAll: false,
      pagination: page,
      pageParam: pageParam,
      ImgType: [true, true, true, true, true, true, true, true]
    });
  };
  // 图片加载失败
  onImgError = key => {
    let ImgType = this.state.ImgType;
    ImgType[key] = false;
    this.setState({
      ImgType: ImgType
    });
  };

  // 删除全部
  onDeleteAllClick = () => {
    const { dispatch, DataState } = this.props;
    let checkList = this.state.checkList;
    if (checkList.length === 0) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-warn",
          title: "您还没有选择",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this)
        })
      );
      return;
    }
    let List = DataState.GetWebsiteResourceData.List;
    let ListSelect = [];
    checkList instanceof Array &&
      checkList.map((child, index) => {
        if (List[child]) {
          ListSelect.push(List[child].ID);
        }
      });
    let WebsiteIds = ListSelect.join();
    dispatch(
      actions.UpUIState.showErrorAlert({
        type: "btn-query",
        title: "您确定删除吗？",
        ok: this.onDeleteOK.bind(this, WebsiteIds),
        cancel: this.onAppAlertCancel.bind(this),
        close: this.onAppAlertClose.bind(this)
      })
    );
  };
  //自动关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  //提示弹窗
  onAppAlertOK() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  onAppAlertCancel() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  onAppAlertClose() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  // 编辑
  onEditClick = index => {
    console.log(index);
    const { dispatch, DataState } = this.props;
    dispatch({ type: actions.UpUIState.EDIT_MODAL_OPEN });
  };
  // 删除
  onDeleteClick = index => {
    console.log(index);
    const { dispatch, DataState } = this.props;
    let List = DataState.GetWebsiteResourceData.List;

    let WebsiteIds = List[index].ID;
    dispatch(
      actions.UpUIState.showErrorAlert({
        type: "btn-query",
        title: "您确定删除吗？",
        ok: this.onDeleteOK.bind(this, WebsiteIds),
        cancel: this.onAppAlertCancel.bind(this),
        close: this.onAppAlertClose.bind(this)
      })
    );
  };
  // 确认删除
  onDeleteOK = WebsiteIds => {
    const { dispatch, DataState } = this.props;
    let pageParam = "&pageSize=8&currentIndex=1";

    let url = "/SubjectResMgr/WebSiteMgr/DeleteMultiWebsites";
    let Url =
      "/SubjectResMgr/WebSiteMgr/GetWebsiteInfoList?TypeID=1" +
      pageParam +
      this.state.SelfParam +
      this.state.SubjectParam +
      this.state.TypeParam +
      this.state.PeriodParam;

    postData(
      CONFIG.WebsiteProxy + url,
      {
        WebsiteIds: WebsiteIds
      },
      2
    )
      .then(res => res.json())
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "操作成功",
              onHide: this.onAlertWarnHide.bind(this)
            })
          );
          dispatch(actions.UpDataState.getWebsiteResourceData(Url));
          this.setState({
            checkList: [],
            checkAll: false,
            pagination: 1,
            pageParam: "&pageSize=8&currentIndex=1",
            ImgType: [true, true, true, true, true, true, true, true]
          });
        }
      });
  };
  render() {
    const { DataState } = this.props;
    let { List, Total, Current } = DataState.GetWebsiteResourceData;
    let TypeList = DataState.GetMenuData.TypeList;
    let PeriodList = DataState.GetMenuData.PeriodList;
    let SubjectList = DataState.GetMenuData.SubjectList;
    return (
      <div id="Main" className="Main">
        <div className="Main-top">
          <div className="top-box top-left period-box">
            <span className="box-tips">学段:</span>
            <DropDown
              ref="period-DropMenu"
              className="box-dropmenu period-dropmenu"
              onChange={this.PeriodDropMenu.bind(this)}
              width={108}
              height={240}
              dropSelectd={this.state.PeriodSelect}
              dropList={PeriodList}
            ></DropDown>
          </div>
          <div className="top-box top-left subject-box">
            <span className="box-tips">学科:</span>
            <DropDown
              ref="subject-DropMenu"
              className="box-dropmenu subject-dropmenu"
              onChange={this.PeriodDropMenu.bind(this)}
              width={108}
              height={240}
              dropSelectd={this.state.SubjectSelect}
              dropList={SubjectList}
            ></DropDown>
          </div>
          <div className="top-box top-left type-box">
            <span className="box-tips">分类:</span>
            <DropDown
              ref="type-DropMenu"
              className="box-dropmenu type-dropmenu"
              onChange={this.TypeDropMenu.bind(this)}
              width={108}
              height={240}
              dropSelectd={this.state.TypeSelect}
              dropList={TypeList}
            ></DropDown>
          </div>
          <div className="top-box top-left self-box">
            <CheckBox
              type="gray"
              checked={this.state.selfSelect}
              onChange={this.onSelfCheckChange.bind(this)}
              value={"self"}
            >
              只显示本学校添加的
            </CheckBox>
          </div>
          <div
            onClick={this.onAddWebsiteClick.bind(this)}
            className="top-box top-right btn-box"
          >
            <i className="btn-icon-add"></i>
            <span className="btn-title">添加网站</span>
          </div>
        </div>
        <hr className="Main-hr"></hr>
        <div className="Main-content">
          <CheckBoxGroup
            value={this.state.checkList}
            onChange={this.onCheckBoxGroupChange.bind(this)}
          >
            {List instanceof Array &&
              List.map((child, index) => {
                return (
                  <div key={index} className="content-card">
                    <div className="card-left">
                      <CheckBox type="gray" value={index}></CheckBox>
                      {this.state.ImgType[index] ? (
                        <div
                          className={`img-box ${"ImgError_" + child.TypeColor}`}
                        >
                          <img
                            className={`left-img `}
                            onError={this.onImgError.bind(this, index)}
                            src={child.ImgUrl}
                            alt={child.ImgUrl}
                          ></img>
                        </div>
                      ) : (
                        <span
                          className={`ImgError ${"ImgError_" +
                            child.TypeColor}`}
                        >
                          {child.Name.slice(0, 1)}
                        </span>
                      )}
                    </div>
                    <div className="card-rigth">
                      <p
                        title={child.Name}
                        className="rigth-content webName-content "
                      >
                        <span className="webName">{child.Name}</span>
                        <span
                          title={child.SubTypeNamefield}
                          className={`WebType ${"WebType_" + child.TypeColor}`}
                        >
                          {child.SubTypeNamefield}
                        </span>
                      </p>
                      <p
                        title={child.SubjectName}
                        className="rigth-content webSubject"
                      >
                        {"学科：" + child.SubjectName}
                      </p>
                      <a
                        target="_blank"
                        href={child.Url}
                        title={child.Url}
                        className="rigth-content webUrl"
                      >
                        {child.Url}
                      </a>
                    </div>
                    <div className="Edit-content">
                      <span
                        onClick={this.onDeleteClick.bind(this, index)}
                        className="card-btn btn-delete"
                      ></span>
                      <span
                        onClick={this.onEditClick.bind(this, index)}
                        className="card-btn btn-edit"
                      ></span>
                    </div>
                  </div>
                );
              })}
          </CheckBoxGroup>
        </div>
        <hr className="Main-hr-2"></hr>
        <div className="Main-event-box">
          {List instanceof Array && List.length > 0 ? (
            <div>
              <CheckBox
                type="gray"
                className="checkBox-All"
                checked={this.state.checkAll}
                onChange={this.onCheckAllChange.bind(this)}
              >
                全选
              </CheckBox>
              <div
                onClick={this.onDeleteAllClick.bind(this)}
                className="btn-delete-All"
              >
                批量删除
              </div>
            </div>
          ) : (
            ""
          )}
          <PagiNation
            className="pagination"
            showQuickJumper
            current={this.state.pagination}
            hideOnSinglepage={true}
            total={Total}
            onChange={this.onPagiNationChange.bind(this)}
          ></PagiNation>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState
  };
};
export default connect(mapStateToProps)(Main);
