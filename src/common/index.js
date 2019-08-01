import 'core-js'
import React from 'react';
import 'antd/dist/antd.min.css';
import './index.scss'
import {Radio as AntRadio,Checkbox as AntCheckBox,Table as AntTable,
Pagination as AntPagination} from 'antd';
import {Scrollbars} from 'react-custom-scrollbars';
const $ = require('jquery');

/*
* 组件：按钮组
* params
*style:样式
* func:方法
* details:内容
* type:按钮颜色类型
* size:按钮大小
* */
class Button extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            style : props.style,
            func : props.func,
            details : props.details,
            type: props.type,
            size: props.size,
            mouseEnter:false
        }
    }



    /*
    * type类型选择
    * */

    TypeSelect = () => {
        let ButtonType = 'button_type';
        console.log(this.state.type)
        switch(this.state.type)
        {
            case 'normal':
                ButtonType =  'button_type_normal'
               break;
            case 'primary':
                ButtonType = 'button_type_primary'
                break;
            default:
                console.log('Button属性赋值不合法')

        }
        this.setState({ButtonType:ButtonType})
    }

    /*
     * size类型选择
     * */

    SizeSelect = () => {
        let ButtonSize = 'button_size';
        console.log(this.state.size)
        switch(this.state.size)
        {
            case 'small':
                ButtonSize =  'button_size_small'
                break;
            case 'normal':
                ButtonSize = 'button_size_normal'
                break;
            default:
                console.log('Button属性赋值不合法')

        }
        this.setState({ButtonSize:ButtonSize})
    }

    /*
    * 鼠标移入
    * */
    MouseEnter = (event) => {
        /*$(event.target).addClass('Button_mouse_enter')*/
        this.setState({mouseEnter:true})
        console.log(this.state.mouseEnter)
    }
    /*
     * 鼠标移出
     * */
    MouseLeave = (event) => {
        this.setState({mouseEnter:false})
        console.log(this.state.mouseEnter)
    }

    componentDidMount(){
        this.TypeSelect();
        this.SizeSelect();
    }

    render(){
        return (
            <input
                type="button"
                className={`ButtonBase ${this.state.ButtonType} ${this.state.ButtonSize} ${this.state.mouseEnter?'Button_mouse_enter':''}`}

                style={this.state.style}
                onClick={this.state.func}
                value = {this.state.details}/>


        )
    }
}

/*
 * 按钮组件默认属性
 * */
Button.defaultProps = {
    /*type:'normal',
    size:'normal'*/
}
/*
 * 选择组件（单选、多选、全选） start
 * */
    class Radio extends React.Component{
        render() {
            const {children,...reset} = this.props;
            return (
                <AntRadio {...reset}>{children}</AntRadio>
            );
        }
    }
    class RadioGroup extends React.Component{
        render() {
            const {children,...reset} = this.props;
            return (
                <AntRadio.Group {...reset}>{children}</AntRadio.Group>
            );
        }
    }
    class CheckBox extends React.Component{
        render() {
            const {children,...reset} = this.props;
            return (
                <AntCheckBox {...reset}>{children}</AntCheckBox>
            );
        }
    }
    class CheckBoxGroup extends React.Component{
        render() {
            const {children,...reset} = this.props;
            return (
                <AntCheckBox.Group {...reset}>{children}</AntCheckBox.Group>
            );
        }
    }
/*
 * 选择组件（单选、多选、全选） end
 * */

/*
 * table组件 start
 * */
    class Table extends React.Component{
        render() {
            const {children,...reset} = this.props;
            return (
                <AntTable {...reset}>{children}</AntTable>
            );
        }
    }
/*
 * table组件 end
 * */
/*
 * 分页组件 start
 * */
    class PagiNation extends React.Component{
        render() {
            const {children,hideOnSinglePage,simple,showQuickJumper,...reset} = this.props;
            return (
                <AntPagination {...reset} hideOnSinglePage={hideOnSinglePage?hideOnSinglePage:true}
                               showQuickJumper={simple?false:{goButton: <span className="pagination_go_button">Go</span>}}
                simple={simple?true:false}
                >{children}</AntPagination>
            );
        }
    }
/*
 * 分页组件 end
 * */
/*
 * 搜索 start
 * */
    class Search extends React.Component{
        constructor(props) {
            super(props);
            this.state={
                selectShow:false,
                selectdValue:'',
                cancleShow:false,
                inputFocus:false
            }
        }
        componentDidMount(){
            const {select} = this.props;
            if (select){
                document.addEventListener('click',
                    (e)=> this.outSpanClickHandler({that:this,
                        target:e.target,
                        spanDom:this.refs.search_select_span,
                        ulDom:this.refs.search_select_ul
                    }));//点击其他地方将需要进行判断的元素传输给事件outSpanClickHandler
            }
        }
        toggleSelectd(e){   //切换下拉和上拉
            this.setState({selectShow:!this.state.selectShow},()=>{
                 $(this.refs.search_select_ul).slideToggle('fast');
            });
        }   //切换下拉状态为slideDown和slideUp
        changeSelect(e){
            this.setState({selectdValue:{value:e.value,title:e.title}});
            this.setState({selectShow:!this.state.selectShow},()=>{
                $(this.refs.search_select_ul).hide();
            });
        } //改变选项
        outSpanClickHandler(e){
           const {target,ulDom,that,spanDom} = e;
           if (!spanDom.contains(target)){
                that.setState({selectShow:false},()=>{
                    $(ulDom).hide();
                })
           }
        }//点击其他地方将下拉收起
        onInputFocus(){
            this.setState({inputFocus:true});
        }//input focus事件
        onInputBlur(){
            this.setState({inputFocus:false});
        }//input blur事件
        handleEnterKey(e){
            const {select,selectOptions,onClickSearch}= this.props;
            if (e.nativeEvent.keyCode===13){
                if (onClickSearch){
                    return onClickSearch( {selectdValue:
                            select?(
                                    this.state.selectdValue?this.state.selectdValue.value
                                        :selectOptions.selectdValue.value)
                                :null,
                        value:this.refs.search_text_input.value
                    })
                }
            }
        }//键盘enter事件
        render() {
            const {width,select,placeHolder,selectOptions,onClickSearch}= this.props;
            return (
                <div className="search_container" style={{width:width?width:'',
                    borderColor:this.state.inputFocus?'#5897ed':'#bac7d9'}}>
                    <table className="search_wrapper_table">
                        <tbody>
                        <tr>
                            {//控制下拉部分的宽度
                                select? <td style={{width:(selectOptions&&selectOptions.width)?selectOptions.width:'86px'}}>
                                <div className="search_select_wrapper">
                                        <span className="search_select_span" ref='search_select_span' onClick={this.toggleSelectd.bind(this)}
                                              style={{width:(selectOptions&&selectOptions.width)?(selectOptions.width-14):''}}>
                                            <span className={`search_select_icon ${this.state.selectShow===true?'search_slide_icon':''}`}></span>
                                            {// 判断是否有state的选中值（this.state.selectdValue）?使用state.selectdValue值：(判断是否有外界传值)?使用外界传值:''
                                                this.state.selectdValue?
                                                <span className="search_select_text" data-value={this.state.selectdValue.value} title={this.state.selectdValue.title}>{this.state.selectdValue.title}</span>
                                                :
                                                ((selectOptions&&selectOptions.selectdValue)?
                                                <span className="search_select_text" data-value={selectOptions.selectdValue.value} title={selectOptions.selectdValue.title}>{selectOptions.selectdValue.title}</span>
                                                :''
                                                )
                                            }

                                        </span>
                                    <ul className='search_select_ul' ref='search_select_ul'>
                                        {
                                            //选项列表 (是否外界传值)？：使用外界值：''
                                            (selectOptions&&selectOptions.selectList)?
                                             selectOptions.selectList.map((item,k)=>{
                                                return <li key={k} onClick={this.changeSelect.bind(this,{value:item.value,title:item.title})} className="search_select_li" data-value={item.value} title={item.title}>{item.title}</li>
                                             })
                                             :''
                                        }

                                    </ul>
                                    <span className="search_select_gap"></span>
                                </div>
                                </td>:null}
                            <td className="search_left_td">
                                <input id="search_text_input" ref='search_text_input'
                                       className="search_text_input"
                                       type="text" placeholder={placeHolder?placeHolder:'输入关键词快速搜索'}
                                       onFocus={this.onInputFocus.bind(this)}
                                       onBlur={this.onInputBlur.bind(this)}
                                       onKeyPress={this.handleEnterKey.bind(this)}
                                />
                                <input className="search_cancel_input" type="button" style={{display:this.state.cancelShow===true?'block':'none'}} />
                            </td>
                            <td className="search_right_td">
                                <input  className="search_btn_input" type="button"
                                       onClick={
                                           () => {
                                               if (onClickSearch) {
                                                   onClickSearch({
                                                       selectdValue:
                                                           select ? (
                                                                   this.state.selectdValue ? this.state.selectdValue.value
                                                                       : selectOptions.selectdValue.value)
                                                               : null,
                                                       value: this.refs.search_text_input.value
                                                   });
                                               }
                                           }
                                       }/>
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
class DropDown extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            dropSelectd:'',
            dropListShow:false,
            range2ListShow:'',
            range2ListActive:''
        }
    }
    onToggleDropList(){
        this.setState({dropListShow:!this.state.dropListShow},()=>{
            $(this.refs.dropdown_select_ul).slideToggle('fast');
        });
    }//展示或者隐藏下拉列表
    onSimpleDropChange(e) {
        const {onChange, value, title} = e;
        this.setState({dropListShow: false, dropSelectd: {value, title}}, () => {
            $(this.refs.dropdown_select_ul).hide();
            if (onChange) {
                onChange({value, title});
            }
        });
    }
    //改变下拉选项的时候调用
    onMultipleRang2DropChange(e){
        const {id,name,preName,showId,onChange,k1,k2} = e;
        this.setState({ //点击选项之后
            dropListShow:false,
            dropSelectd:{
                value:`${preName}${name}${showId?`[${id}]`:''}`,
                title:`${preName}${name}${showId?`[${id}]`:''}`
            },
            range2ListActive:`${k1}${k2}`
        },()=>{
            $(this.refs.dropdown_select_ul).hide();//隐藏下拉框
            if(onChange){
                onChange({value:`${preName}-${name}`,id:id});//调用外部传入的行数
            }
        });
    }//二级下拉改变下拉的时候调用
    onRange2ListShow(k1){
        if (this.state.range2ListShow===k1){
            this.setState({range2ListShow:''},()=>{
                $(this.refs[`dropdown_list_ul3_${k1}`]).slideToggle();
            });
        }else{
            $(this.refs[`dropdown_list_ul3_${this.state.range2ListShow}`]).slideToggle();

            this.setState({range2ListShow:k1},()=>{
                $(this.refs[`dropdown_list_ul3_${k1}`]).slideToggle();
            })
        }

    }//在二级的时候展开下拉
    componentDidMount(){
        document.addEventListener('click',(e)=>this.outDropClick({
            that:this,
            target:e.target,
            ulDom:this.refs.dropdown_select_ul,
            spanDom:this.refs.dropdown_default_span
        }));//当点击事件发生在下拉之外的时候
    }
    outDropClick(e) {
        const {that, target, ulDom, spanDom} = e;
        if ((!spanDom.contains(target))&&(!ulDom.contains(target))){
            that.setState({dropListShow:false},()=>{
                $(ulDom).hide();
            })
        }
    }//当点击事件发生在下拉组件之外的时候
    render() {
        const {title,width,height,disabled,dropSelectd,dropList,onChange,type,
            mutipleOptions,...reset} = this.props;
        let dropContainer='';
        let selectUlWidth=(mutipleOptions&&mutipleOptions.width?mutipleOptions.width:540);
        let selectUlHeight=(mutipleOptions&&mutipleOptions.height?mutipleOptions.height:280);
        let searchWidth = (mutipleOptions&&mutipleOptions.searchWidth? mutipleOptions.searchWidth:320);
        let scrollWrapperWidth=(mutipleOptions&&mutipleOptions.width?(mutipleOptions.width-20):520);
        let scrollWrapperHeight=(mutipleOptions&&mutipleOptions.height?(mutipleOptions.height-72):228);
        let showId =(mutipleOptions&&mutipleOptions.dropIdShow)?mutipleOptions.dropIdShow:false;
        //所需的参数
        let dropMultipleList='';
        //判断等级渲染相对应的元素
        if(mutipleOptions&&mutipleOptions.range===2){ //如果range的等级为2
            dropMultipleList=mutipleOptions.dropMultipleList.map((item1,k1)=>{//遍历第一个数组
                return <li key={k1} className="dropdown_list_item1">
                        <div className={`dropdown_item1_name ${this.state.range2ListShow===k1?'slide':''}`} //判断是否是活动状态
                         title={item1.name} onClick={this.onRange2ListShow.bind(this,k1)}>{item1.name}</div>
                        <ul ref={`dropdown_list_ul3_${k1}`} className={`dropdown_list_ul3 clearfix`}>
                            {//遍历第二个数组
                                item1.list.map((item2,k2)=>{
                                    return <li key={k2} className={`dropdown_item3_li ${this.state.range2ListActive===`${k1}${k2}`?'active':''}`} //判断是否是active
                                               title={`${item2.name}${showId?`[${item2.id}]`:''}`}
                                    onClick={this.onMultipleRang2DropChange.bind(this,{
                                            name:item2.name,
                                            id:item2.id,
                                            preName:item1.name,
                                            showId,
                                            k1,k2,
                                            onChange:mutipleOptions.dropMultipleChange
                                        })}//绑定点击事件
                                    >
                                        <span className="dropdown_item3_name">{item2.name}</span>
                                        {
                                            showId?<span className="dropdown_item3_id">{`[${item2.id}]`}</span>:''
                                        }
                                    </li>
                                })
                            }
                        </ul>
                </li>
            });
        }else if (mutipleOptions&&mutipleOptions.range===3){
            //等待后期扩展使用
        }

        if(type&&type==='multiple'){
            dropContainer=
                <div ref="dropdown_select_ul" className="dropdown_select_ul" style={{width:selectUlWidth,height:selectUlHeight}}>
                    <div className="dropdown_multiple_container">
                        <div className="dropdown_search_wrapper">
                            <Search placeHolder={mutipleOptions&&mutipleOptions.searchPlaceholder?mutipleOptions.searchPlaceholder:null} width={searchWidth}></Search>
                        </div>
                        <Scrollbars style={{width:scrollWrapperWidth,height:scrollWrapperHeight}}>
                            <ul className="dropdown_list_ul">
                                {dropMultipleList}
                            </ul>
                        </Scrollbars>
                    </div>
                </div>
        }else{
            dropContainer=<ul className="dropdown_select_ul"
                              ref="dropdown_select_ul"
                              style={{width:width?width:120,height:height?height:48}}>
                {//dropList是否存在？dropList:''
                    dropList?
                        dropList.map((item,key)=>{
                            return <li key={key} className="dropdown_select_li"
                                       title={item.value}
                                       data-vaule={item.title}
                                       onClick={
                                           this.onSimpleDropChange.bind(this,{
                                               onChange:onChange,
                                               value:item.value,
                                               title:item.title
                                           })
                                       }
                            >{item.title}</li>
                        })
                        :''
                }

            </ul>;
        }
        return (
            <div className="dropdown_container" {...reset}>
             <span className="dropdown_title_span">{title}</span>
            <span className="dropdown_wrapper" style={{width:width?width:120}}>
                <span ref='dropdown_default_span' className={`dropdown_default_span ${disabled?'disabled':''}`}
                      onClick={ //点击展示和隐藏下拉列表
                          disabled?
                          ()=>{}:this.onToggleDropList.bind(this)
                      }
                      style={{width:width?width:120}}>
                    <span className={`dropdown_icon_span ${this.state.dropListShow?'slide':''}`}></span>
                    {   //判断this.state.dropSelectd?this.state.dropSelectd:(判断外界传入的dropSelectd？外界传入的dropSelectd:'')
                        this.state.dropSelectd?
                        <span data-value={this.state.dropSelectd.value} className="dropdown_text_span" title={this.state.dropSelectd.title}>{this.state.dropSelectd.title}</span>
                        :(dropSelectd?
                        <span data-value={dropSelectd.value} className="dropdown_text_span" title={dropSelectd.title}>{dropSelectd.title}</span>
                        :''
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
 * 下拉 end
 * */
export {
   Button,
    Radio,
    RadioGroup,
    CheckBox,
    CheckBoxGroup,
    Table,
    PagiNation,
    Search,
    DropDown
}