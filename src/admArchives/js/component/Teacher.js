import React from "react";
import { connect } from "react-redux";
import {
  DetailsModal,
  DropDown,
  PagiNation,
  Search,
  Table,
  Button,
  CheckBox,
  CheckBoxGroup,
  Modal,
  Empty
} from "../../../common/index";
//import '../../../common/scss/_left_menu.scss'
import { Link } from "react-router-dom";
import CONFIG from "../../../common/js/config";
import { postData, getData } from "../../../common/js/fetch";
import Public from "../../../common/js/public";
import { Scrollbars } from "react-custom-scrollbars";

import history from "../containers/history";
import EditModal from "./EditModal";
import IconLocation from "../../images/icon-location.png";
import actions from "../actions";
import StudentChangeRecord from "./StudentChangeRecord";
import "../../scss/Teacher.scss";
class Teacher extends React.Component {
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
          dataIndex: "OrderNo",
          key: "OrderNo",
          width: 68,
          align: "left",
          render: key => {
            return (
              <div className="registerTime-content">
                <label style={{whiteSpace:'nowrap'}}><CheckBox
                  value={key.key}
                  type="gray"
                  onChange={this.onCheckChange}
                ></CheckBox>
                <span className="key-content">
                  {key.OrderNo + 1 >= 10
                    ? key.OrderNo + 1
                    : "0" + (key.OrderNo + 1)}
                </span></label>
              </div>
            );
          }
        },
        {
          title: "",
          align: "right",
          key: "UserImg",
          colSpan:0,
          width: 50,
          dataIndex: "UserImgs",
          render: arr => {
            return (
              <div className="name-content">
                <img
                  alt={arr.UserName}
                  onClick={this.onUserNameClick.bind(this, arr.key)}
                  className="name-img"
                  width="47"
                  height="47"
                  src={arr.UserImg}
                ></img>
              </div>
            );
          }
        },
        {
          title: "姓名",
          align: "left",
          colSpan:2,
          width: 90,
          key: "UserName",
          dataIndex: "UserName",
          sorter: true,
          render: arr => {
            return (
              <div className="name-content">
                <span
                  title={arr.UserName}
                  className="name-UserName"
                  onClick={this.onUserNameClick.bind(this, arr.key)}
                >
                  {arr.UserName ? arr.UserName : "--"}
                </span>
              </div>
            );
          }
        },
        {
          title: "工号",
          align: "center",
          dataIndex: "UserID",
          key: "UserID",
          width: 120,
          sorter: true,
          render: UserID => {
            return (
              <span title={UserID} className="UserID">
                {UserID ? UserID : "--"}
              </span>
            );
          }
        },
        {
          title: "性别",
          align: "center",
          dataIndex: "Gender",
          width: 80,
          key: "Gender",
          render: Gender => {
            return (
              <span title={Gender} className="Gender">
                {Gender ? Gender : "--"}
              </span>
            );
          }
        },
        {
          title: "所教学科",
          width: 110,
          align: "center",
          key: "SubjectNames",
          dataIndex: "SubjectNames",
          render: arr => {
            return (
              <span title={arr.showTwo} className="SubjectName">
                {arr.showTwo ? arr.showTwo : "--"}
              </span>
            );
          }
        },
        {
          title: "职称",
          width: 110,
          align: "center",
          key: "Titles",
          dataIndex: "Titles",
          render: Titles => {
            return (
              <span title={Titles.TitleName} className="Title">
                {Titles.TitleName ? Titles.TitleName : "--"}
              </span>
            );
          }
        },
        {
          title: "操作",
          align: "center",
          width: 232,
          key: "handleMsg",
          dataIndex: "handleMsg",
          render: handleMsg => {
            return (
              <div className="handle-content">
                <Button
                  color="blue"
                  type="default"
                  onClick={this.TeacherEdit.bind(this, handleMsg)}
                  className="handle-btn"
                >
                  编辑
                </Button>
                <Button
                  color="blue"
                  type="default"
                  onClick={this.TeacherChange.bind(this, handleMsg)}
                  className="check-btn"
                >
                  查看变更记录
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
      TeacherModalVisible: false,
      userKey: 0,
      TeacherChangeKey: 0,
      TeacherChangeMadalVisible: false,
      alertShow: false,
      alertTitle: "提示信息",
      alertQueryShow: false,
      alertQueryTitle: "查询提示~",
      TeacherDetailsMsgModalVisible: false,
      addTeacherModalVisible: false,
      selectSubject: { value: "all", title: "全部学科" },
      userMsg: props.DataState.LoginUser,
      keyword: "",
      CancelBtnShow: "n",
      searchValue: "",
      sortType: "",
      sortFiled: "",
      searchWord:'',
      teacherChangeUserLog: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    const { DataState, UIState,dispatch } = nextProps;
    let SubjectTeacherPreview = DataState.SubjectTeacherPreview;
    let selectSubject = SubjectTeacherPreview.SubjectID || {
      value: "all",
      title: "全部学科"
    }
    console.log( SubjectTeacherPreview.SubjectID )
    this.setState({
      selectSubject: selectSubject,
      pagination:Number(SubjectTeacherPreview.pageIndex)+1
    });
    // dispatch(
    //   actions.UpDataState.getSubjectTeacherPreview(
    //     "/GetTeacherToPage?SchoolID=" +
    //       this.state.userMsg.SchoolID +
    //       "&SubjectIDs=" +
    //       selectSubject.value +
    //       "&PageIndex=0&PageSize=10" +
    //       this.state.sortType +
    //       this.state.sortFiled,
    //       selectSubject
    //   )
    // );
  }
  componentWillMount() {}

  TeacherDropMenu = e => {
    const { dispatch } = this.props;

    this.setState({
      checkedList: [],
      checkAll: false,
      selectSubject: e,
      searchValue: "",
      keyword: "",
      pagination: 1,
      CancelBtnShow: "n"
    });
    dispatch(
      actions.UpDataState.getSubjectTeacherPreview(
        "/GetTeacherToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&SubjectIDs=" +
          e.value +
          "&PageIndex=0&PageSize=10" +
          this.state.sortType +
          this.state.sortFiled,
        e
      )
    );
  };

  TeacherSearch = e => {
    const { dispatch } = this.props;

    if (e.value === "") {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-warn",
          title: "你还没有输入关键字哦~",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this)
        })
      );
      return;
    } else {
      this.setState({
        checkedList: [],
        checkAll: false,
        keyword: "&keyword=" + e.value,
        CancelBtnShow: "y",
        searchWord:e.value,
        pagination: 1
      });
      dispatch(
        actions.UpDataState.getSubjectTeacherPreview(
          "/GetTeacherToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&SubjectIDs=" +
            this.state.selectSubject.value +
            "&PageIndex=0&PageSize=10&keyword=" +
            e.value +
            this.state.sortType +
            this.state.sortFiled,
          this.state.selectSubject
        )
      );
    }
  };

  onSelectChange = e => {
    //this.setState({ selectedRowKeys });
  };

  TeacherEdit = e => {
    this.setState({
      TeacherModalVisible: true,
      userKey: e.key
    });
  };

  TeacherChange = e => {
    const { dispatch, DataState } = this.props;

    let innerID = DataState.SubjectTeacherPreview.newList[e.key].Others.InnerID;
    let url = "/GetUserLog?innerID=" + innerID;
    // console.log(innerID)
    dispatch(actions.UpDataState.getUserLog(url, "teacher"));
    this.setState({
      teacherChangeUserLog:
        DataState.SubjectTeacherPreview.newList[e.key].Others
    });
  };

  onMouseEnterName = () => {};
  OnCheckAllChange = e => {
    if (e.target.checked) {
      this.setState({
        checkedList: this.props.DataState.SubjectTeacherPreview.keyList,
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
    const { dispatch } = this.props;

    // postData('http://192.168.2.9:8082/Schedule/api/SetSubstituteTeacher', {
    //     Type:0,
    //     schooID: "s0003",
    //     Item:'',
    //     TeacherID1:'T0002',
    //     TeacherID2:'T0003'
    // }, 2, 'json').then(res => {
    //     return res.json()
    // }).then(json => {
    //     if (json.StatusCode !== 200) {
    //         dispatch(actions.UpUIState.showErrorAlert({
    //             type: 'btn-error',
    //             title: json.Message,
    //             ok: this.onAppAlertOK.bind(this),
    //             cancel: this.onAppAlertCancel.bind(this),
    //             close: this.onAppAlertClose.bind(this)
    //         }));
    //     } else if (json.StatusCode === 200) {

    //         this.setState({
    //             TeacherModalVisible: false
    //         })
    //         dispatch(actions.UpDataState.getSubjectTeacherPreview('/GetTeacherToPage?SchoolID=school1&SubjectIDs=all&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC'));

    //     }
    // });
    this.setState({
      checkedList,
      checkAll:
        checkedList.length ===
        this.props.DataState.SubjectTeacherPreview.keyList.length
          ? true
          : false
    });
  };
  handleTeacherModalOk = e => {
    // console.log(e)
    let url = "/EditTeacher";
    const { DataState, dispatch, UIState } = this.props;
    const { initTeacherMsg, changeTeacherMsg } = DataState.SetTeacherMsg;
    let picObj = DataState.GetPicUrl.picObj;
    let visible = UIState.EditModalTipsVisible;
    let haveMistake = false;
    for (let visi in visible) {
      if (visible[visi]) {
        return;
      }
    }

    // console.log(visible)
    if (
      Public.comparisonObject(initTeacherMsg, changeTeacherMsg) &&
      !picObj.picUploader.isChanged()
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-error",
          title: "你没有修改数据哦",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this)
        })
      );
      return;
    } else {
      if (picObj.picUploader.uploadSubmit()) {
        let PhotoEdit = 0;
        if (picObj.picUploader.isChanged()) {
          PhotoEdit = 1;
        }
        postData(
          CONFIG.UserInfoProxy + url,
          {
            ...changeTeacherMsg,
            photoPath: picObj.picUploader.getCurImgPath(),
            PhotoEdit:PhotoEdit
          },
          2
        )
          .then(res => {
            return res.json();
          })
          .then(json => {
            // if (json.StatusCode !== 200) {
            //   dispatch(
            //     actions.UpUIState.showErrorAlert({
            //       type: "btn-error",
            //       title: json.Message,
            //       ok: this.onAppAlertOK.bind(this),
            //       cancel: this.onAppAlertCancel.bind(this),
            //       close: this.onAppAlertClose.bind(this)
            //     })
            //   );
            // } else
            if (json.StatusCode === 200) {
              dispatch(
                actions.UpUIState.showErrorAlert({
                  type: "success",
                  title: "操作成功",
                  onHide: this.onAlertWarnHide.bind(this)
                })
              );
              this.setState({
                TeacherModalVisible: false
              });
              this.setState({
                checkedList: [],
                checkAll: false
              });
              dispatch(
                actions.UpDataState.getSubjectTeacherPreview(
                  "/GetTeacherToPage?SchoolID=" +
                    this.state.userMsg.SchoolID +
                    "&SubjectIDs=" +
                    this.state.selectSubject.value +
                    "&PageIndex=" +
                    (this.state.pagination - 1) +
                    "&PageSize=10" +
                    this.state.keyword +
                    this.state.sortType +
                    this.state.sortFiled,
                  this.state.selectSubject
                )
              );
              dispatch(actions.UpUIState.editAlltModalTipsVisible());
            }
          });
      }
    }
  };
  //提示事件
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
  //
  handleTeacherModalCancel = e => {
    // console.log(e);
    const { dispatch } = this.props;

    dispatch(actions.UpUIState.editAlltModalTipsVisible());

    this.setState({
      TeacherModalVisible: false
    });
  };
  //添加教师
  handleAddTeacherModalOk = e => {
    // console.log(e);
    let url = "/AddTeacher";
    const { DataState, dispatch, UIState } = this.props;
    let picObj = DataState.GetPicUrl.picObj;
    const { initTeacherMsg, changeTeacherMsg } = DataState.SetTeacherMsg;
    let visible = UIState.EditModalVisible;
    let haveMistake = false;
    for (let visi in visible) {
      if (visible[visi]) {
        haveMistake = true;
      }
    }
    //用户ID必填
    if (changeTeacherMsg.userID === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          UserIDTipsVisible: true
        })
      );
      haveMistake = true;
    }
    //用户名必填
    if (changeTeacherMsg.userName === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          UserNameTipsVisible: true
        })
      );
      haveMistake = true;
    }
    //性别必选
    if (!changeTeacherMsg.gender) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          GenderTipsVisible: true
        })
      );
      haveMistake = true;
    }
    //职称必选
    if (changeTeacherMsg.titleID === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          TitleIDVisible: true
        })
      );
      haveMistake = true;
    }
    //学科必选
    if (changeTeacherMsg.subjectIDs === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          changeSubjectTipsVisible: true
        })
      );
      haveMistake = true;
    }
    if (haveMistake) {
      return;
    }
    if (
      Public.comparisonObject(initTeacherMsg, changeTeacherMsg) &&
      !picObj.picUploader.isChanged()
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-error",
          title: "你没有填写资料哦",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this)
        })
      );
      return;
    } else {
      if (picObj.picUploader.uploadSubmit()) {
        postData(
          CONFIG.UserInfoProxy + url,
          {
            ...changeTeacherMsg,
            photoPath: picObj.picUploader.getCurImgPath()
          },
          2
        )
          .then(res => {
            return res.json();
          })
          .then(json => {
            // if (json.StatusCode !== 200) {
            //   dispatch(
            //     actions.UpUIState.showErrorAlert({
            //       type: "btn-error",
            //       title: json.Msg,
            //       ok: this.onAppAlertOK.bind(this),
            //       cancel: this.onAppAlertCancel.bind(this),
            //       close: this.onAppAlertClose.bind(this)
            //     })
            //   );
            // } else
            if (json.StatusCode === 200) {
              dispatch(
                actions.UpUIState.showErrorAlert({
                  type: "success",
                  title: "操作成功",
                  onHide: this.onAlertWarnHide.bind(this)
                })
              );
              // console.log(json.Data)
              this.setState({
                studentModalVisible: false
              });
              this.setState({
                addTeacherModalVisible: false
              });
              this.setState({
                checkedList: [],
                checkAll: false
              });
              dispatch(
                actions.UpDataState.getSubjectTeacherPreview(
                  "/GetTeacherToPage?SchoolID=" +
                    this.state.userMsg.SchoolID +
                    "&SubjectIDs=" +
                    this.state.selectSubject.value +
                    "&PageIndex=" +
                    (this.state.pagination - 1) +
                    "&PageSize=10" +
                    this.state.keyword +
                    this.state.sortType +
                    this.state.sortFiled,
                  this.state.selectSubject
                )
              );
              dispatch(actions.UpUIState.editAlltModalTipsVisible());
            }
          });
      }
    }
  };
  handleAddTeacherModalCancel = e => {
    // console.log(e);
    const { dispatch } = this.props;

    dispatch(actions.UpUIState.editAlltModalTipsVisible());
    this.setState({
      addTeacherModalVisible: false
    });
  };
  TeacherChangeMadalOk = e => {
    const { dispatch } = this.props;

    dispatch({ type: actions.UpUIState.TEACHER_CHANGE_MODAL_CLOSE });
  };
  TeacherChangeMadalCancel = e => {
    const { dispatch } = this.props;

    dispatch({ type: actions.UpUIState.TEACHER_CHANGE_MODAL_CLOSE });
  };

  onDeleteAllClick = () => {
    const { dispatch } = this.props;
    // console.log(this.state.checkedList);
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
          title: "确定删除？",
          ok: this.onAlertQueryOk.bind(this),
          cancel: this.onAlertQueryClose.bind(this),
          close: this.onAlertQueryClose.bind(this)
        })
      );
    }
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
  onAlertQueryOk = () => {
    const { dispatch, DataState } = this.props;
    let url = "/DeleteTeacher";
    let checkList = this.state.checkedList;
    let dataList = DataState.SubjectTeacherPreview.newList;
    let UserIDList = checkList.map((child, index) => {
      return dataList[child].UserID;
    });
    let UserIDListString = UserIDList.join();

    postData(
      CONFIG.UserInfoProxy + url,
      {
        userIDs: UserIDListString,
        schoolID: this.state.userMsg.SchoolID
      },
      2
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          this.setState({
            checkedList: [],
            checkAll: false
          });
          dispatch(actions.UpUIState.hideErrorAlert());
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "操作成功",
              onHide: this.onAlertWarnHide.bind(this)
            })
          );
          dispatch(
            actions.UpDataState.getSubjectTeacherPreview(
              "/GetTeacherToPage?SchoolID=" +
                this.state.userMsg.SchoolID +
                "&SubjectIDs=" +
                this.state.selectSubject.value +
                "&PageIndex=" +
                (this.state.pagination - 1) +
                "&PageSize=10" +
                this.state.keyword +
                this.state.sortType +
                this.state.sortFiled,
              this.state.selectSubject
            )
          );
          this.setState({
            checkedList: [],
            checkAll: false
          });
        }
      });
  };
  // 分页
  onPagiNationChange = e => {
    const { dispatch, DataState } = this.props;
    // console.log(this.state.selectSubject)
    this.setState({
      checkedList: [],
      checkAll: false,
      pagination: e
    });
    dispatch(
      actions.UpDataState.getSubjectTeacherPreview(
        "/GetTeacherToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&SubjectIDs=" +
          this.state.selectSubject.value +
          "&PageIndex=" +
          (e - 1) +
          "&PageSize=10" +
          this.state.sortType +
          this.state.sortFiled +
          this.state.keyword,
        this.state.selectSubject
      )
    );
    this.setState({
      checkedList: [],
      checkAll: false,
      pagination: e
    });
  };
  onUserNameClick = key => {
    const { DataState } = this.props;
    this.setState({
      TeacherDetailsMsgModalVisible: true,
      detailData: DataState.SubjectTeacherPreview.pensonalList[key]
    });
  };
  TeacherDetailsMsgModalOk = () => {
    this.setState({
      TeacherDetailsMsgModalVisible: false
    });
  };
  TeacherDetailsMsgModalCancel = () => {
    this.setState({
      TeacherDetailsMsgModalVisible: false
    });
  };
  onAddTeacher = e => {
    // console.log(e);
    this.setState({
      addTeacherModalVisible: true,
      userKey: "add"
    });
  };
  //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    //console.log('ddd')
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  //对象深度对比
  deepCompare(x, y) {
    var i, l, leftChain, rightChain;

    function compare2Objects(x, y) {
      var p;

      // remember that NaN === NaN returns false
      // and isNaN(undefined) returns true
      if (
        isNaN(x) &&
        isNaN(y) &&
        typeof x === "number" &&
        typeof y === "number"
      ) {
        return true;
      }

      // Compare primitives and functions.
      // Check if both arguments link to the same object.
      // Especially useful on the step where we compare prototypes
      if (x === y) {
        return true;
      }

      // Works in case when functions are created in constructor.
      // Comparing dates is a common scenario. Another built-ins?
      // We can even handle functions passed across iframes
      if (
        (typeof x === "function" && typeof y === "function") ||
        (x instanceof Date && y instanceof Date) ||
        (x instanceof RegExp && y instanceof RegExp) ||
        (x instanceof String && y instanceof String) ||
        (x instanceof Number && y instanceof Number)
      ) {
        return x.toString() === y.toString();
      }

      // At last checking prototypes as good as we can
      if (!(x instanceof Object && y instanceof Object)) {
        return false;
      }

      if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
        return false;
      }

      if (x.constructor !== y.constructor) {
        return false;
      }

      if (x.prototype !== y.prototype) {
        return false;
      }

      // Check for infinitive linking loops
      if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
        return false;
      }

      // Quick checking of one object being a subset of another.
      // todo: cache the structure of arguments[0] for performance
      for (p in y) {
        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
          return false;
        } else if (typeof y[p] !== typeof x[p]) {
          return false;
        }
      }

      for (p in x) {
        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
          return false;
        } else if (typeof y[p] !== typeof x[p]) {
          return false;
        }

        switch (typeof x[p]) {
          case "object":
          case "function":
            leftChain.push(x);
            rightChain.push(y);

            if (!compare2Objects(x[p], y[p])) {
              return false;
            }

            leftChain.pop();
            rightChain.pop();
            break;

          default:
            if (x[p] !== y[p]) {
              return false;
            }
            break;
        }
      }

      return true;
    }

    if (arguments.length < 1) {
      return true; //Die silently? Don't know how to handle such case, please help...
      // throw "Need two or more arguments to compare";
    }

    for (i = 1, l = arguments.length; i < l; i++) {
      leftChain = []; //Todo: this can be cached
      rightChain = [];

      if (!compare2Objects(arguments[0], arguments[i])) {
        return false;
      }
    }

    return true;
  }
  //监听table的change进行排序操作
  onTableChange = (page, filters, sorter) => {
    const { DataState, dispatch } = this.props;
    // console.log(sorter)
    if (
      sorter &&
      (sorter.columnKey === "UserName" || sorter.columnKey === "UserID")
    ) {
      let sortType =
        sorter.order === "descend"
          ? "SortType=DESC"
          : sorter.order === "ascend"
          ? "SortType=ASC"
          : "";
      this.setState({
        checkedList: [],
        checkAll: false,
        sortType: "&" + sortType,
        sortFiled: "&sortFiled=" + sorter.columnKey
      });
      dispatch(
        actions.UpDataState.getSubjectTeacherPreview(
          "/GetTeacherToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&SubjectIDs=" +
            this.state.selectSubject.value +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            "&sortFiled=" +
            sorter.columnKey +
            "&PageSize=10&" +
            sortType +
            this.state.keyword,
          this.state.selectSubject
        )
      );
    } else if (sorter && !sorter.columnKey) {
      this.setState({
        checkedList: [],
        checkAll: false,
        sortType: "",
        sortFiled: ""
      });
      dispatch(
        actions.UpDataState.getSubjectTeacherPreview(
          "/GetTeacherToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&SubjectIDs=" +
            this.state.selectSubject.value +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            "&PageSize=10" +
            this.state.keyword,
          this.state.selectSubject
        )
      );
    }
  };
  //搜索change
  onChangeSearch = e => {
    this.setState({
      searchValue: e.target.value
    });
  };
  // 取消搜索
  onCancelSearch = e => {
    const { dispatch } = this.props;

    this.setState({
      CancelBtnShow: "n",
      keyword: "",
      searchValue: "",
      checkAll: false,
      checkedList: [],
      pagination: 1
    });
    dispatch(
      actions.UpDataState.getSubjectTeacherPreview(
        "/GetTeacherToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&SubjectIDs=" +
          this.state.selectSubject.value +
          "&PageIndex=" +
          0 +
          "&PageSize=10" +
          this.state.sortType +
          this.state.sortFiled,
        this.state.selectSubject
      )
    );
  };
  render() {
    const { UIState, DataState } = this.props;
    // const data = {
    //     userName: '康欣',
    //     userImg: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg',
    //     Gende: '男',
    //     userText: '学如逆水行舟，不进则退',
    //     userID: '20170025444',
    //     userGrade: '一年级',
    //     userClass: '1班',
    //     userIDCard: '',
    //     userPhone: '15626248624',
    //     userMail: '1519406168@qq.com',
    //     userAddress: '蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团'
    // };
    return (
      <div className="Teacher">
        <div className="Teacher-box">
          <div className="Teacher-top">
            <span className="top-tips">
              <span className="tips menu33 ">教师档案管理</span>
            </span>
            <div className="top-nav">
              <span
                className="link"
                style={{ cursor: "pointer" }}
                onClick={this.onAddTeacher}
              >
                <span className="add">添加教师</span>
                
              </span>
              <span className="divide">|</span>
              <Link
                className="link"
                target="_blank"
                to="/ImportFile/Teacher"
                replace
              >
                
                <span className="ImportFile">导入教师</span>
              </Link>
            </div>
          </div>
          <hr className="Teacher-hr" />
          <div className="Teacher-content">
            <div className="content-top">
              <DropDown
                ref="dropMenuFirst"
                onChange={this.TeacherDropMenu.bind(this)}
                width={120}
                height={240}
                dropSelectd={this.state.selectSubject}
                dropList={
                  DataState.SubjectTeacherMsg.returnData
                    ? DataState.SubjectTeacherMsg.returnData.SubjectList
                    : [{ value: "all", title: "全部学科" }]
                }
              ></DropDown>
              <div className="Search">
                <span
                  className="search-tips"
                  style={{
                    display: this.state.CancelBtnShow === "y" ? "block" : "none"
                  }}
                >
                  <span>
                    {"搜索关键词“" + this.state.searchWord + "”共找到"}
                  </span>
                  <span className="Total">
                    {" " + DataState.SubjectTeacherPreview.Total + " "}
                  </span>
                  人
                </span>
                <Search
                  placeHolder="请输入工号或姓名进行搜索..."
                  onClickSearch={this.TeacherSearch.bind(this)}
                  width={250}
                  height={30}
                  Value={this.state.searchValue}
                  onCancelSearch={this.onCancelSearch}
                  onChange={this.onChangeSearch.bind(this)}
                  CancelBtnShow={this.state.CancelBtnShow}
                ></Search>
              </div>
            </div>
            <div className="content-render">
              <div>
                <CheckBoxGroup
                  style={{ width: "100%" }}
                  value={this.state.checkedList}
                  onChange={this.onCheckBoxGroupChange.bind(this)}
                >
                  <Table
                    className="table"
                    columns={this.state.columns}
                    pagination={false}
                    loading={UIState.AppLoading.TableLoading}
                    dataSource={DataState.SubjectTeacherPreview.newList}
                    onChange={this.onTableChange.bind(this)}
                  ></Table>
                </CheckBoxGroup>
                {DataState.SubjectTeacherPreview.Total ? (
                  <div style={{    display: 'inline-block'}}>
                  <CheckBox
                    className="checkAll-box"
                    type="gray"
                    onChange={this.OnCheckAllChange}
                    checked={this.state.checkAll}
                  >
                    <span className="checkAll-title">全选</span>
                    
                  </CheckBox>
                  <Button
                  onClick={this.onDeleteAllClick}
                  className="deleteAll"
                  color="blue"
                >
                  删除
                </Button>
                </div>
                ) : (
                  ""
                )}
                <div className="pagination-box">
                  <PagiNation
                    showQuickJumper
                    current={this.state.pagination}
                    hideOnSinglepage={true}
                    total={DataState.SubjectTeacherPreview.Total}
                    onChange={this.onPagiNationChange}
                  ></PagiNation>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 模态框 */}
        <Modal
          ref="handleTeacherMadal"
          bodyStyle={{ padding: 0 }}
          type="1"
          title={"编辑教师"}
          visible={this.state.TeacherModalVisible}
          onOk={this.handleTeacherModalOk}
          onCancel={this.handleTeacherModalCancel}
        >
          {this.state.TeacherModalVisible ? (
            <EditModal type="teacher" userKey={this.state.userKey}></EditModal>
          ) : (
            ""
          )}
        </Modal>
        <Modal
          ref="handleTeacherMadal"
          bodyStyle={{ padding: 0 }}
          type="1"
          title={"添加教师"}
          visible={this.state.addTeacherModalVisible}
          onOk={this.handleAddTeacherModalOk}
          onCancel={this.handleAddTeacherModalCancel}
        >
          {this.state.addTeacherModalVisible ? (
            <EditModal type="teacher" userKey={this.state.userKey}></EditModal>
          ) : (
            ""
          )}
        </Modal>
        {/* <Modal
          ref="TeacherChangeMadal"
          bodyStyle={{ padding: 0 }}
          type="2"
          width={650}
          visible={this.state.TeacherChangeMadalVisible}
          onOk={this.TeacherChangeMadalOk}
          onCancel={this.TeacherChangeMadalCancel}
        >
          <div className="modal-TeacherChange">
            <div className="content-top">
              <img
                src={IconLocation}
                width="30"
                height="40"
                alt="icon-location"
              />
              <span className="top-text">毛峰的档案变更记录</span>
            </div>
            <div className="content">
              <TeacherChangeRecord data={""}></TeacherChangeRecord>
            </div>
          </div>
        </Modal> */}
        <Modal
          ref="StudentChangeMadal"
          bodyStyle={{ padding: 0 }}
          type="2"
          width={650}
          visible={UIState.AppModal.TeacherChangeMadalVisible}
          onOk={this.TeacherChangeMadalOk}
          onCancel={this.TeacherChangeMadalCancel}
        >
          {DataState.GetUserLog.UserLog instanceof Array &&
          DataState.GetUserLog.UserLog.length > 0 ? (
            <div className="modal-studentChange">
              <div className="content-top">
                <img
                  src={IconLocation}
                  width="30"
                  height="40"
                  alt="icon-location"
                />
                <span className="top-text">
                  {this.state.teacherChangeUserLog.UserName}的档案变更记录
                </span>
              </div>
              <div className="content">
                <Scrollbars style={{ width: 100 + "%", height: 280 + "px" }}>
                  {UIState.AppModal.TeacherChangeMadalVisible ? (
                    <StudentChangeRecord
                      data={DataState.GetUserLog.UserLog}
                    ></StudentChangeRecord>
                  ) : (
                    ""
                  )}
                </Scrollbars>
              </div>
            </div>
          ) : (
            <Empty
              type="4"
              title="该用户暂无档案变更记录"
              style={{ marginTop: "200px", transform: "translateY(-50%)" }}
            ></Empty>
          )}
        </Modal>
        <DetailsModal
          ref="TeacherDetailsMsgModal"
          visible={this.state.TeacherDetailsMsgModalVisible}
          onOk={this.TeacherDetailsMsgModalOk}
          onCancel={this.TeacherDetailsMsgModalCancel}
          data={this.state.detailData ? this.state.detailData : []}
          type="Teacher"
        >
          <div className="modal-top"></div>
          <div className="modal-content"></div>
        </DetailsModal>
        {/* 提示框 */}
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
export default connect(mapStateToProps)(Teacher);
