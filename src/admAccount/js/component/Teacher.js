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
  Tips,
  CheckBox,
  CheckBoxGroup,
  Modal
} from "../../../common/index";
//import '../../../common/scss/_left_menu.scss'
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";
import { Link } from "react-router-dom";
import "../../scss/Teacher.scss";
import md5 from "md5";
import { Tooltip, Input } from "antd";
import TipsContact from "./TipsContact";
import history from "../containers/history";
//import EditModal from './EditModal'
//import IconLocation from '../../images/icon-location.png'
import actions from "../actions";
//import TeacherChangeRecord from './TeacherChangeRecord'
class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //GradeArr:[{value:0,title:'全部年级'}]

      selectedRowKeys: [],
      columns: [
        {
          title: "",
          dataIndex: "handle",
          width: 68,
          key: "key",
          align: "left",
          render: handle => {
            return (
              <div className="registerTime-content">
               <label style={{whiteSpace:'nowrap'}}> <CheckBox
                  type="gray"
                  value={handle.key}
                  onChange={this.onCheckChange}
                ></CheckBox>
                <span className="key-content">
                  {handle.OrderNo + 1 >= 10
                    ? handle.OrderNo + 1
                    : "0" + (handle.OrderNo + 1)}
                </span></label>
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
                  className="name-UserName"
                  title={arr.Name}
                  onClick={this.onUserNameClick.bind(this, arr.UserID)}
                >
                  {arr.Name}
                </span>
                <br />
                <span className="name-UserID" title={arr.UserID}>
                  (<span className="UserID-content">{arr.UserID}</span>)
                </span>
              </div>
            );
          }
        },
        {
          title: "用户名",
          width: 120,
          align: "center",
          dataIndex: "ShortName",
          key: "ShortName",
          sorter: true,
          render: ShortName => {
            return (
              <span title={ShortName} className="UserName">
                {ShortName ? ShortName : "--"}
              </span>
            );
          }
        },
        {
          title: "个性签名",
          align: "center",
          width: 300,
          dataIndex: "Sign",
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
          width: 120,
          title: "联系方式",
          align: "center",
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
          width: 132,
          align: "center",
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

      TeacherAccountData: [
        {
          key: 0,
          Name: {
            Name: "张心仪",
            UserID: "201700121245",
            key: 0
          },
          UserName: "ZXSTU_001",
          Sign:
            "人生重要的不是所站的位置，而是所朝的方向`````````````````11111111111",
          Gender: "男",
          UserImg: {
            PhotoPath:
              "http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg",
            PhotoPath_NOcache:
              "http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg"
          },
          UserContact: {
            QQ: "1519406168",
            WeiXin: "asd1519406168",
            Telephone: "15626248624",
            Weibo: "15626248624"
          },
          handle: {
            key: 0
          }
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
      ChangePwdMadalVisible: false,
      alertShow: false,
      alertTitle: "提示信息",
      alertQueryShow: false,
      alertQueryTitle: "查询提示~",
      TeacherDetailsMsgModalVisible: false,
      addTeacherModalVisible: false,
      defaultPwd: "888888",
      onClickKey: 0,
      userMsgKey: 0,
      keyList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      SubjectSelect: { value: 0, title: "全部学科" },
      keyword: "",
      CancelBtnShow: "n",
      searchValue: "",
      userMsg: props.DataState.LoginUser,
      sortType: "",
      sortFiled: "",
      PwdTipsTitle:'密码由6-20个字符，只能由字母、数字、下划线及部分特殊字符组成',
      ChangeAllPwdMadalVisible:false

    };
    window.TeacherCancelSearch = this.TeacherCancelSearch.bind(this);
  }
  TeacherCancelSearch = () => {
    this.setState({
      CancelBtnShow: "n",
      keyword: "",
      searchValue: '',
      checkedList: [],
      pagination: 1,
      checkAll: false,
      SubjectSelect: { value: 0, title: "全部学科" },
    });
  };
  componentWillMount() {
    const { dispatch } = this.props;
    let pwd = "888888";

    dispatch(actions.UpDataState.getChangeInputValue(pwd));
  }
  componentWillReceiveProps() {
    // let Grades = this.props.DataState.GradeClassMsg.Grades ? this.props.DataState.GradeClassMsg.Grades : [];
    // let len = Grades.lenght;
    // console.log(Grades)
    // let GradeArr = [{ value: 0, title: '全部年级' }];
    // for (let i = 0; i < len; i++) {
    //     let Grade = { value: Grades[i].GradeID, title: Grades[i].GradeName }
    //     GradeArr.push(Grade)
    // }
    // this.setState({
    //     GradeArr: GradeArr
    // })
  }

  //下拉
  TeacherDropMenu = e => {
    const { dispatch } = this.props;
    this.setState({
      SubjectSelect: e,
      searchValue: "",
      pagination: 1,
      CancelBtnShow: "n",
      checkedList: [],
      checkAll: false,
      keyword: ""
    });
    if (e.value !== 0)
      dispatch(
        actions.UpDataState.getSubjectTeacherPreview(
          "/GetTeacherToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=10&SubjectIDs=" +
            e.value +
            this.state.sortFiled +
            this.state.sortType
        )
      );
    else
      dispatch(
        actions.UpDataState.getSubjectTeacherPreview(
          "/GetTeacherToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=10" +
            this.state.sortFiled +
            this.state.sortType
        )
      );
  };

  TeacherSearch = e => {
    const { dispatch } = this.props;

    if (e.value === "") {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-warn",
          title: "关键词不能为空",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this)
        })
      );
      return
    } 
    let Test = /^[A-Za-z0-9]{1,30}$|^[a-zA-Z0-9_.·\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_.·\u4e00-\u9fa5]$/.test(e.value)
    if (!Test) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-error",
          title: "您输入的工号或姓名格式不正确",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this)
        })
      );
      return;
    }
      this.setState({
        keyword: e.value,
        CancelBtnShow: "y",
        pagination: 1,
        checkedList: [],
        checkAll: false
      });
      dispatch(
        actions.UpDataState.getSubjectTeacherPreview(
          "/GetTeacherToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=10&keyword=" +
            e.value +
            "&SubjectIDs=" +
            (this.state.SubjectSelect.value
              ? this.state.SubjectSelect.value
              : "") +
            this.state.sortFiled +
            this.state.sortType
        )
      );
    
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
      searchValue: e.value,
      checkedList: [],
      pagination: 1,
      checkAll: false
    });
    dispatch(
      actions.UpDataState.getSubjectTeacherPreview(
        "/GetTeacherToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=" +
          0 +
          "&PageSize=10" +
          "&SubjectIDs=" +
          (this.state.SubjectSelect.value
            ? this.state.SubjectSelect.value
            : "") +
          this.state.sortFiled +
          this.state.sortType
      )
    );
  };
  onSelectChange = e => {
    // console.log(e)
    //this.setState({ selectedRowKeys });
  };

  onUserContactClick = UserContact => {
    // console.log(UserContact)
    // this.setState({
    //     TeacherChangeMadalVisible: true,
    //     TeacherChangeKey: key
    // })
  };
  // onChangePwdClick = (e, key) => {
  //   // console.log(e, key)
  //     this.setState({
  //         TeacherChangeMadalVisible: true,
  //         TeacherChangeKey: key
  //     })
  // }

  onMouseEnterName = () => {};
  OnCheckAllChange = e => {
    const { DataState, dispatch } = this.props;
    // console.log(e)
    if (e.target.checked) {
      this.setState({
        checkedList: DataState.SubjectTeacherPreview.keyList,
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
    const { DataState, dispatch } = this.props;
    this.setState({
      checkedList,
      checkAll:
        checkedList.length === DataState.SubjectTeacherPreview.keyList.length
          ? true
          : false
    });
  };
  handleTeacherModalOk = e => {
    // console.log(e)
    this.setState({
      TeacherModalVisible: false
    });
  };
  handleTeacherModalCancel = e => {
    // console.log(e)
    this.setState({
      TeacherModalVisible: false
    });
  };
  ChangePwdMadalOk = e => {
    // console.log(e)
    this.setState({
      ChangePwdMadalVisible: false
    });
  };
  // 批量
  ChangeAllPwdMadalOk = e => {
    // console.log(e)
    this.setState({
      ChangeAllPwdMadalVisible: false
    });
  };

  onChangePwdAllClick = () => {
    const { dispatch } = this.props;
    // console.log(this.state.checkedList)
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
      // dispatch(
      //   actions.UpUIState.showErrorAlert({
      //     type: "btn-query",
      //     title: "确定批量重置密码？",
      //     ok: this.onAlertQueryOk.bind(this, "888888"),
      //     cancel: this.onAlertQueryClose.bind(this),
      //     close: this.onAlertQueryClose.bind(this)
      //   })
      // );
      this.setState({
        ChangeAllPwdMadalVisible:true
      })
    }
  };
  onChangePwdClick = key => {
    const { dispatch, DataState } = this.props;
    let data = this.state.TeacherAccountData;
    let pwd = "888888";
    this.setState({
      ChangePwdMadalVisible: true,
      onClickKey: key
    });
  };
  onPwdBlur = e => {
    const { dispatch } = this.props;
    //  console.log(e.target.value)
    let value = e.target.value
    let Test = /^([0-9a-zA-Z`~\!@#$%\^&*\(\)_\+-={}|\[\]:\";\'<>\?,.\/\\]){6,20}$/.test(value)
    if(!Test||value===''){
      dispatch({type:actions.UpUIState.PWD_TIPS_OPEN})
      return;
    }else{
      dispatch({type:actions.UpUIState.PWD_TIPS_CLOSE})
      return;
    }
    
  };
  // 批量
  onAllPwdBlur = e => {
    const { dispatch } = this.props;
    //  console.log(e.target.value)
    let value = e.target.value
    let Test = /^([0-9a-zA-Z`~\!@#$%\^&*\(\)_\+-={}|\[\]:\";\'<>\?,.\/\\]){6,20}$/.test(value)
    if(!Test||value===''){
      dispatch({type:actions.UpUIState.PWD_TIPS_OPEN})
      return;
    }else{
      dispatch({type:actions.UpUIState.PWD_TIPS_CLOSE})
      return;
    }
    
  };
  onPwdchangeOk = pwd => {
    const { dispatch, DataState,UIState } = this.props;
    let url = "/ResetPwd";
    let UserMsg = DataState.LoginUser;
    // console.log(this.state.defaultPwd, md5(this.state.defaultPwd))
    if (this.state.defaultPwd === "") {
      dispatch({type:actions.UpUIState.PWD_TIPS_OPEN})
      return;
    } else if (UIState.TipsVisible.PwdTipsShow) {
      // dispatch({type:actions.UpUIState.PWD_TIPS_OPEN})
      return;
    }  else {
      postData(
        CONFIG.UserAccountProxy + url,
        {
          userID:
            DataState.SubjectTeacherPreview.newList[this.state.onClickKey]
              .Others.UserID,
          userType: 1,
          newPwd: md5(this.state.defaultPwd)
        },
        2
      )
        .then(res => {
          if (res.StatusCode === "401") {
            // console.log('错误码：' + res.StatusCode)
          }
          return res.json();
        })
        .then(json => {
          if (json.StatusCode === 400) {
            // console.log(json.StatusCode)
          } else if (json.StatusCode === 200) {
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
              actions.UpDataState.getSubjectTeacherPreview(
                "/GetTeacherToPage?SchoolID=" +
                  this.state.userMsg.SchoolID +
                  "&PageIndex=" +
                  (this.state.pagination - 1) +
                  "&PageSize=10&keyword=" +
                  this.state.keyword +
                  "&SubjectIDs=" +
                  (this.state.SubjectSelect.value
                    ? this.state.SubjectSelect.value
                    : "") +
                  this.state.sortFiled +
                  this.state.sortType
              )
            );
          }
        });
    }
  };
  // 批量
  onAllPwdchangeOk = pwd => {
    const { dispatch, DataState,UIState } = this.props;
    let url = "/ResetPwd";
    let UserMsg = DataState.LoginUser;
    let userIDs = this.state.checkedList.map((child, index) => {
      return DataState.SubjectTeacherPreview.newList[child].Others.UserID;
    });
    // console.log(this.state.defaultPwd, md5(this.state.defaultPwd))
    if (this.state.defaultPwd === "") {
      dispatch({type:actions.UpUIState.PWD_TIPS_OPEN})
      return;
    } else if (UIState.TipsVisible.PwdTipsShow) {
      // dispatch({type:actions.UpUIState.PWD_TIPS_OPEN})
      return;
    }  else {
      postData(
        CONFIG.UserAccountProxy + url,
        {
          userID: userIDs.join(),
          userType: 1,
          newPwd: md5(this.state.defaultPwd)
        },
        2
      )
        .then(res => {
          if (res.StatusCode === "401") {
            // console.log('错误码：' + res.StatusCode)
          }
          return res.json();
        })
        .then(json => {
          if (json.StatusCode === 400) {
            // console.log(json.StatusCode)
          } else if (json.StatusCode === 200) {
            dispatch(
              actions.UpUIState.showErrorAlert({
                type: "success",
                title: "操作成功",
                onHide: this.onAlertWarnHide.bind(this)
              })
            );
            this.setState({
              ChangeAllPwdMadalVisible: false,
              defaultPwd: "888888",
              checkedList: [],
              checkAll: false
            });
            dispatch(
              actions.UpDataState.getSubjectTeacherPreview(
                "/GetTeacherToPage?SchoolID=" +
                  this.state.userMsg.SchoolID +
                  "&PageIndex=" +
                  (this.state.pagination - 1) +
                  "&PageSize=10&keyword=" +
                  this.state.keyword +
                  "&SubjectIDs=" +
                  (this.state.SubjectSelect.value
                    ? this.state.SubjectSelect.value
                    : "") +
                  this.state.sortFiled +
                  this.state.sortType
              )
            );
          }
        });
     
    }
  };
  //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    //console.log('ddd')
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  // 重置密码close

  onPwdchangeClose = () => {
    const { dispatch } = this.props;

    dispatch({type:actions.UpUIState.PWD_TIPS_CLOSE})
    this.setState({
      ChangePwdMadalVisible: false,
      defaultPwd: "888888"
    });
  };
  onPwdchange = e => {
    const { dispatch } = this.props;
    // console.log(e.target.value)
    this.setState({
      defaultPwd: e.target.value
    });
  };
   // 批量重置密码close

   onAllPwdchangeClose = () => {
    const { dispatch } = this.props;

    dispatch({type:actions.UpUIState.PWD_TIPS_CLOSE})
    this.setState({
      ChangeAllPwdMadalVisible: false,
      defaultPwd: "888888"
    });
  };
  onAllPwdchange = e => {
    const { dispatch } = this.props;
    // console.log(e.target.value)
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
  //确认重置
  onAlertQueryOk = pwd => {
    let url = "/ResetPwd";
    const { dispatch, DataState } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
    let userIDs = this.state.checkedList.map((child, index) => {
      return DataState.SubjectTeacherPreview.newList[child].Others.UserID;
    });
    postData(
      CONFIG.UserAccountProxy + url,
      {
        userID: userIDs.join(),
        userType: 1,
        newPwd: md5(this.state.defaultPwd)
      },
      2
    )
      .then(res => {
        if (res.StatusCode === "401") {
          // console.log('错误码：' + res.StatusCode)
        }
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 400) {
          // console.log(json.StatusCode)
        } else if (json.StatusCode === 200) {
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
            actions.UpDataState.getSubjectTeacherPreview(
              "/GetTeacherToPage?SchoolID=" +
                this.state.userMsg.SchoolID +
                "&PageIndex=" +
                (this.state.pagination - 1) +
                "&PageSize=10&keyword=" +
                this.state.keyword +
                "&SubjectIDs=" +
                (this.state.SubjectSelect.value
                  ? this.state.SubjectSelect.value
                  : "") +
                this.state.sortFiled +
                this.state.sortType
            )
          );
        }
      });
  };
  //分页
  onPagiNationChange = value => {
    const { dispatch } = this.props;
    this.setState({
      pagination: value,
      checkedList: [],
      checkAll: false
    });

    let SubjectIDs = "";
    let keyword = "";

    if (this.state.SubjectSelect.value !== 0) {
      SubjectIDs = "&SubjectIDs=" + this.state.SubjectSelect.value;
    }
    if (this.state.keyword !== "") {
      keyword = "&keyword=" + this.state.keyword;
    }
    dispatch(
      actions.UpDataState.getSubjectTeacherPreview(
        "/GetTeacherToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=" +
          (value - 1) +
          "&PageSize=10" +
          keyword +
          SubjectIDs +
          this.state.sortFiled +
          this.state.sortType
      )
    );
  };
  onUserNameClick = UserID => {
    const { dispatch } = this.props;
    dispatch(actions.UpDataState.getUserMsg("/GetUserDetail?userid=" + UserID));
    this.setState({
      TeacherDetailsMsgModalVisible: true
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
    // console.log(e)
    this.setState({
      addTeacherModalVisible: true,
      userKey: "add"
    });
  };
  handleAddTeacherModalOk = e => {
    // console.log(e)
    this.setState({
      addTeacherModalVisible: false
    });
  };
  handleAddTeacherModalCancel = e => {
    // console.log(e)
    this.setState({
      addTeacherModalVisible: false
    });
  };
  //table改变，进行排序操作
  onTableChange = (a, b, sorter) => {
    const { DataState, dispatch } = this.props;
    let SubjectSelect = "";
    let keyword = "";

    if (this.state.SubjectSelect.value !== 0) {
      SubjectSelect = "&SubjectIDs=" + this.state.SubjectSelect.value;
    }
    if (this.state.keyword !== "") {
      keyword = "&keyword=" + this.state.keyword;
    }
    //console.log(sorter)
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
        actions.UpDataState.getSubjectTeacherPreview(
          "/GetTeacherToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&sortFiled=" +
            sorter.columnKey +
            "&PageSize=10&" +
            sortType +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            keyword +
            SubjectSelect
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
        actions.UpDataState.getSubjectTeacherPreview(
          "/GetTeacherToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageSize=10" +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            keyword +
            SubjectSelect
        )
      );
    }
  };
  // onPwdBlur = e => {
  //   const { dispatch } = this.props;
  //    console.log(e.target.value)
  //   let value = e.target.value
  //   let Test = /^([0-9a-zA-Z`~\!@#$%\^&*\(\)_\+-={}|\[\]:\";\'<>\?,.\/\\]){6,20}$/.test(value)
  //   if(!Test||value===''){
  //     dispatch({type:actions.UpUIState.PWD_TIPS_OPEN})
  //     return;
  //   }else{
  //     dispatch({type:actions.UpUIState.PWD_TIPS_CLOSE})
  //     return;
  //   }
    
  // };
  // onAllPwdBlur = e => {
  //   const { dispatch } = this.props;
  //    console.log(e.target.value)
  //   let value = e.target.value
  //   let Test = /^([0-9a-zA-Z`~\!@#$%\^&*\(\)_\+-={}|\[\]:\";\'<>\?,.\/\\]){6,20}$/.test(value)
  //   if(!Test||value===''){
  //     dispatch({type:actions.UpUIState.PWD_TIPS_OPEN})
  //     return;
  //   }else{
  //     dispatch({type:actions.UpUIState.PWD_TIPS_CLOSE})
  //     return;
  //   }
    
  // };
  render() {
    const { UIState, DataState } = this.props;
   
    return (
      <div className="Teacher">
        <div className="Teacher-box">
          <div className="Teacher-top">
            <span className="top-tips">
              <span className="tips menu33 ">教师账号管理</span>
            </span>
            {/* <div className='top-nav'>
                            <Link className='link'  to='/GraduteArchives' replace>查看毕业生档案</Link>
                            <span className='divide'>|</span>
                            <Link className='link' target='_blank' to='/RegisterExamine' replace>学生注册审核</Link>
                            <span className='divide'>|</span>
                            <span className='link' style={{cursor:'pointer'}}  onClick={this.onAddTeacher}>添加学生</span>
                            <span className='divide'>|</span>
                            <Link className='link' to='/ImportTeacher' replace>导入学生</Link>
                        </div> */}
          </div>
          <hr className="Teacher-hr" />
          <div className="Teacher-content">
            <div className="content-top">
              <DropDown
                ref="dropMenuFirst"
                onChange={this.TeacherDropMenu}
                width={120}
                height={240}
                dropSelectd={this.state.SubjectSelect}
                dropList={
                  DataState.SubjectTeacherMsg.returnData
                    ? DataState.SubjectTeacherMsg.returnData.SubjectList
                    : [{ value: 0, title: "全部学科" }]
                }
              ></DropDown>

              <Search
                placeHolder="请输入工号或姓名进行搜索..."
                onClickSearch={this.TeacherSearch}
                Value={this.state.searchValue}
                onChange={this.onChangeSearch.bind(this)}
                onCancelSearch={this.onCancelSearch}
                CancelBtnShow={this.state.CancelBtnShow}
                width={250}
                height={30}
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
                    columns={this.state.columns}
                    pagination={false}
                    loading={UIState.AppLoading.TableLoading}
                    onChange={this.onTableChange.bind(this)}
                    dataSource={DataState.SubjectTeacherPreview.newList}
                  ></Table>
                </CheckBoxGroup>
                {DataState.SubjectTeacherPreview.Total?<div style={{    display: 'inline-block'}}>
                  <CheckBox
                  type="gray"
                  style={{
                    display:
                      DataState.SubjectTeacherPreview.Total === 0
                        ? "none"
                        : "inline-block"
                  }}
                  className="checkAll-box"
                  onChange={this.OnCheckAllChange}
                  checked={this.state.checkAll}
                >
                  <span className='checkAll-title'>全选</span>
                 
                </CheckBox>
                <Button
                    onClick={this.onChangePwdAllClick}
                    className="changePwdAll"
                    color="blue"
                  >
                    批量重置密码
                  </Button>
                </div>:''}
                
                <div className="pagination-box">
                  <PagiNation
                    showQuickJumper
                    hideOnSinglepage={true}
                    current={this.state.pagination}
                    total={DataState.SubjectTeacherPreview.Total}
                    onChange={this.onPagiNationChange}
                  ></PagiNation>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 模态框 */}
        {/* <Modal
                    ref='handleTeacherMadal'
                    bodyStyle={{ padding: 0 }}
                    type='1'
                    title='编辑学生'
                    visible={this.state.TeacherModalVisible}
                    onOk={this.handleTeacherModalOk}
                    onCancel={this.handleTeacherModalCancel}
                    
                >
                    <EditModal userKey={this.state.userKey}></EditModal>
                </Modal> */}
        {/* <Modal
                    ref='TeacherChangeMadal'
                    bodyStyle={{ padding: 0 }}
                    type='2'
                    width={650}
                    visible={this.state.TeacherChangeMadalVisible}
                    onOk={this.TeacherChangeMadalOk}
                    onCancel={this.TeacherChangeMadalCancel}
                >
                    <div className='modal-TeacherChange'>
                        <div className='content-top'>
                            <img src={IconLocation} width='30' height='40' alt='icon-location' />
                            <span className='top-text'>毛峰的档案变更记录</span>
                        </div>
                        <div className='content'>
                            <TeacherChangeRecord data={''}></TeacherChangeRecord>
                        </div>
                    </div>
                </Modal>
                <Modal
                    ref='handleTeacherMadal'
                    bodyStyle={{ padding: 0 }}
                    type='1'
                    title={'添加学生'}
                    visible={this.state.addTeacherModalVisible}
                    onOk={this.handleAddTeacherModalOk}
                    onCancel={this.handleAddTeacherModalCancel}
                >
                    <EditModal type='Teacher' userKey={this.state.userKey}></EditModal>
                </Modal> */}
        <DetailsModal
          ref="TeacherDetailsMsgModal"
          visible={this.state.TeacherDetailsMsgModalVisible}
          onOk={this.TeacherDetailsMsgModalOk}
          onCancel={this.TeacherDetailsMsgModalCancel}
          data={DataState.GetUserMsg}
          type="Teacher"
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
              <Tips
                overlayClassName="tips"
                visible={UIState.TipsVisible.PwdTipsShow}
                title={this.state.PwdTipsTitle}
                getPopupContainer={e=>e.parentNode}
              >
              <Input
                size="small"
                  onBlur={this.onPwdBlur.bind(this)}
                  onChange={this.onPwdchange.bind(this)}
                style={{ width: 120 + "px" }}
                value={this.state.defaultPwd}
              ></Input>
              </Tips>
            </div>
          }
          title={
            this.state.ChangePwdMadalVisible ? (
              <p className="alert-Title">
                确定重置
                <span
                  title={
                    DataState.SubjectTeacherPreview.newList[
                      this.state.onClickKey
                    ].UserName.Name
                  }
                  className="alert-Title-name"
                >
                  {
                    DataState.SubjectTeacherPreview.newList[
                      this.state.onClickKey
                    ].UserName.Name
                  }
                </span>
                <span
                  title={
                    DataState.SubjectTeacherPreview.newList[
                      this.state.onClickKey
                    ].UserName.UserID
                  }
                  className="alert-Title-id"
                >
                  (
                  {
                    DataState.SubjectTeacherPreview.newList[
                      this.state.onClickKey
                    ].UserName.UserID
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
        {/* 批量重置 */}
        <Alert
          show={this.state.ChangeAllPwdMadalVisible}
          type={"btn-query"}
          abstract={
            <div className="alert-pwd">
              <span className="alert-pwd-tips">新密码：</span>
              <Tips
                overlayClassName="tips"
                visible={UIState.TipsVisible.PwdTipsShow}
                title={this.state.PwdTipsTitle}
                getPopupContainer={e=>e.parentNode}
              >
              <Input
                size="small"
                  onBlur={this.onAllPwdBlur.bind(this)}
                  onChange={this.onAllPwdchange.bind(this)}
                style={{ width: 120 + "px" }}
                value={this.state.defaultPwd}
              ></Input>
              </Tips>
            </div>
          }
          title={
            this.state.ChangeAllPwdMadalVisible ? (
              <p className="alert-Title">
                确定重置
                {/* <span
                  title={
                    DataState.SubjectTeacherPreview.newList[
                      this.state.onClickKey
                    ].UserName.Name
                  }
                  className="alert-Title-name"
                >
                  {
                    DataState.SubjectTeacherPreview.newList[
                      this.state.onClickKey
                    ].UserName.Name
                  }
                </span>
                <span
                  title={
                    DataState.SubjectTeacherPreview.newList[
                      this.state.onClickKey
                    ].UserName.UserID
                  }
                  className="alert-Title-id"
                >
                  (
                  {
                    DataState.SubjectTeacherPreview.newList[
                      this.state.onClickKey
                    ].UserName.UserID
                  }
                  )
                </span>{" "}
                的 */}
                密码？
              </p>
            ) : (
              ""
            )
          }
          onOk={this.onAllPwdchangeOk}
          onCancel={this.onAllPwdchangeClose}
          onClose={this.onAllPwdchangeClose}
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
export default connect(mapStateToProps)(Teacher);
