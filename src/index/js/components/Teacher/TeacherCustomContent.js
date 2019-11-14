import React from "react";
import { connect } from "react-redux";
import {
  Table,
  Button,
  PagiNation,
  CheckBox,
  CheckBoxGroup
} from "../../../../common";
import TeacherCustomActions from "../../actions/Teacher/TeacherCustomActions";
import { postData, getData } from "../../../../common/js/fetch";
import CONFIG from "../../../../common/js/config";
import "../../../scss/TeacherCustomContent.scss";
import { Tabs } from "antd";
import Website from "./Custom/Website";
import Tool from "./Custom/Tool";
import DataBase from "./Custom/DataBase";
import App from "./Custom/App";
const { TabPane } = Tabs;

class TeacherCustomContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: props.Teacher.TeacherCustomModalShow.key || "tool",
      userMsg: props.LoginUser,
      TabChange:true
    };

    const { dispatch, Teacher } = props;

    dispatch(
      TeacherCustomActions.getCustomData(
        this.state.activeKey,
        this.state.userMsg.UserID,
        "",
        "S2-Chinese" || Teacher.HeaderSetting.SubjectSelect.id,
        this.handlePeriod(props.LoginUser.StudyLevel).value
      )
    );
  }

  // Tab change
  onTabsChange = key => {
    const { dispatch, Teacher } = this.props;

    // console.log(key)
    this.setState({
      activeKey: key,
      TabChange:true
    });
    if(key!=='Website'){
        this.setState({
            TabChange:false
        })
    }else{
        this.setState({
            TabChange:true
        })
    }
    dispatch(
      TeacherCustomActions.getCustomData(
        key,
        this.state.userMsg.UserID,
        "",
        "S2-Chinese" || Teacher.HeaderSetting.SubjectSelect.id,
        this.handlePeriod(this.props.LoginUser.StudyLevel).value

      )
    );
  };
  handlePeriod = StudyLevel => {
    let firstSelect = { value: "0", title: "全部学段" };
    if (StudyLevel === "") {
      firstSelect = { value: "0", title: "全部学段" };
    } else if (StudyLevel === "A") {
      firstSelect = { value: "1", title: "小学" };
    } else if (StudyLevel === "B") {
      firstSelect = { value: "2", title: "初中" };
    } else if (StudyLevel === "C") {
      firstSelect = { value: "4", title: "高中" };
    }
    return firstSelect;
  };
  render() {
    const { LoginUser, Teacher, AppLoading } = this.props;
    return (
      <div id="TeacherCustomContent" className="TeacherCustomContent">
        <div className="top-content">
          {/* <span className={`custom-btn  ${this.state.}` }><i className='icon-tool'></i>常用工具定制</span> */}
        </div>
        <div className="main-content">
          <Tabs
            type="card"
            onChange={this.onTabsChange.bind(this)}
            activeKey={this.state.activeKey}
          >
            <TabPane
              tab={
                <span className="my-tab">
                  <i className="tool"></i>
                  <span className="vertical">常用工具定制</span>
                </span>
              }
              key="tool"
            >
              <Tool></Tool>
            </TabPane>
            <TabPane
              tab={
                <span className="my-tab">
                  <i className="App"></i>
                  <span className="vertical">应用定制</span>
                </span>
              }
              key="App"
            >
              <App></App>
            </TabPane>
            <TabPane
              tab={
                <span className="my-tab">
                  <i className="Website"></i>
                  <span className="vertical">网站定制</span>
                </span>
              }
              
              key="Website"
            >
              {this.state.TabChange?(<Website></Website>):''}
            </TabPane>
            <TabPane
              tab={
                <span className="my-tab">
                  <i className="database"></i>
                  <span className="vertical">资源库定制</span>
                </span>
              }
              key="database"
            >
              <DataBase></DataBase>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { LoginUser, Teacher, AppLoading } = state;

  return {
    LoginUser,

    Teacher,

    AppLoading
  };
};
export default connect(mapStateToProps)(TeacherCustomContent);
