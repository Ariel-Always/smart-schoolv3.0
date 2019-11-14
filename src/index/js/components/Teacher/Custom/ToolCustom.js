import React from "react";
import { connect } from "react-redux";
import { Tips, RadioGroup, Radio } from "../../../../../common";
import { Input } from "antd";
import TeacherCustomActions from "../../../actions/Teacher/TeacherCustomActions";
import { postData, getData } from "../../../../../common/js/fetch";
import CONFIG from "../../../../../common/js/config";
import "../../../../scss/AddWebsiteCustom.scss";

class ToolCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ToolName: "",
      ToolNameTipsTitle: "工具名称不能为空",
      ToolUrl: "",
      ToolUrlTipsTitle: "访问参数不能为空",
      ToolType: 1,
      ToolImgUrl: ""
    };
  }

  componentWillMount() {
    const { dispatch, Teacher } = this.props;
    let ToolData = Teacher.ToolData;
    let TeacherCustomData = Teacher.TeacherCustomData;
    this.setState({
      ToolName: ToolData.ToolName,
      ToolUrl: ToolData.ToolUrl,
      ToolType: ToolData.ToolType,
      ToolImgUrl: ToolData.ToolImgUrl
    });
  }
  //   工具名称修改
  onToolNameChange = e => {
    this.setState({
      ToolName: e.target.value
    });
  };
  // 工具名称修改失去焦点
  onToolNameBlur = e => {
    const { dispatch } = this.props;
    // console.log(e.target.value);
    let value = e.target.value;
    if (value === "") {
      dispatch(
        TeacherCustomActions.setCustomTipsVisible({ ToolNameTipsVisible: true })
      );
    } else {
      dispatch(
        TeacherCustomActions.setHandleToolData({
          ToolName: value
        })
      );
      dispatch(
        TeacherCustomActions.setCustomTipsVisible({
          ToolNameTipsVisible: false
        })
      );
    }
  };

  // 工具类型
  onToolTypeChange = e => {
    // console.log(e.target.value);
    const { dispatch } = this.props;

    this.setState({
      ToolType: e.target.value
    });
    dispatch(
      TeacherCustomActions.setHandleToolData({
        ToolType: e.target.value
      })
    );
  };

  //   网站地址修改
  onToolUrlChange = e => {
    this.setState({
      ToolUrl: e.target.value
    });
  };
  // 网站地址修改失去焦点
  onToolUrlBlur = e => {
    const { dispatch } = this.props;
    let Test = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
    // console.log(e.target.value);
    let value = e.target.value;
    let isTrue = Test.test(value);

    if (value === "") {
      this.setState({
        ToolUrlTipsTitle: "访问参数不能为空"
      });
      dispatch(
        TeacherCustomActions.setCustomTipsVisible({
          ToolUrlTipsVisible: true
        })
      );
    } else if (!isTrue) {
      this.setState({
        ToolUrlTipsTitle: "访问参数格式错误"
      });
      dispatch(
        TeacherCustomActions.setCustomTipsVisible({
          ToolUrlTipsVisible: true
        })
      );
    } else {
      this.setState({
        ToolUrlTipsTitle: "访问参数不能为空"
      });
      dispatch(
        TeacherCustomActions.setHandleToolData({
          ToolUrl: value
        })
      );
      dispatch(
        TeacherCustomActions.setCustomTipsVisible({
          ToolUrlTipsVisible: false
        })
      );
    }
  };


  render() {
    const { LoginUser, Teacher, AppLoading } = this.props;
    return (
      <div className="ToolCustom" id="ToolCustom">
        <div className="box-left"></div>
        <div className="box-right">
          <div className="row clearfix">
            <span className="left">工具名称:</span>
            <Tips
              overlayClassName="tips"
              visible={Teacher.TeacherTipsVisible.ToolNameTipsVisible}
              title={this.state.ToolNameTipsTitle}
            >
              <Input
                className="right ToolName"
                placeholder="请输入工具名称..."
                maxLength={200}
                onChange={this.onToolNameChange.bind(this)}
                onBlur={this.onToolNameBlur.bind(this)}
                value={this.state.ToolName}
              ></Input>
            </Tips>
          </div>
          <div className="row clearfix">
            <span className="left">工具类型:</span>
            <RadioGroup
            className='right ToolType'
              value={this.state.ToolType}
              onChange={this.onToolTypeChange.bind(this)}
            >
              <Radio type='gray' value={1}>网站网址</Radio>
              <Radio type='gray' value={2}>本地exe应用</Radio>
            </RadioGroup>
          </div>
          <div className="row clearfix">
            <span className="left">访问参数:</span>
            <Tips
              overlayClassName="tips"
              visible={Teacher.TeacherTipsVisible.ToolUrlTipsVisible}
              title={this.state.ToolUrlTipsTitle}
            >
              <Input.TextArea
                className="right ToolUrl"
                placeholder="请输入访问参数..."
                maxLength={200}
                autoSize={
                  {minRows: 2, maxRows: 3}
                }
                onChange={this.onToolUrlChange.bind(this)}
                onBlur={this.onToolUrlBlur.bind(this)}
                value={this.state.ToolUrl}
              ></Input.TextArea>
            </Tips>
          </div>
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
export default connect(mapStateToProps)(ToolCustom);
