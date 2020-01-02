import React, { Component } from 'react'
import { Search, DropDown, Empty, Modal } from '../../../common/index'
import { DatePicker, Button, Input, Pagination, Tree } from 'antd'
import { connect } from 'react-redux';
import { Loading } from '../../../common/index'
import '../../sass/favoritesPage.scss'
import AppAlertAction from '../action/AppAlertAction'
import ApiAction from '../action/Api'
import moment from 'moment';
import CollectorAction from '../action/CollectorAction';
const { TreeNode } = Tree;
const { RangePicker } = DatePicker

class FavoritesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKeyword: "",//搜索框中的关键字
            typeDropValue: "",//来源筛选框的默认value
            typeDropTitle: "全部来源", //来源筛选框的默认title
            startDate: "", //日历筛选中的开始时间的字符串形式
            Mstart: null,//日历筛选中的开始时间的Monent形式
            Mend: null,//日历筛选中的结束时间的Monent形式
            endDate: "",//日历筛选中的结束时间的字符串形式
            currentPath: [{ "folderId": "", "folderName": "资料收藏夹" }],//存储用户当前所在路径
            ModalShow: false,//重命名或添加目录弹层的显示控制
            modalInput: "", //重命名中输入框中的值
            modalOptionType: "",//当前操作重命名或添加目录弹层的操作类型
            newName: "",//新目录或者新资料名称
            modalTitle: "",//重命名或添加目录弹层的名称
            moveModalShow: false,//移动提示弹层的显示控制
            selectAll: false,//全选框的状态控制
            MoveOptionType: "",//当前操作移动功能弹层的操作类型
            beMoveID: "",//当前被移动的目录或者资料ID

            selectedFolder: ""//移动目录弹层中被选中的目录Id
        };
    }
    //监听搜索框的查询事件
    keywordSearch = (e) => {
        const { dispatch } = this.props
        let currFoleder = this.state.currentPath[this.state.currentPath.length - 1].folderId
        if (e.value === "") {
            dispatch(AppAlertAction.alertTips({ title: "关键字不能为空!", cancelTitle: "知道了" }))

        }
        else {
            dispatch(CollectorAction.getFolderResInfo({ typeId: '', startTime: '', endDate: '', keyword: e.value }, "searchAll"))
        }


    }
    //监听搜索框中的输入值的变化
    keywordChange = (e) => {
        this.setState({
            searchKeyword: e.target.value
        })

    }
    //监听搜索框中取消搜索按钮的点击事件
    cancelSearch = () => {
        const { dispatch } = this.props
        let currFoleder = this.state.currentPath[this.state.currentPath.length - 1].folderId
        this.setState({
            searchKeyword: "",
        }, () => {
            dispatch(CollectorAction.getFolderResInfo({ typeId: '', folderID: currFoleder, startTime: '', endDate: '', keyword: "" }))
        })

    }


    //监听来源下拉框的改变事件
    typeChange = (checked, value) => {
        const { dispatch } = this.props
        //获取当前所在目录的目录id
        let currFoleder = this.state.currentPath[this.state.currentPath.length - 1].folderId
        this.setState({
            typeDropValue: checked.value,
            typeDropTitle: checked.title
        }, () => {
            dispatch(CollectorAction.getFolderResInfo({
                typeId: checked.value,
                folderID: currFoleder,
                startTime: this.state.startDate,
                endDate: this.state.endDate,
                keyword: ""
            }))
        })



    }
    //监听日历控件的范围变化事件
    dateChange = (dates, dateStrings) => {

        const { dispatch } = this.props
        let currFoleder = this.state.currentPath[this.state.currentPath.length - 1].folderId
        this.setState({
            Mstart: dates[0],
            Mend: dates[1],
            startDate: dateStrings[0],
            endDate: dateStrings[1]
        })
        console.log(dates[0], typeof (dates[0]))
        // console.log(dateStrings[1]  ,typeof (this.state.endDate))
        // dispatch(CollectorAction.getFolderResInfo({ typeId: '', folderID: currFoleder, startTime: dateStrings[0], endDate: dateStrings[1], keyword: "" }))

        dispatch(CollectorAction.getFolderResInfo({ folderID: currFoleder, startTime: dateStrings[0], endDate: dateStrings[1] }))
    }

    //监听目录的点击事件
    skipToNewFolder = (type, folderId, folderName) => {
        const { dispatch } = this.props
        //根据点击类型进行数据处理

        if (type === "pathClick") {
            //如果输在路径区点击
            //查找被点击的目录在currentPath中索引,并删除该索引后面所有数据,
            let targetIndex = "";
            this.state.currentPath.map((item, index) => {
                if (item.folderId === folderId) {
                    targetIndex = index;
                    return;
                }
            })
            let newPath = this.state.currentPath.splice(0, targetIndex + 1)
            //更新内容区渲染的内容
            this.setState({
                currentPath: newPath
            }, () => {
                dispatch({
                    type: CollectorAction.UPDATE_CURRENT_PATH,
                    data: newPath
                })
                // dispatch(CollectorAction.getFolderResInfo({ typeId: '', folderID: folderId, startTime: "", endDate: "", keyword: "" }))

                dispatch(CollectorAction.getFolderResInfo({ folderID: folderId }))
            })
        }
        else if (type === "contentClick") {
            //如果是在内容区点击
            let newPath = this.state.currentPath
            newPath.push({ "folderId": folderId, "folderName": folderName })
            this.setState({
                currentPath: newPath
            }, () => {
                dispatch({
                    type: CollectorAction.UPDATE_CURRENT_PATH,
                    data: newPath
                })
                dispatch(CollectorAction.getFolderResInfo({ folderID: folderId }))
                // dispatch(CollectorAction.getFolderResInfo({ typeId: '', folderID: folderId, startTime: "", endDate: "", keyword: "" }))
            })
        }
        this.setState({
            startDate: "",
            endDate: "",
            Mstart: null,
            Mend: null,
            typeDropValue: "",
            typeDropTitle: "全部来源",
        })
    }



    //返回上一层的点击事件
    fallback = () => {
        const { dispatch } = this.props
        // let newPath=this.state.currentPath.splice(this.state.currentPath.length)
        let currFoleder = this.state.currentPath[this.state.currentPath.length - 1].folderId
        if (this.state.currentPath.length === 1) {
            return
        }
        else {
            this.state.currentPath.pop()
            this.setState({
                currentPath: this.state.currentPath,
                startDate: "",
                endDate: "",
                Mstart: null,
                Mend: null,
                typeDropValue: "",
                typeDropTitle: "全部来源",

            }, () => {
                dispatch({
                    type: CollectorAction.UPDATE_CURRENT_PATH,
                    data: this.state.currentPath
                })
                dispatch(CollectorAction.getFolderResInfo({ folderID: currFoleder }))
                // dispatch(CollectorAction.getFolderResInfo({
                //     typeId: "",
                //     folderID: currFoleder,
                //     startTime: "",
                //     endDate: "",
                //     keyword: ""

                // }))

            })
        }

    }
    //单个资料的点击事件
    skipByLink = (address) => {
        window.location.href = address
    }

    //添加目录按钮的点击事件
    modalClick = (optionType, ID) => {
        console.log(optionType)
        let title = ""
        let name = ""
        if (optionType === "addFolder") {
            title = "添加目录"
            name = "目录名称"
        }
        else if (optionType === "reNameFolder") {
            title = "重名命"
            name = "目录名称"
        }
        else {
            title = "重名命"
            name = "资料名称"
        }
        this.setState({
            ModalShow: true,
            modalOptionType: optionType,
            modalTitle: title,
            newName: name,
            beRenameID: ID
        })
        // console.log(this.state.modalOptionType)
    }
    /* 添加目录或重命名弹层确认的事件回调
    @param1 当前操作弹层的类型addFolder(添加目录)、重命名目录（reNameFolder)、重命名资料（reNameCollect）
     */
    modalComfirm = () => {

        let optionType = this.state.modalOptionType
        //被选中需要重命名的目录或者资料的ID
        let ID = this.state.beRenameID
        const { dispatch, folderResInfo } = this.props
        let currFoleder = this.state.currentPath[this.state.currentPath.length - 1].folderId

        // 当前用户操作的是添加目录操作

        if (optionType === "addFolder") {
            //当前用户操作的是添加目录操作
            let flag = true;
            for (let item of folderResInfo.List) {
                if (item.IsFolder === true && item.Name === this.state.modalInput) {
                    dispatch(AppAlertAction.alertError({ title: "该目录名称已被占用!" }))
                    flag = false
                    break;
                }
            }
            if (flag) {
                let url = `/SysMgr/Favorite/AddFolderInfo`
                ApiAction.postMethod(url, {
                    FolderName: this.state.modalInput,
                    pid: currFoleder,
                    sysId: "蓝鸽浏览器收藏"
                }).then(data => {
                    if (data === 0) {
                        dispatch(AppAlertAction.alertSuccess({ title: "添加目录成功" }))
                        //dispatch(CollectorAction.getFolderResInfo({ typeId: "", folderID: currFoleder, startTime: '', endDate: '', keyword: "" }))
                        dispatch(CollectorAction.getFolderResInfo({ folderID: currFoleder }))
                    }
                    else {
                        dispatch(AppAlertAction.alertError({ title: data ? data : "未知异常" }))
                    }
                })
            }

        }
        else if (optionType === "reNameFolder") {
            //当前操作是重命名目录
            let flag = true;
            for (let item of folderResInfo.List) {
                if (item.IsFolder === true && item.Name === this.state.modalInput) {
                    dispatch(AppAlertAction.alertError({ title: "该目录名称已被占用!" }))
                    flag = false
                    break;
                }
            }
            console.log(flag)
            if (flag === true) {
                const url = `/SysMgr/Favorite/UpdateFolderName`
                ApiAction.postMethod(url, { folderId: ID, newFolderName: this.state.modalInput }).then(data => {
                    if (data === 0) {
                        dispatch(AppAlertAction.alertSuccess({ title: "目录重命名成功" }))
                        //dispatch(CollectorAction.getFolderResInfo({ typeId: "", folderID: currFoleder, startTime: '', endDate: '', keyword: "" }))
                        dispatch(CollectorAction.getFolderResInfo({ folderID: currFoleder }))
                    }
                    else {
                        dispatch(AppAlertAction.alertError({ title: data ? data : "未知异常" }))
                    }

                })
            }

        }
        else {
            //当前操作是重命名资料
            let flag = true;
            for (let item of folderResInfo.List) {
                if (item.IsFolder === false && item.Name === this.state.modalInput) {
                    dispatch(AppAlertAction.alertError({ title: "该资料名称已被占用!" }))
                    flag = false
                    break;
                }
            } if (flag) {
                const url = `/SysMgr/Favorite/UpdateCollectionName`
                ApiAction.postMethod(url, { resId: ID, newName: this.state.modalInput }).then(data => {
                    if (data === 0) {
                        dispatch(AppAlertAction.alertSuccess({ title: "资料重命名成功" }))
                        //dispatch(CollectorAction.getFolderResInfo({ typeId: "", folderID: currFoleder, startTime: '', endDate: '', keyword: "" }))
                        dispatch(CollectorAction.getFolderResInfo({ folderID: currFoleder }))
                        dispatch(CollectorAction.getRecentCollection())
                    }
                    else {
                        dispatch(AppAlertAction.alertError({ title: data ? data : "未知异常" }))
                    }

                })
            }

        }
        this.setState({
            ModalShow: false,
            modalInput: ""
        })
    }


    //目录的删除或资料的取消收藏事件   
    cancelEvent = (optionType, ID) => {
        const { dispatch } = this.props
        //用户当前所在目录的目录ID（用来刷新当前目录状态）
        let currFoleder = this.state.currentPath[this.state.currentPath.length - 1].folderId

        if (optionType === "deleteFolder") {
            //用户当前操作是删除目录
            dispatch(AppAlertAction.alertQuery({
                title: "是否删除该目录!",
                ok: () => { return this.deleteFoleder.bind(this, currFoleder, ID) },
                okTitle: "是",
                cancelTitle: "否"
            }))
        }
        else {
            dispatch(AppAlertAction.alertQuery({
                title: "是否取消该收藏",
                ok: () => { return this.cancelcollect.bind(this, currFoleder, ID) },
                okTitle: "是",
                cancelTitle: "否"
            }))
        }
    }

    //删除目录
    deleteFoleder = (currFoleder, ID) => {
        const { dispatch } = this.props
        const url = `/SysMgr/Favorite/DeleteFolderInfo`
        ApiAction.postMethod(url, { FolderId: ID }).then(data => {
            if (data === 0) {
                dispatch(AppAlertAction.alertSuccess({ title: "删除目录成功" }))
                //dispatch(CollectorAction.getFolderResInfo({ typeId: "", folderID: currFoleder, startTime: '', endDate: '', keyword: "" }))
                dispatch(CollectorAction.getFolderResInfo({ folderID: currFoleder }))
            }
            else {
                dispatch(AppAlertAction.alertError({ title: data ? data : "未知异常" }))
            }
        })
    }
    //取消收藏
    cancelcollect = (currFoleder, ID) => {
        const { dispatch } = this.props
        const url = `/SysMgr/Favorite/CancelCollectRes`
        ApiAction.postMethod(url, { resIds: ID }).then(data => {
            if (data === 0) {
                dispatch(AppAlertAction.alertSuccess({ title: "取消收藏成功" }))
                //dispatch(CollectorAction.getFolderResInfo({ typeId: "", folderID: currFoleder, startTime: '', endDate: '', keyword: "" }))
                dispatch(CollectorAction.getFolderResInfo({ folderID: currFoleder }))
            }
            else {
                dispatch(AppAlertAction.alertError({ title: data ? data : "未知异常" }))
            }
        })
    }



    //点击关闭弹层或取消的回调
    ModalClose = () => {
        this.setState({
            ModalShow: false,
            modalInput: "",
            moveModalShow: false
        })
    }

    //输入框中的值的数据绑定显示
    NameChange = (e) => {
        this.setState({
            modalInput: e.target.value
        })
    }
    //移动目录和资料弹层的显示与隐藏
    MoveModal = (optionType, ID) => {
        const { dispatch } = this.props
        this.setState({

            moveModalShow: true,
            MoveOptionType: optionType,
            beMoveID: ID ? ID : ""

        }, () => {
            dispatch(CollectorAction.getfolderInfo())
        })
    }

    /* 移动目录或者资料弹层的确认事件
    @param1 当前操作的类型(folder,single,batch)
    @param2 被选中的目录或者资料ID（参数为batch，该参数无用）
     */
    moveModalConfirm = () => {
        let { dispatch, folderResInfo, folderInfo } = this.props
        let optionType = this.state.MoveOptionType
        let ID = this.state.beMoveID
        let currFoleder = this.state.currentPath[this.state.currentPath.length - 1].folderId
        if (optionType === "single" || optionType === "folder") {
            const url = `/SysMgr/Favorite/TransferResInfo`
            ApiAction.postMethod(url, {
                resIds: ID,
                oldFolderID: currFoleder,
                newFolderID: this.state.selectedFolder === "0-0" ? '' : this.state.selectedFolder
            }).then(data => {
                if (data === 0) {
                    dispatch(AppAlertAction.alertSuccess({ title: "移动成功!" }))
                    // dispatch(CollectorAction.getFolderResInfo({
                    //     typeId: "",
                    //     folderID: currFoleder,
                    //     startTime: '',
                    //     endDate: '',
                    //     keyword: ""
                    // }))
                    dispatch(CollectorAction.getFolderResInfo({ folderID: currFoleder }))

                } else {
                    dispatch(AppAlertAction.alertError({ title: data ? data : "未知异常" }))
                }
            })

        }
        else if (optionType === "all") {
            let resIdsList = []
            folderResInfo.List.map(item => {
                if (item.checked === true) {
                    resIdsList.push(item.ID)
                }

            })
            const url = `/SysMgr/Favorite/TransferResInfo`
            ApiAction.postMethod(url, {
                resIds: resIdsList.join(","),
                oldFolderID: currFoleder,
                newFolderID: this.state.selectedFolder === "0-0" ? '' : this.state.selectedFolder
            }).then(data => {
                if (data === 0) {
                    dispatch(AppAlertAction.alertSuccess({ title: "移动成功!" }))
                    // dispatch(CollectorAction.getFolderResInfo({
                    //     typeId: "",
                    //     folderID: currFoleder,
                    //     startTime: '',
                    //     endDate: '',
                    //     keyword: ""
                    // }))
                    dispatch(CollectorAction.getFolderResInfo({ folderID: currFoleder }))

                } else {
                    dispatch(AppAlertAction.alertError({ title: data ? data : "未知异常" }))
                }
            })

            console.log(resIdsList.join(","))

        }
        console.log(this.state.selectedFolder)


        this.setState({
            moveModalShow: false
        })

    }

    // renderTreeNodes = data =>
    //     data.map(item => {
    //         if (item.children) {
    //             return (
    //                 <TreeNode title={item.title} key={item.key} dataRef={item}>
    //                     {this.renderTreeNodes(item.children)}
    //                 </TreeNode>
    //             );
    //         }
    //         return <TreeNode key={item.key} {...item} />;
    //     });

    //单个内容的选中事件
    boxClick = (ID, isCheck) => {

        let { dispatch, folderResInfo } = this.props
        let newList = folderResInfo.List.map(item => {
            if (item.ID === ID) {
                if (!isCheck === false) {
                    this.setState({
                        selectAll: false
                    })
                }
                return {
                    ...item,
                    checked: !isCheck
                }
            }
            else {
                return item

            }
        })
        folderResInfo = {
            ...folderResInfo,
            List: newList
        }

        dispatch({
            type: CollectorAction.REFRESH_FOLDERRES_INFO,
            data: folderResInfo
        })
    }

    //全选按钮的点击事件
    selectAll = () => {
        let { dispatch, folderResInfo } = this.props
        let isChecked = !this.state.selectAll
        this.setState({ selectAll: !this.state.selectAll }, () => {
            let newList = folderResInfo.List.map(item => {
                return {
                    ...item,
                    checked: isChecked
                }
            })
            folderResInfo = {
                ...folderResInfo,
                List: newList
            }
            dispatch({
                type: CollectorAction.REFRESH_FOLDERRES_INFO,
                data: folderResInfo
            })
        })


    }
    //监听分页显示事件
    togglePage = (page, pagesize) => {
        let { dispatch, folderResInfo } = this.props
        let currFoleder = this.state.currentPath[this.state.currentPath.length - 1].folderId
        // dispatch(CollectorAction.getFolderResInfo({
        //     typeId: "",
        //     folderID: currFoleder,
        //     startTime: '',
        //     endDate: '',
        //     keyword: "",
        //     pageIndex: page
        // }))
        dispatch(CollectorAction.getFolderResInfo({ folderID: currFoleder, pageIndex: page }))
    }




    renderTreeNodes = data =>
        data.map(item => {
            if (item.child) {
                return (
                    <TreeNode title={item.FolderName} key={item.FolderId} dataRef={item}>
                        {this.renderTreeNodes(item.child)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.FolderID} {...item} />;
        });

    //移动目录弹层中目录的点击事件
    folderSelect = (selectedkey, e) => {
        this.setState({
            selectedFolder: selectedkey[0]
        })
    }

    render() {
        const {
            searchKeyword,
            typeDropValue,
            typeDropTitle,
            currentPath,
            ModalShow,
            modalInput,
            modalOptionType,
            newName,
            modalTitle,
            Mstart,
            Mend,
            moveModalShow,
            selectAll,


        } = this.state
        const { folderResInfo, typeList, favoriteLoading, folderInfo } = this.props
        let collectRes = "";
        let tipInfo = "";
        let exeit = "0"
        if (folderResInfo.List) {
            if (folderResInfo.List.length === 0) {
                // console.log("不存在")
                tipInfo = <Empty type="3" className="Empty" title={'无符合条件的资料~'} />
                exeit = "1"
            }
            //渲染收藏内容区
            collectRes = folderResInfo.List.map(item => {
                return (
                    <li className={`collector-type ${item.fileType}`}
                    >


                        <span className={`selected-box ${item.checked === true ? 'checked' : ''}`}
                            onClick={() => this.boxClick(item.ID, item.checked)}></span>
                        <span className={`typelogo ${item.fileType}`}></span>
                        <span className="createtime">{item.CreateTime}</span>

                        <div className={`resource-name ${item.fileType}`} title={item.Name}
                            onClick={item.fileType === "folder" ? () => this.skipToNewFolder("contentClick", item.ID, item.Name) : () => this.skipByLink(item.ResLinkForWeb)}>
                            {item.Name}
                            {item.IsFolder === false ? <div className="resremark">{item.ResRemark}</div> : ""}
                        </div>

                        <div className={`option-logo ${item.fileType}`} >
                            <span className="rename"
                                onClick={item.fileType === "folder" ? () => this.modalClick("reNameFolder", item.ID) : () => this.modalClick("reNameCollect", item.ID)}></span>
                            <span className="move"
                                onClick={item.fileType === "folder" ? () => this.MoveModal("folder", item.ID) : () => this.MoveModal("single", item.ID)}
                            >
                            </span>
                            <span className="decancel"
                                onClick={item.fileType === "folder" ? () => this.cancelEvent("deleteFolder", item.ID) : () => this.cancelEvent("cancelCollect", item.ID)}></span>
                        </div>
                    </ li >
                );
            })



        }



        //渲染来源列表
        let resTypeList = typeList.map(item => {
            return { "value": item.TypeId, "title": item.TypeName }

        })

        resTypeList.unshift({ "value": "", "title": "全部来源" });

        //渲染用户当前所在目录路径
        let PathRes = currentPath.map((item, key) => {
            if (key !== currentPath.length - 1) {
                return <React.Fragment><span className="path"
                    onClick={() => this.skipToNewFolder("pathClick", item.folderId)}> {item.folderName} </span> &gt; </React.Fragment>
            }
            else {
                return ` ${item.folderName}`
            }

        })




        return (
            <div className="collector-content clearfix">
                <div className="current-path">
                    <span className={`fallback ${currentPath.length === 1 ? 'root' : 'havenext'}`}
                        onClick={this.fallback} >返回上一级</span> &nbsp;&nbsp;|&nbsp;&nbsp;
                    {PathRes}
                </div>
                <Search placeHolder="输入关键词搜索..." onClickSearch={this.keywordSearch}
                    onCancelSearch={this.cancelSearch}
                    Value={searchKeyword}
                    onChange={this.keywordChange}

                ></Search>
                <div className="splitline"></div>

                <DropDown title="来源:" width={120} height={100} type="simple"

                    dropSelectd={{ value: typeDropValue, title: typeDropTitle }}

                    dropList={resTypeList}
                    style={{ zIndex: 10 }}

                    onChange={this.typeChange}></DropDown>
                <div className="rangeDate-picker">
                    日期:
                    <RangePicker
                        placeholder={["开始日期", "结束日期"]}
                        value={[Mstart, Mend]}
                        // value={[null, null]}
                        onChange={this.dateChange}

                    >

                    </RangePicker>

                </div>
                {/* <button className="add-newfolder"></button> */}
                <Button
                    className="add-newfolder"
                    title="添加目录"
                    onClick={() => this.modalClick("addFolder")}
                >
                    + 添加目录
                    </Button>


                <Modal
                    type="3"
                    title={modalTitle}
                    visible={ModalShow}
                    width={"551px"}
                    bodyStyle={{ height: "136px" }}
                    onCancel={this.ModalClose}
                    onOk={() => this.modalComfirm()}

                >
                    <div className="modal-contain">
                        {newName}:<Input placeholder="最多输入两百字" value={modalInput} onChange={this.NameChange} />
                    </div>
                </Modal>
                {
                    exeit === "0" ? <div className="collector-header ">
                        <span >名称:</span>
                        <span >收藏时间:</span>

                    </div> : ""
                }
                <ul className="collector-detail">
                    <Loading spinning={favoriteLoading} opacity={false} tip="请稍后...">

                        {collectRes}
                        {tipInfo}

                    </Loading>


                </ul>
                {
                    exeit === "0" ? <div className="collector-bottom ">
                        <span className={`select-all ${selectAll === true ? 'checked' : ''}`} onClick={this.selectAll}></span>全选
                        <Button
                            className="batch-move"
                            title="批量移动"
                            onClick={() => this.MoveModal("all")}
                        >批量移动</Button>

                        <Pagination onChange={this.togglePage} total={folderResInfo.total}
                            showQuickJumper={true}
                            hideOnSinglePage={false}
                            defaultPageSize={10} />
                    </div> : ""
                }


                <Modal
                    type="1"
                    title="移动到"
                    visible={moveModalShow}
                    width={"551px"}
                    bodyStyle={{ height: "344px" }}
                    onOk={this.moveModalConfirm}
                    onCancel={this.ModalClose}
                    className="moveModal"
                >

                    <Tree
                        // checkable
                        // onExpand={this.onExpand}
                        // expandedKeys={this.state.expandedKeys}
                        // autoExpandParent={this.state.autoExpandParent}
                        // onCheck={this.onCheck}
                        // checkedKeys={this.state.checkedKeys}
                        onSelect={this.folderSelect}
                        // selectedKeys={this.state.selectedKeys}
                        showIcon={true}
                        icon={<i className="folder"></i>}
                        switcherIcon={<i className="open"></i>}
                    >
                        {this.renderTreeNodes(folderInfo)}
                    </Tree>
                </Modal>

                {/* <div className="batch-move"></div> */}
            </div >
        );
    }
}
const mapStateToProps = (state) => {
    const { CollectorDataChange, UILoading } = state
    const { folderResInfo, typeList, folderInfo } = CollectorDataChange
    const { favoriteLoading } = UILoading
    // console.log(CollectDataChange)
    return {
        folderResInfo,
        typeList,
        favoriteLoading,
        folderInfo
    }
}

export default connect(mapStateToProps)(FavoritesPage);