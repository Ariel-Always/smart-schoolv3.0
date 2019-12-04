import React from "react";
import { connect } from "react-redux";
import {
  Alert,
  DetailsModal,
  DropDown,
  PagiNation,
  Search,
  Table,
  Button,
  CheckBox,
  CheckBoxGroup,
  Modal
} from "../../../common/index";
//import '../../../common/scss/_left_menu.scss'
import { Link } from "react-router-dom";
import CONFIG from "../../../common/js/config";
import { postData, getData } from "../../../common/js/fetch";
import md5 from "md5";
import "../../scss/Leader.scss";
import { Tooltip, Input } from "antd";
import TipsContact from "./TipsContact";
import history from "../containers/history";
//import EditModal from './EditModal'
//import IconLocation from '../../images/icon-location.png'
import actions from "../actions";
//import LeaderChangeRecord from './LeaderChangeRecord'
class Leader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //GradeArr:[{value:0,title:'全部年级'}]
      secondDropList: [{ value: 0, title: "全部班级" }],
      DropMenuShow: false,
      selectedRowKeys: [],
      columns: [
        {
          title: "",
          dataIndex: "key",
          key: "key",
          align: "left",
          width: 70,
          render: key => {
            return (
              <div className="registerTime-content">
                <label>
                  {" "}
                  <CheckBox type="gray" value={key}></CheckBox>
                  <span className="key-content">
                    {key + 1 >= 10 ? key + 1 : "0" + (key + 1)}
                  </span>
                </label>
              </div>
            );
          }
        },
        {
          title: "姓名",
          align: "center",
          key: "UserName",
          dataIndex: "UserName",
          width: 130,
          sorter: true,
          render: arr => {
            return (
              <div className="name-content">
                <span
                  title={arr.Name}
                  className="name-UserName"
                  onClick={this.onUserNameClick.bind(this, arr.UserID)}
                >
                  {arr.Name ? arr.Name : "--"}
                </span>
                <br />
                <span title={arr.UserID} className="name-UserID">
                  (
                  <span className="overflow-text">
                    {arr.UserID ? arr.UserID : "--"}
                  </span>
                  )
                </span>
              </div>
            );
          }
        },
        {
          title: "用户名",
          align: "center",
          dataIndex: "ShortName",
          key: "ShortName",
          width: 120,
          sorter: true,
          render: ShortName => {
            return (
              <span title={ShortName} className="UserName ShortName">
                {ShortName ? ShortName : "--"}
              </span>
            );
          }
        },
        {
          title: "个性签名",
          align: "center",
          dataIndex: "Sign",
          width: 300,
          key: "Sign",
          render: Sign => {
            return (
              <span className="Sign" title={Sign}>
                {Sign ? Sign : "--"}
              </span>
            );
          }
        },
        {
          title: "联系方式",
          align: "center",
          width: 120,
          key: "UserContact",
          dataIndex: "UserContact",
          render: UserContact => {
            return (
              <Tooltip
                placement="topLeft"
                trigger="click"
                arrowPointAtCenter={true}
                title={<TipsContact data={UserContact}></TipsContact>}
              >
                <span
                  className="UserContact"
                  onClick={this.onUserContactClick.bind(this, UserContact)}
                >
                  查看
                </span>
              </Tooltip>
            );
          }
        },
        {
          title: "操作",
          align: "center",
          width: 132,
          key: "handle",
          dataIndex: "key",
          render: key => {
            return (
              <div className="handle-content">
                <Button
                  color="blue"
                  type="default"
                  onClick={this.onChangePwdClick.bind(this, key)}
                  className="handle-btn"
                >
                  重置密码
                </Button>
              </div>
            );
          }
        }
      ],
      data: [
        {
          key: 1,
          UserName: {
            key: "01",
            PhotoPath:
              "http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg",
            UserName: "祝泽森"
          },
          UserID: "S00001",
          Grader: "男",
          GradeName: "一年级",
          ClassName: "一年1班",
          Others: {}
        }
      ],

      pagination: 1,
      loading: false,
      selectedAll: false,
      checkedList: [],
      checkAll: false,
      LeaderModalVisible: false,
      userKey: 0,
      LeaderChangeKey: 0,
      ChangePwdMadalVisible: false,
      alertShow: false,
      alertTitle: "提示信息",
      alertQueryShow: false,
      alertQueryTitle: "查询提示~",
      LeaderDetailsMsgModalVisible: false,
      addLeaderModalVisible: false,
      defaultPwd: "888888",
      onClickKey: 0,
      userMsgKey: 0,
      keyList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      sortType: "",
      sortFiled: "",
      userMsg: props.DataState.LoginUser
    };
  }
  componentWillMount() {
    const { dispatch } = this.props;
    let pwd = "888888";

    dispatch(actions.UpDataState.getChangeInputValue(pwd));
  }
  componentWillReceiveProps() {
    let Grades = this.props.DataState.GradeClassMsg.Grades
      ? this.props.DataState.GradeClassMsg.Grades
      : [];
    let len = Grades.lenght;
    //  console.log(Grades)
    let GradeArr = [{ value: 0, title: "全部年级" }];

    for (let i = 0; i < len; i++) {
      let Grade = { value: Grades[i].GradeID, title: Grades[i].GradeName };
      GradeArr.push(Grade);
    }

    this.setState({
      GradeArr: GradeArr
    });
  }

  onSelectChange = e => {
    //  console.log(e)
    //this.setState({ selectedRowKeys });
  };

  onUserContactClick = UserContact => {
    //  console.log(UserContact)
    // this.setState({
    //     LeaderChangeMadalVisible: true,
    //     LeaderChangeKey: key
    // })
  };
  // onChangePwdClick = (e, key) => {
  //   //  console.log(e, key)
  //     this.setState({
  //         LeaderChangeMadalVisible: true,
  //         LeaderChangeKey: key
  //     })
  // }

  onMouseEnterName = () => {};
  OnCheckAllChange = e => {
    const { dispatch, DataState } = this.props;
    //  console.log(e)
    if (e.target.checked) {
      this.setState({
        checkedList: DataState.SchoolLeaderPreview.keyList,
        checkAll: e.target.checked
      });
    } else {
      this.setState({
        checkedList: [],
        checkAll: e.target.checked
      });
    }
  };
  onCheckBoxGroupChange = checkedList => {
    const { dispatch, DataState } = this.props;

    //  console.log(checkedList)
    this.setState({
      checkedList,
      checkAll:
        checkedList.length === DataState.SchoolLeaderPreview.keyList.length
          ? true
          : false
    });
  };
  handleLeaderModalOk = e => {
    //  console.log(e)
    this.setState({
      LeaderModalVisible: false
    });
  };
  handleLeaderModalCancel = e => {
    //  console.log(e)
    this.setState({
      LeaderModalVisible: false
    });
  };
  ChangePwdMadalOk = e => {
    //  console.log(e)
    this.setState({
      ChangePwdMadalVisible: false
    });
  };
  ChangePwdMadalOk = e => {
    //  console.log(e)
    this.setState({
      ChangePwdMadalVisible: false
    });
  };

  onChangePwdAllClick = () => {
    const { dispatch } = this.props;
    //  console.log(this.state.checkedList)
    if (this.state.checkedList.length === 0) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-warn",
          title: "你还没有选择哦~",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this)
        })
      );
    } else {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-query",
          title: "确定批量重置密码？",
          ok: this.onAlertQueryOk.bind(this, "888888"),
          cancel: this.onAlertQueryClose.bind(this),
          close: this.onAlertQueryClose.bind(this)
        })
      );
    }
  };
  onChangePwdClick = key => {
    const { dispatch, DataState } = this.props;
    let data = this.state.LeaderAccountData;
    let pwd = "888888";
    this.setState({
      ChangePwdMadalVisible: true,
      onClickKey: key
    });
  };
  onPwdchangeOk = pwd => {
    //  console.log(pwd);
    const { dispatch, DataState } = this.props;
    let url = "/ResetPwd";
    let UserMsg = DataState.LoginUser;
    if (this.state.defaultPwd === "") {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-query",
          title: "密码不能为空",
          ok: this.onAlertQueryClose.bind(this),
          cancel: this.onAlertQueryClose.bind(this),
          close: this.onAlertQueryClose.bind(this)
        })
      );
      return;
    } else {
      postData(
        CONFIG.UserAccountProxy + url,
        {
          userID:
            DataState.SchoolLeaderPreview.newList[this.state.onClickKey].Others
              .UserID,
          userType: 7,
          newPwd: md5(this.state.defaultPwd)
        },
        2
      )
        .then(res => {
          return res.json();
        })
        .then(json => {
          if (json.StatusCode === 200) {
            dispatch(
              actions.UpUIState.showErrorAlert({
                type: "success",
                title: "操作成功",
                onHide: this.onAlertWarnHide.bind(this)
              })
            );
            this.setState({
              ChangePwdMadalVisible: false,
              defaultPwd: "888888",
              checkedList: [],
              checkAll: false
            });

            dispatch(
              actions.UpDataState.getSchoolLeaderPreview(
                "/GetSchoolLeader?SchoolID=" +
                  this.state.userMsg.SchoolID +
                  this.state.sortFiled +
                  this.state.sortType
              )
            );
          }
        });
    }
  };
  onPwdchangeClose = () => {
    this.setState({
      ChangePwdMadalVisible: false,
      defaultPwd: "888888"
    });
  };
  onPwdchange = e => {
    const { dispatch } = this.props;
    //  console.log(e.target.value)
    this.setState({
      defaultPwd: e.target.value
    });
  };
  onAlertWarnClose = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  onAlertWarnOk = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  onAlertQueryClose = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  onAlertQueryOk = pwd => {
    let url = "/ResetPwd";
    const { dispatch, DataState } = this.props;
    let userIDs = this.state.checkedList.map((child, index) => {
      return DataState.SchoolLeaderPreview.newList[child].Others.UserID;
    });
    postData(
      CONFIG.UserAccountProxy + url,
      {
        userID: userIDs.join(),
        userType: 7,
        newPwd: md5(this.state.defaultPwd)
      },
      2
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch(actions.UpUIState.hideErrorAlert());

          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "操作成功",
              onHide: this.onAlertWarnHide.bind(this)
            })
          );
          this.setState({
            checkedList: [],
            checkAll: false
          });
          dispatch(
            actions.UpDataState.getSchoolLeaderPreview(
              "/GetSchoolLeader?SchoolID=" +
                this.state.userMsg.SchoolID +
                this.state.sortFiled +
                this.state.sortType
            )
          );
        }
      });
    //  console.log(pwd);
    this.setState({
      checkedList: [],
      checkAll: false
    });
  };
  onPagiNationChange = e => {
    //  console.log(e)
  };
  onUserNameClick = UserID => {
    const { dispatch } = this.props;
    dispatch(actions.UpDataState.getUserMsg("/GetUserDetail?userid=" + UserID));

    this.setState({
      LeaderDetailsMsgModalVisible: true
    });
  };
  LeaderDetailsMsgModalOk = () => {
    this.setState({
      LeaderDetailsMsgModalVisible: false
    });
  };
  LeaderDetailsMsgModalCancel = () => {
    this.setState({
      LeaderDetailsMsgModalVisible: false
    });
  };
  onAddLeader = e => {
    //  console.log(e)
    this.setState({
      addLeaderModalVisible: true,
      userKey: "add"
    });
  };
  handleAddLeaderModalOk = e => {
    //  console.log(e)
    this.setState({
      addLeaderModalVisible: false
    });
  };
  handleAddLeaderModalCancel = e => {
    //  console.log(e)
    this.setState({
      addLeaderModalVisible: false
    });
  };
  //table改变，进行排序操作
  onTableChange = (a, b, sorter) => {
    const { DataState, dispatch } = this.props;
    let firstSelect = "";
    let secondSelect = "";
    let keyword = "";

    //  console.log(sorter)
    if (
      sorter &&
      (sorter.columnKey === "UserName" || sorter.columnKey === "ShortName")
    ) {
      let sortType =
        sorter.order === "descend"
          ? "SortType=DESC"
          : sorter.order === "ascend"
          ? "SortType=ASC"
          : "";
      this.setState({
        sortType: "&" + sortType,
        sortFiled: "&sortFiled=" + sorter.columnKey,
        checkedList: [],
        checkAll: false
      });
      dispatch(
        actions.UpDataState.getSchoolLeaderPreview(
          "/GetSchoolLeader?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&sortFiled=" +
            sorter.columnKey +
            "&" +
            sortType
        )
      );
    } else if (sorter) {
      this.setState({
        sortType: "",
        sortFiled: "",
        checkedList: [],
        checkAll: false
      });
      dispatch(
        actions.UpDataState.getSchoolLeaderPreview(
          "/GetSchoolLeader?SchoolID=" + this.state.userMsg.SchoolID
        )
      );
    }
  };
  //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    //console.log('ddd')
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  render() {
    const { UIState, DataState } = this.props;
    const data = {
      userName: "康欣",
      userImg:
        "http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg",
      Gende: "男",
      userText: "学如逆水行舟，不进则退",
      userID: "20170025444",
      userGrade: "一年级",
      userClass: "1班",
      userIDCard: "",
      userPhone: "15626248624",
      userMail: "1519406168@qq.com",
      userAddress: "蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团"
    };
    return (
      <div className="Leader">
        <div className="Leader-box">
          <div className="Leader-top">
            <span className="top-tips">
              <span className="tips menu35 ">领导账号管理</span>
            </span>
          </div>
          <hr className="Leader-hr" />
          <div className="Leader-content">
            <div className="content-render">
              <div>
                <CheckBoxGroup
                  style={{ width: "100%" }}
                  value={this.state.checkedList}
                  onChange={this.onCheckBoxGroupChange.bind(this)}
                >
                  <Table
                    onChange={this.onTableChange.bind(this)}
                    className="table"
                    columns={this.state.columns}
                    pagination={false}
                    loading={UIState.AppLoading.TableLoading}
                    dataSource={DataState.SchoolLeaderPreview.newList}
                  ></Table>
                </CheckBoxGroup>
                {DataState.SchoolLeaderPreview.Total ? (
                  <CheckBox
                    className="checkAll-box"
                    type="gray"
                    onChange={this.OnCheckAllChange}
                    checked={this.state.checkAll}
                  >
                    <span className="checkAll-title">全选</span>
                    <Button
                      onClick={this.onChangePwdAllClick}
                      className="changePwdAll"
                      color="blue"
                    >
                      批量重置密码
                    </Button>
                  </CheckBox>
                ) : (
                  ""
                )}
                {/* <div className='pagination-box'>
                                    <PagiNation
                                        showQuickJumper
                                        total={this.state.pagination.total}
                                        onChange={this.onPagiNationChange}
                                    ></PagiNation>
                                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* 模态框 */}
        {/* <Modal
                    ref='handleLeaderMadal'
                    bodyStyle={{ padding: 0 }}
                    type='1'
                    title='编辑学生'
                    visible={this.state.LeaderModalVisible}
                    onOk={this.handleLeaderModalOk}
                    onCancel={this.handleLeaderModalCancel}
                    
                >
                    <EditModal userKey={this.state.userKey}></EditModal>
                </Modal> */}
        {/* <Modal
                    ref='LeaderChangeMadal'
                    bodyStyle={{ padding: 0 }}
                    type='2'
                    width={650}
                    visible={this.state.LeaderChangeMadalVisible}
                    onOk={this.LeaderChangeMadalOk}
                    onCancel={this.LeaderChangeMadalCancel}
                >
                    <div className='modal-LeaderChange'>
                        <div className='content-top'>
                            <img src={IconLocation} width='30' height='40' alt='icon-location' />
                            <span className='top-text'>毛峰的档案变更记录</span>
                        </div>
                        <div className='content'>
                            <LeaderChangeRecord data={''}></LeaderChangeRecord>
                        </div>
                    </div>
                </Modal>
                <Modal
                    ref='handleLeaderMadal'
                    bodyStyle={{ padding: 0 }}
                    type='1'
                    title={'添加学生'}
                    visible={this.state.addLeaderModalVisible}
                    onOk={this.handleAddLeaderModalOk}
                    onCancel={this.handleAddLeaderModalCancel}
                >
                    <EditModal type='Leader' userKey={this.state.userKey}></EditModal>
                </Modal> */}
        <DetailsModal
          ref="LeaderDetailsMsgModal"
          visible={this.state.LeaderDetailsMsgModalVisible}
          onOk={this.LeaderDetailsMsgModalOk}
          onCancel={this.LeaderDetailsMsgModalCancel}
          data={DataState.GetUserMsg}
          type="leader"
        ></DetailsModal>
        {/* <AntdModal
                    ref='changePwdMadal'
                    
                    footer={null}
                    title='重置密码'
                    visible={this.state.ChangePwdMadalVisible}
                    onOk={this.ChangePwdMadalOk}
                    onCancel={this.ChangePwdMadalCancel}
                >
                    <div>

                    </div>
                </AntdModal> */}
        {/* 提示框 */}
        <Alert
          show={this.state.ChangePwdMadalVisible}
          type={"btn-query"}
          abstract={
            <div className="alert-pwd">
              <span className="alert-pwd-tips">新密码：</span>
              <Input
                size="small"
                onChange={this.onPwdchange.bind(this)}
                style={{ width: 120 + "px" }}
                value={this.state.defaultPwd}
              ></Input>
            </div>
          }
          title={
            this.state.ChangePwdMadalVisible ? (
              <p className="alert-Title">
                确定重置
                <span
                  title={
                    DataState.SchoolLeaderPreview.newList[this.state.onClickKey]
                      .UserName.Name
                  }
                  className="alert-Title-name"
                >
                  {
                    DataState.SchoolLeaderPreview.newList[this.state.onClickKey]
                      .UserName.Name
                  }
                </span>
                <span
                  title={
                    DataState.SchoolLeaderPreview.newList[this.state.onClickKey]
                      .UserName.UserID
                  }
                  className="alert-Title-id"
                >
                  (
                  {
                    DataState.SchoolLeaderPreview.newList[this.state.onClickKey]
                      .UserName.UserID
                  }
                  )
                </span>{" "}
                的密码？
              </p>
            ) : (
              ""
            )
          }
          onOk={this.onPwdchangeOk}
          onCancel={this.onPwdchangeClose}
          onClose={this.onPwdchangeClose}
        ></Alert>
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
export default connect(mapStateToProps)(Leader);
