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
  Modal
} from "../../../common/index";
//import '../../../common/scss/_left_menu.scss'
import { Link } from "react-router-dom";
import "../../scss/Student.scss";
import CONFIG from "../../../common/js/config";
import { postData, getData } from "../../../common/js/fetch";
import Public from "../../../common/js/public";

import history from "../containers/history";
import EditModal from "./EditModal";
import IconLocation from "../../images/icon-location.png";
import actions from "../actions";
import StudentChangeRecord from "./StudentChangeRecord";
class Student extends React.Component {
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
                <CheckBox
                  value={key.key}
                  onChange={this.onCheckChange}
                ></CheckBox>
                <span className="key-content">
                  {key.OrderNo + 1 >= 10
                    ? key.OrderNo + 1
                    : "0" + (key.OrderNo + 1)}
                </span>
              </div>
            );
          }
        },
        {
          title: "",
          align: "right",
          key: "UserImg",
          width: 50,
          dataIndex: "UserName",
          render: arr => {
            return (
              <div className="name-content">
                <img
                  alt={arr.UserName}
                  onClick={this.onUserNameClick.bind(this, arr.key)}
                  className="name-img"
                  width="47"
                  height="47"
                  src={arr.PhotoPath}
                ></img>
              </div>
            );
          }
        },
        {
          title: "姓名",
          align: "left",
          width: 70,
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
          title: "学号",
          align: "center",
          width: 120,
          dataIndex: "UserID",
          key: "UserID",
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
          width: 80,
          dataIndex: "Gender",
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
          title: "年级",
          align: "center",
          key: "GradeName",
          width: 110,
          dataIndex: "GradeName",
          render: GradeName => {
            return (
              <span title={GradeName} className="GradeName">
                {GradeName ? GradeName : "--"}
              </span>
            );
          }
        },
        {
          title: "班级",
          align: "center",
          width: 110,
          key: "ClassName",
          dataIndex: "ClassName",
          render: ClassName => {
            return (
              <span title={ClassName} className="ClassName">
                {ClassName ? ClassName : "--"}
              </span>
            );
          }
        },
        {
          title: "操作",
          align: "center",
          key: "handle",
          width: 232,
          dataIndex: "key",
          render: key => {
            return (
              <div className="handle-content">
                {/* <Button color='blue' type='default' onClick={this.StudentChange.bind(this, key)} className='handle-btn'>查看变记录</Button> */}
                <Button
                  color="blue"
                  type="default"
                  onClick={this.StudentEdit.bind(this, key)}
                  className="handle-btn"
                >
                  编辑
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
      studentModalVisible: false,
      userKey: 0,
      StudentChangeKey: 0,
      StudentChangeMadalVisible: false,
      alertShow: false,
      alertTitle: "提示信息",
      alertQueryShow: false,
      alertQueryTitle: "查询提示~",
      StudentDetailsMsgModalVisible: false,
      addStudentModalVisible: false,
      firstSelect: { value: 0, title: "全部年级" },
      secondSelect: { value: 0, title: "全部班级" },
      userMsg: props.DataState.LoginUser,
      keyword: "",
      CancelBtnShow: "n",
      searchValue: "",
      sortType: "",
      sortFiled: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    let Grades = nextProps.DataState.GradeClassMsg.Grades
      ? nextProps.DataState.GradeClassMsg.Grades
      : [];
    let len = Grades.lenght;
    let initFirstSelect = { value: 0, title: "全部年级" };
    let Classes = [{ value: 0, title: "全部班级" }];
    let Select = nextProps.DataState.GradeStudentPreview;
    //  console.log(Grades)
    let GradeArr = [{ value: 0, title: "全部年级" }];

    for (let i = 0; i < len; i++) {
      let Grade = { value: Grades[i].GradeID, title: Grades[i].GradeName };
      GradeArr.push(Grade);
    }

    if (
      nextProps.DataState.GradeClassMsg.returnData.AllClasses &&
      Select.GradeID &&
      Select.GradeID.value !== 0
    ) {
      let ClassArr =
        nextProps.DataState.GradeClassMsg.returnData.AllClasses[
          Select.GradeID.value
        ];
      ClassArr.map(Class => {
        Classes.push(Class);
      });
      //Classes.push(this.props.DataState.GradeClassMsg.returnData.AllClasses[e.value]);
      //this.refs.dropMenuSecond.state.dropList = Classes;]
      this.setState({
        secondDropList: Classes,
        DropMenuShow: true
        // pagination:1
      });
    } else {
      this.setState({
        DropMenuShow: false
      });
    }
    this.setState({
      GradeArr: GradeArr,
      firstSelect: Select.GradeID || initFirstSelect,
      secondSelect: Select.ClassID
    });
  }
  componentWillMount() {}

  StudentDropMenu = e => {
    const { dispatch, DataState } = this.props;

    let Classes = [{ value: 0, title: "全部班级" }];
    // this.setState({
    //     firstSelect:e
    // })
    ////  console.log(this.refs.dropMenuSecond)
    if (e.value !== 0) {
      //Classes.push(this.props.DataState.GradeClassMsg.returnData.AllClasses[e.value]);
      //this.refs.dropMenuSecond.state.dropList = Classes;]
      this.setState({
        checkedList: [],
        checkAll: false,
        firstSelect: e,
        CancelBtnShow: "n",
        searchValue: "",
        pagination: 1,
        keyword: ""
      });
      dispatch(
        actions.UpDataState.getGradeStudentPreview(
          "/GetStudentToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&GradeID=" +
            e.value +
            "&PageIndex=0&PageSize=10" +
            this.state.sortFiled +
            this.state.sortType,
          e
        )
      );
    } else {
      this.setState({
        checkedList: [],
        checkAll: false,
        firstSelect: e,
        CancelBtnShow: "n",
        searchValue: "",
        pagination: 1,
        keyword: ""
      });
      dispatch(
        actions.UpDataState.getGradeStudentPreview(
          "/GetStudentToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=10" +
            this.state.sortFiled +
            this.state.sortType
        )
      );
    }
  };

  StudentDropMenuSecond = e => {
    const { dispatch, DataState } = this.props;
    //  console.log(e);
    // this.setState({
    //     secondSelect:e
    // })
    if (e.value === 0) {
      this.setState({
        checkedList: [],
        checkAll: false,
        secondSelect: e,
        CancelBtnShow: "n",
        searchValue: "",
        pagination: 1
      });
      dispatch(
        actions.UpDataState.getGradeStudentPreview(
          "/GetStudentToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&GradeID=" +
            this.state.firstSelect.value +
            "&PageIndex=0&PageSize=10" +
            this.state.sortFiled +
            this.state.sortType,
          this.state.firstSelect
        )
      );
    } else {
      this.setState({
        checkedList: [],
        checkAll: false,
        secondSelect: e,
        searchValue: "",
        CancelBtnShow: "n",
        pagination: 1
      });
      dispatch(
        actions.UpDataState.getGradeStudentPreview(
          "/GetStudentToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&GradeID=" +
            this.state.firstSelect.value +
            "&ClassID=" +
            e.value +
            "&PageIndex=0&PageSize=10" +
            this.state.sortFiled +
            this.state.sortType,
          this.state.firstSelect,
          e
        )
      );
    }
  };

  StudentSearch = e => {
    const { dispatch, DataState } = this.props;
    // this.setState({
    //     keyword: '&keyword='+e.value,
    //     CancelBtnShow: 'y',
    //     pagination: 1,
    // })
    if (e.value === "") {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-error",
          title: "你还没有输入关键字哦~",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this)
        })
      );
      return;
    }
    this.setState({
      checkedList: [],
      checkAll: false,
      keyword: "&keyword=" + e.value,
      CancelBtnShow: "y",
      pagination: 1
    });
    // //  console.log(e)
    dispatch(
      actions.UpDataState.getGradeStudentPreview(
        "/GetStudentToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          (this.state.firstSelect.value !== 0
            ? "&gradeID=" + this.state.firstSelect.value
            : "") +
          (this.state.secondSelect.value !== 0
            ? "&classID=" + this.state.secondSelect.value
            : "") +
          "&keyword=" +
          e.value +
          "&PageIndex=0&PageSize=10" +
          this.state.sortFiled +
          this.state.sortType,
        this.state.firstSelect,
        this.state.secondSelect
      )
    );
  };

  onSelectChange = e => {
    // //  console.log(e)
    //this.setState({ selectedRowKeys });
  };

  StudentEdit = (e, key) => {
    //  console.log(e, key)
    this.setState({
      studentModalVisible: true,
      userKey: e
    });
  };

  StudentChange = (e, key) => {
    //  console.log(e, key)
    this.setState({
      StudentChangeMadalVisible: true,
      StudentChangeKey: key
    });
  };

  onMouseEnterName = () => {};
  OnCheckAllChange = e => {
    //  console.log(e)
    if (e.target.checked) {
      this.setState({
        checkedList: this.props.DataState.GradeStudentPreview.keyList,
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
    //  console.log(checkedList)
    this.setState({
      checkedList,
      checkAll:
        checkedList.length ===
        this.props.DataState.GradeStudentPreview.keyList.length
          ? true
          : false
    });
  };
  handleStudentModalOk = e => {
    let url = "/EditStudent";

    const { DataState, dispatch, UIState } = this.props;
    const { initStudentMsg, changeStudentMsg } = DataState.SetStudentMsg;
    let picObj = DataState.GetPicUrl.picObj;
    // console.log(picObj.picUploader.isChanged());
    let EditModalTipsVisible = UIState.EditModalTipsVisible;
    for (let key in EditModalTipsVisible) {
      if (EditModalTipsVisible[key]) {
        return;
      }
    }
    //    if(EditModalTipsVisible.UserIDTipsVisible||EditModalTipsVisible.UserNameTipsVisible||EditModalTipsVisible.GenderTipsVisible||EditModalTipsVisible.GradeTipsVisible||EditModalTipsVisible.ClassTipsVisible){
    //        return;
    //    }
    if (
      Public.comparisonObject(changeStudentMsg, initStudentMsg) &&
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
        // console.log(picObj.picUploader.getCurImgPath())
        postData(
          CONFIG.UserInfoProxy + url,
          {
            ...changeStudentMsg,
            photoPath: picObj.picUploader.getCurImgPath()
          },
          2
        )
          .then(res => {
            return res.json();
          })
          .then(json => {
            // if (json.StatusCode !== 200) {
            //     dispatch(actions.UpUIState.showErrorAlert({
            //         type: 'btn-error',
            //         title: json.Msg,
            //         ok: this.onAppAlertOK.bind(this),
            //         cancel: this.onAppAlertCancel.bind(this),
            //         close: this.onAppAlertClose.bind(this)
            //     }));
            // } else
            if (json.StatusCode === 200) {
              //  console.log(json.Data)
              dispatch(
                actions.UpUIState.showErrorAlert({
                  type: "success",
                  title: "操作成功",
                  onHide: this.onAlertWarnHide.bind(this)
                })
              );
              this.setState({
                studentModalVisible: false
              });
              this.setState({
                checkedList: [],
                checkAll: false
              });
            }
            dispatch(
              actions.UpDataState.getGradeStudentPreview(
                "/GetStudentToPage?SchoolID=" +
                  this.state.userMsg.SchoolID +
                  (this.state.firstSelect.value !== 0
                    ? "&gradeID=" + this.state.firstSelect.value
                    : "") +
                  (this.state.secondSelect.value !== 0
                    ? "&classID=" + this.state.secondSelect.value
                    : "") +
                  "&PageIndex=" +
                  (this.state.pagination - 1) +
                  "&PageSize=10" +
                  this.state.sortFiled +
                  this.state.sortType +
                  this.state.keyword,
                this.state.firstSelect,
                this.state.secondSelect
              )
            );
            dispatch(actions.UpUIState.editAlltModalTipsVisible());
          });
      }
    }
  };
  handleStudentModalCancel = e => {
    //  console.log(e)
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.editAlltModalTipsVisible());
    this.setState({
      studentModalVisible: false
    });
  };
  StudentChangeMadalOk = e => {
    //  console.log(e)
    this.setState({
      StudentChangeMadalVisible: false
    });
  };
  StudentChangeMadalCancel = e => {
    //  console.log(e)
    this.setState({
      StudentChangeMadalVisible: false
    });
  };

  onDeleteAllClick = () => {
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
    let url = "/DeleteStudent";
    let checkList = this.state.checkedList;
    let dataList = DataState.GradeStudentPreview.newList;
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
          this.setState({
            checkedList: [],
            checkAll: false
          });
          dispatch(
            actions.UpDataState.getGradeStudentPreview(
              "/GetStudentToPage?SchoolID=" +
                this.state.userMsg.SchoolID +
                (this.state.firstSelect.value !== 0
                  ? "&gradeID=" + this.state.firstSelect.value
                  : "") +
                (this.state.secondSelect.value !== 0
                  ? "&classID=" + this.state.secondSelect.value
                  : "") +
                "&PageIndex=" +
                (this.state.pagination - 1) +
                "&PageSize=10" +
                this.state.sortFiled +
                this.state.sortType +
                this.state.keyword,
              this.state.firstSelect,
              this.state.secondSelect
            )
          );
        }
      });
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

  // 分页
  onPagiNationChange = e => {
    const { dispatch, DataState } = this.props;

    this.setState({
      checkedList: [],
      checkAll: false,
      pagination: e
    });
    dispatch(
      actions.UpDataState.getGradeStudentPreview(
        "/GetStudentToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          (this.state.firstSelect.value !== 0
            ? "&gradeID=" + this.state.firstSelect.value
            : "") +
          (this.state.secondSelect.value !== 0
            ? "&classID=" + this.state.secondSelect.value
            : "") +
          "&PageIndex=" +
          (e - 1) +
          "&PageSize=10" +
          this.state.sortType +
          this.state.sortFiled +
          this.state.keyword,
        this.state.firstSelect,
        this.state.secondSelect
      )
    );
  };
  onUserNameClick = key => {
    const { DataState } = this.props;
    this.setState({
      StudentDetailsMsgModalVisible: true,
      detailData: DataState.GradeStudentPreview.pensonalList[key]
    });
  };
  StudentDetailsMsgModalOk = () => {
    this.setState({
      StudentDetailsMsgModalVisible: false
    });
  };
  StudentDetailsMsgModalCancel = () => {
    this.setState({
      StudentDetailsMsgModalVisible: false
    });
  };
  onAddStudent = e => {
    //  console.log(e)
    this.setState({
      addStudentModalVisible: true,
      userKey: "add"
    });
  };
  handleAddStudentModalOk = e => {
    //  console.log(e)
    let url = "/AddStudent";

    const { DataState, dispatch, UIState } = this.props;
    let picObj = DataState.GetPicUrl.picObj;
    const { initStudentMsg, changeStudentMsg } = DataState.SetStudentMsg;
    let visible = UIState.EditModalVisible;
    let haveMistake = false;
    for (let visi in visible) {
      if (visible[visi]) {
        haveMistake = true;
      }
    }

    // 错误
    //用户ID必填
    if (changeStudentMsg.userID === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          UserIDTipsVisible: true
        })
      );
      haveMistake = true;
    }
    //用户名必填
    if (changeStudentMsg.userName === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          UserNameTipsVisible: true
        })
      );
      haveMistake = true;
    }
    //性别必选
    if (!changeStudentMsg.gender) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          GenderTipsVisible: true
        })
      );
      haveMistake = true;
    }
    //年级必选
    if (!changeStudentMsg.gradeID) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          GradeTipsVisible: true
        })
      );
      haveMistake = true;
    }
    //班级必选
    if (!changeStudentMsg.classID) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          ClassTipsVisible: true
        })
      );
      haveMistake = true;
    }
    if (haveMistake) {
      return;
    }
    if (
      Public.comparisonObject(
        changeStudentMsg,
        initStudentMsg && !picObj.picUploader.isChanged()
      )
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
            ...changeStudentMsg,
            photoPath: picObj.picUploader.getCurImgPath()
          },
          2
        )
          .then(res => {
            return res.json();
          })
          .then(json => {
            // if (json.StatusCode !== 200) {
            //     dispatch(actions.UpUIState.showErrorAlert({
            //         type: 'btn-error',
            //         title: json.Msg,
            //         ok: this.onAppAlertOK.bind(this),
            //         cancel: this.onAppAlertCancel.bind(this),
            //         close: this.onAppAlertClose.bind(this)
            //     }));
            // } else
            if (json.StatusCode === 200) {
              //  console.log(json.Data)
              dispatch(
                actions.UpUIState.showErrorAlert({
                  type: "success",
                  title: "操作成功",
                  onHide: this.onAlertWarnHide.bind(this)
                })
              );
              this.setState({
                studentModalVisible: false
              });
              this.setState({
                addStudentModalVisible: false
              });
              this.setState({
                checkedList: [],
                checkAll: false
              });
              dispatch(
                actions.UpDataState.getGradeStudentPreview(
                  "/GetStudentToPage?SchoolID=" +
                    this.state.userMsg.SchoolID +
                    (this.state.firstSelect.value !== 0
                      ? "&gradeID=" + this.state.firstSelect.value
                      : "") +
                    (this.state.secondSelect.value !== 0
                      ? "&classID=" + this.state.secondSelect.value
                      : "") +
                    "&PageIndex=" +
                    (this.state.pagination - 1) +
                    "&PageSize=10" +
                    this.state.sortFiled +
                    this.state.sortType,
                  this.state.firstSelect,
                  this.state.secondSelect
                )
              );
              dispatch(actions.UpUIState.editAlltModalTipsVisible());
            }
          });
      }
    }
  };
  //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    //console.log('ddd')
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  handleAddStudentModalCancel = e => {
    //  console.log(e)
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.editAlltModalTipsVisible());
    this.setState({
      addStudentModalVisible: false
    });
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
    // //  console.log(sorter)
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
        actions.UpDataState.getGradeStudentPreview(
          "/GetStudentToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            (this.state.firstSelect.value !== 0
              ? "&gradeID=" + this.state.firstSelect.value
              : "") +
            (this.state.secondSelect.value !== 0
              ? "&classID=" + this.state.secondSelect.value
              : "") +
            "&sortFiled=" +
            sorter.columnKey +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            "&PageSize=10&" +
            sortType,
          this.state.firstSelect,
          this.state.secondSelect
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
        actions.UpDataState.getGradeStudentPreview(
          "/GetStudentToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            (this.state.firstSelect.value !== 0
              ? "&gradeID=" + this.state.firstSelect.value
              : "") +
            (this.state.secondSelect.value !== 0
              ? "&classID=" + this.state.secondSelect.value
              : "") +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            "&PageSize=10" +
            this.state.keyword,
          this.state.firstSelect,
          this.state.secondSelect
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
      pagination:1
    });
    dispatch(
      actions.UpDataState.getGradeStudentPreview(
        "/GetStudentToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          (this.state.firstSelect.value !== 0
            ? "&gradeID=" + this.state.firstSelect.value
            : "") +
          (this.state.secondSelect.value !== 0
            ? "&classID=" + this.state.secondSelect.value
            : "") +
          "&PageIndex=" +
          (0) +
          "&PageSize=10" +
          this.state.sortType +
          this.state.sortFiled,
        this.state.firstSelect,
        this.state.secondSelect
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
    // //  console.log(this.state.firstSelect)
    return (
      <div className="Student">
        <div className="Student-box">
          <div className="Student-top">
            <span className="top-tips">
              <span className="tips menu39 ">学生档案管理</span>
            </span>
            <div className="top-nav">
              <Link
                className="link"
                to="/UserArchives/Graduate"
                target="_blank"
                replace
              >
                查看毕业生档案
              </Link>
              <span className="divide">|</span>
              <Link
                className="link"
                target="_blank"
                to="/RegisterExamine"
                replace
              >
                学生注册审核
              </Link>
              <span className="divide">|</span>
              <span
                className="link"
                style={{ cursor: "pointer" }}
                onClick={this.onAddStudent}
              >
                添加学生
              </span>
              <span className="divide">|</span>
              <Link
                className="link"
                target="_blank"
                to="/ImportFile/Student"
                replace
              >
                导入学生
              </Link>
            </div>
          </div>
          <hr className="Student-hr" />
          <div className="Student-content">
            <div className="content-top">
              <DropDown
                ref="dropMenuFirst"
                onChange={this.StudentDropMenu}
                width={120}
                height={240}
                dropSelectd={this.state.firstSelect}
                dropList={
                  DataState.GradeClassMsg.returnData
                    ? DataState.GradeClassMsg.returnData.grades
                    : [{ value: 0, title: "全部年级" }]
                }
              ></DropDown>
              <DropDown
                ref="dropMenuSecond"
                width={120}
                height={240}
                style={{ display: this.state.DropMenuShow ? "block" : "none" }}
                dropSelectd={this.state.secondSelect}
                dropList={this.state.secondDropList}
                onChange={this.StudentDropMenuSecond}
              ></DropDown>
              <Search
                placeHolder="请输入学号或姓名进行搜索"
                onClickSearch={this.StudentSearch.bind(this)}
                height={30}
                width={250}
                Value={this.state.searchValue}
                onCancelSearch={this.onCancelSearch}
                onChange={this.onChangeSearch.bind(this)}
                CancelBtnShow={this.state.CancelBtnShow}
              ></Search>
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
                    loading={UIState.AppLoading.TableLoading}
                    columns={this.state.columns}
                    pagination={false}
                    onChange={this.onTableChange.bind(this)}
                    dataSource={DataState.GradeStudentPreview.newList}
                  ></Table>
                </CheckBoxGroup>
                {DataState.GradeStudentPreview.Total > 0 ? (
                  <CheckBox
                    className="checkAll-box"
                    onChange={this.OnCheckAllChange}
                    checked={this.state.checkAll}
                  >
                    全选
                    <Button
                      onClick={this.onDeleteAllClick}
                      className="deleteAll"
                      color="blue"
                    >
                      删除
                    </Button>
                  </CheckBox>
                ) : (
                  ""
                )}
                <div className="pagination-box">
                  <PagiNation
                    showQuickJumper
                    current={this.state.pagination}
                    hideOnSinglepage={true}
                    total={DataState.GradeStudentPreview.Total}
                    onChange={this.onPagiNationChange}
                  ></PagiNation>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 模态框 */}
        <Modal
          ref="handleStudentMadal"
          bodyStyle={{ padding: 0 }}
          type="1"
          title="编辑学生"
          visible={this.state.studentModalVisible}
          onOk={this.handleStudentModalOk}
          onCancel={this.handleStudentModalCancel}
        >
          {this.state.studentModalVisible ? (
            <EditModal type="student" userKey={this.state.userKey}></EditModal>
          ) : (
            ""
          )}
        </Modal>
        <Modal
          ref="StudentChangeMadal"
          bodyStyle={{ padding: 0 }}
          type="2"
          width={650}
          visible={this.state.StudentChangeMadalVisible}
          onOk={this.StudentChangeMadalOk}
          onCancel={this.StudentChangeMadalCancel}
        >
          <div className="modal-studentChange">
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
              <StudentChangeRecord data={""}></StudentChangeRecord>
            </div>
          </div>
        </Modal>
        <Modal
          ref="handleTeacherMadal"
          bodyStyle={{ padding: 0 }}
          type="1"
          title={"添加学生"}
          visible={this.state.addStudentModalVisible}
          onOk={this.handleAddStudentModalOk}
          onCancel={this.handleAddStudentModalCancel}
        >
          {this.state.addStudentModalVisible ? (
            <EditModal type="student" userKey={this.state.userKey}></EditModal>
          ) : (
            ""
          )}
        </Modal>
        <DetailsModal
          ref="StudentDetailsMsgModal"
          visible={this.state.StudentDetailsMsgModalVisible}
          onOk={this.StudentDetailsMsgModalOk}
          onCancel={this.StudentDetailsMsgModalCancel}
          data={this.state.detailData ? this.state.detailData : []}
          type="student"
        ></DetailsModal>
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
export default connect(mapStateToProps)(Student);
