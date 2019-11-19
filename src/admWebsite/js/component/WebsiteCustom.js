import React from "react";
import { connect } from "react-redux";
import { CheckBox, CheckBoxGroup, Tips, DropDown } from "../../../common";
import { Input } from "antd";
import actions from "../actions";
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";
import "../../scss/WebsiteCustom.scss";

class WebsiteCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      WebName: "",
      WebNameTipsTitle: "网站名称不能为空",
      WebAddress: "",
      WebAddressTipsTitle: "网站地址不能为空",
      Subject: {},
      WebType: {},
      Period: [],
      WebTypeList: []
    };
  }

  componentWillMount() {
    const { dispatch, DataState,UIState } = this.props;
    let WebData = DataState.WebsiteData;
    let TypeList = DataState.GetMenuData.TypeList;
    let PeriodList = DataState.GetMenuData.PeriodList;
    let SubjectList = DataState.GetMenuData.SubjectList;

    this.setState({
      WebName: WebData.WebName,
      WebAddress: WebData.WebAddress,
      Subject: WebData.Subject.value?WebData.Subject:SubjectList.slice(1,2)[0],
      WebType: WebData.WebType.value? WebData.WebType:TypeList.slice(1,2)[0],
      WebTypeList: TypeList.slice(1),
      SubjectList:SubjectList.slice(1)
    });

    let newPeriodList = [];
    let Period = [];
    PeriodList instanceof Array &&
      PeriodList.map((child, index) => {
        if (child.value !== "0") {
          newPeriodList.push(child);
          Period.push(child.value);
        }
      });
    if (WebData.PeriodID[0] !==  '0') {
      Period = WebData.PeriodID;
    }
    console.log(Period)
    this.setState({
      Period: Period,
      PeriodList: newPeriodList
    });
  }
  //   网站名称修改
  onWebNameChange = e => {
    this.setState({
      WebName: e.target.value
    });
  };
  // 网站名称修改失去焦点
  onWebNameBlur = e => {
    const { dispatch } = this.props;
    let Test = /\S/;

    // console.log(e.target.value);
    let value = e.target.value;
    if (!Test.test(value)) {
      dispatch(
        actions.UpUIState.AppTipsVisible({ WebNameTipsVisible: true })
      );
    } else {
      dispatch(
        actions.UpDataState.setWebsiteData({
          WebName: value
        })
      );
      dispatch(
        actions.UpUIState.AppTipsVisible({ WebNameTipsVisible: false })
      );
    }
  };

  //   网站地址修改
  onWebAddressChange = e => {
    this.setState({
      WebAddress: e.target.value
    });
  };
  // 网站地址修改失去焦点
  onWebAddressBlur = e => {
    const { dispatch } = this.props;
    let Test = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
    // console.log(e.target.value);
    let value = e.target.value;
    let isTrue = Test.test(value);

    if (value === "") {
      this.setState({
        WebAddressTipsTitle: "网站地址不能为空"
      });
      dispatch(
        actions.UpUIState.AppTipsVisible({
          WebAddressTipsVisible: true
        })
      );
    } else if (!isTrue) {
      this.setState({
        WebAddressTipsTitle: "网站地址格式错误"
      });
      dispatch(
        actions.UpUIState.AppTipsVisible({
          WebAddressTipsVisible: true
        })
      );
    } else {
      this.setState({
        WebAddressTipsTitle: "网站地址不能为空"
      });
      dispatch(
        actions.UpDataState.setWebsiteData({
          WebAddress: value
        })
      );
      dispatch(
        actions.UpUIState.AppTipsVisible({
          WebAddressTipsVisible: false
        })
      );
    }
  };

  // 类型选择
  onDropMenuChange = e => {
    const { dispatch } = this.props;
    console.log(e);
    this.setState({
      WebType: e
    });
    dispatch(
      actions.UpDataState.setWebsiteData({
        WebAddress: e
      })
    );
  };
 // 学科选择
 onDropMenuSubjectChange = e => {
  const { dispatch } = this.props;
  console.log(e);
  this.setState({
    Subject: e
  });
  dispatch(
    actions.UpDataState.setWebsiteData({
      Subject: e
    })
  );
};
  // 选择学段
  changeCheckBox = Period => {
    const { dispatch } = this.props;
    if (Period.length === 0) {
      return;
    }
    this.setState({
      Period: Period
    });
    dispatch(
      actions.UpDataState.setWebsiteData({
        PeriodID: Period
      })
    );
  };
  render() {
    const { LoginUser, DataState,UIState } = this.props;
    return (
      <div className="WebsiteCustom" id="WebsiteCustom">
        <div className="row clearfix">
          <span className="left">网站名称:</span>
          <Tips
            overlayClassName="tips"
            visible={UIState.AppTipsVisible.WebNameTipsVisible}
            title={this.state.WebNameTipsTitle}
          >
            <Input
              className="right webName"
              placeholder="请输入网站名称.."
              maxLength={200}
              onChange={this.onWebNameChange.bind(this)}
              onBlur={this.onWebNameBlur.bind(this)}
              value={this.state.WebName}
            ></Input>
          </Tips>
        </div>
        <div className="row clearfix">
          <span className="left">网站地址:</span>
          <Tips
            overlayClassName="tips"
            visible={UIState.AppTipsVisible.WebAddressTipsVisible}
            title={this.state.WebAddressTipsTitle}
          >
            <Input
              className="right webAddress"
              placeholder="http(s)://"
              maxLength={400}
              onChange={this.onWebAddressChange.bind(this)}
              onBlur={this.onWebAddressBlur.bind(this)}
              value={this.state.WebAddress}
            ></Input>
          </Tips>
        </div>
        <div className="row clearfix">
          <span className="left">适用学科:</span>
          <DropDown
            ref="WebNameDropMenu"
            className="right Subject"
            style={{ zIndex: 2 }}
            onChange={this.onDropMenuSubjectChange.bind(this)}
            width={110}
            height={240}
            dropSelectd={this.state.Subject}
            dropList={this.state.SubjectList}
          ></DropDown>
        </div>
        <div className="row clearfix">
          <span className="left">网站分类:</span>
          <DropDown
            ref="dropMenu"
            className="right WebType"
            style={{ zIndex: 2 }}
            onChange={this.onDropMenuChange.bind(this)}
            width={110}
            height={240}
            dropSelectd={this.state.WebType}
            dropList={this.state.WebTypeList}
          ></DropDown>
        </div>
        <div className="row clearfix">
          <span className="left">适用学段:</span>
          <CheckBoxGroup
            onChange={this.changeCheckBox.bind(this)}
            className={"right checkedBoxGroupMap PeriodList"}
            value={this.state.Period}
          >
            {this.state.PeriodList instanceof Array &&
              this.state.PeriodList.map((child, index) => {
                // if(child.value==='0'){
                //   return;
                // }
                return (
                  <CheckBox
                    className={"checkedBoxMap Period"}
                    key={index}
                    value={child.value}
                  >
                    {child.title}
                  </CheckBox>
                );
              })}
          </CheckBoxGroup>
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
export default connect(mapStateToProps)(WebsiteCustom);
