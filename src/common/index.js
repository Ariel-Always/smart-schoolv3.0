
import React from 'react';
import 'antd/dist/antd.min.css';
import './index.scss'
import './scss/_left_menu.scss';
import './js/leftMenu'
import {
    Radio as AntRadio, Checkbox as AntCheckBox, Table as AntTable,
    Pagination as AntPagination, Button as AntdButton, Input as AntdInput,
    Modal as AntdModal, Icon, ConfigProvider
} from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
const $ = require('jquery');

moment.locale('zh-cn');
/*
 * 组件：按钮组
 * params
 *style:样式
 * func:方法
 * details:内容
 * type:按钮颜色类型
 * size:按钮大小
 * */

/*
 * 按钮组件
 * */

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type, /*type:primary、default、默认primary*/
            size: props.size, /*size:large、normal、small默认normal*/
            disabled: props.disabled ? true : false,
            color: props.color,
            value: props.value,
            shape: props.shape, /*shape:round、circle、默认border-radius:4px*/
            onClick: props.onClick,
            onChange: props.onChange,
            style: props.style,
            className: props.className?props.className:''

        }
    }

    /*
     * size筛选:large、normal、small，不写默认为normal
     * */
    HandleSize = (size) => {
        switch (size) {
            case 'large':
                return 'btn-large';
            case 'normal':
                return 'btn-normal';
            case 'small':
                return 'btn-small';
            default:
                return 'btn-size';
        }
    }

    /*
     * color筛选:orange、green、blue、red、mazarine(深蓝色)，不写默认为blue
     * */
    HandleColor = (color, disabled, type) => {
        if (type === 'primary') {
            if (disabled)
                return 'btn-disabled';
            else {
                switch (color) {
                    case 'orange':
                        return 'btn-orange';
                    case 'green':
                        return 'btn-green';
                    case 'blue':
                        return 'btn-blue';
                    case 'red':
                        return 'btn-red';
                    case 'mazarine':
                        return 'btn-mazarine';
                    default:
                        return 'btn-orange';

                }
            }
        } else if (type === 'default') {
            if (disabled)
                return 'btn-disabled-default';
            else {
                switch (color) {
                    case 'orange':
                        return 'btn-orange-default';
                    case 'green':
                        return 'btn-green-default';
                    case 'blue':
                        return 'btn-blue-default';
                    case 'red':
                        return 'btn-red-default';
                    case 'mazarine':
                        return 'btn-mazarine-default';
                    default:
                        return 'btn-orange-default';

                }
            }
        } else {
            if (disabled)
                return 'btn-disabled';
            else {
                switch (color) {
                    case 'orange':
                        return 'btn-orange';
                    case 'green':
                        return 'btn-green';
                    case 'blue':
                        return 'btn-blue';
                    case 'red':
                        return 'btn-red';
                    case 'mazarine':
                        return 'btn-mazarine';
                    default:
                        return 'btn-orange';

                }
            }
        }


    }


    render() {
        return (
            <ConfigProvider locale={zhCN}>
                <AntdButton
                    className={`Button ${this.HandleSize(this.state.size)} ${this.HandleColor(this.state.color, this.state.disabled, this.state.type)} ${this.state.className}`}
                    shape={this.state.shape}
                    disabled={this.state.disabled}
                    onClick={this.state.onClick}
                    style={this.state.style}
                    block={this.props.block}
                    href = {this.props.href}
                    target = {this.props.target}
                >{this.props.children ? this.props.children : this.state.value}</AntdButton>
            </ConfigProvider>
        )
    }
}

/*
 * 输入框
 * */

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type,
            className: props.className,
            style: props.style,
            size: props.size ? props.size : 'normal',
            value: props.value,
            placeholder: props.placeholder,
            rows: props.rows ? props.rows : '5',
            cols: props.cols ? props.cols : '30',
            disabled: props.disabled ? true : false,
            name: props.name,
            prefix: props.prefix, /*前置图标*/
            suffix: props.suffix, /*后置图标*/
            onClick: props.onClick,
            onChange: props.onChange,
            onFocus: props.onFocus,
            onKeyDown: props.onKeyDown,
            onBlur: props.onBlur,
            onInput: props.onInput,
            onKeyUp: props.onKeyUp,
            autocomplete: props.autocomplete
        }
    }

    /*
     * 根据type选择组件
     * */

    SelectInput = (type, AntdInput) => {
        let Input = AntdInput
        if (type === 'textarea') {
            Input = (
                <AntdInput.TextArea
                    rows={this.state.rows}
                    value={this.state.value}
                    cols={this.state.cols}
                    placeholder={this.state.placeholder}
                    size={this.state.size}
                    style={{ resize: 'none' }}
                    className={this.state.className}
                    disabled={this.state.disabled}
                    name={this.state.name}
                    suffix={this.state.suffix}
                    prefix={this.state.prefix}
                    onClick={this.state.onClick}
                    onChange={this.state.onChange}
                    onFocus={this.state.onFocus}
                    onKeyDown={this.state.onKeyDown}
                    onBlur={this.state.onBlur}
                    onInput={this.state.onInput}
                    onKeyUp={this.state.onKeyUp}
                >

                </AntdInput.TextArea>
            )
        } else if (type === 'password') {
            Input = (
                <AntdInput
                    type="password"
                    size={this.state.size}
                    value={this.state.value}
                    placeholder={this.state.placeholder}
                    className={this.state.className}
                    disabled={this.state.disabled}
                    name={this.state.name}
                    suffix={this.state.suffix}
                    prefix={this.state.prefix}
                    onClick={this.state.onClick}
                    onChange={this.state.onChange}
                    onFocus={this.state.onFocus}
                    onKeyDown={this.state.onKeyDown}
                    onBlur={this.state.onBlur}
                    onInput={this.state.onInput}
                    onKeyUp={this.state.onKeyUp}
                    autoComplete={this.state.autocomplete}
                />
            )

        } else {
            Input = (
                <AntdInput
                    type={this.state.type}
                    size={this.state.size}
                    value={this.state.value}
                    placeholder={this.state.placeholder}
                    className={this.state.className}
                    disabled={this.state.disabled}
                    name={this.state.name}
                    suffix={this.state.suffix}
                    prefix={this.state.prefix}
                    onClick={this.state.onClick}
                    onChange={this.state.onChange}
                    onFocus={this.state.onFocus}
                    onKeyDown={this.state.onKeyDown}
                    onBlur={this.state.onBlur}
                    onInput={this.state.onInput}
                    onKeyUp={this.state.onKeyUp}
                />
            )
        }
        return Input
    }


    componentWillMount() {
        this.setState({
            MyInput: this.SelectInput(this.state.type, AntdInput)
        })
    }

    render() {
        return (
            <ConfigProvider locale={zhCN}>
                {this.state.MyInput}
            </ConfigProvider>
        )
    }
}


/*
 * 空数据提示
 * */
class Empty extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: props.type,
            title: props.title,
            style: props.style,
            className: props.className ? props.className : '',
            noTitle: props.noTitle,
            imageStyle: props.imageStyle,
            titleStyle: !props.noTitle ? props.titleStyle ? props.titleStyle : '' : 'noTitle'
        }
    }

    selectType = (type) => {
        let className_1 = 'tips-error-1';
        switch (type) {
            case '1':
                if (!this.state.title)
                    this.setState({ title: '请选择要查看的学校' });
                className_1 = 'tips-error-1';
                break;
            case '2':
                if (!this.state.title)
                    this.setState({ title: '早起的鸟儿有虫吃~' });
                className_1 = 'tips-error-2';
                break;
            case '3':
                if (!this.state.title)
                    this.setState({ title: '空空如也，暂时还没有资源～' });
                className_1 = 'tips-error-3';
                break;
            case '4':
                if (!this.state.title)
                    this.setState({ title: '空空如也，暂时还没有资料～' });
                className_1 = 'tips-error-4';
                break;
            case '5':
                if (!this.state.title)
                    this.setState({ title: '无搜索结果，换个词试试吧~' });
                className_1 = 'tips-error-5';
                break;
            default:
                if (!this.state.title)
                    this.setState({ title: '请选择要查看的学校' });
                className_1 = 'tips-error-1';
                break;
        }

        this.setState({
            className_1: className_1
        })
    }

    componentWillMount() {
        this.selectType(this.state.type)
    }

    render() {
        return (
            <div className={`emptyBox ${this.state.className}`} style={this.state.Style}>
                <i style={this.state.imageStyle} className={`empty ${this.state.className_1}`}></i>
                <span className={`initTitle ${this.state.titleStyle}`}>{this.state.title}</span>
            </div>
        )
    }
}

/*
 * 弹出框
 * */
class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            afterClose: props.afterClose, /*Modal 完全关闭后的回调*/
            bodyStyle: props.bodyStyle, /*Modal body 样式*/
            closable: props.closable, /*是否显示右上角的关闭按钮*/
            footer: props.footer, /*底部内容，当不需要默认底部按钮时，可以设为 footer={null}*/
            mask: props.mask, /*是否展示遮罩*/
            maskClosable: props.maskClosable ? props.maskClosable : false, /*Modal 完全关闭后的回调*/
            maskStyle: props.maskStyle, /*遮罩样式*/
            okText: props.okText, /*确认按钮文字*/
            okType: props.okType, /*确认按钮类型*/
            style: props.style, /*可用于设置浮层的样式，调整浮层位置等*/
            title: props.title, /*标题*/
            width: props.width, /*宽度*/
            onCancel: props.onCancel, /*点击遮罩层或右上角叉或取消按钮的回调*/
            onOk: props.onOk, /*点击确定回调*/
            visible: props.visible, /*对话框是否可见*/
            className: props.className ? props.className : '', /**/


        }
    }

    selectType(type) {
        let width = 810;
        let ModalStyle = 'Modal-1';
        switch (type) {
            case '1':
                width = 810;
                ModalStyle = 'Modal-1';
                break;
            case '2':
                width = 810;
                ModalStyle = 'Modal-2';
                this.setState({
                    footer: null
                });
                break;
            case '3':
                width = 588;
                ModalStyle = 'Modal-3';
                break;
            default:
                width = 810;
                ModalStyle = 'Modal-1';
        }
        this.setState({
            width: width,
            ModalStyle: ModalStyle
        })
    }

    componentWillMount() {
        this.selectType(this.props.type)
    }

    componentWillReceiveProps() {
        this.selectType(this.props.type)
    }

    render() {

        return (
            <AntdModal onOk={this.state.onOk}
                onCancel={this.state.onCancel}
                title={this.state.title}
                className={`initModel ${this.state.ModalStyle} ${this.state.className}`}
                style={this.state.style}
                okText={this.state.okText}
                maskClosable={this.state.maskClosable}
                mask={this.state.mask}
                closable={this.state.closable}
                bodyStyle={this.state.bodyStyle}
                afterClose={this.state.afterClose}
                visible={this.props.visible}
                centered={this.props.centered ? this.props.centered : true}
                width={this.state.width}
                footer={this.state.footer === null ? null : this.state.footer ? this.state.footer : [
                    <Button type="primary" size="small" color="green" onClick={this.state.onOk}>
                        确定
                           </Button>,
                    <Button size="small" color="blue" onClick={this.state.onCancel}>
                        关闭
                           </Button>,

                ]}
            >
                {this.props.children}
            </AntdModal>
        )
    }
}

/*
 * 选择组件（单选、多选、全选） start
 * */
class Radio extends React.Component {
    render() {
        const { children, ...reset } = this.props;
        return (
            <ConfigProvider locale={zhCN}>
                <AntRadio {...reset}>{children}</AntRadio>
            </ConfigProvider>
        );
    }
}
class RadioGroup extends React.Component {
    render() {
        const { children, ...reset } = this.props;
        return (
            <ConfigProvider locale={zhCN}>
                <AntRadio.Group {...reset}>{children}</AntRadio.Group>
            </ConfigProvider>
        );
    }
}
class CheckBox extends React.Component {
    render() {
        const { children, ...reset } = this.props;
        return (
            <ConfigProvider locale={zhCN}>
                <AntCheckBox {...reset}>{children}</AntCheckBox>
            </ConfigProvider>
        );
    }
}
class CheckBoxGroup extends React.Component {
    render() {
        const { children, ...reset } = this.props;
        return (
            <ConfigProvider locale={zhCN}>
                <AntCheckBox.Group {...reset}>{children}</AntCheckBox.Group>
            </ConfigProvider>
        );
    }
}
/*
 * 选择组件（单选、多选、全选） end
 * */

/*
 * table组件 start
 * */
class Table extends React.Component {
    render() {
        const { children, ...reset } = this.props;
        return (
            <ConfigProvider locale={zhCN}>
                <AntTable {...reset}>{children}</AntTable>
            </ConfigProvider>
        );
    }
}
/*
 * table组件 end
 * */
/*
 * 分页组件 start
 * */
class PagiNation extends React.Component {
    render() {
        const { children, hideOnSinglePage, simple, showQuickJumper, ...reset } = this.props;
        return (
            <ConfigProvider locale={zhCN}>
                <AntPagination {...reset} hideOnSinglePage={hideOnSinglePage ? hideOnSinglePage : true}
                    showQuickJumper={simple ? false : {
                        goButton: <span className="pagination_go_button">Go</span>
                    }}
                    simple={simple ? true : false}
                >{children}</AntPagination>
            </ConfigProvider>
        );
    }
}
/*
 * 分页组件 end
 * */
/*
 * 搜索 start
 * */
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectShow: false,
            selectdValue: '',
            cancleShow: false,
            inputFocus: false
        }
    }

    componentDidMount() {
        const { select } = this.props;
        if (select) {
            document.addEventListener('click',
                (e) => this.outSpanClickHandler({
                    that: this,
                    target: e.target,
                    spanDom: this.refs.search_select_span,
                    ulDom: this.refs.search_select_ul
                }));//点击其他地方将需要进行判断的元素传输给事件outSpanClickHandler
        }
    }

    toggleSelectd(e) {   //切换下拉和上拉
        this.setState({ selectShow: !this.state.selectShow }, () => {
            $(this.refs.search_select_ul).slideToggle('fast');
        });
    }   //切换下拉状态为slideDown和slideUp
    changeSelect(e) {
        this.setState({ selectdValue: { value: e.value, title: e.title } });
        this.setState({ selectShow: !this.state.selectShow }, () => {
            $(this.refs.search_select_ul).hide();
        });
    } //改变选项
    outSpanClickHandler(e) {
        const { target, ulDom, that, spanDom } = e;
        if (!spanDom.contains(target)) {
            that.setState({ selectShow: false }, () => {
                $(ulDom).hide();
            })
        }
    }//点击其他地方将下拉收起
    onInputFocus() {
        this.setState({ inputFocus: true });
    }//input focus事件
    onInputBlur() {
        this.setState({ inputFocus: false });
    }//input blur事件
    handleEnterKey(e) {
        const { select, selectOptions, onClickSearch } = this.props;
        if (e.nativeEvent.keyCode === 13) {
            if (this.refs.search_text_input.value) {
                this.setState({ cancleShow: true }, () => {
                    if (onClickSearch) {
                        return onClickSearch({
                            selectdValue: select ? (
                                this.state.selectdValue ? this.state.selectdValue.value
                                    : selectOptions.selectdValue.value)
                                : null,
                            value: this.refs.search_text_input.value
                        })
                    }
                })
            } else {
                if (onClickSearch) {
                    return onClickSearch({
                        selectdValue: select ? (
                            this.state.selectdValue ? this.state.selectdValue.value
                                : selectOptions.selectdValue.value)
                            : null,
                        value: this.refs.search_text_input.value
                    })
                }
            }

        }
    }//键盘enter事件
    render() {
        const { width, select, placeHolder, selectOptions, onClickSearch, onCancelSearch } = this.props;
        return (
            <div className="search_container" style={{
                width: width ? width : '',
                borderColor: this.state.inputFocus ? '#5897ed' : '#bac7d9'
            }}>
                <table className="search_wrapper_table">
                    <tbody>
                        <tr>
                            {//控制下拉部分的宽度
                                select ?
                                    <td style={{ width: (selectOptions && selectOptions.width) ? selectOptions.width : '86px' }}>
                                        <div className="search_select_wrapper">
                                            <span className="search_select_span" ref='search_select_span'
                                                onClick={this.toggleSelectd.bind(this)}
                                                style={{ width: (selectOptions && selectOptions.width) ? (selectOptions.width - 14) : '' }}>
                                                <span
                                                    className={`search_select_icon ${this.state.selectShow === true ? 'search_slide_icon' : ''}`}></span>
                                                {// 判断是否有state的选中值（this.state.selectdValue）?使用state.selectdValue值：(判断是否有外界传值)?使用外界传值:''
                                                    this.state.selectdValue ?
                                                        <span className="search_select_text"
                                                            data-value={this.state.selectdValue.value}
                                                            title={this.state.selectdValue.title}>{this.state.selectdValue.title}</span>
                                                        :
                                                        ((selectOptions && selectOptions.selectdValue) ?
                                                            <span className="search_select_text"
                                                                data-value={selectOptions.selectdValue.value}
                                                                title={selectOptions.selectdValue.title}>{selectOptions.selectdValue.title}</span>
                                                            : ''
                                                        )
                                                }

                                            </span>
                                            <ul className='search_select_ul' ref='search_select_ul'>
                                                {
                                                    //选项列表 (是否外界传值)？：使用外界值：''
                                                    (selectOptions && selectOptions.selectList) ?
                                                        selectOptions.selectList.map((item, k) => {
                                                            return <li key={k} onClick={this.changeSelect.bind(this, {
                                                                value: item.value,
                                                                title: item.title
                                                            })} className="search_select_li" data-value={item.value}
                                                                title={item.title}>{item.title}</li>
                                                        })
                                                        : ''
                                                }

                                            </ul>
                                            <span className="search_select_gap"></span>
                                        </div>
                                    </td> : null}
                            <td className="search_left_td">
                                <input ref='search_text_input'
                                    className="search_text_input"
                                    type="text" placeholder={placeHolder ? placeHolder : '输入关键词快速搜索'}
                                    onFocus={this.onInputFocus.bind(this)}
                                    onBlur={this.onInputBlur.bind(this)}
                                    onKeyPress={this.handleEnterKey.bind(this)}
                                />
                                <input className="search_cancel_input" type="button"
                                    onClick={
                                        () => {
                                            this.setState({ cancleShow: false }, () => {
                                                this.refs.search_text_input.value = '';
                                                if (onCancelSearch) {
                                                    onCancelSearch();
                                                }
                                            })
                                        }
                                    }
                                    style={{ display: this.state.cancleShow === true ? 'block' : 'none' }} />
                            </td>
                            <td className="search_right_td">
                                <input className="search_btn_input" type="button"
                                    onClick={
                                        () => {
                                            if (this.refs.search_text_input.value) {
                                                this.setState({ cancleShow: true }, () => {
                                                    if (onClickSearch) {
                                                        onClickSearch({
                                                            selectdValue: select ? (
                                                                this.state.selectdValue ? this.state.selectdValue.value
                                                                    : selectOptions.selectdValue.value)
                                                                : null,
                                                            value: this.refs.search_text_input.value
                                                        });
                                                    }
                                                });
                                            } else {
                                                if (onClickSearch) {
                                                    onClickSearch({
                                                        selectdValue: select ? (
                                                            this.state.selectdValue ? this.state.selectdValue.value
                                                                : selectOptions.selectdValue.value)
                                                            : null,
                                                        value: this.refs.search_text_input.value
                                                    });
                                                }
                                            }
                                        }
                                    } />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
/*
 * 搜索 end
 * */
/*
 * 下拉 start
 * */
class DropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropSelectd: '',
            dropListShow: false,
            range2ListShow: '',
            range2ListActive: '',
            searchOpen: false
        }
    }

    onToggleDropList() {
        this.setState({ dropListShow: !this.state.dropListShow }, () => {
            $(this.refs.dropdown_select_ul).slideToggle('fast');
        });
    }//展示或者隐藏下拉列表
    onSimpleDropChange(e) {
        const { onChange, value, title } = e;
        this.setState({ dropListShow: false, dropSelectd: { value, title } }, () => {
            $(this.refs.dropdown_select_ul).hide();
            if (onChange) {
                onChange({ value, title });
            }
        });
    }

    //改变下拉选项的时候调用
    onMultipleRang2DropChange(e) {
        const { id, name, preName, showId, onChange, k1, k2 } = e;
        this.setState({ //点击选项之后
            dropListShow: false,
            dropSelectd: {
                value: `${preName ? preName : ''}${name}${showId ? `[${id}]` : ''}`,
                title: `${preName ? preName : ''}${name}${showId ? `[${id}]` : ''}`
            },
            range2ListActive: `${k1}${k2}`
        }, () => {
            $(this.refs.dropdown_select_ul).hide();//隐藏下拉框
            if (onChange) {
                onChange({ value: `${preName ? `${preName}-` : ''}${name}`, id: id });//调用外部传入的行数
            }
        });
    }//二级下拉改变下拉的时候调用
    onRange2ListShow(k1) {
        if (this.state.range2ListShow === k1) {
            this.setState({ range2ListShow: '' }, () => {
                $(this.refs[`dropdown_list_ul3_${k1}`]).slideToggle();
            });
        } else {
            $(this.refs[`dropdown_list_ul3_${this.state.range2ListShow}`]).slideToggle();

            this.setState({ range2ListShow: k1 }, () => {
                $(this.refs[`dropdown_list_ul3_${k1}`]).slideToggle();
            })
        }

    }//在二级的时候展开下拉
    componentDidMount() {
        document.addEventListener('click', (e) => this.outDropClick({
            that: this,
            target: e.target,
            ulDom: this.refs.dropdown_select_ul,
            spanDom: this.refs.dropdown_default_span
        }));//当点击事件发生在下拉之外的时候
    }

    outDropClick(e) {
        const { that, target, ulDom, spanDom } = e;
        if ((!spanDom.contains(target)) && (!ulDom.contains(target))) {
            that.setState({ dropListShow: false }, () => {
                $(ulDom).hide();
            })
        }
    }//当点击事件发生在下拉组件之外的时候
    onClickSearch(e) {
        const { mutipleOptions } = this.props;
        if (e.value) {
            this.setState({ searchOpen: true }, () => {
                if (mutipleOptions && mutipleOptions.dropClickSearch) {
                    mutipleOptions.dropClickSearch(e);
                }
                $(this.refs[`dropdown_list_ul3_${this.state.range2ListShow}`]).toggle();
            });
        } else {
            if (mutipleOptions && mutipleOptions.dropClickSearch) {
                mutipleOptions.dropClickSearch(e);
            }
        }

    }//点击搜索之后
    onCancelSearch(e) {
        const { mutipleOptions } = this.props;
        this.setState({ searchOpen: false }, () => {
            if (mutipleOptions && mutipleOptions.dropCancelSearch) {
                mutipleOptions.dropCancelSearch();
            }
            $(this.refs[`dropdown_list_ul3_${this.state.range2ListShow}`]).toggle();
        })
    }

    render() {
        const {
            title, width, height, disabled, dropSelectd, dropList, onChange, type,
            mutipleOptions, ...reset
        } = this.props;
        let dropContainer = '';
        let selectUlWidth = (mutipleOptions && mutipleOptions.width ? mutipleOptions.width : 540);
        let selectUlHeight = (mutipleOptions && mutipleOptions.height ? mutipleOptions.height : 280);
        let searchWidth = (mutipleOptions && mutipleOptions.searchWidth ? mutipleOptions.searchWidth : 320);
        let scrollWrapperWidth = (mutipleOptions && mutipleOptions.width ? (mutipleOptions.width - 20) : 520);
        let scrollWrapperHeight = (mutipleOptions && mutipleOptions.height ? (mutipleOptions.height - 72) : 228);
        let showId = (mutipleOptions && mutipleOptions.dropIdShow) ? mutipleOptions.dropIdShow : false;
        //所需的参数
        let dropMultipleList = '';
        //判断等级渲染相对应的元素
        if (this.state.searchOpen) { //如果开启搜索的话
            dropMultipleList =
                <ul className="dropdown_list_ul3 clearfix" style={{ display: "block" }}>
                    {mutipleOptions.searchList.map((item, ks) => {
                        return <li key={ks} className="dropdown_item3_li"
                            onClick={this.onMultipleRang2DropChange.bind(this, {
                                name: item.name,
                                id: item.id,
                                showId,
                                onChange: mutipleOptions.dropMultipleChange
                            })}//绑定点击事件
                            title={`${item.name}${showId ? `[${item.id}]` : ''}`}>
                            <span className="dropdown_item3_name">{item.name}</span>
                            {
                                showId ? <span className="dropdown_item3_id">{`[${item.id}]`}</span> : ''
                            }
                        </li>
                    })}
                </ul>

        } else if (mutipleOptions && mutipleOptions.range === 2) { //如果range的等级为2
            dropMultipleList = mutipleOptions.dropMultipleList.map((item1, k1) => {//遍历第一个数组
                return <li key={k1} className="dropdown_list_item1">
                    <div
                        className={`dropdown_item1_name ${this.state.range2ListShow === k1 ? 'slide' : ''}`} //判断是否是活动状态
                        title={item1.name} onClick={this.onRange2ListShow.bind(this, k1)}>{item1.name}</div>
                    <ul ref={`dropdown_list_ul3_${k1}`} className={`dropdown_list_ul3 clearfix`}>
                        {//遍历第二个数组
                            item1.list.map((item2, k2) => {
                                return <li key={k2}
                                    className={`dropdown_item3_li ${this.state.range2ListActive === `${k1}${k2}` ? 'active' : ''}`} //判断是否是active
                                    title={`${item2.name}${showId ? `[${item2.id}]` : ''}`}
                                    onClick={this.onMultipleRang2DropChange.bind(this, {
                                        name: item2.name,
                                        id: item2.id,
                                        preName: item1.name,
                                        showId,
                                        k1, k2,
                                        onChange: mutipleOptions.dropMultipleChange
                                    })}//绑定点击事件
                                >
                                    <span className="dropdown_item3_name">{item2.name}</span>
                                    {
                                        showId ? <span className="dropdown_item3_id">{`[${item2.id}]`}</span> : ''
                                    }
                                </li>
                            })
                        }
                    </ul>
                </li>
            });
        } else if (mutipleOptions && mutipleOptions.range === 3) {
            //等待后期扩展使用
        }

        if (type && type === 'multiple') {
            dropContainer =
                <div ref="dropdown_select_ul" className="dropdown_select_ul"
                    style={{ width: selectUlWidth, height: selectUlHeight }}>
                    <div className="dropdown_multiple_container">
                        <div className="dropdown_search_wrapper">
                            <Search
                                placeHolder={mutipleOptions && mutipleOptions.searchPlaceholder ? mutipleOptions.searchPlaceholder : null}
                                width={searchWidth}
                                onClickSearch={this.onClickSearch.bind(this)}
                                onCancelSearch={this.onCancelSearch.bind(this)}
                            ></Search>
                        </div>
                        <Scrollbars style={{ width: scrollWrapperWidth, height: scrollWrapperHeight }}>
                            <ul className="dropdown_list_ul">
                                {dropMultipleList}
                            </ul>
                        </Scrollbars>
                    </div>
                </div>
        } else {
            dropContainer = <ul className="dropdown_select_ul"
                ref="dropdown_select_ul"
                style={{ width: width ? width : 120, height: height ? height : 48 }}>
                {//dropList是否存在？dropList:''
                    dropList ?
                        dropList.map((item, key) => {
                            return <li key={key} className="dropdown_select_li"
                                title={item.value}
                                data-vaule={item.title}
                                onClick={
                                    this.onSimpleDropChange.bind(this, {
                                        onChange: onChange,
                                        value: item.value,
                                        title: item.title
                                    })
                                }
                            >{item.title}</li>
                        })
                        : ''
                }

            </ul>;
        }
        return (
            <div className="dropdown_container" {...reset}>
                <span className="dropdown_title_span">{title}</span>
                <span className="dropdown_wrapper" style={{ width: width ? width : 120 }}>
                    <span ref='dropdown_default_span' className={`dropdown_default_span ${disabled ? 'disabled' : ''}`}
                        onClick={ //点击展示和隐藏下拉列表
                            disabled ?
                                () => {
                                } : this.onToggleDropList.bind(this)
                        }
                        style={{ width: width ? width : 120 }}>
                        <span className={`dropdown_icon_span ${this.state.dropListShow ? 'slide' : ''}`}></span>
                        {   //判断this.state.dropSelectd?this.state.dropSelectd:(判断外界传入的dropSelectd？外界传入的dropSelectd:'')
                            this.state.dropSelectd ?
                                <span data-value={this.state.dropSelectd.value} className="dropdown_text_span"
                                    title={this.state.dropSelectd.title}>{this.state.dropSelectd.title}</span>
                                : (dropSelectd ?
                                    <span data-value={dropSelectd.value} className="dropdown_text_span"
                                        title={dropSelectd.title}>{dropSelectd.title}</span>
                                    : ''
                                )
                        }
                    </span>
                    {
                        dropContainer
                    }
                </span>
            </div>
        );
    }
}
/*
 * 左侧菜单
 * */

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    /*参数解构*/
    paramsDeconstruction(props) {
        const { initParams, ...reset } = props.params;
        let { children, MenuBox } = { ...reset };
        let layer = 1;
        /*级数*/


        this.setState({
            initParams: initParams,
            menuDom: this.objectDeconstruction(children, layer),
            MenuBoxWidth: MenuBox.width ? MenuBox.width + 'px' : 240 + 'px',
            MenuBoxShow: MenuBox.display ? 'block' : 'none',
            MenuBoxTopPic: 'menu_top_' + MenuBox.MenuBoxTopPic,
        })
    }



    /*多层对象解构*/
    objectDeconstruction = (object, layer, ulDisbled) => {
        let myLayer = layer;
        /*级数*/
        if (typeof object && isNaN(object.length)) {
            if (object.children) { /*有下一级*/
                const { children, ...params } = object;
                if (myLayer === 1) {
                    return (
                        <React.Fragment key={object.key}>
                            <div className="frame_leftmenu_mainitem">
                                <span
                                    className={`frame_leftmenu_mainitem_name ${object.icon} ${object.active ? 'active' : ''}`}
                                    onClick={object.onTitleClick}
                                >
                                    {object.title}
                                </span>
                                <span className="frame_leftmenu_arrow"></span>
                            </div>
                            <div className="frame_leftmenu_nextgrade_container" style={{ display: 'none' }}>

                                {this.objectDeconstruction(children, myLayer + 1)}

                            </div>
                        </React.Fragment>
                    )
                }
                else if (myLayer === 2) {
                    return (
                        <div className="frame_leftmenu_twograde_container" key={object.key}>
                            <div className="frame_leftmenu_twograde_grounp">
                                <span className="frame_leftmenu_twograde_arrow"></span>
                                <span
                                    className="frame_leftmenu_twograde_text"
                                    onClick={object.onTitleClick}
                                >{object.title}</span>
                                <span className="frame_left_menu_right_arrow"></span>
                            </div>
                            {this.objectDeconstruction(children, myLayer + 1, true)}
                        </div>
                    )
                }
            } else {
                if (myLayer === 1) {/*最后一级*/
                    return (
                        <div
                            className={`frame_leftmenu_mainitem no_child ${object.active ? 'active' : ''} ${object.selected ? 'selected' : ''}`}
                            key={object.key}
                        >
                            <span
                                className={`frame_leftmenu_mainitem_name ${object.icon} ${object.active ? 'active' : ''}`}
                                onClick={object.onTitleClick}
                            >
                                {object.title}
                            </span>

                        </div>
                    )
                } else if (myLayer === 2) {
                    return (
                        <li className="clearfix"
                            key={object.key}
                        >
                            <span className="frame_leftmenu_point">
                            </span>
                            <span
                                className="frame_leftmenu_onegrade_name frame_ellipsis"
                                onClick={object.onTitleClick}
                            >
                                {object.title}</span>
                        </li>

                    )
                } else {
                    return (
                        <li className="clearfix"
                            key={object.key}
                        >
                            <span className="frame_leftmenu_point">
                            </span>
                            <span
                                className="frame_leftmenu_onegrade_name frame_ellipsis"
                                onClick={object.onTitleClick}
                            >
                                {object.title}</span>
                        </li>

                    )
                }

            }
        }
        else if (object instanceof Array) {/*children数组，进行拆分*/
            let end = true;
            const listItem = object.map((child) => {
                if (child.children)
                    end = false;
                return (
                    this.objectDeconstruction(child, myLayer)
                )
            })
            if (end) {
                if (ulDisbled)
                    return <ul className="frame_leftmenu_lastgrade_ul" style={{ display: 'none' }}>{listItem}</ul>;
                else
                    return <ul className="frame_leftmenu_onegrade_ul" >{listItem}</ul>;

            }
            else
                return listItem;
        }


    }


    componentWillMount() {
        this.paramsDeconstruction(this.props)
    }

    render() {
        return (

            <div className={`MenuBox`}
                style={{ width: this.state.MenuBoxWidth, display: this.state.MenuBoxShow }}
            >
                <div className={`MenuBox_top ${this.state.MenuBoxTopPic}`}></div>
                <div id="frame_left_menu_container" className="frame_left_menu_container">{this.state.menuDom}</div>
            </div>
        )
    }
}
/*
 * 下拉 end
 * */
/*
 * loading start
 * */
class Loading extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <Icon type="search" spin></Icon>
            </div>
        );
    }
}
/*
 * loading end
 * */

/*
 * 下拉 end
 * */

export {
    Radio,
    RadioGroup,
    CheckBox,
    CheckBoxGroup,
    Table,
    PagiNation,
    Search,
    DropDown,
    Button,
    Input,
    Empty,
    Modal,
    Menu
}