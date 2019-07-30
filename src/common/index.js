import 'core-js'
import React from 'react';
import {Radio as AntRadio,Checkbox as AntCheckBox,Table as AntTable,
Pagination as AntPagination} from 'antd';
import 'antd/dist/antd.min.css';
import './index.scss'

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
                cancleShow:false
            }
        }
        showSelect(e){
            this.setState({selectShow:!this.state.selectShow});
        }
        changeSelect(e){
            this.setState({selectdValue:{value:e.value,title:e.title}});
            this.setState({selectShow:!this.state.selectShow});
        }
        render() {
            const {width,select,placeHolder,selectOptions,onClickSearch}= this.props;
            return (
                <div className="search_container" style={{width:width?width:''}}>
                    <table className="search_wrapper_table">
                        <tbody>
                        <tr>
                            {//控制下拉部分的宽度
                                select? <td style={{width:(selectOptions&&selectOptions.width)?selectOptions.width:'86px'}}>
                                <div className="search_select_wrapper">
                                        <span className="search_select_span" onClick={this.showSelect.bind(this)}
                                              style={{width:(selectOptions&&selectOptions.width)?(selectOptions.width-14):''}}>
                                            <span className={`search_select_icon ${this.state.selectShow===true?'search_slide_icon':''}`}></span>
                                            {//默认的选项(是否state有值)？（设置为state的值）:(是否外界传值)？：使用外界值：默认值（搜学生）
                                                this.state.selectdValue?
                                                <span className="search_select_text" data-value={this.state.selectdValue.value} title={this.state.selectdValue.title}>{this.state.selectdValue.title}</span>
                                                :
                                                ((selectOptions&&selectOptions.default)?
                                                <span className="search_select_text" data-value={selectOptions.default.value} title={selectOptions.default.title}>{selectOptions.default.title}</span>
                                                :
                                                <span className="search_select_text">搜学生</span>
                                                )
                                            }

                                        </span>
                                    <ul className="search_select_ul"
                                    style={{display:this.state.selectShow===true?'block':'none'}}>
                                        {
                                            //选项列表 (是否外界传值)？：使用外界值：默认值（搜学生）
                                            (selectOptions&&selectOptions.selectArray)?
                                             selectOptions.selectArray.map((item,k)=>{
                                                return <li key={k} onClick={this.changeSelect.bind(this,{value:item.value,title:item.title})} className="search_select_li" data-value={item.value} title={item.title}>{item.title}</li>
                                             })
                                             :
                                             <li className="search_select_li">搜学生</li>
                                        }

                                    </ul>
                                    <span className="search_select_gap"></span>
                                </div>
                            </td>:''}
                            <td className="search_left_td">
                                <input id="search_text_input" className="search_text_input" type="text" placeholder={placeHolder} />
                                <input className="search_cancel_input" type="button" style={{display:this.state.cancelShow===true?'block':'none'}} />
                            </td>
                            <td className="search_right_td">
                                <input  className="search_btn_input" type="button"
                                       onClick={
                                           ()=>onClickSearch(
                                               {selectValue:
                                               this.state.selectdValue?this.state.selectdValue.value
                                               :selectOptions.default.value,
                                               value:document.getElementById("search_text_input").value
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
export {
   Button,
    Radio,
    RadioGroup,
    CheckBox,
    CheckBoxGroup,
    Table,
    PagiNation,
    Search
}