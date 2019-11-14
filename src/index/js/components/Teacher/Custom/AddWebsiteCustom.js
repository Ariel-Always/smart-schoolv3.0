import React from "react";
import { connect } from "react-redux";
import {
  Table,
  Button,
  PagiNation,
  CheckBox,
  CheckBoxGroup,
  Tips
} from "../../../../../common";
import { Input } from "antd";
import TeacherCustomActions from "../../../actions/Teacher/TeacherCustomActions";
import { postData, getData } from "../../../../../common/js/fetch";
import CONFIG from "../../../../../common/js/config";
import "../../../../scss/AddWebsiteCustom.scss";

class AddWebsiteCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      WebName: "",
      WebNameTipsTitle:'网站名称不能为空'
    };
  }
  //   网站名称修改
  onWebNameChange = e => {
    this.setState({
      WebName: e.target.value
    });
  };
  // 网站名称修改失去焦点
  onWebNameBlur = e => {};
  render() {
    const { LoginUser, Teacher, AppLoading } = this.props;
    return (
      <div className="AddWebsiteCustom" id="AddWebsiteCustom">
        <div className="row clearfix">
          <span className="left">网站名称:</span>
          <Tips
            overlayClassName="tips"
            visible={EditModalTipsVisible.TitleIDVisible}
            title={this.state.WebNameTipsTitle}
          >
            <Input
              className="right webName"
              placeholder="请输入网站名称.."
              maxLength='200'
              onChange={this.onWebNameChange.bind(this)}
              onBlur={this.onWebNameBlur.bind(this)}
              value={this.state.WebName}
            ></Input>
          </Tips>
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
export default connect(mapStateToProps)(AddWebsiteCustom);
