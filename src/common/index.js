import 'core-js'
import React from 'react';
import 'antd/dist/antd.min.css';
import './index.scss'
import {Radio as AntRadio,Checkbox as AntCheckBox,Table as AntTable,
Pagination as AntPagination} from 'antd';
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
                return onClickSearch( {selectdValue:
                        select?(
                                this.state.selectdValue?this.state.selectdValue.value
                                    :selectOptions.selectdValue.value)
                            :null,
                    value:this.refs.search_text_input.value
                })
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
                                       type="text" placeholder={placeHolder}
                                       onFocus={this.onInputFocus.bind(this)}
                                       onBlur={this.onInputBlur.bind(this)}
                                       onKeyPress={this.handleEnterKey.bind(this)}
                                />
                                <input className="search_cancel_input" type="button" style={{display:this.state.cancelShow===true?'block':'none'}} />
                            </td>
                            <td className="search_right_td">
                                <input  className="search_btn_input" type="button"
                                       onClick={
                                           ()=>onClickSearch( //点击搜索之后传值给调用的界面
                                               {selectdValue:
                                               select?(
                                               this.state.selectdValue?this.state.selectdValue.value
                                               :selectOptions.selectdValue.value)
                                               :null,
                                               value:this.refs.search_text_input.value
                                               }
                                               )
                                       }
                                />
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
            dropListShow:false
        }
    }
    onToggleDropList(){
        this.setState({dropListShow:!this.state.dropListShow},()=>{
            $(this.refs.dropdown_select_ul).slideToggle('fast');
        });
    }//展示或者隐藏下拉列表
    onDropChange(e){
       const {onChange,value,title}= e;
       this.setState({dropListShow:false},()=>{
           $(this.refs.dropdown_select_ul).hide();
           onChange({value,title});
       });
       this.setState({dropSelectd:{value,title}});
    }//改变下拉选项的时候调用
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
        if (!spanDom.contains(target)) {
            that.setState({dropListShow:false},()=>{
                $(ulDom).hide();
            })
        }
    }//当点击事件发生在下拉组件之外的时候
    render() {
        const {title,width,disabled,dropSelectd,dropList,onChange,...reset} = this.props;
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
                <ul className="dropdown_select_ul"
                    ref="dropdown_select_ul"
                    style={{width:width?width:120}}>
                    {//dropList是否存在？dropList:''
                        dropList?
                        dropList.map((item,key)=>{
                            return <li key={key} className="dropdown_select_li"
                            title={item.value}
                            data-vaule={item.title}
                             onClick={
                                this.onDropChange.bind(this,{
                                         onChange:onChange,
                                         value:item.value,
                                         title:item.title
                                     })
                             }
                            >{item.title}</li>
                        })
                        :''
                    }

                </ul>
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